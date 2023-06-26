import React from "react";
import Moment from "react-moment";
import styles from "./CommentBox.module.css";
import Image from "next/image";
import Photo from "../../public/assets/leo.jpeg";

function ReplayCommentInfo({ item }) {
  // console.log(item)
  return (
    <div className={styles.replay_container}>
      <div className="nested-col-1">
        <div>
          <div>
            <Image src={Photo} alt="replay-img" />
          </div>
          <div>
            <h5>{item.nameReplay}</h5>
            <span>{item.emailReplay}</span>
          </div>
        </div>

        <div>
          <span>replay</span>
        </div>
      </div>
      <div className="nested-col-2">
        <div>
          <span>@upbeat1811</span>
          <p>{item.textReplay}</p>
        </div>
        <Moment fromNow>{item.timeStamp}</Moment>
      </div>
    </div>
  );
}

export default ReplayCommentInfo;
