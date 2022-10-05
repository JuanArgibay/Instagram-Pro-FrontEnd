import { useEffect, useRef, useState } from "react";
import { services } from "../../services";
import { AddPhotoIcon } from "../AddPhotoIcon/AddPhotoIcon";
import { CleanPhotosIcon } from "../CleanPhotosIcon/CleanPhotosIcon";
import { SendPostIcon } from "../SendPostIcon/SendPostIcon";

import "./NewPostBox.css";

export const NewPostBox = ({ totalPosts, setTotalPosts, token }) => {
  const [images, setImages] = useState([]);
  const hiddenInputFileImageA = useRef(null);
  const hiddenInputFileImageB = useRef(null);
  const hiddenInputFileImageC = useRef(null);
  const hiddenInputFileImageD = useRef(null);
  const textArea = useRef(null);

  /* Realizamos focus al text area de la caja de creacion de post una vez se renderiza */
  useEffect(() => {
    textArea.current.focus();
  }, []);

  /* Guardamos las imagenes que van llegando en un array */
  const handleOnChange = ({ value }) => {
    setImages([...images, value]);
  };

  /* Para poder usar un boton personalizado y no el input por defecto de las imagenes creamos y escuchamos especificamente cada input */
  const handleClickImageA = () => {
    hiddenInputFileImageA.current.click();
  };
  const handleClickImageB = () => {
    hiddenInputFileImageB.current.click();
  };
  const handleClickImageC = () => {
    hiddenInputFileImageC.current.click();
  };
  const handleClickImageD = () => {
    hiddenInputFileImageD.current.click();
  };

  /* Una vez realicemos submit con los datos del formulario relleno, procesamos la llamda POST a la API */
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const description = e.target.elements.description.value;

      let post = {};

      if (images.length < 1) {
        throw new Error("Must exist at least one photo");
      }
      if (description) {
        post = { description };
      }
      post = { ...post, images };

      const sendPost = async () => {
        const response = await services.entries.newEntry({ post, token });
        setTotalPosts([response.data.data.entry, ...totalPosts]);

        setImages([]);
      };
      sendPost();

      e.target.reset();
    } catch (err) {
      console.error(err);
    }
  };

  /* Handle destinado a limpiar las fotos en caso de que el usuario quiera reiniciar y volver a seleccionar las fotos a subir */
  const handleClearClick = (e) => {
    e.nativeEvent.path[3].reset();
    setImages([]);
  };

  /* Componente cual finalidad es tener una caja donde introducir fotos y un texto descriptivo (opcional), para ello hemos querido modificar el input por defecto. Guardamos en un array las fotos (hasta un maximo de 4) y renderizamos en consecuencia, mostrando los botones necesarios y la previsualizacion de cada foto */
  return (
    <form onSubmit={handleSubmit} className="newPostBox">
      <div className="newPostBox__photos">
        <button
          type="button"
          style={{ display: images.length >= 1 && "none" }}
          onClick={handleClickImageA}
        >
          <AddPhotoIcon></AddPhotoIcon>
        </button>
        <input
          type="file"
          name="imageA"
          ref={hiddenInputFileImageA}
          style={{ display: "none" }}
          onChange={(event) => handleOnChange({ value: event.target.files[0] })}
        />
        {images.length >= 1 && (
          <div>
            <img
              className="newPostBox__picPreview"
              src={URL.createObjectURL(images[0])}
              alt="sdf"
              height="50px"
            ></img>
          </div>
        )}

        {images.length >= 1 && (
          <>
            <button
              type="button"
              style={{ display: images.length >= 2 && "none" }}
              onClick={handleClickImageB}
            >
              <AddPhotoIcon></AddPhotoIcon>
            </button>
            <input
              type="file"
              name="imageB"
              ref={hiddenInputFileImageB}
              style={{ display: "none" }}
              onChange={(event) =>
                handleOnChange({ value: event.target.files[0] })
              }
            />
          </>
        )}
        {images.length >= 2 && (
          <div>
            <img
              className="newPostBox__picPreview"
              src={URL.createObjectURL(images[1])}
              alt="sdf"
              height="50px"
            ></img>
          </div>
        )}

        {images.length >= 2 && (
          <>
            <button
              type="button"
              style={{ display: images.length >= 3 && "none" }}
              onClick={handleClickImageC}
            >
              <AddPhotoIcon></AddPhotoIcon>
            </button>
            <input
              type="file"
              namne="imageC"
              ref={hiddenInputFileImageC}
              style={{ display: "none" }}
              onChange={(event) =>
                handleOnChange({ value: event.target.files[0] })
              }
            />
          </>
        )}
        {images.length >= 3 && (
          <div>
            <img
              className="newPostBox__picPreview"
              src={URL.createObjectURL(images[2])}
              alt="sdf"
              height="50px"
            ></img>
          </div>
        )}

        {images.length >= 3 && (
          <>
            <button
              type="button"
              style={{ display: images.length >= 4 && "none" }}
              onClick={handleClickImageD}
            >
              <AddPhotoIcon></AddPhotoIcon>
            </button>
            <input
              type="file"
              name="imageD"
              ref={hiddenInputFileImageD}
              style={{ display: "none" }}
              onChange={(event) =>
                handleOnChange({ value: event.target.files[0] })
              }
            />
          </>
        )}
        {images.length >= 4 && (
          <div>
            <img
              className="newPostBox__picPreview"
              src={URL.createObjectURL(images[3])}
              alt="sdf"
              height="50px"
            ></img>
          </div>
        )}

        {images.length >= 1 && (
          <button type="button" onClick={(e) => handleClearClick(e)}>
            <CleanPhotosIcon></CleanPhotosIcon>
          </button>
        )}

        <span>{images.length}/4</span>
      </div>
      <div className={`newPostBox__description `}>
        <textarea
          maxLength={200}
          data-limit-row-lent="true"
          rows={2}
          cols={40}
          name="description"
          ref={textArea}
          placeholder="Add words to your views!"
        />
      </div>
      <button
        disabled={!images.length >= 1 && true}
        className="newPostBox__sendButton"
      >
        <SendPostIcon></SendPostIcon>
      </button>
    </form>
  );
};
