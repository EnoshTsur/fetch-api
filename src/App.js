import React from 'react';

async function get(url) {
    const response = await fetch(url)
    return await response.json()
}

async function post(url, body) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return await response.json()
}

function App() {

    React.useEffect(() => {
    
        post("http://localhost:8080/user/add", { firstName: "enosh", lastName: "tsur", age: 30 })
        .then(data => console.log(data))
        .catch(error => console.log(error))
    
    },  [])

    return (
        <div>
        </div>
    );
}

export default App;
