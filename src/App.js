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
    error: null,
})



// fisrt function 
function useFetch(method) {

    // second function 
    function FetchData(url) {
        const [response, setResponse,] = React.useState({ ...responseObject })

        React.useEffect(() => {
            async function sendRequest() {
                const data = await fetch(url, {
                    method
                })
                return await data.json()
            }

            sendRequest()
                .then(res => setResponse({ ...response, data: res, loading: false }))
                .catch(err => setResponse({ ...response, error: err, loading: false, }))

        }, [])

        return response
    }

    // return second
    return FetchData
}

function useBodyFetch(method) {

    function FetchData(url, body) {

        const [response, setResponse,] = React.useState({ ...responseObject, })

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
                .catch(err => setResponse({ ...response, error: err, loading: false, }))

        }, [])

        return response
    }

    return FetchData
}

const useGet = useFetch('GET')
const useDelete = useFetch('DELETE')

const usePost = useBodyFetch('POST')
const usePut = useBodyFetch('PUT')

function renderFecth(method) {

    function Fetch({ url, children, }) {
        const [response, setResponse,] = React.useState({ ...responseObject, })

        React.useEffect(() => {
            async function sendRequest() {
                const data = await fetch(url, {
                    method
                })
                return await data.json()
            }

            sendRequest()
                .then(res => setResponse({ ...response, data: res, loading: false }))
                .catch(err => setResponse({ ...response, error: err, loading: false, }))

        }, [])

        return (
            <>
                {children(response)}
            </>
        )
    }

    return Fetch
}

const FetcComponent = renderFecth('GET')

function User({ response }) {
    const { data, error, loading } = response

    if (error) {
        console.error('[Error]: ', error)
        return null
    }

    if (loading) {
        return (
            <Loader />
        )
    }

    const { success, content, } = data
    return success ? Object.entries(content).map(([k, v]) => (
        <p>{k}: {v}</p>
    )) : (<p>{content}</p>)

}

function App() {

    return (
        <div>
            <FetcComponent url="http://localhost:8080/user/findById/3" >
                {response => <User response={response} />}
            </FetcComponent>
        </div>
    );
}



export default App;
