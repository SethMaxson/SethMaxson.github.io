interface IDeck {
    /**The url of the image representing this deck. */
    image: string;
    /**The technical name of this deck */
    name: string;
    /**Noteworthy locations (such as cabins) on this deck. */
    locations: IDeckLocation[];
}
