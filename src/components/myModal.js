import React from "react";
import {
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function MyModal({isOpen, toggle, body, onClick, loading}) {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Enter your list</ModalHeader>
        <ModalBody>
          <div className="form-group">
            {body}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClick}>
            {loading ? (
              <Spinner
                className="mr-2"
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
            add
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MyModal;
