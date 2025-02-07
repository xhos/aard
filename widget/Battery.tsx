import { Gtk } from 'astal/gtk4';
import Battery from 'gi://AstalBattery';
import { Variable, bind } from 'astal';

// Poll battery level every second
const batteryLevel = Variable(0).poll(1000, () => {
  const battery = Battery.get_default();
  return battery ? Math.round(battery.percentage * 100) : 0;
});

export default function BatteryWidget() {
  return (
    <box
      cssClasses={['BatteryBox']}
      halign={Gtk.Align.CENTER}
      orientation={Gtk.Orientation.VERTICAL}
    >
      <label
        cssClasses={['BatteryLabel']}
        label={bind(batteryLevel).as((x: number) => x.toString())}
      />
    </box>
  );
}
