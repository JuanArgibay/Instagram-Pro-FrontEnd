import axios from "axios";

// Funcion de registro
export const registerUserService = async ({
  username,
  password,
  email,
} = {}) => {
  if (!username || !password || !email)
    throw new Error("All params are required");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/users`,
      { username, password, email },
      {
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Funcion de login
export const loginUserService = async ({ email, password }) => {
  if (!email || !password) throw new Error("All params are required");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/login`,
      { email, password },
      {
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Función para la edicion de los usuarios
export const editUserService = async ({ token, username, email, avatar }) => {
  if (!username && !email && !avatar) throw new Error("need edit anything");
  try {
    const FormData = require("form-data");
    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("avatar", avatar);

    const response = await axios.put(
      `${process.env.REACT_APP_SERVER}/users`,
      form,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Funcion que recoje los datos de un usuario y sus fotos
export const userIdProfileServices = async (idUser, {page, limit}) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/users/${idUser}?page=${
        page !== undefined ? `${page}` : ""}&limit=${
        limit !== undefined ? `${limit}` : ""
      }`,
    );

    if(response.status !== 200) throw new Error (response.message);
    return response.data;
    
}

// Funcion que recoje los datos del usuario logueado y sus fotos
export const ownUserProfileServices = async ({token, keys}) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/users?page=${
        keys.page !== undefined ? `${keys.page}` : ""}&limit=${
        keys.limit !== undefined ? `${keys.limit}` : ""
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if(response.status !== 200)  throw new Error(response.message)
    return response.data;
}


// Función que recoje los datos de un usuario
export const getUser = async ({ idUser, token }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/users/profile/${idUser}`,
      "",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
