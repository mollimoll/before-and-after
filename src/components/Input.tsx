import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const getArrayOfMarkdownLinks = (textInput: string) =>
  textInput
    .split('!')
    .map((text) => text.trim())
    .filter((text) => text);

const getTextInBrackets = (item: string) =>
  item.slice(item.indexOf('[') + 1, item.lastIndexOf(']'));

const getTextInFinalParentheses = (item: string) =>
  item.slice(item.lastIndexOf('(') + 1, item.lastIndexOf(')'));

const extractNamesAndUrls = (inputText: string): ImageData[] =>
  getArrayOfMarkdownLinks(inputText).map((text) => ({
    imageName: getTextInBrackets(text),
    url: getTextInFinalParentheses(text),
  }));

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

export type ImageData = {
  imageName: string;
  url: string;
};

type Props = {
  onChange: Dispatch<SetStateAction<ImageData[]>>;
};

export const Input = ({ onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const imageData = extractNamesAndUrls(e.target.value);

    onChange(imageData);
  };

  return (
    <StyledContainer>
      <TextArea onChange={handleChange} />
    </StyledContainer>
  );
};
