import { Gtk } from 'astal/gtk4';
import { Variable } from 'astal';

/**
 * Helper function to easily add hover detection to a widget
 * @param debug Whether to log hover events
 * @returns An object with isHovered variable and setup function for the widget
 */
export function useHover(debug = false) {
  const isHovered = Variable(false);

  const setup = (widget: Gtk.Widget) => {
    const controller = new Gtk.EventControllerMotion();

    controller.connect('enter', () => {
      debug && console.log('Hover enter');
      isHovered.set(true);
      return false;
    });

    controller.connect('leave', () => {
      debug && console.log('Hover leave');
      isHovered.set(false);
      return false;
    });

    widget.add_controller(controller);
  };

  return { isHovered, setup };
}