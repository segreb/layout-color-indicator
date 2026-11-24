# Layout Color Indicator

A GNOME Shell extension that changes the GNOME top bar and Ubuntu Dock background while the Russian keyboard layout is active.

## Compatibility

- GNOME Shell 46
- Ubuntu Dock (the Dock color rule applies when the Ubuntu Dock actor is present)

## Install

Copy this directory to the per-user GNOME Shell extensions directory:

```sh
mkdir -p ~/.local/share/gnome-shell/extensions/layout-color-indicator@local
cp extension.js metadata.json stylesheet.css ~/.local/share/gnome-shell/extensions/layout-color-indicator@local/
```

Then enable **Layout Color Indicator** in GNOME Extensions. On Xorg, log out and back in if needed. On Wayland, restart the session by logging out and back in.

## Change the color

Edit the two `background-color` values in `stylesheet.css`. They are both set to `#5b245f` by default. Use the same color for the panel and Dock, or choose separate values.

## Behavior

The extension watches GNOME's active input source. It applies its style when the source ID is `ru` or begins with `xkb:ru`, and removes the style for other layouts. Disabling the extension disconnects the signal and unloads its stylesheet.
