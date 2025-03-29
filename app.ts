import { App } from 'astal/gtk4';
import Bar from './widget/Bar';
import style from './style.scss';
import { execAsync } from 'astal';
import GLib from 'gi://GLib';

globalThis.DEBUG = false;
globalThis.CONFIG = {
  wallpaper: null,
  transparency: false,
};

interface ColorTheme {
  colors: {
    dark: Record<string, string>;
  };
}

declare global {
  var CONFIG: {
    wallpaper: string | null;
    transparency: boolean;
  };
}

// Load config if available
async function loadConfig() {
  const configPath = `${GLib.get_user_config_dir()}/aard/config.json`;

  try {
    const configContent = await execAsync(['cat', configPath]);
    if (configContent) {
      globalThis.CONFIG = JSON.parse(configContent);
      console.log('Config loaded:', globalThis.CONFIG);
    }
  } catch (error) {
    console.error('Failed to load config:', error);
  }
}

// Generate colors from wallpaper
async function generateColors() {
  if (!CONFIG.wallpaper) return null;

  try {
    const matugenOutput = await execAsync(['matugen', 'image', CONFIG.wallpaper, '-j', 'rgba']);
    return JSON.parse(matugenOutput);
  } catch (error) {
    console.error('Failed to generate colors:', error);
    return null;
  }
}

function applyColorTheme(colors: ColorTheme | null) {
  if (!colors || !colors.colors || !colors.colors.dark) return;

  const darkColors = colors.colors.dark;
  const useTransparency = CONFIG.transparency === true;

  const cssVars = Object.entries(darkColors)
    .map(([key, value]) => {
      const cssKey = key
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/_/g, '-')
        .toLowerCase();

      if (useTransparency) {
        if (key === 'background') {
          return `--md-sys-color-${cssKey}: transparent;`;
        }

        if (key.includes('container') || key === 'surface') {
          if (value.startsWith('rgba')) {
            const match = value.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
            if (match) {
              const [_, r, g, b] = match;
              return `--md-sys-color-${cssKey}: rgba(${r}, ${g}, ${b}, 0.8);`;
            }
          } else if (value.startsWith('#')) {
            const hex = value.substring(1);
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return `--md-sys-color-${cssKey}: rgba(${r}, ${g}, ${b}, 0.8);`;
          }
        }
      }

      return `--md-sys-color-${cssKey}: ${value};`;
    })
    .join('\n');

  App.apply_css(`
    :root {
      ${cssVars}
    }
  `);

  if (useTransparency) {
    App.apply_css(`
      window.Bar {
        background-color: transparent;
      }
    `);
  }

  console.log(
    'Applied theme colors from wallpaper' + (useTransparency ? ' with transparency' : '')
  );
}

App.start({
  css: style,
  main: async function () {
    await loadConfig();

    // If wallpaper is set, generate and apply colors
    if (CONFIG.wallpaper) {
      const colorData = await generateColors();
      if (colorData) {
        applyColorTheme(colorData);
      }
    }

    App.get_monitors().map(Bar);
  },
});
