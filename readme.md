# aard
![](./ss.png)  

WIP astal shell

## install

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

### tip

you can install it as a systemd serivice, so it runs on startup, and restars on crashes
```nix
systemd.user.services.aard = {
  Unit.Description = "Astal Shell";
  Install.WantedBy = ["graphical-session.target"];
  Service = {
    ExecStart = "${inputs.aard.packages.${pkgs.system}.default}/bin/aard";
    Restart = "always";
    RestartSec = "5s";
  };
};
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
