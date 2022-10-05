import { useProfileUser } from '../hooks/useProfileUser';
import { Loading } from '../components/Loading/Loading';
import { PhotoUserList } from '../components/PhotoUserList/PhotoUserList'
import { useParams } from 'react-router-dom';
import { PhotoProfile } from '../components/PhotoProfile/PhotoProfile';
import { ProfilePage } from './ProfilePage';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const ProfileUserPage = () => {

    const { id: idUser } = useParams();
    const { user, userPhotos, loading, error, index, setKeys, setLoading } = useProfileUser(idUser);
    const { user: myUser } = useContext(AuthContext);
    const [totalPhotos, setTotalPhotos] = useState([]);

    // Definimos el límite de "fotos" para cada pagina
    const [pagination, setPagination] = useState({
        limit: 10,
        page: 1,
    });

    useEffect(() => {
        setKeys(pagination)
    }, [pagination]);

    useEffect(() => {
        setTotalPhotos([...totalPhotos, ...userPhotos]);
        setLoading(false);
    }, [userPhotos]);

    // función que actualiza la paginación
    const handleClick = () => {
        setPagination({ ...pagination, ...{ page: pagination.page + 1 } });
    };

    if (totalPhotos.length === 0 && loading) return <Loading></Loading>
    if (error) return <p>{error.message}</p>

    return (
        <>
            {user.id === myUser?.id ?
                <ProfilePage /> : (
                    <section className='user-profile-page'>
                        <article className='user-profile-head'>
                            <PhotoProfile user={user}></PhotoProfile>
                            <h1 className='user_username'>{user.username}</h1>
                            <p className='date_created'>Since: {new Date(user.createdAt).toDateString()}</p>
                        </article>
                        {Array.isArray(userPhotos) ? (
                            <PhotoUserList
                                totalPhotos={totalPhotos}
                                loading={loading}
                                pagination={pagination}
                                index={index}
                                handleClick={handleClick}
                            />
                        ) : null
                        }
                    </section>)
            }
        </>
    )
}



