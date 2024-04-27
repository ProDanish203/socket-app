import api from "./middleware";

export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const { data } = await api.post(
      "/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const registerUser = async ({
  username,
  password,
  email,
  fullName,
  gender,
}: {
  username: string;
  password: string;
  email: string;
  fullName: string;
  gender: string;
}) => {
  try {
    const { data } = await api.post("/auth/register", {
      username,
      password,
      email,
      fullName,
      gender,
    });

    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/users/current-user");

    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await api.post("/auth/logout");

    return {
      success: true,
      response: data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
