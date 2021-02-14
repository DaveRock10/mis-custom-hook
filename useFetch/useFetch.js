import { useEffect, useRef, useState } from "react"


export const useFetch = (url) => {
    
    const isMounted = useRef(true);

    const originalState = {data:null, loading: true, error: null};
    const [state, setstate] = useState(originalState);

    useEffect(() => {
        
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        
        setstate(originalState);

        fetch(url)
            .then( resp => resp.json())
            .then(data =>{
                
                if (isMounted.current) {
                        setstate({
                            loading: false,
                            error: null,
                            data
                        });
                    } else {
                        console.log('setState no se llamó');
                    }
            })
            .catch(()=>{
                setstate({
                    ...originalState,
                    loading: false,
                    error: 'No se pudo cargar la información'
                });
            });

    }, [url]);

    return state;

}
