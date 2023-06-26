import Head from "next/head";
import { useState } from "react";
import Button from "../Component/buttons/links/Button";
import styles from "../styles/AddFeedback.module.css";
import db from "../firebase/firebase";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { allData } from "../helperFunction/dataFromDb";
import { useEffect } from "react";
import Loading from "../Component/loading/loading";

function AddFeedBack() {
  const [dataFromInputs, setDataFromInputs] = useState({
    title: "",
    type: "",
    description: "",

  } );
  
  const [loading, setLoading] = useState( false );

  // [1]
  const [showList, setShowList] = useState(false);

  const toggleShowList = () => setShowList(!showList);

  // [2]

  const [valList, setValList] = useState("feature");

  const getValList = (e) => setValList(e.target.name);

  // [3]
  const [dataFromDb, setDataFromDb] = useState([]);

  const getDataFromDb = async () => {
    const data = await allData();
    setDataFromDb(data);
  };

  useEffect(() => {
    getDataFromDb();
  }, []);

  // [4]

  const { title, type, description } = dataFromInputs;

  const getValuesFromInputs = (e) => {
    setDataFromInputs({
      ...dataFromInputs,
      type: valList,
      likes: 13,
      comments: [],
      status: "suggestion",
      [e.target.name]: e.target.value,
    });
  };

  const addDocsToFireBase = async (e) => {
    e.preventDefault();
    if ( title === '' || type === '' || description === '' ) return;
    setLoading( true );
    try {
      // console.log(dataFromDb)
      const collectionDocs = collection(db, "feedback");
      const docs = await addDoc(collectionDocs, {
        ...dataFromInputs,
        type: valList,
      });
      // console.log(docs.id)
      const docRef = doc( db, 'feedback', docs.id );
      await updateDoc( docRef, { id: docs.id } );
    } catch (err) {
      setLoading( false );
      console.log( err.message );
      
    }

    setLoading( false );
    setDataFromInputs({
      title: "",
      description: "",
      type: "feature",
    });
  };

  return (
    <section style={{postion: 'relative'}} className={styles.main}>
      <Head>
        <title>Add FeedBack</title>
      </Head>


      {loading && <Loading />}

      {/* <div>go back</div> */}
      <Button href="/">
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
      <div className={styles.container}>
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
              fill="#FFF"
              fillRule="nonzero"
              d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
            ></path>
          </g>
        </svg>
        <form action="" onSubmit={addDocsToFireBase}>
          <h2>Create New Feedback</h2>
          <div>
            <label htmlFor="title">
              <h5>Feedback Title</h5>
              <small>Add a short, descriptive headline</small>
            </label>
            <input
              value={title}
              type="text"
              id="title"
              name="title"
              onChange={getValuesFromInputs}
            />
          </div>
          <div>
            <label htmlFor="category">
              <h5>Category</h5>
              <small>Choose a category for your feedback</small>
            </label>
            <div onClick={toggleShowList} className={styles.select}>
              <div>
                <span>{valList}</span>
              </div>
              {showList && (
                <ul onClick={toggleShowList}>
                  <li>
                    <button name="feature" onClick={getValList}>
                      feature
                    </button>
                  </li>
                  <li>
                    <button name="ui" onClick={getValList}>
                      ui
                    </button>
                  </li>
                  <li>
                    <button name="ux" onClick={getValList}>
                      ux
                    </button>
                  </li>
                  <li>
                    <button name="enhancement" onClick={getValList}>
                      enhancement
                    </button>
                  </li>
                  <li>
                    <button name="bug" onClick={getValList}>
                      bug
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
                Include any specific comments on what should be improved, added,
                etc.
              </small>
            </label>
            <textarea
              value={description}
              name="description"
              onChange={getValuesFromInputs}
              id="details"
            ></textarea>
          </div>
          <div>
            <button>cancel</button>
            <button>add feedback</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddFeedBack;
