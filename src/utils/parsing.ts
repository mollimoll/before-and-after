export type ImageData = {
  imageName: string;
  url: string;
};

const getArrayOfMarkdownLinks = (textInput: string) =>
  textInput
    .split('!')
    .map((text) => text.trim())
    .filter((text) => text);

const getTextInBrackets = (item: string) =>
  item.slice(item.indexOf('[') + 1, item.lastIndexOf(']'));

const getTextInFinalParentheses = (item: string) =>
  item.slice(item.lastIndexOf('(') + 1, item.lastIndexOf(')'));

export const extractNamesAndUrls = (inputText: string): ImageData[] =>
  getArrayOfMarkdownLinks(inputText).map((text) => ({
    imageName: getTextInBrackets(text),
    url: getTextInFinalParentheses(text),
  }));
