import db from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";

const allData = async () => {
  const refCollection = collection(db, "feedback");
  const querySnapshot = await getDocs(refCollection);
  let data = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id)
    return ( data.push( doc.data() ) );
  } );
  return data;
};

const filterData = async (type) => {
  const getDatafiltering = await allData();
  const filter = getDatafiltering.filter((el) => el.type === type);

  return filter;
};

const sortData = async (type) => {
  const data = await allData();
  let changeArray = [];
  switch (type) {
    case "most upvotes":
      return (changeArray = [...data].sort((a, b) =>
        b.likes > a.likes ? 1 : a.likes < b.likes ? 0 : -1
      ));
    case "least upvotes":
      return (changeArray = [...data].sort((a, b) =>
        a.likes > b.likes ? 1 : b.likes < a.likes ? 0 : -1
      ));
    case "most comments":
      return (changeArray = [...data].sort((a, b) =>
        b.comments > a.comments ? 1 : a.comments < b.comments ? 0 : -1
      ));
    case "least comments":
      return (changeArray = [...data].sort((a, b) =>
        a.comments > b.comments ? 1 : b.comments < a.comments ? 0 : -1
      ));
    default:
      return data;
  }
};

const sortWithRedux = (arr = [], type) => {
  switch (type) {
    case "most upvotes":
      return [...arr].sort((a, b) =>
        b.likes > a.likes ? 1 : a.likes < b.likes ? 0 : -1
      );
    case "least upvotes":
      return [...arr].sort((a, b) =>
        a.likes > b.likes ? 1 : b.likes < a.likes ? 0 : -1
      );
    case "most comments":
      return [...arr].sort((a, b) =>
        b.comments > a.comments ? 1 : a.comments < b.comments ? 0 : -1
      );
    case "least comments":
      return [...arr].sort((a, b) =>
        a.comments > b.comments ? 1 : b.comments < a.comments ? 0 : -1
      );
    default:
      return arr;
  }
};


const findElementFromData =  async (id) => {
  const data = await allData();
  const findElement = data.find( ( el ) => el.id === id );
  return findElement;
}




export { allData, filterData, sortData, sortWithRedux, findElementFromData };
