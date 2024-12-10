import { MangaChapter } from "./MangaChapter";

export class Manga{
    mangaName : string;
    mangaChapters : Array<MangaChapter>;

    /**
     * Represents a book.
     * @constructor
     * @param {string} mangaName - The title of the manga.
     * @param {Array<MangaChapter>} mangaChapters - The list of Chapters of the manga.
     */
    constructor(mangaName : string, mangaChapters : Array<MangaChapter>){
        this.mangaName = mangaName; // String nom du manga
        this.mangaChapters = mangaChapters; // class MangaChap
    }
}