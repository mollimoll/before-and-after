// const createMarkdownTable = () =>
//   ```
// |Device|Before|After|
// |---|---|---|
// |iPhone|<img src="XXXXXXXXXX" width="250" />|<img src="XXXXXXXXXX" width="250" />|
// |iPad|<img src="XXXXXXXXXX" width="325" />|<img src="XXXXXXXXXX" width="325" />|

// ```;

const HEADER_ROWS = `|Device|Before|After|\n|---|---|---|`;

const getWidth = (device: string) => {
  switch (device) {
    case 'Mobile':
      return 250;
    default:
      return 325;
  }
};

export const createMarkdownTable = (data: {}) => {
  const rowHeaders = Object.keys(data);
  const test = rowHeaders.map((header) => {
    const { beforeImg, afterImg } = data[header];
    const width = getWidth(header);
    return `|${header}|<img src="${beforeImg}" width="${width}" />|<img src="${afterImg}" width="${width}" />|`;
  });
  const output = test.reduce((output, row) => output + `\n` + row, HEADER_ROWS);

  return output;
};
