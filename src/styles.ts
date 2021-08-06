const BASE = 8;

export const device = {
  forPhoneOnly: '(max-width: 599px)',
  forTabletPortraitUp: '(min-width: 600px)',
  forTabletLandscapeUp: '(min-width: 900px)',
  forDesktopUp: '(min-width: 1200px)',
  forBigDesktopUp: '(min-width: 1800px)',
};

export const margin = {
  phone: `${BASE}px`,
  tablet: `${BASE * 2}px`,
  desktop: `${BASE * 3}px`,
  phoneHalf: `${BASE / 2}px`,
  tabletHalf: `${(BASE / 2) * 2}px`,
  desktopHalf: `${(BASE / 2) * 3}px`,
  phoneQuarter: `${BASE / 4}px`,
  tabletQuarter: `${(BASE / 4) * 2}px`,
  desktopQuarter: `${(BASE / 4) * 3}px`,
};
