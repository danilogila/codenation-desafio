// const axios = require('axios')
const api = require("./utils")
const fs = require('fs')
const sha1 = require('sha1')

const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

let token = "70074a3c9b9b5893d53dd7b7f1cd9ff8d0c61c44"
let apiEndpoint = `/generate-data?token=${token}`

const getJsonApi = async () => {
    try {
        const result = await api.get(apiEndpoint)
        return result.data

    } catch (error) {
        throw error
    }
}

const decodeChar = (letter, n) => {
    const minumumCharCode = 96
    const limitCharCode = 122
    let symbols = [".", "!", "?"]

    if(symbols.includes(letter) || !isNaN(letter)) return letter

    let code = letter.charCodeAt(0) - n

    if (code < minumumCharCode) {
        code = limitCharCode - (minumumCharCode - code)
    }

    return String.fromCharCode(code)
}

const main = async () => {
    const result = await getJsonApi()
    await writeFileAsync("answer.json", JSON.stringify(result))

    const { numero_casas, cifrado } = result
    let decodedText = ""
    let rawData

    for (let letter of cifrado){
        decodedText += decodeChar(letter, numero_casas)
    }

    try {
        rawData = await readFileAsync("answer.json")
    } catch (error) {
        throw error
    }

    let answer = JSON.parse(rawData)
    answer.decifrado = decodedText
    answer.resumo_criptografico = sha1(decodedText)

    try {
        await writeFileAsync("answer.json", JSON.stringify(answer, null, 2))        
    } catch (error) {
        throw error
    }

}

main()