interface IKillingGameSaveFriendshipLevel {
    /** The id of the character with whom the player is friends */
    id: string;
    /** Integer values from 0-6 */
    rank: number;
}
interface IKillingGameSave {
    /** The id of the user profile to which this save data is associated. */
    id: number;
    /** A collection of this player's friendship levels with various characters. The higher the friendship level with a character is, the more of their profile the player can see. */
    friendshipRanks: IKillingGameSaveFriendshipLevel[];
    /** The current balance of the player's wallet. */
    money: number;
}
