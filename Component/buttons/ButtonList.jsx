import styles from "./ButtonList.module.css";

function ButtonList({ children, value }) {
  return (
    <>
      <button className={styles.buttonList} value={value}>
        {children}
      </button>
    </>
  );
}

export default ButtonList;
