import React from "react";
import MySpinner from "./mySpinner";

function myList({
  margin,
  length,
  status,
  lists,
  setOverlay,
  setList,
  setMargin,
}) {
  const preventEvent = () => {
    window.addEventListener("touchmove", null);
    window.addEventListener("mousewheel", null);
  };
  return (
    <div>
      <ul
        className="list-group list-group-flush"
        style={{ marginBottom: margin }}
      >
        {length === 0 ? (
          status === false ? (
            <div className="middle">
              <MySpinner size="lg" />
            </div>
          ) : (
            <div className="middle">empty list</div>
          )
        ) : (
          lists.map((value, index) => {
            return (
              <li
                key={index}
                style={{
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                className="list-group-item bg-light text-dark"
                suppressContentEditableWarning={true}
                contentEditable={true}
                placeholder="Double click for deleting"
                onFocus={(e) => {
                  preventEvent();
                  setOverlay({ modify: true });
                  setList({
                    id: value._id,
                    text: e.target.innerText,
                  });
                  setMargin("60px");
                }}
                onBlur={(e) => {
                  preventEvent();
                  setList({
                    id: value._id,
                    text: e.target.innerText,
                  });
                  setMargin("0px");
                }}
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
                data-animation={false}
                data-container={true}
              >
                {value.name}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default myList;
