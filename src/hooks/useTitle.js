import { useEffect } from 'react';

const useTitle = title => {
    useEffect(()=>{
        document.title=`${title} | SerenityHub`;
    },[title])
};

export default useTitle;