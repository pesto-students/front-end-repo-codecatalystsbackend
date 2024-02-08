import axios from "axios";


export const createInterview = async (id, category) => {
    try {
        const res = await axios.post(`/v1/api/interview/${id}`, {
            category
        })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}