import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "reactstrap";
import {
  addData,
  deleteData,
  editData,
  fetchData,
  fetchOne,
} from "./apiServices";
import MyModal from "./components/myModal";
import MySpinner from "./components/mySpinner";
import "./App.css";
import { titleContext } from ".";

function App() {
  const title = useContext(titleContext);
  const [margin, setMargin] = useState("0px");
  const [lists, setLists] = useState({ status: false, data: [] });
  const [list, setList] = useState({});
  const [overlay, setOverlay] = useState({
    modal: false,
    modify: false,
  });
  const [loading, setLoading] = useState({
    add: false,
    edit: false,
    delete: false,
    cancel: false,
    update: null,
  });
  const textRef = useRef();

  const toggle = () => {
    setOverlay({ modal: !overlay.modal });
  };
  const checkNote = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, cancel: true });
    var response = await fetchOne(list.id);
    if (response !== "failed") {
      setLoading({ ...loading, cancel: false });
      if (response[0].name !== list.text) {
        setLoading({ ...loading, update: list });
      }
      setOverlay({ modify: false });
    }
  };
  const editList = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, edit: true });
    var editResponse = await editData(list.id, list.text);
    if (editResponse !== "failed") {
      setLoading({ ...loading, edit: false });
      setOverlay({ modify: false });
    }
  };
  const deleteList = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, delete: true });
    var deleteResponse = await deleteData(list.id);
    if (deleteResponse !== "failed") {
      setLoading({ ...loading, delete: false });
      setOverlay({ modify: false });
      setLoading({ ...loading, update: deleteResponse });
    }
  };
  const addList = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });
    var addResponse = await addData(textRef.current.value);
    if (addResponse !== "failed") {
      setLoading({ ...loading, add: false });
      setLoading({ ...loading, update: addResponse });
      setOverlay({ modal: false });
    }
  };
  const fetchLists = async () => {
    var data = await fetchData();
    return data;
  };
  useEffect(() => {
    setLists({ status: false, data: [] });
    fetchLists().then((data) => {
      setLists({ status: true, data: data });
    });
  }, [loading.update]);
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span
          className="navbar-text"
          style={{ fontSize: "48", fontWeight: "bold" }}
        >
          {title}
        </span>
        {overlay.modify ? (
          <Button color="warning" className="text-white" onClick={checkNote}>
            {loading.cancel ? <MySpinner /> : "Cancel"}
          </Button>
        ) : (
          <Button color="success" onClick={toggle}>
            Add List
          </Button>
        )}
      </nav>
      <ul
        className="list-group list-group-flush"
        style={{ marginBottom: margin }}
      >
        {lists.data.length === 0 ? (
          lists.status === false ? (
            <div className="middle">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="middle">empty list</div>
          )
        ) : (
          lists.data.map((value, index) => {
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

      <MyModal
        isOpen={overlay.modal}
        toggle={toggle}
        body={
          <textarea
            ref={textRef}
            className="form-control"
            placeholder="type something ..."
            id="exampleFormControlTextarea1"
            rows="3"
          />
        }
        onClick={addList}
        loading={loading.add}
      />

      {overlay.modify ? (
        <div style={{ backgroundColor: "gray" }}>
          <div className="bg.dark row justify-content-center modify">
            <div className="col-5">
              <Button color="danger" block onClick={deleteList}>
                {loading.delete ? <MySpinner /> : <div>Delete</div>}
              </Button>
            </div>
            <div className="col-5">
              <Button color="primary" block onClick={editList}>
                {loading.edit ? <MySpinner /> : "Edit"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
