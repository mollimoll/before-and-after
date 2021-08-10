import styled from 'styled-components';
import { ADD_AFTER_IMG, ADD_BEFORE_IMG } from '../utils/constants';
import { ColSpacerMini, Row } from './Grid';

const StyledCell = styled.div`
  font-size: inherit;
  font-family: inherit;

  flex: 1;
  width: 100%;

  align-self: stretch;
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
