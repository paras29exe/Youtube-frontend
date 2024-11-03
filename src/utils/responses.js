export const fulfilled = (response) => {
    return {
        data: response.data.data,
        status: response.data.statusCode,
        message: response.data.message
    }
}

export const rejected = (err) => {
    throw {
        status: err.response.data.status,
        message: err.response.data.message || 'An error occurred while processing the request',
        name: err.response.data.source || "NUll"
    }
}