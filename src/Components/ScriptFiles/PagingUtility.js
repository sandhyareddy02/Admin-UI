import ipConfig from "../../../src/ipConfig";

export const getTotalNoOfPages = (length) => {
  return Math.ceil(length / 10);
};

export const getRecordOfIndex = (page) => {
  return (page - 1) * ipConfig.PAGE_SIZE;
};
