import React, {useEffect} from 'react';
import { useRouter } from 'next/router'
const RedirectToHome = ({toPath}) => {

    const router = useRouter()
    useEffect(()=> {
        router.push(toPath)
    },[])
    return (
        <div className="page-padding-top text-center">
            <div className="row">
            Waiting.....
            </div>
        </div>
    );
};

export default RedirectToHome;