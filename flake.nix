{
  description = "WIP astal shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    ags,
  }: let
    systems = ["x86_64-linux" "aarch64-linux"];
    forEachSystem = nixpkgs.lib.genAttrs systems;
  in {
    packages = forEachSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      default = ags.lib.bundle {
        inherit pkgs;
        src = ./.;
        name = "aard";
        entry = "app.ts";
        gtk4 = true;

        # additional libraries and executables to add to gjs' runtime
        extraPackages = [
          ags.packages.${pkgs.system}.battery
          ags.packages.${pkgs.system}.bluetooth
          ags.packages.${pkgs.system}.hyprland
          ags.packages.${pkgs.system}.network
          ags.packages.${pkgs.system}.mpris
          ags.packages.${pkgs.system}.tray
          ags.packages.${pkgs.system}.wireplumber
          pkgs.jq # for language switcher
        ];
      };
    });

    # Add an overlay so the package is exposed as pkgs.aard
    overlay = final: prev: {
      aard = prev.writeShellScriptBin "aard" ''
        exec ${self.packages.${final.stdenv.system}.default}/bin/aard "$@"
      '';
    };

    # Add the home-manager module
    homeManagerModules.aard = import ./nix/module.nix self;

    devShells = forEachSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      default = pkgs.mkShell {
        buildInputs = [
          # includes astal3 astal4 astal-io by default
          (ags.packages.${system}.default.override {
            extraPackages = [
              ags.packages.${system}.agsFull
              ags.packages.${pkgs.system}.battery
              ags.packages.${pkgs.system}.bluetooth
              ags.packages.${pkgs.system}.hyprland
              ags.packages.${pkgs.system}.network
              ags.packages.${pkgs.system}.mpris
              ags.packages.${pkgs.system}.tray
              ags.packages.${pkgs.system}.wireplumber
              pkgs.jq # for language switcher
            ];
          })
        ];
      };
    });
  };
}
