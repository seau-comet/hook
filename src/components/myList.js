import React from "react";
import MySpinner from "./mySpinner";

function myList({margin, length, status, lists,setOverlay, setList, setMargin}) {
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
            style={{ cursor: "pointer", fontSize: "18px" }}
            className="list-group-item bg-light text-dark"
            suppressContentEditableWarning={true}
            contentEditable={true}
            placeholder="Double click for deleting"
            onFocus={(e) => {
              e.preventDefault();
              setOverlay({ modify: true });
              setList({
                id: value._id,
                text: e.target.innerText,
              });
              setMargin("60px");
            }}
            onBlur={(e) => {
              e.preventDefault();
              setList({
                id: value._id,
                text: e.target.innerText,
              });
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
