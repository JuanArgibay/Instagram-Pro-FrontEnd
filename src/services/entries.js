import axios from "axios";

// Funcion destinada a crear una entrada

export const newEntry = async ({ post, token }) => {
  try {
    const FormData = require("form-data");

    const entry = new FormData();
    post.description && entry.append("description", post.description);
    post.images?.map((item, index) => entry.append(`image-${index}`, item));

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/entries`,
      entry,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

// Funcion destinada a enviar un comentario a una entrada

export const sendCommentToEntry = async ({ comment, idEntry, token }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/entries/${idEntry}/comment`,
      comment,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

// Funcion destinada a enviar un like a una entrada o retirarselo

export const likeAnEntry = async ({ idEntry, token }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/entries/${idEntry}/like`,
      "",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

// Funcion destinada a recuperar todas las entradas

export const listEntries = async ({ keyword, page, limit, token }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/entries?keyword=${
        keyword !== undefined ? `${keyword}` : ""
      }&page=${page !== undefined ? `${page}` : ""}&limit=${
        limit !== undefined ? `${limit}` : ""
      }`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
      console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Funcion destinada a recuperar una sola entrada

export const getSingleEntry = async ({ idEntry, token }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/entries/${idEntry}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Funcion destinada a recuperar los comentarios de una entrada

export const viewEntryComments = async ({ idEntry, page, limit, token }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/entries/${idEntry}/comment?page=${
        page !== undefined ? `${page}` : ""
      }&limit=${limit !== undefined ? `${limit}` : ""}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return data;
  } catch (err) {
    console.error(err);
  }
};
