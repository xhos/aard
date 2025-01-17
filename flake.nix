{
  description = "desktop shell that might be usable at some point, no promises";

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
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system} = {
      default = ags.lib.bundle {
        inherit pkgs;
        src = ./.;
        name = "my-shell";
        entry = "app.ts";

        # additional libraries and executables to add to gjs' runtime
        extraPackages = [
          ags.packages.${pkgs.system}.battery
          ags.packages.${pkgs.system}.bluetooth
          ags.packages.${pkgs.system}.hyprland
          ags.packages.${pkgs.system}.network
          ags.packages.${pkgs.system}.mpris
          ags.packages.${pkgs.system}.tray
          ags.packages.${pkgs.system}.wireplumber
        ];
      };
    };

    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = [
          # includes astal3 astal4 astal-io by default
          (ags.packages.${system}.default.override {
            extraPackages = [
              ags.packages.${system}.agsFull
            ];
          })
        ];
      };
    };
  };
}
