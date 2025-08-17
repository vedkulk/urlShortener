import { createContext } from "react";
import useFetch from "./hooks/useFetch";
import { getCurrentUser } from "./db/apiAuth";
import { useEffect } from "react";
import { useContext } from "react";

const UrlContext = createContext();

const UrlProvider = ({children}) => {
    const {data:user, loading, fn: fetchUser} = useFetch(getCurrentUser)
    const isAuthenticated = user?.role === "authenticated"

    useEffect(()=>{
        fetchUser()
    }, [])

    return <UrlContext.Provider value={{ user, loading, fetchUser, isAuthenticated }}>
        {children}
    </UrlContext.Provider>
}
export const urlState= () =>{
    return useContext(UrlContext)
}

export default UrlProvider