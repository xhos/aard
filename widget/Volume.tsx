import { Gtk } from 'astal/gtk4';
import Wp from 'gi://AstalWp';
import { Variable, bind } from 'astal';
import { MutedIcon } from './icons/muted';
import { VolumeFullIcon } from './icons/volume-full';
import { VolumeLowIcon } from './icons/volume-low';
import { VolumeOffIcon } from './icons/volume-off';
import { useHover } from './helpers/useHover';

type VolumeInfo = {
  level: number;
  muted: boolean;
};

const volumeInfo = Variable({ level: 0, muted: false });
volumeInfo.poll(500, () => {
  try {
    const wpDefault = Wp.get_default();
    const audio = wpDefault ? wpDefault.audio : null;
    if (!audio || !audio.default_speaker) {
      DEBUG && console.log('No speaker found');
      return { level: 0, muted: true };
    }

    const speaker = audio.default_speaker;
    const volumeLevel = Math.round(speaker.volume * 100);
    const muted = speaker.get_mute();

    DEBUG && console.log(`Volume level: ${volumeLevel}%, Muted: ${muted}`);
    return { level: volumeLevel, muted: muted };
  } catch (error) {
    DEBUG && console.log('Error getting volume info:', error);
    return { level: 0, muted: true };
  }
});

// Helper function to determine which icon to show
function getVolumeIcon(info: VolumeInfo) {
  if (info.muted) return MutedIcon();
  if (info.level === 0) return VolumeOffIcon();
  if (info.level < 50) return VolumeLowIcon();
  return VolumeFullIcon();
}

export default function VolumeIndicator() {
  // Use the hover helper
  const { isHovered, setup } = useHover(DEBUG);

  return (
    <box
      cssClasses={bind(volumeInfo).as((info: VolumeInfo) =>
        info.muted ? ['VolumeBox', 'Muted'] : ['VolumeBox']
      )}
      halign={Gtk.Align.CENTER}
      orientation={Gtk.Orientation.VERTICAL}
      setup={setup}
    >
      {/* Change to a slide-up-down animation */}
      <stack
        visibleChildName={bind(isHovered).as((hovered) =>
          hovered ? 'level' : 'icon'
        )}
        transitionType={Gtk.StackTransitionType.SLIDE_UP_DOWN}
        transitionDuration={150} // Fast but smooth transition (in ms)
      >
        <label
          name="level"
          cssClasses={bind(volumeInfo).as((info) =>
            info.muted ? ['VolumeLabel', 'Muted'] : ['VolumeLabel']
          )}
          label={bind(volumeInfo).as((info) => info.level.toString())}
        />
        <image
          name="icon"
          cssClasses={bind(volumeInfo).as((info) =>
            info.muted ? ['VolumeIcon', 'Muted'] : ['VolumeIcon']
          )}
          paintable={bind(volumeInfo).as(getVolumeIcon)}
        />
      </stack>
    </box>
  );
}