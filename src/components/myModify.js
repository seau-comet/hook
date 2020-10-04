import React from "react";
import MySpinner from "./mySpinner";
import { Button } from "reactstrap";

function myModify({
  modify,
  deleteList,
  editList,
  loadingDelete,
  loadingEdit,
}) {
  return (
    <div>
      {modify ? (
        <div className="bg.dark row justify-content-around fixed-bottom mb-1">
          <div className="col-5">
            <Button color="danger" block onClick={deleteList}>
              {loadingDelete ? <MySpinner /> : <div>Delete</div>}
            </Button>
          </div>
          <div className="col-5">
            <Button color="primary" block onClick={editList}>
              {loadingEdit ? <MySpinner /> : "Edit"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default myModify;
