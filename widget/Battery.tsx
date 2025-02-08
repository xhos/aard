import { Gtk } from 'astal/gtk4';
import Battery from 'gi://AstalBattery';
import { Variable, bind } from 'astal';

type BatteryInfo = {
  level: number;
  charging: boolean;
};

const batteryInfo = Variable({ level: 0, charging: false }).poll(1000, () => {
  const battery = Battery.get_default();
  if (battery) {
    const rawPercentage = battery.get_percentage();
    const level = Math.round(rawPercentage * 100);
    const charging = battery.get_charging();
    if (DEBUG) {
      console.log(`Battery level: ${level}%, Raw: ${rawPercentage}, Charging: ${charging}`);
    }
    return { level, charging };
  } else {
    if (DEBUG) {
      console.log('No battery found');
    }
    return { level: 0, charging: false };
  }
});

const batteryLevel = bind(batteryInfo).as((info: BatteryInfo) => info.level.toString());
const isCharging = bind(batteryInfo).as((info: BatteryInfo) => info.charging);

export default function BatteryIndicator() {
  return (
    <box
      cssClasses={bind(isCharging).as((charging: boolean) =>
        charging ? ['BatteryBox', 'Charging'] : ['BatteryBox']
      )}
      halign={Gtk.Align.CENTER}
      orientation={Gtk.Orientation.VERTICAL}
    >
      <label
        cssClasses={bind(isCharging).as((charging: boolean) =>
          charging ? ['BatteryLabel', 'Charging'] : ['BatteryLabel']
        )}
        label={batteryLevel}
      />
    </box>
  );
}
