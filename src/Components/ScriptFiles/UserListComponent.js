import PropTypes from "prop-types";
import React, { useEffect } from "react";
import UserComponent from "../ScriptFiles/UserComponent.js";
import ipConfig from "../../../src/ipConfig";
import styles from "../StyleFiles/UserListComponent.module.css";

const UsersListComponent = (props) => {
  const {
    users,
    handlingOfDeleteUser,
    handlingOfEditUser,
    handlingOfSaveUser,
    handlingOfSelectAll,
    handlingOfSelectOne,
    selectAllRef,
    setPage,
    page
  } = props;
  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);
  let fillTheRows = [];
  for (
    let i = users.filter((user) => user.show).length;
    i < ipConfig.PAGE_SIZE;
    i++
  ) {
    fillTheRows.push(<tr key={i}></tr>);
  }

  if (users.length === 0 && page === 1) {
    return <div>NO USERS FOUND IN THE SYSTEM...!</div>;
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              ref={selectAllRef}
              onChange={(e) => {
                handlingOfSelectAll(e);
              }}
              name="handlingOfSelectAll"
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return user.show ? (
            <UserComponent
              handlingOfSelectOne={handlingOfSelectOne}
              handlingOfSaveUser={handlingOfSaveUser}
              handlingOfEditUser={handlingOfEditUser}
              handlingOfDeleteUser={handlingOfDeleteUser}
              key={user.id}
              user={user}
            />
          ) : (
            ""
          );
        })}
        {fillTheRows}
      </tbody>
    </table>
  );
};

UsersListComponent.propTypes = {
  users: PropTypes.array.isRequired,
  handlingOfDeleteUser: PropTypes.func.isRequired,
  handlingOfEditUser: PropTypes.func.isRequired,
  handlingOfSaveUser: PropTypes.func.isRequired,
  handlingOfSelectAll: PropTypes.func.isRequired,
  handlingOfSelectOne: PropTypes.func.isRequired,
  selectAllRef: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

export default UsersListComponent;
