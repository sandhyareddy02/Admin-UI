import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import PaginationComponent from "./Components/ScriptFiles/PaginationComponent.js";
import UsersListComponent from "./Components/ScriptFiles/UserListComponent.js";
import ipConfig from "./ipConfig";
import { getTheUsers } from "./Components/ScriptFiles/UserService.js";
import { getRecordOfIndex } from "./Components/ScriptFiles/PagingUtility.js";
import { searchINUsers } from "./Components/ScriptFiles/SearchUtility.js";

function App() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const selectAllRef = useRef(null);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    getTheUsers(setUsers);
  };

  const handlingOfSearchUsers = (e) => {
    setPage(1);
    filterUsers(e.target.value);
  };

  const filterUsers = (searchTerm) => {
    const filteredUsers = searchINUsers(searchTerm, users);
    setUsers(filteredUsers);
  };

  const handlingOfDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setUpdate(!update);
  };

  const handlingOfEditUser = (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, edit: true };
      }
      return user;
    });
    setUsers(updatedUsers);
    setUpdate(!update);
  };

  const handlingOfSaveUser = (id, nameRef, emailRef, roleRef) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name: nameRef.current.value,
          email: emailRef.current.value,
          role: roleRef.current.value,
          edit: false
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setUpdate(!update);
  };

  const handlingOfSelectOne = (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, selected: !user.selected };
      }
      return user;
    });
    setUsers(updatedUsers);
    setUpdate(!update);
  };

  const handlingOfSelectAll = (e) => {
    const UserIdList = users
      .filter((user) => user.show)
      .slice(
        getRecordOfIndex(page),
        getRecordOfIndex(page) + ipConfig.PAGE_SIZE
      )
      .map((user) => user.id);

    const updatedUsers = users.map((user) => {
      if (UserIdList.includes(user.id)) {
        return { ...user, selected: e.target.checked };
      }
      return user;
    });

    setUsers(updatedUsers);
    setUpdate(!update);
  };

  const handlingOfDeleteSelected = () => {
    if (
      window.confirm(
        "The selected user will be deleted from the user's list...!"
      )
    ) {
      const updatedUsers = users.filter((user) => !user.selected);
      setUsers(updatedUsers);
      selectAllRef.current.checked = false;
    }
  };

  const index = getRecordOfIndex(page);
  return (
    <div className="App">
      <input
        className="search"
        type="text"
        placeholder="Search by Name, Email or Role..."
        onChange={handlingOfSearchUsers}
      ></input>
      <UsersListComponent
        page={page}
        setPage={setPage}
        handlingOfSelectAll={handlingOfSelectAll}
        selectAllRef={selectAllRef}
        handlingOfSelectOne={handlingOfSelectOne}
        handlingOfSaveUser={handlingOfSaveUser}
        handlingOfEditUser={handlingOfEditUser}
        handlingOfDeleteUser={handlingOfDeleteUser}
        users={users
          .filter((user) => user.show)
          .slice(index, index + ipConfig.PAGE_SIZE)}
      />
      <PaginationComponent
        usersLength={users.filter((user) => user.show).length}
        page={page}
        setPage={setPage}
        handlingOfDeleteSelected={handlingOfDeleteSelected}
      />
    </div>
  );
}

export default App;
