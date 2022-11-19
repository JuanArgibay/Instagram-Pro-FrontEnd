import './HomeLink.css';
import postIcon from '../../assets/icons/home-icon.png'

export const HomeLink = () => {
    return (
        <img
            src={postIcon}
            alt='icon-home'
            className='home-icon'
            title="Home"
            >
        </img>
    )
}