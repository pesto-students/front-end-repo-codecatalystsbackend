import axios from "axios";

export const signUpUser = async (payload) => {
  try {
    const res = await axios.post("/v1/api/users", payload);
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (payload) => {
  try {
    const res = await axios.post("/v1/api/user/login", payload);
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, payload) => {
  try {
    const res = await axios.post(`/v1/api/users/${id}`, payload);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (id, payload) => {
  try {
    const res = await axios.post(`/v1/api/user/${id}/reset`, payload);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
