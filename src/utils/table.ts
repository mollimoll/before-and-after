import { CellData } from '../App';

const HEADER_ROWS = `||Before|After|\n|---|---|---|`;

const getWidth = (device: string) => {
  switch (device) {
    case 'Mobile':
      return 250;
    default:
      return 325;
  }
};

export const createMarkdownTable = (data: CellData = { rows: [] }) => {
  const rowMarkdown = data.rows.map((row) => {
    const { beforeImg, afterImg } = row;
    const width = getWidth('Mobile');
    return `|${row.title}|<img src="${beforeImg}" width="${width}" />|<img src="${afterImg}" width="${width}" />|`;
  });

  const output = rowMarkdown.reduce(
    (output, row) => output + `\n` + row,
    HEADER_ROWS
  );

  return output;
};
