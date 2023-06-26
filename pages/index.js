import Head from "next/head";
import Aside from "../Component/aside/Aside";
import FeedBackBox from "../Component/feedbackBox/FeedBackBox";
import styles from "../styles/Home.module.css";
import { allData, filterData } from "../helperFunction/dataFromDb";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFilterData } from "../redux/sliceProduct";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Home({ data }) {
  const [getValBtn, setGetValBtn] = useState(undefined);
  const [getValSortBy, setGetValSortBy] = useState("");
  const dispatch = useDispatch();
  const [counterPlanned, setCounterPlanned] = useState(() =>
    data.filter((el) => el.status === "planned")
  );
  const [counterInProg, setCounterInProg] = useState(
    data.filter((el) => el.status === "in-progress")
  );
  const [counterLive, setCounterLive] = useState(
    data.filter((el) => el.status === "live")
  );
  const refSpanInNav = useRef();

  const allCountersRoadMapToAside = {
    counterInProg,
    counterLive,
    counterPlanned,
  };

  // With Out Redux

  /*
  const fetchTest = async() => {
    const filter = await filterData( getValBtn );
    switch(getValBtn) {
      case 'all':
        return setfilteringData(data);
      default:
        return setfilteringData(filter);
    }
  }
*/

  const fetchDataWithRedux = async () => {
    const filter = await filterData(getValBtn);
    switch (getValBtn) {
      case "all":
        return dispatch(getFilterData(data));
      default:
        return dispatch(getFilterData(filter));
    }
  };

  useEffect(() => {
    if (!getValBtn) return;
    fetchDataWithRedux();

    // setCounterStatusData();
  }, [getValBtn]);

  // When Reload main page return current length feedback products is true
  useEffect(() => {
    setTimeout(() => {
      refSpanInNav.current.textContent = data.length;
    }, 10);
  }, []);

  return (
    <main className={styles.main}>
      <Head>
        <title>FeedBack App</title>
      </Head>
      <div className={`${styles.container}`}>
        <Aside
          allCountersRoadMapToAside={{ ...allCountersRoadMapToAside }}
          setGetValBtn={setGetValBtn}
        />
        <FeedBackBox
          data={data}
          setGetValSortBy={setGetValSortBy}
          getValSortBy={getValSortBy}
          getValBtn={getValBtn}
          refSpanInNav={refSpanInNav}
        />
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const data = await allData();
  return {
    props: {
      data,
    },
    revalidate: 600,
  };
}
