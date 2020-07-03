import React from 'react';

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


function App() {

    const json = { firstName: 'koomar2', lastName: 'ranjes2', age: 23, }

    const [user, setUser] = React.useState({})

    React.useEffect(() => {

        fetchData("http://localhost:8080/user/findById/3")("GET")
            .then(data => setUser(data.content))
            .catch(error => setUser(error))

    }, [])

    function showUserData(user) {
        return typeof user === 'object' ?
            Object.entries(user).map(([k, v]) => `${k}: ${v}`).join(', ') :
            (<p>{user}</p>)
    }


    return (
        <div>
            { showUserData(user) }
        </div>
    );
}

export default App;
