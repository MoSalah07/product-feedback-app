import Head from "next/head";
import NavRoadMap from "../Component/roadmap/NavRoadMap/NavRoadMap";
import RoadMapContent from "../Component/roadmap/road-map-content/RoadMapContent";
import { allData } from "../helperFunction/dataFromDb";
import styles from "../styles/RoadMap.module.css";
import ViewPort from "../hooks/viewPort";
import RoadMapContentMobile from "../Component/roadmap/road-map-content/RoadMapContentMobile";
import { useState } from "react";
import Loading from "../Component/loading/loading";

function RoadMap({data}) {
  const width  = ViewPort();
  const [loading, setLoading] = useState( true );

  if ( data ) setTimeout( () => setLoading( false ), 1000 );
  
  return (
    <section className={styles.road_map}>
      <Head>
        <title>Road Map</title>
      </Head>

      {loading && <Loading />}

      <div className={styles.container_road_map}>
        <NavRoadMap />
          {/* Condition For Responsive */}
        {width > 767 ? <RoadMapContent data={data}/> : <RoadMapContentMobile data={data} /> } 
      </div>
    </section>
  );
}


export async function getServerSideProps() {
  const data = await allData();
  return {
    props: {
      data,
    },
    // Error Here
    // revalidate: 600,
  }
}

export default RoadMap;
