import React from "react";
import HashLoader from "react-spinners/HashLoader";
function Loading() {
  return (
    <div
      style={{
              backgroundColor: 'rgb(0 0 0 / .2)',
              width: '100%',
              minHeight: '100vh',
              top: '0',
              bottom: '0',
              left: '0',
              right: '0',
              zIndex: '2',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
             justifyContent: 'center',
      }}
    >
      <HashLoader color="#3a4374" />
    </div>
  );
}

export default Loading;
