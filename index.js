const { connect } = require('puppeteer-real-browser');

const start = async () => {
    const { page, browser } = await connect({})
}


async function test(urlPage) {

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

    const listChapter = await getAllChapter(urlPage, page);

    for (var chapterUrlIndex in listChapter){
        var nb = await getPageNumber(page, listChapter[chapterUrlIndex]);
        var img = await getAllPages(page, listChapter[chapterUrlIndex],nb);
    }
}

test("https://sushiscan.net/catalogue/my-hero-academia/");

async function getPageNumber(page, chapterUrl) {
    // console.log(chapterUrl);
    await page.goto(chapterUrl, { waitUntil: "networkidle2" });
    const pagesListView = await page.$$('#select-paged option');

    var nb = 0;
    for (var elmnt in pagesListView) {
        let option = pagesListView[elmnt];
        nb = await page.evaluate(option => option.value, option);
    }
    nb = parseInt(nb) + 1;
    return nb;
}

async function getAllPages(page,chapUrl,nbPages) {
    const img = await page.$('#readerarea img');
    const imgText = await page.evaluate(img => img.src, img);
    const re = /(\d+)\./;
    for (var i = 1; i <=nbPages ; i++){
        i = addZeros(i);
        const newImgText = imgText.replace(re, (match, p1) => {
        // p1 est le premier groupe capturé (le nombre)
        return `${i}.`;
        });
        console.log(newImgText);
    }
    return imgText;
}

function addZeros(nb){
    if (nb <10)
        return `00${nb}`;
    if (nb >= 10 && nb < 100)
        return `0${nb}`;
    else
        return nb;
}

async function getAllChapter(urlPage, page) {
    await page.goto(urlPage, { waitUntil: "networkidle2" });
    await new Promise(resolve => setTimeout(resolve, 1500));
    var listUrlChapter = [];

    const listChapElement = await page.$$('#chapterlist ul li');
    for (var elmnt of listChapElement) {
        let element = await elmnt.$('div div a');
        let res = await page.evaluate(element => element.href, element);
        listUrlChapter.push(res);
    }
    return listUrlChapter;
}