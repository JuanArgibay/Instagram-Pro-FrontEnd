import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { LeftArrowButton, RightArrowButton } from "../Arrows/Arrows";
import "./Carousel.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <li className="carousel-item" style={{ width: width }}>
      {children}
    </li>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const mobileHandlers = useSwipeable({
    onSwipedRight: () => {
      activeIndex > 0 && setActiveIndex(activeIndex - 1);
    },
    onSwipedLeft: () => {
      activeIndex < children.length - 1 && setActiveIndex(activeIndex + 1);
    },
  });
  return (
    <div {...mobileHandlers} className="carousel">
      <ul
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </ul>
      {children.length > 1 && (
        <div className="carousel__menu">
          <button
            className="carousel__menu--left"
            onClick={(e) => {
              e.preventDefault();
              activeIndex > 0
                ? setActiveIndex(activeIndex - 1)
                : setActiveIndex(children.length - 1);
            }}
          >
            <LeftArrowButton />
          </button>
          <div
            className={`carousel__menu--positionDots ${
              children.length !== 2
                ? children.length === 3
                  ? "three"
                  : "four"
                : "two"
            }`}
          >
            {React.Children.map(children, (child, index) => {
              return (
                <button
                  className={`carousel__menu--positionDots--buttons ${
                    index === activeIndex ? "active" : ""
                  } `}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(index);
                  }}
                ></button>
              );
            })}
          </div>
          <button
            className="carousel__menu--right"
            onClick={(e) => {
              e.preventDefault();
              activeIndex < children.length - 1
                ? setActiveIndex(activeIndex + 1)
                : setActiveIndex(0);
            }}
          >
            <RightArrowButton />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
