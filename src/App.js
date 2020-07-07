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

function useBodyFetch(method) {

    function FetchData(url, body) {

        const [response, setResponse, ] = React.useState({ ...responseObject, })

        React.useEffect(() => {
            async function sendRequest() {
                const data = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })

                return await data.json()
            }

            sendRequest()
            .then(res => setResponse({ ...response, data: res, loading: false, }))
            .catch(err => setResponse({...response, error: err, loading: false, }))

        }, [])

        return response
    }

    return FetchData
}

const useGet = useFetch('GET')
const useDelete = useFetch('DELETE')

const usePost = useBodyFetch('POST')
const usePut = useBodyFetch('PUT')

function App() {

    const { data, loading, error } = useDelete('http://localhost:8080/user/add', { firstName: 'Avi', lastName: null, age: 34 })
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
