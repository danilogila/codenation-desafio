const axios = require('axios')

const api = axios.create({
    baseURL: 'https://api.codenation.dev/v1/challenge/dev-ps',
    timeout: 1000,
    headers: { 'Content-Type': 'multipart/form-data' }
})

module.exports = api 