const DarkModeConfig = {
  TextLuminanceThreshold: 30,       
  GrayLuminanceThreshold: 65,      
  BackgroundLuminanceThreshold: 85,
  DarkTextColor: "#ffffff",
  GrayTextColor: "#aaaaaa",
  DarkBackgroundColor: "#1c1c1c",
  StyleProperties: ["color", "background-color", "background"]
};

const ElementStyleSnapshots = new WeakMap();
const ElementsPendingUpdate = new Set();
const ElementsRegistered = new WeakSet();

function GetRGBArrayFromColorString(ColorString) {
  if (!ColorString) return null;
  if (ColorString.startsWith("#")) {
    let Hex = ColorString.slice(1);
    if (Hex.length === 3) Hex = Hex.split("").map(Char => Char + Char).join("");
    if (Hex.length !== 6) return null;
    const Int = parseInt(Hex, 16);
    return [(Int >> 16) & 255, (Int >> 8) & 255, Int & 255];
  }
  const Match = ColorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  return Match ? [parseInt(Match[1]), parseInt(Match[2]), parseInt(Match[3])] : null;
}

function GetLuminancePercentageFromRGB([Red, Green, Blue]) {
  return (0.2126 * Red + 0.7152 * Green + 0.0722 * Blue) / 255 * 100;
}

function GetStyleSnapshotFromComputedStyle(ComputedStyle) {
  return DarkModeConfig.StyleProperties.map(Property => ComputedStyle.getPropertyValue(Property).trim()).join("|");
}

function ApplyDarkModeToElement(Element) {
  if (!Element || (Element !== document.body && !Element.offsetParent)) return;

  const ComputedStyle = getComputedStyle(Element);
  const CurrentSnapshot = GetStyleSnapshotFromComputedStyle(ComputedStyle);
  if (ElementStyleSnapshots.get(Element) === CurrentSnapshot) return;
  ElementStyleSnapshots.set(Element, CurrentSnapshot);

  for (const StyleProperty of DarkModeConfig.StyleProperties) {
    let PropertyValue = ComputedStyle.getPropertyValue(StyleProperty).trim();
    if (!PropertyValue || PropertyValue === "transparent" || PropertyValue === "inherit" || PropertyValue === "initial" || PropertyValue === "rgba(0, 0, 0, 0)") continue;
    if (StyleProperty === "background" && !PropertyValue.includes("rgb") && !PropertyValue.includes("#")) {
      PropertyValue = ComputedStyle.getPropertyValue("background-color").trim();
    }

    const RGBArray = GetRGBArrayFromColorString(PropertyValue);
    if (!RGBArray) continue;

    const Luminance = GetLuminancePercentageFromRGB(RGBArray);

    if (StyleProperty === "color") {
      if (Luminance >= DarkModeConfig.TextLuminanceThreshold && Luminance <= DarkModeConfig.GrayLuminanceThreshold) {
        Element.style.setProperty("color", DarkModeConfig.GrayTextColor, "important");
      } else if (Luminance < DarkModeConfig.TextLuminanceThreshold) {
        Element.style.setProperty("color", DarkModeConfig.DarkTextColor, "important");
      }
    }

    if ((StyleProperty === "background" || StyleProperty === "background-color") && Luminance > DarkModeConfig.BackgroundLuminanceThreshold) {
      Element.style.setProperty("background-color", DarkModeConfig.DarkBackgroundColor, "important");
    }
  }

  if (Element === document.body) {
    const bg = getComputedStyle(Element).getPropertyValue("background-color").trim();
    const rgb = GetRGBArrayFromColorString(bg);
    const lum = rgb ? GetLuminancePercentageFromRGB(rgb) : null;
    if (rgb && lum > DarkModeConfig.BackgroundLuminanceThreshold) {
      Element.style.setProperty("background-color", DarkModeConfig.DarkBackgroundColor, "important");
    }
  }
}

function RegisterElementForTracking(Element) {
  if (!Element || ElementsRegistered.has(Element)) return;
  ElementsRegistered.add(Element);
  ElementsPendingUpdate.add(Element);
}

function TrackDOMTree(RootElement) {
  if (RootElement.nodeType !== 1) return;
  RegisterElementForTracking(RootElement);
  const DOMWalker = document.createTreeWalker(RootElement, NodeFilter.SHOW_ELEMENT);
  let Node;
  while ((Node = DOMWalker.nextNode())) RegisterElementForTracking(Node);
}

function StartDarkModeUpdateLoop() {
  let FrameCounter = 0;
  (function UpdateLoop() {
    if (++FrameCounter % 3 === 0) ElementsPendingUpdate.forEach(ApplyDarkModeToElement);
    requestAnimationFrame(UpdateLoop);
  })();
}

function MonitorDOMMutations() {
  new MutationObserver(Records => {
    for (const Record of Records) {
      for (const AddedNode of Record.addedNodes) TrackDOMTree(AddedNode);
    }
  }).observe(document.body, { childList: true, subtree: true });
}

function InitializeDarkMode() {
  TrackDOMTree(document.body);
  MonitorDOMMutations();
  StartDarkModeUpdateLoop();
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", InitializeDarkMode)
  : InitializeDarkMode();
