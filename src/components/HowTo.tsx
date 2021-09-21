import styled from 'styled-components';

import stepOne from '../images/step-1.gif';
import stepTwo from '../images/step-2.gif';
import stepThree from '../images/step-3.gif';
import stepFour from '../images/step-4.gif';

import { margin } from '../styles';

const Paragraph = styled.p`
  max-width: 100%;
  padding: 0;
  margin: 0;
  text-align: left;
  line-height: 1.5;
  padding: 0 0 ${margin.tablet} 0;
`;

const Img = styled.img`
  width: 100%;
  padding: ${margin.tablet} 0;
`;

const Header3 = styled.h3`
  text-align: left;
`;

const Header2 = styled.h1`
  padding: 0 0 ${margin.tabletDouble} 0;
  margin: 0;
`;

export const HowTo = () => (
  <>
    <Header2>How to use the Markdown Table Generator</Header2>
    <Paragraph>
      I designed this tool to make it easier to share before and after
      screenshots easier on GitHub.
    </Paragraph>
    <Paragraph>
      Upload images to GitHub -&gt; Copy image links from GitHub -&gt; Upload
      here -&gt; Arrange images in table -&gt; Export Markdown -&gt; Paste
      Markdown into Github
    </Paragraph>
    <Header3>Step 1: Fetch image markdown</Header3>
    <Paragraph>
      <ol>
        <li>Open a pull request in a GitHub repository.</li>
        <li>Drag and drop your images into the text area.</li>
        <li>Copy the image markdown from the text area.</li>
      </ol>
      <Img src={stepOne} alt="" />
    </Paragraph>
    <Header3>Step 2: Paste the image markdown</Header3>
    <Paragraph>
      <ol>
        <li>
          Paste the image markdown into the textarea of the first page of the
          Markdown Table Generator
        </li>
        <li>Click Create Table &#128073;</li>
      </ol>
      <Img src={stepTwo} alt="" />
    </Paragraph>
    <Header3>Step 3: Arrange the table</Header3>
    <Paragraph>
      <ol>
        <li>Drag and drop images into the before and after cells</li>
        <li>Add additional rows if necessary</li>
        <li>
          Name each row (optional) and click corresponding save button:
          &#128190;
        </li>
        <li>Click Export Markdown &#128073;</li>
      </ol>
      <Img src={stepThree} alt="" />
    </Paragraph>
    <Header3>Step 4: Copy and paste the markdown to GitHub</Header3>
    <Paragraph>
      <ol>
        <li>Copy all text in the textarea of the last page</li>
        <li>Paste the text into a GitHub PR</li>
        <li>Click Preview to see the formatted table</li>
      </ol>
      <Img src={stepFour} alt="" />
    </Paragraph>
    <Header3>Viola!</Header3>
  </>
);
