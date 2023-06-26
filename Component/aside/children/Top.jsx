import React from "react";
import styles from "../Aside.module.css";
import ViewPort from "../../../hooks/viewPort";
import Menu from "../../icons/Menu";
import CloseMenu from "../../icons/Close.Menu";
function Top({ setShowMenuLanding, showMenuLanding }) {
  const width = ViewPort({});
  const toggleShowMenuLanding = () => setShowMenuLanding((prev) => !prev);

  return (
    <div className={styles.top}>
      {/* Condition For Responsive */}
      {width > 767 ? (
        <>
          <h3>Frontend Mentor</h3>
          <span>Feedback Board</span>
        </>
      ) : (
        <>
          <div>
            <h3>Frontend Mentor</h3>
            <span>Feedback Board</span>
          </div>
          <div style={{cursor: 'pointer', userSelect: 'none'}} onClick={toggleShowMenuLanding}>
            {showMenuLanding ? <CloseMenu /> : <Menu />}
          </div>
        </>
      )}
    </div>
  );
}

export default Top;
