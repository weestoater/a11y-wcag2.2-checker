import React from "react";

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const themes = [
    "cerulean",
    "cosmo",
    "cyborg",
    "darkly",
    "flatly",
    "journal",
    "litera",
    "lumen",
    "lux",
    "materia",
    "minty",
    "morph",
    "pulse",
    "quartz",
    "sandstone",
    "simplex",
    "sketchy",
    "slate",
    "solar",
    "spacelab",
    "superhero",
    "united",
    "vapor",
    "yeti",
    "zephyr",
  ];

  return (
    <select
      className="form-select form-select-sm theme-selector"
      value={currentTheme}
      onChange={(e) => onThemeChange(e.target.value)}
      aria-label="Select theme"
    >
      {themes.map((theme) => (
        <option key={theme} value={theme}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelector;
