import React, { useEffect, useState } from "react";

const Pagination = ({ showperpage, handlerPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showperpage * counter;
    // console.log("start", value - showperpage);
    // console.log("end", value);
    handlerPaginationChange(value - showperpage, value);
  }, [counter]);

  const onhandlerButton = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showperpage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="row d-flex justify-content-between my-5">
      <button
        className="btn btn-primary common-class col-sm-2"
        onClick={() => onhandlerButton("prev")}
      >
        Previous
      </button>
      <button
        className="btn btn-primary common-class col-sm-2"
        onClick={() => onhandlerButton("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
