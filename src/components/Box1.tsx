import React from "react";

const Box1 = () => {
  console.log("Box1 렌더링");
  return (
    <div
      style={{
        background: "green",
        width: "300px",
      }}
    >
      Box1
    </div>
  );
};

export default React.memo(Box1);
