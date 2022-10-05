import DefaultPhoto from "../../assets/icons/Default_pfp.svg.png";

export const DefaultProfilePic = ({ userProfile, className }) => {
  return (
    <img
      src={DefaultPhoto}
      alt={`Avatar of ${userProfile}`}
      className={className}
    ></img>
  );
};
