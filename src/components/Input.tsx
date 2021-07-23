import styled from 'styled-components';

const TextArea = styled.textarea`
  font-size: inherit;
  font-family: inherit;
  width: 100%;
  padding: 0.35em 1.2em;
  border: 0.1em solid #000000;
  margin: 0.3em 0;
  border-radius: 0.12em;
`;

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
`;

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  readOnly?: boolean;
};

export const Input = ({ onChange, value, readOnly = false }: Props) => {
  return (
    <StyledContainer>
      <TextArea onChange={onChange} value={value} readOnly={readOnly} />
    </StyledContainer>
  );
};
