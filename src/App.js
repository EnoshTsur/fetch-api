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

function useGet(url) {

    const [ response, setResponse, ] = React.useState({ ...responseObject })

    React.useEffect(() => {
        async function fetchData() {
            const data = await fetch(url)
            return await data.json()
        } 

        fetchData()
        .then(res => setResponse({...response, data: res , loading: false}))
        .catch(err => setResponse({...response, error: err, loading: false, }))

    }, [])

    return response
}

function App() {

    const { data, loading, error } = useGet('http://localhost:8080/user/findById/3')

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
