import { useState } from 'react';
import styled from 'styled-components';
import { CellData } from '../App';
import {
  ADD_AFTER_IMG,
  ADD_BEFORE_IMG,
  EDIT,
  EDIT_ENDED,
} from '../utils/constants';
import { ColSpacerMini, Row } from './Grid';

const StyledCell = styled.div`
  font-size: inherit;
  font-family: inherit;

  flex: 1;
  width: 100%;

  align-self: stretch;
`;

const StyledTitle = styled.div`
  font-size: inherit;
  font-family: inherit;

  flex-direction: row-reverse;
  flex: 1;
  width: 100%;

  align-content: space-between;
`;

const StyledImg = styled.img`
  box-sizing: border-box;
  max-width: 100%;
  vertical-align: bottom;
`;

type CellProps = {
  id: string;
  action?: string;
  dispatch?: React.Dispatch<any>;
  children: JSX.Element[] | JSX.Element;
};

type Drag = React.DragEvent<HTMLDivElement>;

const Cell = ({ id, action, dispatch, children }: CellProps) => {
  const defaultDrag = (e: Drag) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: Drag) => {
    e.preventDefault();
    dispatch &&
      dispatch({
        type: action,
        id,
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

type RowTitleProps = {
  id: string;
  dispatch: React.Dispatch<any>;
  editing: boolean;
  title: string;
};

const RowTitle = ({ id, dispatch, editing, title }: RowTitleProps) => {
  const [value, setValue] = useState(title);
  const startEdit = () => dispatch({ type: EDIT, id });
  const finishEdit = () => dispatch({ type: EDIT_ENDED, id, title: value });

  return (
    <StyledTitle>
      {editing ? (
        <h3>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <span onClick={finishEdit}>&nbsp;&#128190;</span>
        </h3>
      ) : (
        <h3>
          {title} <span onClick={startEdit}>&#9999;</span>
        </h3>
      )}
    </StyledTitle>
  );
};

type DropTableProps = {
  data: CellData;
  dispatch: React.Dispatch<any>;
};

export const DropTable = ({ data, dispatch }: DropTableProps) => {
  const headerRow = ['', 'Before', 'After'];

  return (
    <>
      <Row>
        {headerRow.map((name, i) => (
          <>
            {i !== 0 && <ColSpacerMini />}
            <Cell id={name}>
              <strong>{name}</strong>
            </Cell>
          </>
        ))}
      </Row>
      {data.rows.map(({ id, title, beforeImg, afterImg, editing }) => {
        return (
          <Row key={id}>
            <RowTitle
              id={id}
              dispatch={dispatch}
              editing={editing}
              title={title}
            />
            <ColSpacerMini />
            <Cell id={id} dispatch={dispatch} action={ADD_BEFORE_IMG}>
              <StyledImg key={beforeImg} src={beforeImg} id={beforeImg} />
            </Cell>
            <ColSpacerMini />
            <Cell id={id} dispatch={dispatch} action={ADD_AFTER_IMG}>
              <StyledImg key={afterImg} src={afterImg} id={afterImg} />
            </Cell>
          </Row>
        );
      })}
    </>
  );
};
