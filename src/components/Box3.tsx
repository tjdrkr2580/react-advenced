import React from "react";

const Box3 = () => {
  console.log("Box3 렌더링");
  return (
    <div
      style={{
        background: "green",
        width: "300px",
      }}
    >
      Box3
    </div>
  );
};

export default React.memo(Box3);
