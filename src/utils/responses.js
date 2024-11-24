export const fulfilled = (response) => {
    return {
        data: response.data.data,
        status: response.data.statusCode,
        message: response.data.message
    }
}

export const rejected = (err) => {
    throw {
        code: err.code,
        status: err.response?.data?.status || err.status,
        message: err.response?.data?.message || err.message || 'An error occurred while processing the request',
        name: err.response?.data?.source || err.name || "NUll"
    }
}