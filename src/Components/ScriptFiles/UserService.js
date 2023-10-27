import axios from "axios";
import { responseOfUser } from "../ScriptFiles/UserUtility.js";

const APIURL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
const Local_API_URL = "./members.json";

const getTheUsers = (setUsers) => {
  axios
    .get(APIURL)
    .then((res) => {
      setUsers(responseOfUser(res.data));
    })
    .catch(() => {
      getTheLocalUsers(setUsers);
    });
};

const getTheLocalUsers = (setUsers) => {
  axios
    .get(Local_API_URL)
    .then((res) => {
      setUsers(responseOfUser(res.data));
    })
    .catch((error) => {
      console.error(error);
    });
};

export { getTheUsers };
