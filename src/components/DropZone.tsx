import { useReducer } from 'react';
import styled from 'styled-components';

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

type CellProps = {
  name: string;
  action?: string;
  dispatch?: React.Dispatch<any>;
  before?: boolean;
  after?: boolean;
  children: JSX.Element[] | JSX.Element;
};

const Cell = ({
  name,
  action,
  dispatch,
  before,
  after,
  children,
}: CellProps) => {
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
    console.log(e.dataTransfer.getData('text/uri-list'));
    dispatch &&
      dispatch({
        type: action,
        name,
        imgSrc: e.dataTransfer.getData('text/uri-list'),
      });
    console.log('dropped', name, 'before? ', before, 'after? ', after);
    e.stopPropagation();
  };

  return (
    <StyledCell
      onDrop={(e: Drag) => handleDrop(e)}
      onDragOver={(e: Drag) => handleDragOver(e)}
      onDragEnter={(e: Drag) => handleDragEnter(e)}
      onDragLeave={(e: Drag) => handleDragLeave(e)}
    >
      {children}
    </StyledCell>
  );
};

type Drag = React.DragEvent<HTMLDivElement>;

const dummyCellData = {
  Mobile: { beforeImg: '', afterImg: '' },
  Tablet: { beforeImg: '', afterImg: '' },
  Desktop: { beforeImg: '', afterImg: '' },
};

const ADD_BEFORE_IMG = 'ADD_BEFORE_IMG';
const ADD_AFTER_IMG = 'ADD_AFTER_IMG';

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

const StyledImg = styled.img`
  margin: 16px;
  max-height: 30vh;
  vertical-align: bottom;
`;

export const DropZone = () => {
  const [data, dispatch] = useReducer(reducer, dummyCellData);

  const headerRow = ['Device', 'Before', 'After'];
  return (
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
            <Cell name={key} dispatch={dispatch} action={ADD_BEFORE_IMG} before>
              <StyledImg key={beforeImg} src={beforeImg} id={beforeImg} />
            </Cell>
            <Cell name={key} dispatch={dispatch} action={ADD_AFTER_IMG} after>
              <StyledImg key={afterImg} src={afterImg} id={afterImg} />
            </Cell>
          </>
        );
      })}
    </Container>
  );
};
