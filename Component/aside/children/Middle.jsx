import { useEffect, useRef } from "react";
import styles from "../Aside.module.css";

function Middle({setGetValBtn}) {
  const refBtn1 = useRef();
  const refBtn2 = useRef();
  const refBtn3 = useRef();
  const refBtn4 = useRef();
  const refBtn5 = useRef();
  const refBtn6 = useRef();
  const listArray = [refBtn1, refBtn2, refBtn3, refBtn4, refBtn5, refBtn6];

  // console.log(setGetValBtn)

  const toogleActive = () => {
    // here Select All elements from hooks useRef
    const element = listArray.map((el) => el.current);
    if (element) {
      element.forEach((el) => {
        // all elements have event Click
        el.addEventListener("click", function () {
          //[1] first step loop all elements remove class and inlinestyle
          element.forEach((el) => {
            el.classList.remove("active");
            el.style.backgroundColor = "#f2f4ff";
            el.style.color = "#4661e6";
          });
          // [2] second step use this and add class and inlinestyle
          // console.log(this) here this === this element was clicked
          this.classList.add("active");
          this.style.backgroundColor = "#4661e6";
          this.style.color = "#fff";
        });
      });
    }
  };

  // why useEffect => Beacuse First Click toogleActive not work
  useEffect(() => {
    toogleActive();
  }, []);

  const getValueBtns = (e) => {
    // const element = listArray.map( ( el ) => el.current.name );
    setGetValBtn( e?.target.name );
  };

  useEffect(() => {
    getValueBtns();
  }, []);

  return (
    <div className={styles.middle}>
      <button onClick={getValueBtns} value="all" name="all" ref={refBtn1}>
        all
      </button>
      <button onClick={getValueBtns} value="ui" name="ui" ref={refBtn2}>
        ui
      </button>
      <button onClick={getValueBtns} value="ux" name="ux" ref={refBtn3}>
        ux
      </button>
      <button onClick={getValueBtns} value="enhancement" name="enhancement" ref={refBtn4}>
        enhancement
      </button>
      <button onClick={getValueBtns} ref={refBtn5} value="bug" name="bug">
        bug
      </button>
      <button onClick={getValueBtns} ref={refBtn6} value="feature" name="feature">
        feature
      </button>
    </div>
  );
}

export default Middle;
