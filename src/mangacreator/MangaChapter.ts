import { PageUrl } from "./PageUrl";

export class MangaChapter{

    chapterName : string;
    listUrlOfChapter : Array<PageUrl>;
    chapterIndex : number;
    
    /**
     * Represents a book.
     * @constructor
     * @param {string} chapterName - The title of the chapter.
     * @param {Array<PageUrl>} listUrlOfChapter - The author of the book.
     * @param {number} chapterIndex - The chapter index.
     */
    constructor(chapterName : string, listUrlOfChapter : Array<PageUrl>, chapterIndex : number){
        this.chapterName = chapterName; // nom du chapitre
        this.listUrlOfChapter = listUrlOfChapter; // array des url d'un chapitre
        this.chapterIndex = chapterIndex; // Index du chapitre
    }
}