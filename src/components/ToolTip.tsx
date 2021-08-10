import React, { useState } from 'react';
import styled from 'styled-components';

const TipContainer = styled.div`
  vertical-align: middle;
  font-size: 0.5em;
  position: relative;
  display: inline-block;
`;

const TipText = styled.div`
  background-color: black;
  color: #fff;
  text-align: left;
  padding: 5px 0;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
`;

export const ToolTip = ({ children }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <TipContainer
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {'\u00a0'}
      {'\u00a0'}&#9432;
      {isShown && <TipText>{children}</TipText>}
    </TipContainer>
  );
};
