import axios from "axios";

export const getReviews = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(
    `/api/campgrounds/${data.id}/reviews`,
    data,
    config
  );
  return response;
};
export const addReview = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    `/api/campgrounds/${data.id}/reviews`,
    data,
    config
  );
  return response;
};
