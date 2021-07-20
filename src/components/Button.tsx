import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.1em solid #000000;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-align: center;
  transition: all 0.2s;
  width: 100%;
  font-size: inherit;
  font-family: inherit;

  :hover {
    color: #000000;
    background-color: #ffffff;
  }
`;

export const Button = ({ children, handleClick }) => (
  <StyledButton onClick={handleClick}>{children}</StyledButton>
);
