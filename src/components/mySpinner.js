import React from "react";
import { Spinner } from "reactstrap";

function MySpinner({ size }) {
  const _size = size ?? "sm";
  return (
    <div>
      <Spinner
        className="white"
        as="span"
        animation="grow"
        size={_size}
        role="status"
        aria-hidden="true"
      />
    </div>
  );
}

export default MySpinner;
