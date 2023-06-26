import React, { useState } from "react";
import styles from "./AddComment.module.css";
import db from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { allData } from "../../helperFunction/dataFromDb";
import { createNicName } from "../../helperFunction/generateName";

function AddComment({
  allInfo: { infoComment, setInfoComment, data, setLoading },
  setArraySnapShot,
}) {
  const {
    commentUserName,
    commentText,
    commentId,
    timeStamp,
    commentNickNameEmail,
  } = infoComment;
  const id = useRouter().query.details;
  const [sendObjectToDb, setSendObjectToDb] = useState([]);
  const { userName, nickEmail } = createNicName();

  // [1] createObjectTosendDb beacuse Function ignore firest push to array empty data beacuse use it inside async function
  const createObjectToSendDb = () =>
    setSendObjectToDb((prev) => [
      ...prev,
      {
        ...infoComment,
        commentUserName: userName,
        commentNickNameEmail: nickEmail,
        timeStamp: Date.now(),
        commentId: Date.now(),
        replay: [],
      },
    ]);

  // [2] update Comments To db

  const createObjectCommentToDb = async (e) => {
    e.preventDefault();
    if (commentText === "") return;
    setLoading(true);
    const commentsArrayFromData = Object.values(data).filter(
      (el) => Array.isArray(el) && el
    );

    // [1] Marget Data from Db And Data From ClientSide => me or data from ui
    const updateDataAndSetToDB = commentsArrayFromData[0].concat(
      ...sendObjectToDb
    );
    // [2] all Data
    const dataTest = await allData();
    // [3] setNewDataFromUI + oldDataFromDB
    const finalData = dataTest.map((el) =>
      el.id === id ? { ...el, comments: updateDataAndSetToDB } : el
    );
    // [4] FindData And Send To DB (firebase)
    // ========================================================================== [2] اضافه البيانات و ارسالها الى الفاير بيز
    const finalDataWithId = await finalData.find(
      (el) =>
        el.id === id && {
          ...el,
          comments: {
            commentNickNameEmail: nickEmail,
            timeStamp: Date.now(),
            commentUserName: userName,
            id: Math.trunc(Math.random() * 1000000),
            replay: [],
          },
        }
    );
    // console.log(finalDataWithId.comments);
    // console.log(finalDataWithId)
    try {
      const refDoc = doc(db, "feedback", id);
      // console.log(nickEmail)
      // ==========================================================================[3]  ارسال البيانات و تكون متكررة
      await setDoc(refDoc, { ...finalDataWithId });
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
    setInfoComment({ ...infoComment, commentText: "" });
    setArraySnapShot(finalDataWithId.comments);
    setLoading(false);
  };

  return (
    <div className={styles.add_comment}>
      <h4>add comment</h4>
      <form onSubmit={createObjectCommentToDb}>
        <textarea
          value={commentText}
          onChange={(e) =>
            setInfoComment({ ...infoComment, commentText: e.target.value })
          }
          name=""
          id=""
          maxLength={225}
        ></textarea>
        <div onClick={createObjectToSendDb}>
          <span>{225 - commentText.length} characters left</span>
          <button>post comment</button>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
