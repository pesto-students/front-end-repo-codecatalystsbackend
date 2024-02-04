import axios from "axios";

const DOMAIN = "https://talentbridge-zkvv.onrender.com";
const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(
  (config) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
      config.url = `${DOMAIN}${config.url}`;
    }
    let user = localStorage.getItem("TBuser");
    if (user) {
      let { access_token } = JSON.parse(user);
        if (access_token) {
          config.headers["x-access-token"] = access_token;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
