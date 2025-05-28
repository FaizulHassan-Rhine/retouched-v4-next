
import { userContextManager } from '@/context/AppContexts';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';


const PrivateRoute = (WrappedComponent) => {
  return function WithAuth(props) {
    const [getUserInfo] = useContext(userContextManager);
    const router = useRouter();

    useEffect(() => {
      if (!getUserInfo || getUserInfo.status_code !== 200) {
        router.push('/');
      }
    }, [getUserInfo]);

    // Prevent rendering until auth check is done
    if (!getUserInfo || getUserInfo.status_code !== 200) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default PrivateRoute;
