import { Gtk } from 'astal/gtk4';
import { Variable, bind, execAsync } from 'astal';

//// Layout switching ////
const switchLayout = async () => {
  try {
    await execAsync([
      'sh',
      '-c',
      'hyprctl --batch "$(hyprctl devices -j | jq -r \'.keyboards[] | .name\' | while IFS= read -r keyboard; do printf \'switchxkblayout %s next;\' "$keyboard"; done)"',
    ]);
  } catch (error) {
    console.error('Failed to switch layout:', error);
  }
};

//// Getting the layout ////
const getLayoutCmd = async () => {
  try {
    const devicesJson = await execAsync(['hyprctl', 'devices', '-j']);
    const data = JSON.parse(devicesJson);
    const mainKeyboard = data.keyboards?.find((kb: any) => kb.main === true);
    return mainKeyboard?.active_keymap || 'unknown';
  } catch (error) {
    console.error('Failed to get layout:', error);
    return 'unknown';
  }
};

// to get the full language name run hyprctl devices
const languageEmojis: Record<string, string> = {
  'English (US)': '🦅',
  Russian: '🐻',
};

const formatLayout = (layout: string) => {
  return languageEmojis[layout] || layout;
};

//// The widget ////
export default function LanguageIndicator() {
  const layout = Variable('').poll(100, getLayoutCmd);

  return (
    <box cssClasses={['LanguageBox']} halign={Gtk.Align.CENTER}>
      <button cssClasses={['LanguageButton']} onClicked={switchLayout}>
        <label cssClasses={['LanguageLabel']} label={bind(layout).as(formatLayout)} />
      </button>
    </box>
  );
}
