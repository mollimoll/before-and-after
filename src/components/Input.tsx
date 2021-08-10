import styled from 'styled-components';

const TextArea = styled.textarea`
  font-size: inherit;
  font-family: inherit;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  border: 0.1em solid #000000;
  border-radius: 0.12em;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
};

export const Input = ({
  onChange,
  placeholder = '',
  readOnly = false,
  value,
}: Props) => {
  return (
    <StyledContainer>
      <TextArea
        rows={10}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
      />
    </StyledContainer>
  );
};
