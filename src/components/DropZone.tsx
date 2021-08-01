import { Dispatch, SetStateAction, useReducer } from 'react';
import styled from 'styled-components';
import { ImageData } from '../utils/parsing';
import { createMarkdownTable } from '../utils/table';
import { Button } from './Button';
import { Col, Row, ColSpacer, ColSpacerMini } from './Grid';
import { Images } from './Images';

const ADD_BEFORE_IMG = 'ADD_BEFORE_IMG';
const ADD_AFTER_IMG = 'ADD_AFTER_IMG';

const StyledCell = styled.div`
  font-size: inherit;
  font-family: inherit;

  flex: 1;
  width: 100%;

  border: 0.1em solid #000000;
  border-radius: 0.12em;
`;

const StyledImg = styled.img`
  box-sizing: border-box;
  max-width: 100%;
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

type Props = {
  onButtonClick: Dispatch<SetStateAction<string>>;
  images: ImageData[];
};

export const DropZone = ({ onButtonClick, images }: Props) => {
  const [data, dispatch] = useReducer(reducer, dummyCellData);

  return (
    <>
      <Row>
        <Col>
          <Button handleClick={() => onButtonClick(createMarkdownTable(data))}>
            Export Markdown
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Images images={images} />
        </Col>
        <ColSpacer />
        <Col>
          <DropTable data={data} dispatch={dispatch} />
        </Col>
      </Row>
    </>
  );
};

export const DropTable = ({ data, dispatch }) => {
  const headerRow = ['Device', 'Before', 'After'];

  return (
    <>
      <Row>
        {headerRow.map((name, i) => (
          <>
            {i !== 0 && <ColSpacerMini />}
            <Cell name={name}>
              <strong>{name}</strong>
            </Cell>
          </>
        ))}
      </Row>
      {Object.keys(data).map((key) => {
        const { beforeImg, afterImg } = data[key];
        return (
          <Row key={key}>
            <Cell name={key}>
              <p>{key}</p>
            </Cell>
            <ColSpacerMini />
            <Cell name={key} dispatch={dispatch} action={ADD_BEFORE_IMG}>
              <StyledImg key={beforeImg} src={beforeImg} id={beforeImg} />
            </Cell>
            <ColSpacerMini />
            <Cell name={key} dispatch={dispatch} action={ADD_AFTER_IMG}>
              <StyledImg key={afterImg} src={afterImg} id={afterImg} />
            </Cell>
          </Row>
        );
      })}
    </>
  );
};
