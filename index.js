// const puppeteer = require('puppeteer-extra');
const { connect } = require('puppeteer-real-browser');

const start = async () => {
    const { page, browser } = await connect({})
}


async function test() {

    const { browser, page } = await connect({

        headless: false,

        args: [],

        customConfig: {},

        turnstile: true,

        connectOption: {},

        disableXvfb: false,
        ignoreAllFlags: false
        // proxy:{
        //     host:'<proxy-host>',
        //     port:'<proxy-port>',
        //     username:'<proxy-username>',
        //     password:'<proxy-password>'
        // }

    });

    await page.goto('https://sushiscan.net/my-hero-academia-volume-1/', { waitUntil: "networkidle2" });

    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.screenshot({ path: 'screenshot.png' });

    // const pageHTML = await page.content();

    // console.log(pageHTML);

    const element = await page.$('#readerarea');
    const img = await element.$('img');

    const imgText = await page.evaluate(img => img.src, img);
    console.log(imgText);

    // if (element) {
    //     const srcValue = await element.getAttribute('src');
    //     console.log('SRC:', srcValue);
    // } else {
    //     console.log('Element not found');
    // }

    // const elementText = await page.evaluate(element => element.textContent, element);
    // console.log('Extracted element:', elementText);

    // console.log(elements);


    // return pageHTML;

    // const pctures = await page.evaluate(() => {
    //     try {
    //         const pic = document.querySelector('#readerarea');
    //         return body;
    //     } catch (e) {
    //         return e;
    //     }
    //     // return pic;
    // });

    // console.log(pctures);

    // await page.waitForSelector('#readerarea');

    // // Extracting the rendered HTML of a specific section using JavaScript evaluation
    // const renderedHTML = await page.evaluate(() => {
    //     const dynamicElement = document.querySelector('#readerarea');
    //     return dynamicElement ? dynamicElement.innerHTML : 'Element not found';
    // });

    // return renderedHTML;
}

test();