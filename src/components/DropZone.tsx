import { useReducer } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const ADD_BEFORE_IMG = 'ADD_BEFORE_IMG';
const ADD_AFTER_IMG = 'ADD_AFTER_IMG';

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledCell = styled.div`
  width: 32%;
  padding-bottom: 18%;
  margin-bottom: 2%;
  background-color: aliceblue;
`;

const StyledImg = styled.img`
  margin: 16px;
  max-height: 30vh;
  vertical-align: bottom;
`;

type CellProps = {
  name: string;
  action?: string;
  dispatch?: React.Dispatch<any>;
  children: JSX.Element[] | JSX.Element;
};

type Drag = React.DragEvent<HTMLDivElement>;

const Cell = ({ name, action, dispatch, children }: CellProps) => {
  const defaultDrag = (e: Drag) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: Drag) => {
    e.preventDefault();
    dispatch &&
      dispatch({
        type: action,
        name,
        imgSrc: e.dataTransfer.getData('text/uri-list'),
      });
    e.stopPropagation();
  };

  return (
    <StyledCell
      onDrop={(e: Drag) => handleDrop(e)}
      onDragOver={(e: Drag) => defaultDrag(e)}
      onDragEnter={(e: Drag) => defaultDrag(e)}
      onDragLeave={(e: Drag) => defaultDrag(e)}
    >
      {children}
    </StyledCell>
  );
};

const dummyCellData = {
  Mobile: { beforeImg: '', afterImg: '' },
  Tablet: { beforeImg: '', afterImg: '' },
  Desktop: { beforeImg: '', afterImg: '' },
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_BEFORE_IMG:
      return {
        ...state,
        [action.name]: { ...state[action.name], beforeImg: action.imgSrc },
      };
    case ADD_AFTER_IMG:
      return {
        ...state,
        [action.name]: { ...state[action.name], afterImg: action.imgSrc },
      };
    default:
      return state;
  }
};

export const DropZone = () => {
  const [data, dispatch] = useReducer(reducer, dummyCellData);
  console.log(data);

  const headerRow = ['Device', 'Before', 'After'];
  return (
    <>
      <Button handleClick={() => console.log(data)}>Export Markdown</Button>
      <Container>
        {headerRow.map((name) => (
          <Cell name={name}>
            <strong>{name}</strong>
          </Cell>
        ))}
        {Object.keys(data).map((key) => {
          const { beforeImg, afterImg } = data[key];
          return (
            <>
              <Cell name={key}>
                <p>{key}</p>
              </Cell>
              <Cell name={key} dispatch={dispatch} action={ADD_BEFORE_IMG}>
                <StyledImg key={beforeImg} src={beforeImg} id={beforeImg} />
              </Cell>
              <Cell name={key} dispatch={dispatch} action={ADD_AFTER_IMG}>
                <StyledImg key={afterImg} src={afterImg} id={afterImg} />
              </Cell>
            </>
          );
        })}
      </Container>
    </>
  );
};
