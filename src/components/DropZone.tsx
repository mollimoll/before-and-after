import { Dispatch, SetStateAction, useReducer } from "react";
import { ADD_AFTER_IMG, ADD_BEFORE_IMG } from "../utils/constants";
import { ImageData } from "../utils/parsing";
import { createMarkdownTable } from "../utils/table";
import { Button } from "./Button";
import { DropTable } from "./DropTable";
import { Col, ColSpacer, Row } from "./Grid";
import { Images } from "./Images";

const dummyCellData = {
  Mobile: { beforeImg: "", afterImg: "" },
  Tablet: { beforeImg: "", afterImg: "" },
  Desktop: { beforeImg: "", afterImg: "" },
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
