class Manga{
    /**
     * Represents a book.
     * @constructor
     * @param {string} mangaName - The title of the manga.
     * @param {Array<MangaChapter>} mangaChapters - The list of Chapters of the manga.
     */
    constructor(mangaName,mangaChapters){
        this.mangaName = mangaName; // String nom du manga
        this.mangaChapters = mangaChapters; // class MangaChap
    }
}

module.exports = Manga;
