import React, { useContext } from "react";
import { Button } from "reactstrap";
import { titleContext } from "..";
import MySpinner from "./mySpinner";

function MyNav({modify, checkNote,cancel,toggle}) {
  const title = useContext(titleContext);
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span
          className="navbar-text"
          style={{ fontSize: "48", fontWeight: "bold" }}
        >
          {title}
        </span>
        {modify ? (
          <Button
            color="warning"
            className="text-white"
            onClick={checkNote}
          >
            {cancel ? <MySpinner /> : "Cancel"}
          </Button>
        ) : (
          <Button color="success" onClick={toggle}>
            Add List
          </Button>
        )}
      </nav>
    </div>
  );
}

export default MyNav;
