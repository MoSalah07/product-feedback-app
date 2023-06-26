import React, { useState, useEffect } from "react";
import FeedBackContent from "./feebackContent/FeedBackContent";
import Nav from "./nav/Nav";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { sortData, sortWithRedux } from "../../helperFunction/dataFromDb";
import styles from './feebackContent/FeeBackContent.module.css';


function FeedBackBox({ data, setGetValSortBy, getValSortBy, getValBtn, refSpanInNav }) {
  const { items } = useSelector( ( state ) => state.product );
  const [selectSort, setSelectSort] = useState( [] );
  const refDev = useRef(0);
  


  // const test = async () => {
  //   const sorting = await sortData(getValSortBy);
  //   setSelectSort(sorting);
  // };


  const sortWithReduxDataAndFilter = (items, getValSortBy) => {
    return setSelectSort( sortWithRedux( items || data, getValSortBy ) );
    // items or data because items.length is 0 or !items sort is work in array data from SSG
  }


  // first Step for filter btns
  useEffect(() => {
    refDev.current = 1;
  }, [getValBtn]);

// second step for select sorting
  useEffect(() => {
    if ( getValSortBy === '' ) return; // if done condition when refDev === 0;
    refDev.current = 2;
    sortWithReduxDataAndFilter( items, getValSortBy );
  }, [getValSortBy] );
  


// console.log(selectSort)
// console.log(refDev.current)

  return (
    <div ref={refDev}>
      <Nav
        setGetValSortBy={setGetValSortBy}
        getValSortBy={getValSortBy}
        data={data}
        refSpanInNav={refSpanInNav}
      />

      {/*  Here Will Done With Props */}
      {/* {filteringData && filteringData.length === 0 && <p>Not Found Items</p>}
      {filteringData &&
        filteringData.map((item, index) => <FeedBackContent key={index} item={item} />)} */}

      {items && items.length === 0 && <div className={styles.feed_back_content}>Not Found Items</div>}

      {/* Here With Redux */}
      {refDev.current && refDev.current === 1
        ? items &&
          items.map((item, index) => (
            <FeedBackContent key={index} item={item} />
          ))
        : refDev.current && refDev.current === 2
        ? selectSort &&
          selectSort.map((item, index) => (
            <FeedBackContent key={index} item={item} />
          ))
        : data &&
          data.map((item, index) => (
            <FeedBackContent key={index} item={item} />
          ))}
    </div>
  );
}

export default FeedBackBox;
