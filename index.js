
const express = require('express');
const WebScrapingLocalTest = require("../Anakin-Assignment/first");


 
const app = express();
const port = 3000;
app.get('/', async (request, response) => {
 // Web Scraping Code here
 try {
   const data = await WebScrapingLocalTest();
   console.log(data)
   response.status(200).json(data);
 } catch (error) {
   response.status(500).json({
     message: 'Server error occurred',
   });
 }
});
app.listen(port, () => {
 console.log(`Example app listening at http://localhost:${port}`);
});
 
