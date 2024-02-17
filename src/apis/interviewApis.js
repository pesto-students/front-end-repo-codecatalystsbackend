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
    const res = await axios.post(`/v1/api/interview/${id}/submit`, [
      ...payload,
    ]);
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllInterviews = async ({
  id = "",
  pageSize = 10,
  pageNumber = 1,
} = {}) => {
  try {
    const res = await axios.get(
      `/v1/api/interview/user/${id}?page_number=${pageNumber}&page_size=${pageSize}`
    );
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewDetailsById = async (id) => {
  try {
    const res = await axios.get(`/v1/api/interview/${id}`);
    console.log(res, "res11");
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
