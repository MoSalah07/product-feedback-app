import React, { useState, useRef } from "react";
import styles from "./RoadMapContentMobile.module.css";
import Button from "../../buttons/links/Button";


function RoadMapContentMobile({ data }) {
  // [1] => This States for Stored Data From Db
  const [planned, setPlanned] = useState(() =>
    data.filter((el) => el.status === "planned")
  );
  const [inProg, setInProg] = useState(() =>
    data.filter((el) => el.status === "in-progress")
  );
  const [live, setLive] = useState(() =>
    data.filter((el) => el.status === "live")
  );

  // [2] => This States for Nav-Content-Road-Map
  const [statusProducts, setStatusProducts] = useState([
    {
      name: "Planned",
      description: "Ideas prioritized for research",
      lengthArr: planned.length || "",
      value: "planned",
    },
    {
      name: "In-Progress ",
      description: "Currently being developed",
      lengthArr: inProg.length || "",
      value: "progress",
    },
    {
      name: "Live",
      description: "Released features",
      lengthArr: live.length || "",
      value: "live",
    },
  ]);

  // [3] => RenderElements By Status
  const ReanderElements = (arr) => {
    return arr.map((el, index) => (
      <div style={{ position: "relative" }} className={styles.content_all_boxes_mobile} key={index}>
        <Button key={index} href={`/${el.id}`}>
          <p
            className={styles.border}
            style={{
              backgroundColor:
                el.status === "planned"
                  ? "#f49f85"
                  : el.status === "in-progress"
                  ? "#ad1fea"
                    : "#62bcfa",
            }}
          ></p>
          <div className="top">
            <span
              style={{
                backgroundColor:
                  el.status === "planned"
                    ? "#f49f85"
                    : el.status === "in-progress"
                    ? "#ad1fea"
                    : "#62bcfa",
              }}
            ></span>
            <span>{el.status}</span>
          </div>
          <div className="middle">
            <h4>{el.title}</h4>
            <p>{el.description}</p>
            <p style={{width: el.type === 'enhancement' ? '100px' : '70px'}}>{el.type}</p>
          </div>
          <div className="bottom">
            <div>
              <svg
                data-v-6786f89d=""
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 11 7"
              >
                <path
                  data-v-6786f89d=""
                  d="m1.334 6 4-4 4 4"
                  stroke="#4661E6"
                  strokeWidth="2"
                ></path>
              </svg>
              <span> {el.likes}</span>
            </div>
            <div>
              <svg
                data-v-6786f89d=""
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 16"
              >
                <path
                  data-v-6786f89d=""
                  d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.016 0-2.078-.137-3.025-.388A4.705 4.705 0 0 1 2.62 16Z"
                  fill="#CDD2EE"
                ></path>
              </svg>
              <span>{el.comments.length}</span>
            </div>
          </div>
        </Button>
      </div>
    ));
  };

  // [4] valInputStatus
  const [valInputStatus, setValInputStatus] = useState("Planned");

  // [5] => ClickAddStylesForButton
  const setValueInput = (e) => {
    // beacuse have two spans inside all buttons maybe will resolve it by css eventPoiner is none || this condition
    if (!e.target.value) return;
    setValInputStatus(e.target.value);
  };

  // [6] => when Click Input Render Elements
  const RenderElementsInsideUi = () => {
    if (!valInputStatus) return;
    switch (valInputStatus) {
      case "planned":
        return ReanderElements(planned);
      case "progress":
        return ReanderElements(inProg);
      case "live":
        return ReanderElements(live);
      default:
        return ReanderElements(planned);
    }
  };

  // [7] => RenderelementsForClientSide (ClientSide) => me or React Or ant FrameWork single Page
  const randerElementsFromClientSide = () => {
    let renderElement = [];
    if (!valInputStatus) return;
    switch (valInputStatus) {
      case "planned":
        return (renderElement = statusProducts.filter(
          (el) => el.value === valInputStatus
        ));
      case "progress":
        return (renderElement = statusProducts.filter(
          (el) => el.value === valInputStatus
        ));
      case "live":
        return (renderElement = statusProducts.filter(
          (el) => el.value === valInputStatus
        ));
      default:
        renderElement = statusProducts.filter((el) => el.value === "planned");
    }
    return renderElement;
  };

  const arryElementFormClientSideRenderInUI = randerElementsFromClientSide();

  const addStyleToBtn = () => {
    let objectStyle = {};
    switch (valInputStatus) {
      case "planned":
        return (objectStyle = { borderColor: "#f49f85", position: "relative" });
      case "progress":
        return (objectStyle = { borderColor: "#ad1fea", position: "relative" });
      case "live":
        return (objectStyle = { borderColor: "#62bcfa", position: "relative" });
      default:
        return (objectStyle = { borderColor: "transparent" });
    }
  };

  return (
    <div className={styles.content_mobile}>
      {/* Nav */}
      <nav>
        {statusProducts.map((el, index) => (
          <div key={index}>
            <button onClick={setValueInput} value={el.value}>
              <span>{el.name}</span>
              <span>({el.lengthArr || 0})</span>
            </button>
          </div>
        ))}
      </nav>
      {/* Content All */}
      <div className={styles.content_all_mobile}>
        {/* Create Content From Status Products */}
        {arryElementFormClientSideRenderInUI.map((el, index) => (
          <div key={index}>
            <h4>
              {el.name} <span>({el.lengthArr || 0})</span>
            </h4>
            <span>{el.description}</span>
          </div>
        ))}

        <>{RenderElementsInsideUi()}</>
      </div>
    </div>
  );
}

export default RoadMapContentMobile;
