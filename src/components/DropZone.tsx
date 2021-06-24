import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

type Drag = React.DragEvent<HTMLDivElement>;

export const DropZone = () => {
  const handleDragEnter = (e: Drag) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: Drag) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e: Drag) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: Drag) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Container
      onDrop={(e: Drag) => handleDrop(e)}
      onDragOver={(e: Drag) => handleDragOver(e)}
      onDragEnter={(e: Drag) => handleDragEnter(e)}
      onDragLeave={(e: Drag) => handleDragLeave(e)}
    >
      <p>Hello world</p>
    </Container>
  );
};
