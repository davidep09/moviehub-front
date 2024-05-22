import {useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';

function useAuth() {
    const {isAuthenticated, user, isLoading} = useAuth0();
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    useEffect(() => {
        if (!isLoading && isAuthenticated && user) {
            setIsUserLoaded(true);
        }
    }, [isAuthenticated, user, isLoading]);

    return {isAuthenticated, user, isLoading, isUserLoaded};
}

export default useAuth;