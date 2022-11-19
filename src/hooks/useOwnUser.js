import { useState, useEffect, useContext } from 'react'
import { services } from '../services'
import { AuthContext } from '../context/authContext';

export const useOwnUser = () => {
    const [user, setUser] = useState('');
    const [userPhotos, setUserPhotos] = useState([]);
    const [keys, setKeys] = useState({limit:0, page:0});
    const [index, setIndex] = useState({lastPage:1});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);
    
    
    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);
                if (keys.page <= index.lastPage) {
                    const ownUser = await services.users.ownUserProfileServices({keys,token});
                    setUser(ownUser.data.fullUser.user);
                    ownUser.data.fullUser.photos !== 'Photos not found' ? setUserPhotos(ownUser.data.fullUser.photos) : setUserPhotos([]);
                    setIndex(ownUser.data.fullUser.index);
                }      
            } catch (error) {
                setError(error)
            } finally {
                console.log(userPhotos);
                setLoading(false)
            }
        };
        if (keys.page > 0 && keys.limit > 0) loadUser();
        
    }, [token, keys])

    return {
        user, 
        userPhotos, 
        loading, 
        error, 
        index, 
        setKeys, 
        setLoading
    };

}