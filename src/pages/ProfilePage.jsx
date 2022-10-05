import { useOwnUser } from '../hooks/useOwnUser';
import { PhotoUserList } from '../components/PhotoUserList/PhotoUserList'
import { Link } from 'react-router-dom'
import { Loading } from '../components/Loading/Loading';
import { useState, useEffect } from 'react';

export const ProfilePage = () => {
    const { user, userPhotos, loading, error, index, setKeys, setLoading } = useOwnUser();
    const [totalPhotos, setTotalPhotos] = useState([]);

    // Definimos el límite de "fotos" para cada pagina
    const [pagination, setPagination] = useState({
        limit: 10,
        page: 1,
    });

    useEffect(() => {
        setKeys(pagination)
    }, [pagination, setKeys]);

    useEffect(() => {
        setTotalPhotos([...totalPhotos, ...userPhotos]);
        setLoading(false);
    }, [userPhotos]);

    if (totalPhotos.length === 0 && loading) return <Loading></Loading>
    if (error) return <p>{error.message}</p>

    // función que actualiza la paginación
    const handleClick = () => {
        setPagination({ ...pagination, ...{ page: pagination.page + 1 } });
    }

    return (
        <section className='own_profile'>
            <article className='profile-data'>
                <h1>{user.username}</h1>
                <p className='user-date-created'>Since: {new Date(user.createdAt).toLocaleString()}</p>
                <Link to='/edit' className='edit-link'>
                    <p className='edit-link-text'>
                        Edit user
                    </p>
                </Link>
            </article>
            {userPhotos.length > 1 ? (
                <PhotoUserList
                    totalPhotos={totalPhotos}
                    pagination={pagination}
                    handleClick={handleClick}
                    loading={loading}
                    index={index}
                />
            ) : null
            }
        </section>
    )
}
