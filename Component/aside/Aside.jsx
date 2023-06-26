import Bottom from "./children/Bottom";
import Top from "./children/Top";
import Middle from "./children/Middle";
import styles from "../aside/Aside.module.css";
import ViewPort from "../../hooks/viewPort";
import { useState } from "react";

function Aside({ setGetValBtn, allCountersRoadMapToAside }) {
  const width = ViewPort();
  const [showMenuLanding, setShowMenuLanding] = useState(false);

  return (
    <aside className={styles.aside}>
      <Top
        setShowMenuLanding={setShowMenuLanding}
        showMenuLanding={showMenuLanding}
      />
      {width > 767 ? (
        <>
          <Middle setGetValBtn={setGetValBtn} />
          <Bottom allCountersRoadMapToAside={allCountersRoadMapToAside} />
        </>
      ) : (
        <>
          <div style={{ right: showMenuLanding ? "0px" : "-220px" }}>
            <Middle setGetValBtn={setGetValBtn} />
            <Bottom allCountersRoadMapToAside={allCountersRoadMapToAside} />
          </div>
        </>
      )}
    </aside>
  );
}

export default Aside;
