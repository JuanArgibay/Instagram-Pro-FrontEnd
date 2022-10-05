import LeftArrow from "../../assets/icons/leftArrow.svg";
import RightArrow from "../../assets/icons/rightArrow.svg";

export const LeftArrowButton = () => {
  return (
    <img
      src={LeftArrow}
      alt={`left arrow button`}
      className="arrowButtons"
    ></img>
  );
};

export const RightArrowButton = () => {
  return (
    <img
      src={RightArrow}
      alt={`right arrow button`}
      className="arrowButtons"
    ></img>
  );
};
