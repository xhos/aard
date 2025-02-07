import { Gtk } from 'astal/gtk4';
import { Variable, bind } from 'astal';
import { astalify, hook } from 'astal/gtk4';
import { ArrowUpIcon } from './icons/arrow-up';
import Tray from 'gi://AstalTray';

const excludeIcons = [/^video-display/, /^blueman-active/];

const PopoverMenu = astalify<Gtk.PopoverMenu, Gtk.PopoverMenu.ConstructorProps>(
  Gtk.PopoverMenu,
  {}
);

function TrayItem(item: Tray.TrayItem) {
  const button = (
    <menubutton
      cssClasses={['TrayIcon']}
      tooltipMarkup={bind(item, 'tooltipMarkup')}
      setup={(self: Gtk.MenuButton) => {
        self.insert_action_group('dbusmenu', item.actionGroup);
      }}
    >
      <image gicon={bind(item, 'gicon')} />
      <PopoverMenu menuModel={bind(item, 'menuModel')} flags={Gtk.PopoverMenuFlags.SLIDING} />
    </menubutton>
  ) as Gtk.MenuButton; // Cast button to MenuButton type

  hook(button, item, 'notify::action-group', (self: Gtk.MenuButton) => {
    self.insert_action_group('dbusmenu', item.actionGroup);
  });

  return button;
}

export default function Systray() {
  const tray = Tray.get_default();

  return (
    <box cssClasses={['TrayBox']} halign={Gtk.Align.CENTER} orientation={Gtk.Orientation.VERTICAL}>
      <box cssClasses={['TrayContent']}>
        <image cssClasses={['TrayIcon']} paintable={ArrowUpIcon()} />
      </box>
      <box cssClasses={['TrayExpanded']} orientation={Gtk.Orientation.VERTICAL}>
        {bind(tray, 'items').as((items) => {
          if (DEBUG) {
            items.forEach((item) => {
              const iconName = item.gicon?.to_string() || '';
              console.log('Tray item:', {
                name: item,
                icon: iconName,
                tooltip: item.tooltipMarkup,
              });
            });
          }

          return items
            .filter((item) => {
              const iconName = item.gicon?.to_string() || '';
              return !excludeIcons.some((regex) => regex.test(iconName));
            })
            .map(TrayItem);
        })}
      </box>
    </box>
  );
}
