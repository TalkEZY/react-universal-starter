import React from "react";

const style = {
  maxWidth: "1290px",
  margin: "0 auto",
  padding: "20px;",
}

export default function Error({ message, error }) {
  return (
    <div style={style}>
      <h1>{message}</h1>
      <h2>{error.status}</h2>
      <pre>{error.stack}</pre>
    </div>
  );
}
