
const express = require('express');
 const { Builder, By, until } = require('selenium-webdriver');
const app = express();
const port = 3000;
app.get('/', async (request, response) => {
 // Web Scraping Code here
 try {
  // const data = {
  //   "id" : 1
  // }
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
 

async function WebScrapingLocalTest() {
  try {
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get('https://food.grab.com/sg/en/restaurants');
    // await driver.wait(until.titleIs('Hilton Singapore'), 1000);
    const allVideos = await driver.findElements(
      By.css('ant-row-flex RestaurantListRow___1SbZY'))
    console.log(allVideos)
    return await getData(allVideos);
  } catch (error) {
    console.log("error",error)
    throw new Error(error);
  } finally {
    await driver.quit();
  }
 }
 async function getData(videos) {
  
  let Details = [];
  try {
    for (const video of videos) {
      const title = await video.findElement(By.id('video-title')).getText();
      const latitude = await video
        .findElement(By.xpath("//*[@id='metadata-line']/span[1]"))
        .getText();
      const longitude = await video
        .findElement(By.xpath(".//*[@id='metadata-line']/span[2]"))
        .getText();
        console.log(title)
      Details.push({
        title: title ?? '',
        latitude: latitude?? '',
        longitude: longitude ?? '',
      });
    }
  } catch (error) {
    console.log(error);
  }
  return Details;
 }

