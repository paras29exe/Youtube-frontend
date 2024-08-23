export const fulfilled = (response) => {
    return {
        data: response.data.data,
        status: response.data.statusCode,
        message: response.data.message
    }
}

export const rejected = (err) => {
    throw {
        message: err.response.data.message || 'An error occurred while processing the request',
        status: err.response.status
    }
}