import { PowerUpSpawner } from '../powerup-spawner';
export interface ItemDrop {
    /**
     * The item to be dropped.
     */
    item: keyof typeof PowerUpSpawner;
    /**
     * Indicates how likely this item is to drop. Valid values range from 0.0 to 1.0.
     */
    chance: number;
}
