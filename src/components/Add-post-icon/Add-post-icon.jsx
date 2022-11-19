import './Add-post-icon.css';
import PostIcon from '../../assets/icons/add-post-icon.png';

export const AddPostIcon = () => {
    return <img
        src={PostIcon}
        alt="addIcon"
        className='post-icon'
        title='Add post'
        >
    </img>;
};