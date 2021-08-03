import styled from "styled-components";

const TextArea = styled.textarea`
  font-size: inherit;
  font-family: inherit;
  width: 100%;
  padding: 0.35em 1.2em;
  border: 0.1em solid #000000;
  border-radius: 0.12em;
`;

const StyledContainer = styled.div`
  display: flex;
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
  placeholder = "",
  readOnly = false,
  value,
}: Props) => {
  return (
    <StyledContainer>
      <TextArea
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
      />
    </StyledContainer>
  );
};
