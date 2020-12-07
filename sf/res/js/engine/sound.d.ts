export interface ISoundCue {
    name: string;
    play(): void;
}
export declare class SoundCue2D implements ISoundCue {
    name: string;
    sources: string[];
    play(): void;
}
