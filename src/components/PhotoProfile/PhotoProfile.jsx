import './PhotoProfile.css'
import DefaultProfilePic from "../../assets/icons/Default_pfp.svg.png";
import { Link } from 'react-router-dom';

export const PhotoProfile = ({ user }) => {
    return (
        <>
            {user.avatar ?
                (
                    <Link to='/users'>
                        <img
                            src={`${process.env.REACT_APP_SERVER}/${user.avatar}`}
                            alt={`avatar of ${user.username}`}
                            className='avatar'
                            title="My profile"
                            >
                        </img>
                    </Link>
                ) : (
                    <Link to='/users'>
                        <img
                            src={DefaultProfilePic}
                            alt={`avatar of ${user.username}`}
                            className='avatar'
                            title="My profile"
                            >
                        </img>
                    </Link>
                )}
        </>
    )
}