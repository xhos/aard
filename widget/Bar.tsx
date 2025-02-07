import { App, Astal, Gtk, Gdk } from 'astal/gtk4';
import { bind } from 'astal';
import Time from './Time';
import Workspace from './Workspace';
import Systray from './Tray';
import LanguageIndicator from './Language';
import BatteryWidget from './Battery';

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
        <BatteryWidget />
        <Time />
      </box>
    </window>
  );
}
