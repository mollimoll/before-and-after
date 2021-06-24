import { Input, ImageData } from './components/Input';
import { Images } from './components/Images';
import { useState } from 'react';
import styled from 'styled-components';

const StyledBody = styled.body`
  max-width: 1200px;
  display: block;
  margin: 0 auto;
  text-align: center;
`;

const App = () => {
  const [images, setImages] = useState([] as ImageData[]);

  return (
    <div className="App">
      <StyledBody>
        <Input onChange={setImages} />
        <Images images={images} />
      </StyledBody>
    </div>
  );
};

export default App;
