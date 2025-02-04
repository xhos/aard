// widget/WorkspaceIndicator.tsx
import { Gtk } from 'astal/gtk4';
import { bind } from 'astal';
import Hyprland from 'gi://AstalHyprland';

export default function WorkspaceIndicator() {
  const hyprland = Hyprland.get_default();

  // Bind to the 'focused-workspace' property (important!)
  const currentWorkspace = bind(hyprland, 'focused_workspace');

  return (
    <centerbox cssClasses={['SquareBox']} halign={Gtk.Align.CENTER}>
      {' '}
      <label
        cssClasses={['WorkspaceLabel']}
        label={currentWorkspace.as((workspace) => workspace?.name ?? '')}
      />
    </centerbox>
  );
}
