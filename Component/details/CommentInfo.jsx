import React, { useState } from "react";
import Moment from "react-moment";
import ReplayComment from "./ReplayComment";
import ReplayCommentInfo from "./ReplayCommentInfo";
import styles from "./CommentBox.module.css";
import Photo from "../../public/assets/80356355_2081113765367230_4747568849413472256_n.jpg";
import Image from "next/image";
import {
  findElementFromData,
  allData,
} from "../../helperFunction/dataFromDb.js";
import { useRouter } from "next/router";
import db from "../../firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useEffect } from "react";

function CommentInfo({ currentData, item, setArraySnapShot, arraySnapShot }) {
  const [textReplay, setTextReplay] = useState("");
  const [isPostReplay, setIsPostReplay] = useState(false);
  const idPage = useRouter().query.details;

  const {
    commentId,
    commentNickNameEmail,
    commentText,
    commentUserName,
    timeStamp,
    replay,
  } = item;
  //console.log(item) // comments only
  //console.log(currentData) // All Current Object Not Comment Only

  const fullDate = new Date(timeStamp);
  const [showFormReplay, setShowFormReplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleFormReplay = (e) => {
    setShowFormReplay(!showFormReplay);
  };

  const [arrAddReplayInfo, setArrReplayInfo] = useState([]);

  const addInfoToArrayDb = () => {
    setArrReplayInfo((prev) => [
      ...prev,
      {
        idReplay: Date.now(),
        textReplay,
        nameReplay: "test",
        emailReplay: "test@example.com",
        timeStamp: Date.now(),
        idCommentAndReplay: commentId,
      },
    ]);
  };

  async function updataInfoInDb(e) {
    e.preventDefault();
    if (textReplay === "") return;

    setLoading(true);

    const updatedCommnets = arraySnapShot.map((comment) => {
      if (comment.commentId === commentId) {
        return { ...comment, replay: [...arrAddReplayInfo] };
      } else {
        return comment;
      }
    });

    try {
      const docRef = doc(db, "feedback", idPage);
      await updateDoc(docRef, { comments: updatedCommnets });
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
    setArraySnapShot(updatedCommnets);
    setTextReplay("");
    setLoading(false);

    // console.log(arrAddReplayInfo)
  }

  return (
    <>
      <div className={styles.container_box_db} style={{position: loading ? 'static' : 'relative'}}>
        <div className={styles.comment_box_db}>
          <div className="col-1">
            <Image src={Photo} alt="img-comment" />

            <div className="Info-email">
              <h5>{commentUserName}</h5>
              <span>{`@${commentNickNameEmail}`}</span>
            </div>
            <span
              // id={commentId}
              onClick={toggleFormReplay}
              className="replay"
            >
              replay
            </span>
          </div>

          <div className="col-2">
            <p>{commentText}</p>
            <Moment fromNow>{fullDate}</Moment>
          </div>

          {/* Col-3 */}

          {item?.replay &&
            item?.replay.map((el) => {
              return <ReplayCommentInfo key={el.idReplay} item={el} />;
            })}

          {showFormReplay && (
            <ReplayComment
              textReplay={textReplay}
              setTextReplay={setTextReplay}
              updataInfoInDb={updataInfoInDb}
              addInfoToArrayDb={addInfoToArrayDb}
              loading={loading}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CommentInfo;
