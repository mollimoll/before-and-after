import styled from 'styled-components';

const Paragraph = styled.p`
  text-align: left;
`;

export const HowTo = () => (
  <Paragraph>
    How to add images in the tool:
    <ol>
      <li>To begin, open a pull request or edit a markdown file in Github.</li>
      <li>
        In the description of the pull request, drag and drop your images into
        the text area.
        <ul>
          <li>This will generate Markdown links to the images.</li>
          <li>
            Each will look similar to this:
            <ul>
              <li>
                <code>
                  ![googlelogo_color_272x92dp](https://user-images.githubusercontent.com/26528097/127917455-f91173aa-e5f3-4a2f-aa26-b480b4c13b50.png)
                </code>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        Copy this list of images and paste them into the left text box on this
        tool.
      </li>
      <li>
        After the images have appeared on the left, drag and drop them into the
        appropriate spots in the table.
      </li>
      <li>When finished, click the Export Markdown button.</li>
      <li>
        Copy all of the text in the right text box, and paste it into your PR.
      </li>
      <li>
        To confirm the appearance of your table, click the Preview tab on
        Github.
      </li>
    </ol>
  </Paragraph>
);
