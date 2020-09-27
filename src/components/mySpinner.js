import React from "react";
import { Spinner } from "reactstrap";

function MySpinner() {
  return (
    <div>
      <Spinner
        className="white"
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    </div>
  );
}

export default MySpinner;
