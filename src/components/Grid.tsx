import styled from 'styled-components';
import { device, margin } from '../styles';

export const Row = styled.div`
  display: flex;
  padding: ${margin.phone} 0;
  align-items: flex-start;
  justify-content: center;

  @media ${device.forTabletPortraitUp} {
    padding: ${margin.tablet} 0;
  }

  @media ${device.forDesktopUp} {
    padding: ${margin.desktop} 0;
  }
`;

export const BottomRow = styled(Row)`
  flex: 1;
`;

export const Col = styled.div`
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;

export const ColSpacer = styled.div`
  flex: 0;
  padding: ${margin.phoneHalf};

  @media ${device.forTabletPortraitUp} {
    padding: ${margin.tabletHalf};
  }

  @media ${device.forDesktopUp} {
    padding: ${margin.desktopHalf};
  }
`;

export const ColSpacerMini = styled.div`
  flex: 0;
  padding: ${margin.phoneQuarter};

  @media ${device.forTabletPortraitUp} {
    padding: ${margin.tabletQuarter};
  }

  @media ${device.forDesktopUp} {
    padding: ${margin.desktopQuarter};
  }
`;
