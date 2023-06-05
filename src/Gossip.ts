import { v4 as uuidv4 } from 'uuid';

export default class Gossip{
    // #_content: string = ""
    #_id: string = uuidv4();
    #_authorId: string = "";

    constructor(authorId: string) {
        this.#_authorId = authorId;
    }


    get id(): string {
        return this.#_id;
    }
}