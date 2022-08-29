import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher) => {

    const validPublishers = [
        'DC Comics',
        'Marvel Comics',
    ];

    if (!validPublishers.includes(publisher)) {
        throw new Error(`${publisher}`)
    }

    return heroes.filter(x => x.publisher === publisher);

}