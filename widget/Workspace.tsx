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

function toKanji(workspace: string) {
  const hyprsplit = globalThis.CONFIG?.hyprsplit === true;
  if (!hyprsplit) {
    return kanjiNumbers[workspace as keyof typeof kanjiNumbers] || workspace;
  }
  const num = parseInt(workspace, 10);
  const base = num >= 11 && num <= 20 ? String(num - 10) : workspace;
  return kanjiNumbers[base as keyof typeof kanjiNumbers] || workspace;
}

export default function WorkspaceIndicator() {
  // now read CONFIG.hyprsplit here too
  const hyprsplit = globalThis.CONFIG?.hyprsplit === true;
  console.log('hyprsplit:', hyprsplit);

  const hyprland = Hyprland.get_default();
  const current = bind(hyprland, 'focused_workspace');

  return (
    <box cssClasses={['WorkspaceBox']} halign={Gtk.Align.CENTER}>
      <button
        cssClasses={['WorkspaceButton']}
        onClicked="hyprctl dispatch togglespecialworkspace "
      >
        <label
          cssClasses={current.as(ws => {
            const n = parseInt(ws?.name || '', 10);
            const cls = ['WorkspaceLabel'];
            if (hyprsplit && n >= 11 && n <= 20) {
              cls.push('WorkspaceLabelSecondary');
            }
            return cls;
          })}
          label={current.as(ws => toKanji(ws?.name || ''))}
        />
      </button>
    </box>
  );
}