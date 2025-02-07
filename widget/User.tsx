import { Gtk, Astal } from 'astal/gtk4';
import { Variable } from 'astal';

export default function User() {
  function openQuickSettings() {
    const quickSettings = (
      <window
        name="quick-settings-panel"
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
        exclusivity={Astal.Exclusivity.IGNORE}
        keymode={Astal.Keymode.ON_DEMAND}
        decorated={false}
        marginTop={10}
        marginLeft={60}
        marginStart={20}
        widthRequest={500}
        heightRequest={300}
        onCloseRequest={(self: Gtk.Window) => {
          self.hide();
          return true;
        }}
      >
        <box halign={Gtk.Align.FILL} valign={Gtk.Align.FILL}>
          <label label="Quick Settings Panel" />
        </box>
      </window>
    );
    quickSettings.show();
  }

  return (
    <box cssClasses={['UserBox']} halign={Gtk.Align.CENTER}>
      <button cssClasses={['UserButton']} onClicked={openQuickSettings}>
        <label cssClasses={['UserLabel']} label="U" />
      </button>
    </box>
  );
}
