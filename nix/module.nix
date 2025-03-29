self: {
  lib,
  pkgs,
  config,
  ...
}: let
  inherit (lib) types mkIf mkOption mkEnableOption;

  cfg = config.programs.aard;

  package =
    if pkgs ? aard
    then pkgs.aard
    else self.packages.${pkgs.stdenv.system}.default;
in {
  options.programs.aard = {
    enable = mkEnableOption "aard, astal shell";
    wallpaper = mkOption {
      type = types.path;
      default = "";
      description = "path to wallpaper";
    };
    transparency = mkOption {
      type = types.bool;
      default = false;
      description = "enable transparency for the bar";
    };
    systemd.enable = mkEnableOption "enable systemd integration";
  };

  config = mkIf cfg.enable {
    home.packages = [package];

    # Create config directory if needed
    xdg.configFile = mkIf (cfg.wallpaper != "" || cfg.transparency) {
      "aard/config.json" = {
        text = builtins.toJSON {
          wallpaper = cfg.wallpaper;
          transparency = cfg.transparency;
        };
      };
    };

    systemd.user.services = mkIf cfg.systemd.enable {
      aard = {
        Unit = {
          Description = "aard, astal shell";
          PartOf = ["graphical-session.target"];
          After = ["graphical-session-pre.target"];
        };
        Install = {
          WantedBy = ["graphical-session.target"];
        };
        Service = {
          ExecStart = "${package}/bin/aard";
          Restart = "always";
          RestartSec = "5s";
        };
      };
    };
  };
}
