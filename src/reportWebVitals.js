import { getCLS, getFCP, getFID, getTTFB, getLCP } from "web-vitals";

const reportWebVitals = (onPerfEntry) => {
  if (typeof onPerfEntry === "function") {
    getCLS(onPerfEntry);
    getFCP(onPerfEntry);
    getFID(onPerfEntry);
    getTTFB(onPerfEntry);
    getLCP(onPerfEntry);
  }
};

export default reportWebVitals;
