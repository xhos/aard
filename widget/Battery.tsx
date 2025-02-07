import { Gtk } from 'astal/gtk4';
import Battery from 'gi://AstalBattery';

export default function BatteryWidget() {
  const battery = Battery.get_default();
  const percentage = battery ? Math.round(battery.percentage * 100) : 0;

  return (
    <box
      cssClasses={['BatteryBox']}
      halign={Gtk.Align.CENTER}
      orientation={Gtk.Orientation.VERTICAL}
    >
      <label cssClasses={['BatteryLabel']} label={`${percentage}`} />
    </box>
  );
}
