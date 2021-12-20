const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const port = 8000;

const app = express()
const url = "https://www.folha.uol.com.br/"

axios(url)
   .then(response => {
       const html = response.data
       const cheerioLoad = cheerio.load(html)
       const artigos = [];
       cheerioLoad('.c-headline__title', html).each(function() {
           const textoShare = cheerioLoad(this).text()
           const urlBuscada = cheerioLoad(this).find('a').attr('href')
           artigos.push({
                textoShare,
                urlBuscada
           })
       })
       console.log(artigos)
   }) .catch(error => console.log(error)   )

app.listen(port, () => console.log("O server está funcionando!"))