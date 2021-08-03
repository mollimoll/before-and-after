import { useState } from "react";
import styled from "styled-components";
import { DropZone } from "./components/DropZone";
import { Col, Row, ColSpacer } from "./components/Grid";
import { HowTo } from "./components/HowTo";
import { Input } from "./components/Input";
import { device, margin } from "./styles";
import { extractNamesAndUrls, ImageData } from "./utils/parsing";

const BodyContainer = styled.div`
  display: block;
  margin: ${margin.phone};
  text-align: center;

  @media ${device.forTabletPortraitUp} {
    margin: ${margin.tablet};
  }

  @media ${device.forDesktopUp} {
    margin: ${margin.desktop};
  }
`;

const App = () => {
  const [images, setImages] = useState([] as ImageData[]);
  const [output, setOutput] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImages(extractNamesAndUrls(e.target.value));
  };

  return (
    <div className="App">
      <BodyContainer>
        <Row>
          <Col>
            <Input
              placeholder="Paste Github image links here"
              onChange={handleInput}
            />
          </Col>
          <ColSpacer />
          <Col>
            <Input
              placeholder="Markdown output appears here"
              value={output}
              readOnly
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DropZone images={images} onButtonClick={setOutput} />
          </Col>
        </Row>
        <Row>
          <HowTo />
        </Row>
      </BodyContainer>
    </div>
  );
};

export default App;
