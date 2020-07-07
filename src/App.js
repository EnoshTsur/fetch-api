import React from 'react';
import Loader from './components/Loader/Loader'

function fetchData(url) {
    return async method => {
        const response = await fetch(url, {
            method,
        })
        return await response.json()
    }
}


function fetchWithBody(url, body) {
    return async method => {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return await response.json()
    }
}

const responseObject = Object.freeze({
    data: null,
    loading: true,
    error: null ,
})



// fisrt function 
function useFetch(method) {

    // second function 
    function FetchData(url) {
        const [ response, setResponse, ] = React.useState({ ...responseObject })

        React.useEffect(() => {
            async function sendRequest() {
                const data = await fetch(url, {
                    method
                })
                return await data.json()
            } 
    
            sendRequest()
            .then(res => setResponse({...response, data: res , loading: false}))
            .catch(err => setResponse({...response, error: err, loading: false, }))
    
        }, [])

        return response
    }

    // return second
    return FetchData
}

const useGet = useFetch('GET')
const useDelete = useFetch('DELETE')


function App() {

    const { data, loading, error } = useDelete('http://localhost:8080/user/delete/3')
    // const { data, loading, error} = usePost('http://localhost:8080/user/add', { firstName: 'itay', lastName: 'gooby', age: 23, })


    if(error) {
        console.log('!!! ', error)
    }

    if(data) {
        console.log('!!! ', data)
    }

     return (
        <div>
            {
                loading && (
                    <Loader />
                )
            }
        </div>
    );
}



export default App;
