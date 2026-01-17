(function () {
  try {
    const allowedPalettes = ['everforest', 'nord', 'catppuccin', 'rose-pine', 'zenburn', 'gruvbox', 'tokyo-night'];
    const allowedModes = ['light', 'dark'];

    // Handle palette
    const savedPalette = localStorage.getItem('palette');
    const palette = allowedPalettes.includes(savedPalette) ? savedPalette : 'everforest';

    // Handle mode
    const savedMode = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const mode = allowedModes.includes(savedMode) ? savedMode : (systemDark ? 'dark' : 'light');

    // Apply to DOM
    document.documentElement.setAttribute('data-palette', palette);
    document.documentElement.setAttribute('data-theme', mode);

  } catch (e) {
    document.documentElement.setAttribute('data-palette', 'everforest');
    document.documentElement.setAttribute('data-theme', 'light')
  }
})();
