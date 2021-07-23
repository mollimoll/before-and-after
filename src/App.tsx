import { useState } from 'react';
import styled from 'styled-components';
import { DropZone } from './components/DropZone';
import { Col, Row } from './components/Grid';
import { Input } from './components/Input';
import { extractNamesAndUrls, ImageData } from './utils/parsing';
// import './skeleton.css';
// import './normalize.css';

const StyledBody = styled.div`
  max-width: 80%;
  display: block;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const App = () => {
  const [images, setImages] = useState([] as ImageData[]);
  const [output, setOutput] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImages(extractNamesAndUrls(e.target.value));
  };

  return (
    <div className="App">
      <StyledBody>
        <Row>
          <Col>
            <Input onChange={handleInput} />
          </Col>
          <Col>
            <Input value={output} readOnly />
          </Col>
        </Row>
        <Row>
          <Col>
            <DropZone images={images} onButtonClick={setOutput} />
          </Col>
        </Row>
      </StyledBody>
    </div>
  );
};

export default App;
