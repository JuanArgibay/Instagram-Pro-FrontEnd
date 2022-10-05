import { Link } from 'react-router-dom';
import { ButtonForm } from '../ButtonForm/ButtonForm';
import './PhotoUserList.css'

export const PhotoUserList = ({
    handleClick,
    pagination,
    loading,
    index,
    totalPhotos
}) => {
    return (
        <article className='photos_user'>
            {
                totalPhotos.length ? (
                    <>
                        <ul className='photos_list'>
                            {totalPhotos.map(totalPhoto =>
                                <Link key={totalPhoto.photoId} className='photo-link-post' to={`/post/${totalPhoto.entryId}`}>
                                    <li>
                                        <img
                                            src={`${process.env.REACT_APP_SERVER}/${totalPhoto.photoName}`}
                                            alt={totalPhotos.photoId}>
                                        </img>
                                    </li>
                                </Link>
                            )}
                        </ul>
                        {pagination.page !== index?.lastPage && (
                            loading ? <p>Loading...</p> : <ButtonForm message={'See more results'} handleClick={handleClick}></ButtonForm>
                        )}
                    </>
                ) : null
            }
        </article>
    )
}
