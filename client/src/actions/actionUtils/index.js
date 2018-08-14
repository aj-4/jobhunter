// endpoint :: url
// params :: array
export const performGet = (endpoint, params) => {
    let fullURL = endpoint;
    if (params) {
        params.forEach(param => {
            fullURL = `${fullURL}/${param}`
        })
    }
    return fetch(fullURL)
}

// endpoint :: url
// body :: object
export const performPost = (endpoint, body) => {
    return fetch(
        endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    )
}