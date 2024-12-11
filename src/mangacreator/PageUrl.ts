export class PageUrl{

    url : string;
    index : number;

    /**
     * Represents a book.
     * @constructor
     * @param {string} url - The URl of the Page.
     * @param {int} index - The page number.
     */
    constructor(url : string, index : number){
        this.url = url;
        this.index = index;
    }
}