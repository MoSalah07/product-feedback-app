import React, { useState } from "react";
import Loading from "../loading/loading";

function ReplayComment({
  loading,
  setTextReplay,
  textReplay,
  updataInfoInDb,
  addInfoToArrayDb,
}) {
  const [show, setShow] = useState(true);

  return (
    <>
      {loading && <Loading />}
      {show && (
        <form onSubmit={updataInfoInDb} className="col-3">
          <textarea
            value={textReplay}
            onChange={(e) => setTextReplay(e.target.value)}
            name=""
            id=""
          ></textarea>
          <div onClick={addInfoToArrayDb}>
            <button>post replay</button>
          </div>
        </form>
      )}
    </>
  );
}

export default ReplayComment;
