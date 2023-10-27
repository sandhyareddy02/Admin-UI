import React, { useRef } from "react";
import PropTypes from "prop-types";
import styles from "../StyleFiles/UserComponent.module.css";

const UserComponent = (props) => {
  const {
    user,
    handlingOfDeleteUser,
    handlingOfEditUser,
    handlingOfSaveUser,
    handlingOfSelectOne
  } = props;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  const handlingOfSelectChange = () => {
    handlingOfSelectOne(user.id);
  };

  const handlingOfSaveClick = () => {
    handlingOfSaveUser(
      user.id,
      nameRef.current.value,
      emailRef.current.value,
      roleRef.current.value
    );
  };

  const handlingOfEditClick = () => {
    handlingOfEditUser(user.id);
  };

  const handlingOfDeleteClick = () => {
    handlingOfDeleteUser(user.id);
  };

  return (
    <tr key={user.id} className={user.selected ? styles.selected : ""}>
      <td>
        <label htmlFor={`check-${user.id}`}>
          <input
            id={`check-${user.id}`}
            type="checkbox"
            onChange={handlingOfSelectChange}
            checked={user.selected}
          />
        </label>
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        />
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        <input
          className={user.edit ? styles.editable : styles.readOnly}
          readOnly={!user.edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </td>
      <td className={styles.icons}>
        {user.edit ? (
          <i
            onClick={handlingOfSaveClick}
            className={`${styles.iconOne} fas fa-save`}
          />
        ) : (
          <i
            onClick={handlingOfEditClick}
            className={`${styles.iconOne} fas fa-edit`}
          />
        )}
        <i
          onClick={handlingOfDeleteClick}
          className={`${styles.delIcon} fas fa-trash-alt`}
        />
      </td>
    </tr>
  );
};

UserComponent.propTypes = {
  user: PropTypes.object.isRequired,
  handlingOfDeleteUser: PropTypes.func.isRequired,
  handlingOfEditUser: PropTypes.func.isRequired,
  handlingOfSaveUser: PropTypes.func.isRequired,
  handlingOfSelectOne: PropTypes.func.isRequired
};

export default UserComponent;
