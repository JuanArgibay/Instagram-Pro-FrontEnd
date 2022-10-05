import { createContext, useEffect, useState } from'react'
import { services } from '../services';


export const AuthContext = createContext();

export const AuthProviderComponent = ({children}) => {
    const [ token, setToken ] = useState(localStorage.getItem('token'));
    const [ user, setUser ] = useState(null);
    const [ keys, setKeys ] = useState({limit:10, page:1});
    const [toggleAddPost, setToggleAddPost] = useState(false);

    const logout = () => {
        setUser(null)
        setToken('')
    }
    const login = (token) => {
        setToken(token);
    }

    // Controlamos los cambios en el toquen
    useEffect(() => {
        localStorage.setItem('token', token);
        const getProfile = async () => {
            try {
                const profile = await services.users.ownUserProfileServices({keys, token});
                setUser(profile.data.fullUser.user)
            } catch {
               logout();
            }
        }
        if(token) getProfile();
    }, [token])

    // Controlamos los cambios del user
    useEffect(() => {
        const getProfile = async () => {
            try {
                const profile = await services.users.ownUserProfileServices({keys, token});
                setUser(profile.data.fullUser.user)
            } catch {
               logout();
            }
       
        }
        if(!user) getProfile();
    }, [user])


    return <AuthContext.Provider
                value={{
                    user, 
                    setUser, 
                    token, 
                    login, 
                    logout,
                    toggleAddPost,
                    setToggleAddPost
                }}>
                {children}
            </AuthContext.Provider>;
}