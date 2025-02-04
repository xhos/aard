import { Gtk } from 'astal/gtk4';
import { Variable, bind } from 'astal';

const formatHours = (timeString: string) => {
  const date = new Date(timeString);
  return date.getHours().toString().padStart(2, '0');
};

const formatMinutes = (timeString: string) => {
  const date = new Date(timeString);
  return date.getMinutes().toString().padStart(2, '0');
};

const formatDay = (timeString: string) => {
  const date = new Date(timeString);
  return date.getDate().toString().padStart(2, '0');
};

export default function Time() {
  const time = Variable('').poll(1000, 'date');

  return (
    <centerbox
      cssClasses={['ClockBox']}
      halign={Gtk.Align.CENTER}
      orientation={Gtk.Orientation.VERTICAL}
    >
      <label cssClasses={['TimeLabel']} label={bind(time).as(formatHours)} />
      <label cssClasses={['TimeLabel']} label={bind(time).as(formatMinutes)} />
      <label cssClasses={['DateLabel']} label={bind(time).as(formatDay)} />
    </centerbox>
  );
}
