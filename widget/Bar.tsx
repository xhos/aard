import { App, Astal, Gtk, Gdk } from 'astal/gtk4';
import { bind } from 'astal';
import Battery from 'gi://AstalBattery';
import Time from './Time';
import Workspace from './Workspace';

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;
  const battery = Battery.get_default();

  const batteryBinding = {
    cssProperties: bind(battery as any, 'percentage').as((p: number) => ({
      '--battery-level': Math.round(p * 100) + '%',
    })),
  };

  return (
    <window
      visible
      cssClasses={['Bar']}
      {...(batteryBinding as any)}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | BOTTOM}
      application={App}
    >
      <box orientation={1}>
        <Workspace />
        <box vexpand={true} />
        <Time />
      </box>
    </window>
  );
}
