import { App } from 'astal/gtk4';
import Bar from './widget/Bar';
import style from './style.scss';
import { execAsync } from 'astal';
import GLib from 'gi://GLib';
import { generateColorsFromWallpaper, applyColorTheme } from './utils/colorScheme';

globalThis.DEBUG = false;
globalThis.CONFIG = {
  wallpaper: null,
  transparency: false,
};

declare global {
  var DEBUG: boolean;
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
    // It's okay if the config doesn't exist or fails to load, use defaults.
    const message = error instanceof Error ? error.message : String(error);
    console.warn('Failed to load config or config file not found:', message);
  }
}

App.start({
  css: style,
  main: async function () {
    await loadConfig();

    // Generate and apply colors using the imported functions
    const colorData = await generateColorsFromWallpaper();
    if (colorData) {
      applyColorTheme(colorData);
    }

    App.get_monitors().map(Bar);
  },
});
