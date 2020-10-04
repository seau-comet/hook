import React, { useState, useEffect, useRef } from "react";

import {
  addData,
  deleteData,
  editData,
  fetchData,
  fetchOne,
} from "./services/apiServices";

import MyModal from "./components/myModal";
import MyNav from "./components/myNav";
import MyLists from "./components/myList";
import MyModify from "./components/myModify";

import "./style/App.css";

function App() {
  window.addEventListener('click', (e)=>e.preventDefault());

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

  const checkNote = async () => {
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

  const baseList = async (start, end, update, overlay, api) => {
    setLoading(start);
    var response = await api;
    if (response !== "failed") {
      if (update !== false) {
        setLoading({ ...loading, update: response });
      }

      setLoading(end);
      setOverlay(overlay);
    }
  };

  const editList = async () => {
    baseList(
      { ...loading, edit: true },
      { ...loading, edit: false },
      false,
      { modify: false },
      editData(list.id, list.text)
    );
  };

  const deleteList = async () => {
    baseList(
      { ...loading, delete: true },
      { ...loading, delete: false },
      true,
      { modify: false },
      deleteData(list.id)
    );
  };

  const addList = async () => {
    baseList(
      { ...loading, add: true },
      { ...loading, add: false },
      true,
      { modal: false },
      addData(textRef.current.value)
    );
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

  useEffect(() => {}, []);
  return (
    <div>
      <MyNav
        modify={overlay.modify}
        checkNote={checkNote}
        cancel={loading.cancel}
        toggle={toggle}
      />

      <MyLists
        length={lists.data.length}
        lists={lists.data}
        margin={margin}
        setList={setList}
        setMargin={setMargin}
        setOverlay={setOverlay}
        status={lists.status}
      />

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

      <MyModify
        deleteList={deleteList}
        editList={editList}
        loadingDelete={loading.delete}
        loadingEdit={loading.edit}
        modify={overlay.modify}
      />
    </div>
  );
}

export default App;
