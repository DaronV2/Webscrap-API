import { connect, PageWithCursor } from 'puppeteer-real-browser';
import { PageUrl } from './PageUrl';
import { MangaChapter } from './MangaChapter';
import { Manga } from './Manga';
import * as fs from 'fs';
import axios from 'axios';

export class MangaCreator {

    urlManga: string;

    constructor(urlManga: string) {
        this.urlManga = urlManga;
    }

    static start = async () => {
        const { page, browser } = await connect({});
    }

    async createManga() {
        const { browser, page } = await connect({
            headless: false,
            args: [],
            customConfig: {},
            turnstile: true,
            connectOption: {},
            disableXvfb: false,
            ignoreAllFlags: false
        });
        const listChapter = await this.getAllChapter(this.urlManga, page);
        const nomManga = await this.getMangaName(page);
        if (nomManga) {
            var listChap = [];
            var chapterIndex = 1;
            for (const chapterUrlIndex in listChapter) {
                const nb = await this.getPageNumber(page, listChapter[chapterUrlIndex]);
                const imgs = await this.getAllPages(page, listChapter[chapterUrlIndex], nb, chapterIndex) as MangaChapter;
                listChap.push(imgs);
                chapterIndex++;
            }
            if (listChap) {
                const mangaObj = new Manga(nomManga, listChap);
                return mangaObj;
            }
        } else {
            console.log("Le nom du manga n'a pas été trouvé :/");
        }
    }

    async getAllChapter(urlManga: string, page: PageWithCursor) {
        await page.goto(urlManga, { waitUntil: "networkidle2" });
        await new Promise(resolve => setTimeout(resolve, 1500));
        var listUrlChapter = [];
        const listChapElement = await page.$$('#chapterlist ul li');
        const chapterName = await page.$('#chapterlist ul li div div a .chapternum');
        for (var elmnt of listChapElement) {
            let element = await elmnt.$('div div a');
            if (element) {
                let res = await page.evaluate(element => element.href, element);
                listUrlChapter.push(res);
            }
        }
        return listUrlChapter.reverse();
    }

    async getMangaName(page: PageWithCursor) {
        const elementMangaName = await page.$('h1.entry-title');
        if (elementMangaName) {
            const mangaName = await page.evaluate(elementMangaName => elementMangaName.textContent, elementMangaName)
            return mangaName;
        }
        return;
    }

    async getPageNumber(page: PageWithCursor, chapterUrl: string) {
        await page.goto(chapterUrl, { waitUntil: "networkidle2" });
        const pagesListView = await page.$$('#select-paged option');

        var nb = "";
        var res = 0;
        for (var elmnt in pagesListView) {
            let option = pagesListView[elmnt];
            nb = await page.evaluate(option => option.value, option);
        }
        res = parseInt(nb) + 1;
        return res;
    }

    async getAllPages(page: PageWithCursor, chapUrl: string, nbPages: number, chapterIndex: number) {
        var listUrl = [];
        const img = await page.$('#readerarea img');
        if (img) {
            const imgText = await page.evaluate(img => img.src, img);
            // console.log(imgText);
            const re = /(\d+)\./;
            var mangaName;
            for (var i = 1; i <= nbPages; i++) {
                if (i == 1) {
                    const elementMangaName = await page.$('.entry-title');
                    if (elementMangaName) {
                        mangaName = await page.evaluate(elementMangaName => elementMangaName.textContent, elementMangaName) as string;
                    }
                }
                const numberWithZeros = this.addZeros(i);
                const newImgText = imgText.replace(re, (match, p1) => {
                    return `${numberWithZeros}.`;
                });
                console.log(newImgText);
                // await this.downloadImage(newImgText, chapUrl + `${i - 1}`);
                const newImgObj = new PageUrl(newImgText, i - 1);
                listUrl.push(newImgObj);
            }
            if (mangaName) {
                var chapObj = new MangaChapter(mangaName, listUrl, chapterIndex);
                return chapObj;
            }
        }
    }

    addZeros(nb: number) {
        if (nb < 10)
            return `00${nb}`;
        if (nb >= 10 && nb < 100)
            return `0${nb}`;
        else
            return nb;
    }

    async downloadImage(url: string, filePath: string): Promise<void> {
        const { browser, page } = await connect({
            headless: false,
            args: [],
            customConfig: {},
            turnstile: true,
            connectOption: {},
            disableXvfb: false,
            ignoreAllFlags: false
        });

        const viewSource = await page.goto(url, { waitUntil: "networkidle2" });
        if (viewSource) {
            try {
                // console.log(viewSource.headers());
                const buffer = await viewSource.buffer();
                fs.writeFileSync("testt.html", buffer);
                return;
            } catch (error) {
                console.log(error);
                return;
            }
        }
        console.log(("non"));

        // await page.close();

        // if (viewSource) {
        //     fs.writeFile('test.html', viewSource, function (err) {
        //         if (err) {
        //             return console.log(err);
        //         }

        //         console.log('The file was saved!');
        //     });
        // }
    }
}
