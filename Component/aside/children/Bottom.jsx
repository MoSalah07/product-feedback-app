import React from "react";
import styles from "../Aside.module.css";
import Button from "../../buttons/links/Button";

function Bottom({allCountersRoadMapToAside: {counterInProg, counterLive, counterPlanned}}) {
  return (
    <div className={styles.bottom}>
      <div>
        <b>rood map</b>
        <Button href="road-map">view</Button>
      </div>
      <div>
        <p>
          <span></span> <small>planned</small> <strong>{counterPlanned?.length}</strong>
        </p>
        <p>
          <span></span> <small>In-Progress</small> <strong>{counterInProg?.length}</strong>
        </p>
        <p>
          <span></span> <small>Live</small> <strong>{counterLive?.length}</strong>
        </p>
      </div>
    </div>
  );
}

export default Bottom;
