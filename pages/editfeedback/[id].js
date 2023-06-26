import React, { useState } from "react";
import Head from "next/head";
import Button from "../../Component/buttons/links/Button";
import styles from "../../styles/AddFeedback.module.css";
import { useRouter } from "next/router";
import { findElementFromData } from "../../helperFunction/dataFromDb";
import db from "../../firebase/firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import Loading from "../../Component/loading/loading";
import ViewPort from "../../hooks/viewPort";

function Edit({ data }) {
  const { title, description, type, status, likes, comments, id } = data;
  const [dataInputs, setDataInputs] = useState({
    title,
    description,
  });
  const [typeData, setTypeData] = useState(type);
  const [statusData, setStatusData] = useState(status);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const width = ViewPort();

  // console.log( status )
  const [showList, setShowList] = useState(false);

  const toggleShowList = () => setShowList(!showList);

  // [2] shoe status List
  const [showListStatus, setShowListStatus] = useState(false);

  const toggleShowListStatus = () => setShowListStatus(!showListStatus);

  const setDataTest = (e) => {
    setDataInputs({ ...dataInputs, [e.target.name]: e.target.value });
  };

  // show msg delete when click in button delete

  const [showMsgDelete, setShowMsgDelete] = useState(false);

  const showMsgDeleteFromDb = (e) => {
    e.preventDefault();
    setShowMsgDelete(true);
  };

  const testSubmit = async (e) => {
    e.preventDefault();
    //   Validation

    if (
      typeData === "" ||
      statusData === "" ||
      dataInputs.title === "" ||
      dataInputs.description === ""
    )
      return;
    setLoading(true);
    try {
      const id = router.query.id;
      const docRef = doc(db, "feedback", id);
      const updateDataToDb = await updateDoc(docRef, {
        type: typeData,
        status: statusData,
        id,
        likes,
        comments,
        title: dataInputs.title,
        description: dataInputs.description,
      });
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
    setLoading(false);
    // Move To Landing Page
    router.push("/");
  };

  const deleteFromDb = async (e) => {
    e.preventDefault();
    setShowListStatus(false);
    setLoading(true);
    try {
      const id = router.query.id;
      const docRef = doc(db, "feedback", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
    setLoading(false);
    router.push("/");
  };

  return (
    <>
      <section
        style={{
          position: "relative",
          height: width > 767 && "calc(100vh - 8rem)",
          padding: "5rem 0 3.5rem",
          display: width < 767 ? "block" : "flex",
        }}
        className={styles.main}
      >
        <Head>
          <title>Edit FeedBack</title>
        </Head>

        {loading && <Loading />}

        {/* <div>go back</div> */}
        <Button
          style={{
            position: "absolute",
            left: width > 767 ? "1rem" : "1rem",
            top: width > 767 ? '1rem' : "1rem",
            padding: "0",
          }}
          href="/"
        >
          <svg
            id="left-arrow"
            width="7"
            height="10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L2 5l4-4"
              stroke="#4661e6"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            ></path>
          </svg>
          <span>go back</span>
        </Button>
        <div className={styles.container} style={{ padding: "1rem 1rem 0" }}>
          {/* Svg */}
          <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient
                cx="103.9%"
                cy="-10.387%"
                fx="103.9%"
                fy="-10.387%"
                r="166.816%"
                id="a"
              >
                <stop stopColor="#E84D70" offset="0%"></stop>
                <stop stopColor="#A337F6" offset="53.089%"></stop>
                <stop stopColor="#28A7ED" offset="100%"></stop>
              </radialGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <circle fill="url(#a)" cx="28" cy="28" r="28"></circle>
              <path
                data-v-d291ce08=""
                fillRule="evenodd"
                clipRule="evenodd"
                d="m29.082 19.48 3.75-3.48 6.513 6.272-3.548 3.68-6.714-6.471ZM16 39.596c.92-3.942 3.487-14.02 3.487-14.02l8.203-4.822 6.83 6.397-5.218 7.82L16.313 40l6.157-5.79c1.043.39 2.516.038 3.312-.836a2.818 2.818 0 0 0-.177-3.983c-1.149-1.05-3.02-1.05-4.071.098-.783.855-1.053 2.365-.605 3.36L16 39.596Z"
                fill="#fff"
              ></path>
            </g>
          </svg>
          <form onSubmit={testSubmit} style={{ height: "calc(100vh- 4.5rem)" }}>
            <h2>Create New Feedback</h2>
            <div>
              <label htmlFor="title">
                <h5>Feedback Title</h5>
                <small>Add a short, descriptive headline</small>
              </label>
              <input
                onChange={setDataTest}
                defaultValue={dataInputs.title}
                type="text"
                id="title"
                name="title"
              />
            </div>
            <div>
              <label htmlFor="category">
                <h5>Category</h5>
                <small>Choose a category for your feedback</small>
              </label>
              <div onClick={toggleShowList} className={styles.select}>
                <div>
                  <span>{typeData}</span>
                </div>
                {showList && (
                  <ul onClick={toggleShowList}>
                    <li>
                      <button
                        onClick={(e) => setTypeData(e.target.name)}
                        name="feature"
                      >
                        feature
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => setTypeData(e.target.name)}
                        name="ui"
                      >
                        ui
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => setTypeData(e.target.name)}
                        name="ux"
                      >
                        ux
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => setTypeData(e.target.name)}
                        name="enhancement"
                      >
                        enhancement
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => setTypeData(e.target.name)}
                        name="bug"
                      >
                        bug
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {/* FeedBack List Select */}
            <div>
              <label htmlFor="update-status">
                <h5>update status</h5>
                <small>Choose a category for your feedback</small>
              </label>
              <div onClick={toggleShowListStatus} className={styles.select}>
                <div>
                  <span>{statusData}</span>
                </div>
                {showListStatus && (
                  <ul onClick={toggleShowListStatus}>
                    <li>
                      <button
                        onClick={(e) => setStatusData(e.target.name)}
                        name="suggestion"
                      >
                        suggestion
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => setStatusData(e.target.name)}
                        name="planned"
                      >
                        planned
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => setStatusData(e.target.name)}
                        name="in-progress"
                      >
                        in-progress
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => setStatusData(e.target.name)}
                        name="live"
                      >
                        live
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="details">
                <h5>Feedback Detail</h5>
                <small>
                  Include any specific comments on what should be improved,
                  added, etc.
                </small>
              </label>
              <textarea
                defaultValue={dataInputs.description}
                name="description"
                id="details"
                onChange={setDataTest}
              ></textarea>
            </div>
            <div
              className={styles.btn_edit}
              style={{ padding: width < 450 ? '1rem .5rem' : "0 .5rem", margin: ".5rem 0", flexDirection: width < 450 ? 'column' : 'row', rowGap: '.65rem' }}
            >
              <div style={{width: width < 450 && '90%'}} onClick={showMsgDeleteFromDb}>
                <button style={{width: width < 450 && '100%'}}>delete</button>
              </div>
              <button style={{width: width < 450 && '90%', order: width < 450 && '-1'}}>cancel</button>
              <button style={{width: width < 450 && '90%', order: width < 450 && '-2'}}>add feedback</button>
            </div>
          </form>
        </div>
        {/* Show Msg Delete */}
        {showMsgDelete && (
          <div
            style={{
              backgroundColor: "rgb(0 0 0 / .4)",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "0",
              left: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#f2f4ff",
                color: "#3a4374",
                width:
                  width < 1100 && width > 768
                    ? "40%"
                    : width < 767
                    ? "60%"
                    : "25%",
                padding: "1rem",
                borderRadius: ".25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h4>
                Do you want to delete the content{" "}
                <span style={{ fontSize: ".9rem" }}>?</span>
              </h4>
              <div
                className={styles.btn_delete}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() => setShowMsgDelete(false)}
                  style={{
                    padding: ".3rem 1rem",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    color: "#fff",
                    outline: "none",
                    border: "none",
                    backgroundColor: "#647196",
                    borderRadius: "10px",
                  }}
                >
                  no
                </button>
                <button
                  onClick={deleteFromDb}
                  style={{
                    padding: ".3rem 1rem",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    color: "#fff",
                    outline: "none",
                    border: "none",
                    backgroundColor: "#647196",
                    borderRadius: "10px",
                  }}
                >
                  yes
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await findElementFromData(context.params.id);
  return {
    props: { data },
  };
}

export default Edit;
