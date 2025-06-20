<p align="center">
  <img src="Source/icon96.png" alt="Dark Mode Icon" />
</p>

<p align="center">
  <strong>
    Dark Mode for Firefox – A Smart, Intelligent, and Lightweight Add-on
  </strong>
</p>

<p align="center">
  <a href="https://addons.mozilla.org/en-US/firefox/addon/dark-mode-sil/">
    <img 
      alt="Firefox Badge" 
      src="https://img.shields.io/badge/Firefox-%231c1c1c?style=for-the-badge&logo=firefoxbrowser&logoColor=%23ffffff&logoSize=auto"
    />
  </a>
</p>


---

### Overview

**Dark Mode** is a lightweight, intelligent dark theme engine that dynamically adjusts text and background colors based on visual luminance. It ensures high contrast and strong accessibility without relying on hardcoded color overrides.

---

### Features

- **Real-Time Adaptation**
Automatically detects and transforms overly bright or low-contrast elements, including dynamic content as it loads.

- **Non-Invasive Styling**
Applies adjustments only when necessary. Original styles are preserved unless contrast requires an override.

- **Performance-Optimized**
Uses `MutationObserver` with throttled updates to ensure fast, efficient behavior without performance lag.

- **Fully Configurable**
Luminance thresholds and replacement colors can be easily modified through a simple config object.

- **Cross-Browser Compatible**
Works seamlessly on Firefox, Chrome, and other Chromium-based browsers.

---

### Installation (Chrome, Brave, Edge)

1. Download and extract the ZIP file.
2. Open Browser and go to: `chrome://extensions/`
3. Enable **Developer mode** (toggle at the top right).
3. Drag and drop `Source` folder.
5. The extension should now be installed and active.

---

### Why It’s Different

Unlike most dark mode extensions that overwrite entire stylesheets:

- **Design-Aware** ⏤ Adapts to the original layout and aesthetic.
- **Selective Styling** ⏤ Only modifies overly bright elements instead of applying global changes.
- **Accessibility First** ⏤ Ensures readable luminance contrast without over-darkening.
- **Preserves Native Behavior** ⏤ Avoids full CSS rewrites, keeping app behavior intact.
- **Extremely Lightweight** ⏤ No frameworks, libraries, or external dependencies.
- **Plug-and-Play** ⏤ Works out of the box with minimal setup.
- **Customizable** ⏤ Easily tweak logic and style settings to your needs.
- **Smart Engine** ⏤ Uses real luminance calculations rather than pre-set color rules.

---

### Privacy & Footprint

- No data collection
- No external libraries
- No inline `<style>` injections
- No tracking or remote requests
- No extra permissions
- Fully local and DOM-only
- Compact ~11KB source code

---

### Credits

If you use this project or parts of it in your work, please consider:

- **Giving credit** by linking back to this repository.
- **Starring:** If you find this project useful, starring the repository helps a lot and is truly appreciated.
