# aard

WIP astal shell

## usage

add this to your flake inputs:

```nix
aard.url = "github:xhos/aard";
```

and add this somewhere in your config:

```nix
home.packages = with pkgs; [
  inputs.aard.packages.${system}.default
];
```

or, if you don't use home manager

```nix
environment.systemPackages = with pkgs; [
  inputs.aard.packages.${system}.default
];
```

## development

to enter the development enviroment with all requirements installed

```bash
nix develop
```

getting type defenitions

```bash
ags types Astal* --ignore Gtk3 --ignore Astal3 -p -d .
```

running the shell

```bash
ags run app.ts --gtk4
```
