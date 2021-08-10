import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { Button } from './components/Button';
import { DropTable } from './components/DropTable';
import { Col, Row, ColSpacer, BottomRow } from './components/Grid';
import { Images } from './components/Images';
import { Input } from './components/Input';
import { device, margin } from './styles';
import { ADD_AFTER_IMG, ADD_BEFORE_IMG } from './utils/constants';
import { extractNamesAndUrls, ImageData } from './utils/parsing';
import { createMarkdownTable } from './utils/table';
import { Page1HelpText } from './components/HowTo';
import { ToolTip } from './components/ToolTip';

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

const App = () => {
  const [data, dispatch] = useReducer(reducer, dummyCellData);
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
        {!!(page === 1) ? (
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
                <Row>
                  <Input
                    placeholder="Paste Github image links here"
                    onChange={handleInput}
                  />
                </Row>
                {!!images.length && (
                  <Row>
                    <h1>Images</h1>
                    <Images images={images} />
                  </Row>
                )}
              </Col>
            </Row>
          </>
        ) : !!(page === 2) ? (
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
        ) : !!(page === 3) ? (
          <>
            <Row>
              <Col>
                <Button handleClick={decrementPage}>
                  &#128072; Edit Table
                </Button>
              </Col>
              <ColSpacer />
              <Col>
                <Button handleClick={() => setPage(1)}>
                  Start Over &#128073;
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  placeholder="Markdown output appears here"
                  value={output}
                  readOnly
                />
              </Col>
            </Row>
          </>
        ) : null}
      </BodyContainer>
    </div>
  );
};

export default App;
