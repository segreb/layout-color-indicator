import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import St from 'gi://St';
import {getInputSourceManager} from 'resource:///org/gnome/shell/ui/status/keyboard.js';

const RUSSIAN_CLASS = 'layout-color-indicator-russian';

export default class LayoutColorIndicator extends Extension {
    enable() {
        this._stylesheet = this.dir.get_child('stylesheet.css');
        this._theme = St.ThemeContext.get_for_stage(global.stage).get_theme();
        this._theme.load_stylesheet(this._stylesheet);
        this._manager = getInputSourceManager();
        this._sourceChangedId = this._manager.connect('current-source-changed', () => this._update());
        this._update();
    }

    _update() {
        const id = this._manager.currentSource?.id ?? '';
        const isRussian = id === 'ru' || id.startsWith('xkb:ru');
        const actor = Main.layoutManager.uiGroup;
        if (isRussian)
            actor.add_style_class_name(RUSSIAN_CLASS);
        else
            actor.remove_style_class_name(RUSSIAN_CLASS);
    }

    disable() {
        if (this._sourceChangedId !== undefined) {
            this._manager.disconnect(this._sourceChangedId);
            this._sourceChangedId = undefined;
        }
        Main.layoutManager.uiGroup.remove_style_class_name(RUSSIAN_CLASS);
        if (this._stylesheet) {
            this._theme.unload_stylesheet(this._stylesheet);
            this._theme = null;
            this._stylesheet = null;
        }
        this._manager = null;
    }
}
