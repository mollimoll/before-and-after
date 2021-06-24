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

export type ImageData = {
  imageName: string;
  url: string;
};

type Props = {
  onChange: Dispatch<SetStateAction<ImageData[]>>;
};

const TextArea = styled.textarea`
  margin: 30px;
`;

export const Input = ({ onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const imageData = extractNamesAndUrls(e.target.value);

    onChange(imageData);
  };

  return <TextArea rows={8} cols={150} onChange={handleChange} />;
};
