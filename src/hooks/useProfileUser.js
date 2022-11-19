import { useState, useEffect, } from 'react';
import { services } from '../services';

export const useProfileUser = (idUser) => {
    const [user, setUser] = useState('');
    const [userPhotos, setUserPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [index, setIndex] = useState({ lastPage: 1 });
    const [keys, setKeys] = useState({ limit: 0, page: 0 });

    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);
                if (keys.page <= index.lastPage) {
                    const data = await services.users.userIdProfileServices(idUser, keys);
                    setUser(data.data.fullUser.user);
                    setUserPhotos(data.data.fullUser.photos);
                    setIndex(data.data.fullUser.index)
                }
                
            } catch (error) {
                setError(error.response.data)
            } finally {
                setLoading(false)
            }
        }
        if (keys.page > 0 && keys.limit > 0) loadUser();
    }, [idUser, keys])

    return {
        user, 
        userPhotos, 
        loading, 
        error, 
        index, 
        setLoading, 
        setKeys
    };

}