import { App, Astal, Gdk } from 'astal/gtk4';
import Time from './Time';
import Workspace from './Workspace';
import Systray from './Tray';
import LanguageIndicator from './Language';
import BatteryIndicator from './Battery';
import VolumeIndicator from './Volume';
import Battery from 'gi://AstalBattery';
import Wp from 'gi://AstalWp';

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      visible
      cssClasses={['Bar']}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | BOTTOM}
      application={App}
    >
      <box orientation={1}>
        <Workspace />
        <box vexpand={true} />
        <Systray />
        <LanguageIndicator />
        {Battery.get_default().get_percentage() !== 0 && <BatteryIndicator />}
        <VolumeIndicator />
        <Time />
      </box>
    </window>
  );
}