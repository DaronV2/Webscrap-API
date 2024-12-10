const PageUrl = require("./PageUrl");

class MangaChapter{
    /**
     * Represents a book.
     * @constructor
     * @param {string} chapterName - The title of the chapter.
     * @param {Array<PageUrl>} listUrlOfChapter - The author of the book.
     * @param {number} chapterIndex - The chapter index.
     */
    constructor(chapterName, listUrlOfChapter){
        this.chapterName = chapterName; // nom du chapitre
        this.listUrlOfChapter = listUrlOfChapter; // array des url d'un chapitre
        this.chapterIndex = chapterIndex; // array des url d'un chapitre
    }
}
module.exports = MangaChapter;