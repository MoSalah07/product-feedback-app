import { useState } from "react";
import Head from "next/head";
import { findElementFromData } from "../../helperFunction/dataFromDb";
import FeedBackContent from "../../Component/feedbackBox/feebackContent/FeedBackContent";
import NavDeatils from "../../Component/navDetails/NavDeatils";
import viewPort from "../../hooks/viewPort";
import AddComment from "../../Component/details/AddComment";
import CommentBox from "../../Component/details/CommentBox";
import Loading from "../../Component/loading/loading";

function Details({ data }) {
  const width = viewPort();
  const [loading, setLoading] = useState(false);
  const [arraySnapShot, setArraySnapShot] = useState( [] );
  
  const styleResponsiveContainer = () => {
    let styleObj = {
      width: "60%",
      padding: "8rem 3rem",
    };
    if (width < 1000 && width > 768) {
      return (styleObj = {
        width: "80%",
        padding: "4rem 1.5rem",
      });
    } else if (width < 767) {
      return (styleObj = {
        width: "100%",
        padding: "2rem 1rem",
      });
    } else {
      return styleObj;
    }
  };
  const [infoComment, setInfoComment] = useState({
    commentId: "",
    commentText: "",
    commentUserName: "",
    timeStamp: "",
    commentNickNameEmail: "",
  });

  const allInfo = {
    infoComment,
    setInfoComment,
    data,
    setLoading,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f7f8fd",
        position: "relative",
      }}
    >
      <Head>
        <title>Details</title>
      </Head>
      {loading && <Loading />}
      <div style={{ ...styleResponsiveContainer(), margin: "0 auto" }}>
        <NavDeatils />
        <FeedBackContent item={data} />
        <CommentBox
          setArraySnapShot={setArraySnapShot}
          arraySnapShot={arraySnapShot}
          data={data}
        />
        <AddComment
          setArraySnapShot={setArraySnapShot}
          allInfo={{ ...allInfo }}
        />
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const data = await findElementFromData( context.params.details );
  if ( !data ) return { notFound: 'blocking' };
  return {
    props: { data },
  };

}

export default Details;
