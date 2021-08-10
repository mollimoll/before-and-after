import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { Button } from './components/Button';
import { DropTable } from './components/DropTable';
import { Col, Row, ColSpacer } from './components/Grid';
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
  margin: ${margin.phone};
  text-align: center;

  @media ${device.forTabletPortraitUp} {
    margin: ${margin.tablet};
  }

  @media ${device.forDesktopUp} {
    margin: ${margin.desktop};
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
        {!!(page === 1) ? (
          <>
            <Row>
              <Col>
                <h1>
                  {'Image Markdown'}
                  <ToolTip>
                    <Page1HelpText />
                  </ToolTip>
                </h1>
                <Input
                  placeholder="Paste Github image links here"
                  onChange={handleInput}
                />
              </Col>
              <ColSpacer />
              <Col>
                <Button handleClick={incrementPage}>
                  Create Table &#128073;
                </Button>
              </Col>
            </Row>
            {!!images.length && (
              <Row>
                <Col>
                  <h1>Images</h1>
                  <Images images={images} />
                </Col>
              </Row>
            )}
          </>
        ) : !!(page === 2) ? (
          <>
            <Row>
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
                <h1>
                  {'Markdown for Github'}
                  <ToolTip>
                    <Page1HelpText />
                  </ToolTip>
                </h1>
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
