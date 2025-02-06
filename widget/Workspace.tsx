import { Gtk } from 'astal/gtk4';
import { bind } from 'astal';
import Hyprland from 'gi://AstalHyprland';

const kanjiNumbers = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '7': '七',
  '8': '八',
  '9': '九',
  '10': '十',
};

const toKanji = (workspace: keyof typeof kanjiNumbers) => {
  return kanjiNumbers[workspace] || workspace;
};

export default function WorkspaceIndicator() {
  const hyprland = Hyprland.get_default();
  const currentWorkspace = bind(hyprland, 'focused_workspace');

  return (
    <box cssClasses={['WorkspaceBox']} halign={Gtk.Align.CENTER}>
      <button cssClasses={['LanguageButton']} onClicked="hyprctl dispatch togglespecialworkspace ">
        {' '}
        <label
          cssClasses={['WorkspaceLabel']}
          label={currentWorkspace.as((workspace) =>
            toKanji(workspace?.name as keyof typeof kanjiNumbers)
          )}
        />
      </button>
    </box>
  );
}
