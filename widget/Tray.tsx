import { Gtk } from 'astal/gtk4';
import { Variable, bind } from 'astal';
import { ArrowUpIcon } from './icons/arrow-up';
import Tray from 'gi://AstalTray';

function TrayItem(item: Tray.TrayItem) {
  return (
    <image
      cssClasses={['TrayIcon']}
      gicon={bind(item, 'gicon')}
      tooltipMarkup={bind(item, 'tooltipMarkup')}
    />
  );
}

export default function Systray() {
  const tray = Tray.get_default();

  return (
    <box cssClasses={['TrayBox']} orientation={Gtk.Orientation.VERTICAL}>
      <box cssClasses={['TrayContent']}>
        <image cssClasses={['TrayIcon']} paintable={ArrowUpIcon()} />
      </box>
      <box cssClasses={['TrayExpanded']} orientation={Gtk.Orientation.VERTICAL}>
        {bind(tray, 'items').as((items) => items.map(TrayItem))}
      </box>
    </box>
  );
}
