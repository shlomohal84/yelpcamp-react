import axios from "axios";

export const getCampgrounds = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get("/api/campgrounds", data, config);
  return response;
};

export const getCampgroundContent = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(`/api/campgrounds/${data.id}`, data, config);
  return response;
};

export const createCampground = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post("/api/campgrounds/new", data, config);
  return response;
};

export const deleteCampground = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.delete(
    `/api/campgrounds/${data.id}`,
    data,
    config
  );
  return response;
};
