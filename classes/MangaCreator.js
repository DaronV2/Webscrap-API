const { connect } = require('puppeteer-real-browser');
const MangaChapter = require('./MangaChapter.js');
const PageUrl = require('./PageUrl.js');
const Manga = require('./Manga.js');


class MangaCreator{
    constructor(urlManga){
        this.urlManga = urlManga;
    }

    static start = async () => {
        const { page, browser } = await connect({})
    }


    async createManga(urlManga) {

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
        const listChapter = await this.getAllChapter(this.urlManga, page);
        var listChap = [];

        for (var chapterUrlIndex in listChapter){
            var nb = await this.getPageNumber(page, listChapter[chapterUrlIndex]);
            var imgs = await this.getAllPages(page, listChapter[chapterUrlIndex],nb);
            // console.log(imgs);
            listChap.push(imgs);
        }
        const mangaObj = new Manga("naruto", listChap);
        return mangaObj;
    }

    async getPageNumber(page, chapterUrl) {
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

    async getAllPages(page,chapUrl,nbPages) {
        var listUrl = [];
        const img = await page.$('#readerarea img');
        const imgText = await page.evaluate(img => img.src, img);
        const re = /(\d+)\./;
        var mangaName = "";
        for (var i = 1; i <=nbPages ; i++){
            if (i == 1){
                const elementMangaName = await page.$('.entry-title');
                mangaName = await page.evaluate(elementMangaName => elementMangaName.textContent, elementMangaName)
            }
            i = this.addZeros(i);
            const newImgText = imgText.replace(re, (match, p1) => {
            return `${i}.`;
            });
            const newImgObj = new PageUrl(newImgText, i-1);
            listUrl.push(newImgObj);
        }
        var chapObj = new MangaChapter(mangaName,listUrl);
        return chapObj;
    }

    addZeros(nb){
        if (nb <10)
            return `00${nb}`;
        if (nb >= 10 && nb < 100)
            return `0${nb}`;
        else
            return nb;
    }

    async getAllChapter(urlManga, page) {
        await page.goto(urlManga, { waitUntil: "networkidle2" });
        await new Promise(resolve => setTimeout(resolve, 1500));
        var listUrlChapter = [];
        const listChapElement = await page.$$('#chapterlist ul li');
        const chapterName = await page.$('#chapterlist ul li div div a .chapternum');
        for (var elmnt of listChapElement) {
            let element = await elmnt.$('div div a');
            let res = await page.evaluate(element => element.href, element);
            listUrlChapter.push(res);
        }
        return listUrlChapter;
    }
}
module.exports = MangaCreator;

var init = new MangaCreator("https://sushiscan.net/catalogue/naruto/");
init.createManga();
console.log(init);