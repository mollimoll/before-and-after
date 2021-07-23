import { Input } from './components/Input';
import { extractNamesAndUrls, ImageData } from './utils/parsing';
import { Images } from './components/Images';
import { useState } from 'react';
import styled from 'styled-components';
import { DropZone } from './components/DropZone';
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

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  flex: 1;
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
            <Input value={output} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Images images={images} />
          </Col>
          <Col>
            <DropZone onButtonClick={setOutput} />
          </Col>
        </Row>
      </StyledBody>
    </div>
  );
};

export default App;
