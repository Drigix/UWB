export class Themes {
  public static primaryTheme: Map<string, string> = new Map([
    ['--uwb-primary', '#f18f13'], // Orange (Pomarańcz)
    ['--uwb-secondary', '#f39c42'], // Second-orange (Pomarańcz drugi)
    ['--uwb-primary-second-lighter', '#f6b571'], // Second-orange lighter (Pomarańcz drugi jaśniejszy)
    ['--uwb-background', '#f2efef'], // Light Gray (Jasnoszary)
    ['--uwb-tab-background', '#e5e3e3'], // Gray (Szary)
    ['--uwb-tab-content-background', '#fdfdfd'], // White (Biały)
    ['--uwb-tab-frame', '#f2efef'], // Light Gray (Jasnoszary)
    ['--uwb-internal-tab-font-color', '#232222'], // Dark Gray (Ciemnoszary)
    ['--uwb-internal-tab-header-background', '#f2f2f2'], // Light Gray (Jasnoszary)
    ['--uwb-front-tab-background', '#f2efef'], // Light Gray (Jasnoszary)
    ['--uwb-front-tab-text-color', '#232222'], // Dark Gray (Ciemnoszary)
    ['--uwb-button-text-color', '#ffffff'], // White (Biały)
    ['--uwb-label-color', '#ffffff'], // White (Biały)
    ['--uwb-button-hover-background-color', '#ffffff'], // White (Biały)
    ['--uwb-table-header-background-color', '#f4f4f4'], // Light Gray (Jasnoszary)
    ['--uwb-table-header-color', '#db7b02'], // Orange darker (Ciemny pomarańcz)
    ['--uwb-selected-row-light-text', '#ffffff'], // White (Biały)
    ['--uwb-selected-row-light-bg', '#ffbc68'], // Cyan (Cyjan)
    ['--uwb-button-hover-text-color', '#f1ae13'], // Orange (Pomarańcz)
    ['--uwb-table-row-even-highlight-background', '#54a7b4'], // Cyan (Cyjan)
    ['--uwb-table-row-even-highlight-text', '#232222'], // Dark Gray (Ciemnoszary)
    ['--uwb-table-row-even-selected-background', '#f7d0b2'], // Orange light (Jasny pomarańcz)
    ['--uwb-menu-scrollbar-track', '#ffb559'], // Orange-scroll (Pomarańcz skrolla)
    ['--uwb-menu-scrollbar-thumb', '#ffb559'], // Orange-scroll (Pomarańcz skrolla)
    ['--uwb-menu-scrollbar-thumb-hover', '#d49c55'], // Orange-scroll darker (Pomarańcz skrolla ciemniejszy)
    ['--uwb-button-background', '#f1ae13'], // Orange (Pomarańcz)
    ['--uwb-button-border', '#f1ae13'], // Orange (Pomarańcz)
    ['--uwb-primary-light', '#00a3a922'], // Light Green (Jasnozielony)
    ['--uwb-table-color-true', '#85CB85'], // Light Green (Jasnozielony)
    ['--uwb-table-color-false', '#FF6B6B'], // Light Red (Jasnoczerwony)
    ['--uwb-checkbox-marked', '#f18f13'], // Blue (Niebieski)
    ['--uwb-default-row', '#DFEEF5'], // Light Blue (Jasnoniebieski)
  ]);

  public static darkTheme: Map<string, string> = new Map([
    ['--uwb-selected-row-light-text', '#ffffff'], // White (Biały)
    ['--uwb-selected-row-light-bg', '#fa8e05'], // Dark Green (Ciemnozielony)
    ['--uwb-primary', '#181818'], // Black (Czarny)
    ['--uwb-secondary', '#f39c42'], // Dark Green (Ciemnozielony)
    ['--uwb-primary-second-lighter', '#9f9b9d'], // Light Gray (Jasnoszary)
    ['--uwb-internal-tab-font-color', '#FFFFFF'], // White (Biały)
    ['--uwb-internal-tab-header-background', '#202020'], // Dark Gray (Ciemnoszary)
    ['--uwb-front-tab-background', '#303030'], // Dark Gray (Ciemnoszary)
    ['--uwb-front-tab-text-color', '#ffffff'], // White (Biały)
    ['--uwb-background', '#403e3e'], // Dark Gray (Ciemnoszary)
    ['--uwb-tab-background', '#181818'], // Black (Czarny)
    ['--uwb-tab-frame', '#403e3e'], // Dark Gray (Ciemnoszary)
    // ['--uwb-button-text-color', '#ffffff'], // White (Biały)
    // ['--uwb-button-hover-text-color', '#1AAA54'], // Dark Green (Ciemnozielony)
    ['--uwb-label-color', '#FFFFFF'], // White (Biały)
    ['--uwb-table-header-color', '#181818'], // Black (Czarny)
    ['--uwb-table-row-even-highlight-background', '#1AAA54'], // Dark Green (Ciemnozielony)
    ['--uwb-table-row-even-highlight-text', '#303030'], // Dark Gray (Ciemnoszary)
    ['--uwb-table-row-even-selected-background', '#f18f13'], // Dark Green (Ciemnozielony)
    ['--uwb-tab-content-background', '#303030'], // Dark Gray (Ciemnoszary)
    // ['--uwb-button-background', '#1AAA54'], // Dark Green (Ciemnozielony)
    // ['--uwb-button-border', '#1AAA54'], // Dark Green (Ciemnozielony)
    // ['--uwb-button-hover-background-color', '#0ad75d'], // Green (Zielony)
    // ['--uwb-primary-light', '#1AAA54'], // Dark Green (Ciemnozielony)
    ['--uwb-menu-scrollbar-track', '#54a7b4'], // Cyan (Cyjan)
    ['--uwb-menu-scrollbar-thumb', '#181818'], // Black (Czarny)
    ['--uwb-menu-scrollbar-thumb-hover', '#ffffff'], // White (Biały)
    // ['--uwb-table-color-true', '#07933f'], // Dark Green (Ciemnozielony)
    // ['--uwb-table-color-false', '#660000'], // Dark Red (Ciemnoczerwony)
    // ['--uwb-checkbox-marked', '#262626'], // Dark Gray (Ciemnoszary)
    // ['--uwb-default-row', '#1E301E'], // Dark Green (Ciemnozielony)
  ]);

  public static smallFont: Map<string, string> = new Map([
      // ['--uwb-font-size', 12px],
      // ['--uwb-font-size-larger', 14px],
      ['--uwb-font-size-table', '10px']
  ]);

  public static mediumFont: Map<string, string> = new Map([
      // ['--uwb-font-size', '14px'],
      // ['--uwb-font-size-larger', '16px'],
      ['--uwb-font-size-table', '12px']
  ]);

  public static largeFont: Map<string, string> = new Map([
      // ['--uwb-font-size', '16px'],
      // ['--uwb-font-size-larger', '18px'],
      ['--uwb-font-size-table', '14px']
  ]);

  public static themes: Map<string, Map<string, string>> = new Map([
      ['primaryTheme', Themes.primaryTheme],
      ['darkTheme', Themes.darkTheme],
  ]);

  public static fontSizes: Map<string, Map<string, string>> = new Map([
      ['small', Themes.smallFont],
      ['medium', Themes.mediumFont],
      ['large', Themes.largeFont]
  ]);
}
