import { ImageData } from '../utils/parsing';
import styled from 'styled-components';

type Props = {
  images: ImageData[];
};

const ImagesContainer = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledImg = styled.img`
  margin: 16px;
  max-height: 30vh;
  vertical-align: bottom;
`;

export const Images = ({ images }: Props) => {
  return (
    <ImagesContainer>
      {images.map(({ imageName, url }) => (
        <StyledImg key={url} alt={imageName} src={url} id={url} />
      ))}
    </ImagesContainer>
  );
};
