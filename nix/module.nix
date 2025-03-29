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
    enable = mkEnableOption "Aard";
    wallpaper = mkOption {
      type = types.path;
      default = "";
      description = "Path to wallpaper image";
    };
  };

  config = mkIf cfg.enable {
    home.packages = [package];

    # Create config directory if needed
    xdg.configFile = mkIf (cfg.wallpaper != "") {
      "aard/config.json" = {
        text = builtins.toJSON {
          wallpaper = cfg.wallpaper;
        };
      };
    };
  };
}
