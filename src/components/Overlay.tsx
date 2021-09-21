import styled from 'styled-components';
import { device, margin } from '../styles';
import { HowTo } from './HowTo';

const StyledOverlay = styled.div`
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  cursor: pointer;
`;

const TextCard = styled.div`
  position: absolute;
  top: 15%;
  left: 15%;
  background-color: white;
  box-sizing: border-box;
  width: 70%;
  padding: ${margin.phoneDouble};
  overflow-y: scroll;
  height: 70%;

  @media ${device.forTabletPortraitUp} {
    padding: ${margin.tabletDouble};
  }

  @media ${device.forDesktopUp} {
    padding: ${margin.desktopDouble};
  }
`;

type Props = {
  closeOverlay: () => void;
};

export const Overlay = ({ closeOverlay }: Props) => (
  <StyledOverlay onClick={closeOverlay}>
    <TextCard onClick={() => {}}>
      <HowTo />
    </TextCard>
  </StyledOverlay>
);
