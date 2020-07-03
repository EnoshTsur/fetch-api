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
    React.useEffect(() => {

        fetchWithBody("http://localhost:8080/user/update/9", json)("PUT")
            .then(data => console.log(data))
            .catch(error => console.log(error))

    }, [])


    return (
        <div>
        </div>
    );
}

export default App;
