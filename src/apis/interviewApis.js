import axios from "axios";

export const createInterview = async (id, category) => {
  try {
    const res = await axios.post(`/v1/api/interview/${id}`, {
      category,
    });
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const submitInterview = async (id, payload) => {
  try {
    const res = await axios.post(`/v1/api/interview/${id}/submit`, {
      payload,
    });
    console.log(res, "res11");
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
