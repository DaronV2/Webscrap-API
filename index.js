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

    for (var chapterUrl in listChapter){
        var nb = await getPageNumber(page, listChapter[chapterUrl]);
    }
}

test("https://sushiscan.net/catalogue/my-hero-academia/");

async function getPageNumber(page, chapterUrl) {
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

async function getPage(page) {
    const img = await page.$('#readerarea img');
    const imgText = await page.evaluate(img => img.src, img);
    return imgText;
}

async function getAllChapter(urlPage, page) {
    await page.goto(urlPage, { waitUntil: "networkidle2" });
    await new Promise(resolve => setTimeout(resolve, 2000));
    var listUrlChapter = [];

    const listChapElement = await page.$$('#chapterlist ul li');
    for (var elmnt of listChapElement) {
        let element = await elmnt.$('div div a');
        let res = await page.evaluate(element => element.href, element);
        listUrlChapter.push(res);
    }
    return listUrlChapter;
}