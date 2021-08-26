import React, { useReducer, useState } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { Button } from './components/Button';
import { DropTable } from './components/DropTable';
import { Col, Row, ColSpacer, BottomRow } from './components/Grid';
import { Images } from './components/Images';
import { Input, ReadOnlyInput } from './components/Input';
import { device, margin } from './styles';
import {
  ADD_AFTER_IMG,
  ADD_BEFORE_IMG,
  ADD_ROW,
  DELETE_ROW,
  EDIT,
  EDIT_ENDED,
  RESET,
} from './utils/constants';
import { extractNamesAndUrls, ImageData } from './utils/parsing';
import { createMarkdownTable } from './utils/table';

const BodyContainer = styled.div`
  display: block;
  margin: ${margin.phoneDouble};
  text-align: center;

  @media ${device.forTabletPortraitUp} {
    margin: ${margin.tabletDouble};
  }

  @media ${device.forDesktopUp} {
    margin: ${margin.desktopDouble};
  }
`;

const initialCellData: CellData = {
  rows: [{ id: '1', title: '', beforeImg: '', afterImg: '', editing: true }],
};

const reducer = (state: CellData, action) => {
  const index = state.rows.findIndex((row) => action.id === row.id);
  switch (action.type) {
    case ADD_ROW:
      return {
        ...state,
        rows: [
          ...state.rows,
          {
            id: nanoid(),
            title: '',
            beforeImg: '',
            afterImg: '',
            editing: true,
          },
        ],
      };
    case DELETE_ROW:
      return {
        ...state,
        rows: state.rows.filter((row) => row.id !== action.id),
      };
    case EDIT:
      state.rows[index] = {
        ...state.rows[index],
        editing: true,
      };
      return { ...state };
    case EDIT_ENDED:
      state.rows[index] = {
        ...state.rows[index],
        title: action.title,
        editing: false,
      };
      return { ...state };
    case ADD_BEFORE_IMG:
      state.rows[index] = { ...state.rows[index], beforeImg: action.imgSrc };
      return { ...state };
    case ADD_AFTER_IMG:
      state.rows[index] = {
        ...state.rows[index],
        afterImg: action.imgSrc,
      };
      return { ...state };
    case RESET:
      return initialCellData;
    default:
      return state;
  }
};

export type CellData = {
  rows: RowData[];
};

type RowData = {
  id: string;
  title: string;
  beforeImg: string;
  afterImg: string;
  editing: boolean;
};

const App = () => {
  const [data, dispatch] = useReducer(reducer, initialCellData);
  const [images, setImages] = useState([] as ImageData[]);
  const [output, setOutput] = useState('');
  const [page, setPage] = useState(1);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImages(extractNamesAndUrls(e.target.value));
  };

  const incrementPage = () => setPage(page + 1);
  const decrementPage = () => setPage(page - 1);

  return (
    <div className="App">
      <BodyContainer>
        <Row>
          <Col>
            <h1>Markdown Table Generator</h1>
          </Col>
        </Row>
        {page === 1 ? (
          <>
            <Row>
              <Col></Col>
              <ColSpacer />
              <Col>
                <Button handleClick={incrementPage}>
                  Create Table &#128073;
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  placeholder="Paste Github image links here"
                  onChange={handleInput}
                />
                {!!images.length && (
                  <>
                    <h1>Images</h1>
                    <Images images={images} />
                  </>
                )}
              </Col>
            </Row>
          </>
        ) : page === 2 ? (
          <>
            <Row height={'30px'}>
              <Col>
                <Button handleClick={decrementPage}>
                  &#128072; Edit Upload
                </Button>
              </Col>
              <ColSpacer />
              <Col>
                <Button
                  handleClick={() => {
                    incrementPage();
                    setOutput(createMarkdownTable(data));
                  }}
                >
                  Export Markdown &#128073;
                </Button>
              </Col>
            </Row>
            <BottomRow>
              <Col>
                <Images images={images} />
              </Col>
              <ColSpacer />
              <Col>
                <DropTable data={data} dispatch={dispatch} />
              </Col>
            </BottomRow>
          </>
        ) : page === 3 ? (
          <>
            <Row>
              <Col>
                <Button handleClick={decrementPage}>
                  &#128072; Edit Table
                </Button>
              </Col>
              <ColSpacer />
              <Col>
                <Button
                  handleClick={() => {
                    dispatch({ type: RESET });
                    setPage(1);
                  }}
                >
                  Start Over &#128073;
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <ReadOnlyInput value={output} />
              </Col>
            </Row>
          </>
        ) : null}
      </BodyContainer>
    </div>
  );
};

export default App;
