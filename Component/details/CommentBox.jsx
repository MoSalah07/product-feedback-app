import React, { useState, useEffect } from "react";
import styles from "./CommentBox.module.css";
import db from "../../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import CommentInfo from "./CommentInfo";

function CommentBox({ data, setArraySnapShot, arraySnapShot }) {
  const id = useRouter().query.details;


  useEffect(() => {
    setArraySnapShot(data.comments);
  }, []);

  const renderCommentsToUi =
    arraySnapShot &&
    arraySnapShot.length > 0 &&
    arraySnapShot?.map((el, index) => (
      <CommentInfo
        setArraySnapShot={setArraySnapShot}
        arraySnapShot={arraySnapShot}
        key={index}
        item={el}
        currentData={data}
      />
    ));

  return (
    <>
      {arraySnapShot.length > 0 && (
        <div className={styles.comments_container}>
          <h4>{`${arraySnapShot.length || ""} comments`}</h4>
          <div className={styles.comments}>{renderCommentsToUi}</div>
        </div>
      )}
    </>
  );
}

export default CommentBox;
