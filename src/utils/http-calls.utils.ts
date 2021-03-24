import axios from "axios";

export const callApi = async (url: string) => {
  try {
    const { data } = await axios(url);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const callSecureApi = async (url: string, token: string) => {
  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
