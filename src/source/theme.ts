import redGraphite from './theme.red-graphite';
import solarizedLight from './theme.solarized-light';
import dracula from './theme.dracula';

export class Theme {
  constructor (public name: string, public source: Object, public darkMode: boolean) {}
}

export class Themes {
  constructor (public themes: Theme[]) {}

  get themeList () {
    return this.themes.map(theme => theme.name);
  }

  get darkThemes () {
    return this.themes.filter(theme => theme.darkMode).map(theme => theme.name);
  }

  get lightThemes () {
    return this.themes.filter(theme => !theme.darkMode).map(theme => theme.name);
  }

  get map () {
    return this.themes.reduce((result, theme) => {
      result[theme.name] = theme.source;
      return result;
    }, {});
  }

  syncStorage () {
    localStorage.setItem('themes', JSON.stringify(this.map));
  }

  enable (name: string) {
    const targetTheme = this.map[name];
    const root = document.documentElement;
    for (const [attr, value] of Object.entries(targetTheme)) {
      root.style.setProperty(`--${attr}`, value as string);
    }
  }
}

export const themes = new Themes([
  new Theme(redGraphite.name, redGraphite.source, redGraphite.darkMode),
  new Theme(solarizedLight.name, solarizedLight.source, solarizedLight.darkMode),
  new Theme(dracula.name, dracula.source, dracula.darkMode),
]);

