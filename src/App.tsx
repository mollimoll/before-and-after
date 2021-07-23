import { Input, ImageData } from './components/Input';
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

const DragAndDropContainer = styled.div`
  display: flex;
`;

const DragAndDropCol = styled.div`
  flex: 1;
`;

const App = () => {
  const [images, setImages] = useState([] as ImageData[]);

  return (
    <div className="App">
      <StyledBody>
        <Input onChange={setImages} />
        <DragAndDropContainer>
          <DragAndDropCol>
            <Images images={images} />
          </DragAndDropCol>
          <DragAndDropCol>
            <DropZone />
          </DragAndDropCol>
        </DragAndDropContainer>
      </StyledBody>
    </div>
  );
};

export default App;
