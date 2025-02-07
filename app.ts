import { App } from 'astal/gtk4';
import { exec, monitorFile } from 'astal';
import Bar from './widget/Bar';
import style from './style.scss';

// const scss = './style.scss'; // Path to your style file
// const css = '/tmp/style.css'; // Could be anywhere else

// compileScss(); // Precompile SCSS on startup

// Monitor your SCSS file for changes and reload the CSS in the app
// monitorFile(scss, () => {
//   console.log('CSS RELOADED'); // Debug: log reloading action
//   compileScss();
//   App.reset_css();
//   App.apply_css(css);
// });

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);
  },
});

// function compileScss() {
//   const error = exec(`sass ${scss} ${css}`);
//   if (error) {
//     console.error(`There went something wrong compiling the SCSS: ${error}`);
//   }
// }
