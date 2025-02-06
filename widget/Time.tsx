import { Gtk } from 'astal/gtk4';
import { Variable, bind } from 'astal';

const REST_DAYS = new Set([0, 1, 4, 6]); // Sunday=0, Monday=1, Thursday=4, Saturday=6

const isRestDay = (date: Date): boolean => {
  return REST_DAYS.has(date.getDay());
};

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

const getDayClass = (timeString: string) => {
  const date = new Date(timeString);
  return isRestDay(date) ? 'RestDayLabel' : 'DateLabel';
};

export default function Time() {
  const time = Variable('').poll(1000, 'date');
  const dynamicClasses = bind(time).as((t) =>
    isRestDay(new Date(t)) ? ['DateLabel', 'RestDayLabel'] : ['DateLabel']
  );

  return (
    <centerbox
      cssClasses={['ClockBox']}
      halign={Gtk.Align.CENTER}
      orientation={Gtk.Orientation.VERTICAL}
    >
      <label cssClasses={['TimeLabel']} label={bind(time).as(formatHours)} />
      <label cssClasses={['TimeLabel']} label={bind(time).as(formatMinutes)} />
      <label cssClasses={dynamicClasses} label={bind(time).as(formatDay)} />
    </centerbox>
  );
}
