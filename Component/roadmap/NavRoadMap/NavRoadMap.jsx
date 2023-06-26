import React from "react";
import styles from "../../../styles/RoadMap.module.css";
import Button from "../../buttons/links/Button";
import Plus from "../../icons/Plus";

function NavRoadMap() {
  return (
    <nav>
      <div className="links">
        <Button href="/">Go Back</Button>
        <h2>roadmap</h2>
      </div>
      <div className="add-feedback">
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".25rem",
            fontSize: ".8rem",
            fontWeight: "bold",
          }}
          href="/addfeedback"
        >
          <Plus />
          add feedback
        </Button>
      </div>
    </nav>
  );
}

export default NavRoadMap;
