import { App } from 'astal/gtk4';
import Bar from './widget/Bar';
import style from './style.scss';

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);
  },
});
