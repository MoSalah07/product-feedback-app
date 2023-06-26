import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./RoadMapContent.module.css";
import Button from "../../buttons/links/Button";

function RoadMapContent({ data }) {
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
    },
    {
      name: "In-Progress ",
      description: "Currently being developed",
      lengthArr: inProg.length || "",
    },
    {
      name: "Live",
      description: "Released features",
      lengthArr: live.length || "",
    },
  ]);

  // [3] => RenderElements By Status
  const ReanderElements = (arr) => {
    return arr.map((el, index) => (
      <Button href={`/${el.id}`} key={index} style={{ position: "relative" }}>
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
          <p>{el.type}</p>
        </div>
        <div className="bottom">
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <svg
              data-v-6786f89d=""
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 11 7"
              width={15}
              height={15}
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
              width={15}
              height={15}
            >
              <path
                data-v-6786f89d=""
                d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.016 0-2.078-.137-3.025-.388A4.705 4.705 0 0 1 2.62 16Z"
                fill="#CDD2EE"
              ></path>
            </svg>
            <span> {el.comments.length}</span>
          </div>
        </div>
      </Button>
    ));
  };

  return (
    <div className={styles.content_road_map}>
      <div>
        {/* Create Nav-Content-Road-Map */}
        {statusProducts.map((el, index) => (
          <div key={index}>
            <h3>
              {el.name} ({el.lengthArr || 0})
            </h3>
            <span>{el.description}</span>
          </div>
        ))}
      </div>

      <div className="Content">
        {/* Creates Planned && In-Progress && Live */}
        <div>{ReanderElements(planned)}</div>
        <div>{ReanderElements(inProg)}</div>
        <div>{ReanderElements(live)}</div>
      </div>
    </div>
  );
}

export default RoadMapContent;
