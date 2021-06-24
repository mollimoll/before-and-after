import { Dispatch, SetStateAction } from 'react';

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

export const Input = ({ onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const imageData = extractNamesAndUrls(e.target.value);

    console.log(e.target.value);
    console.log(imageData);
    onChange(imageData);
  };

  return <textarea rows={4} cols={50} onChange={handleChange}></textarea>;
};
