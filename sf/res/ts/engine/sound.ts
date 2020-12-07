export interface ISoundCue
{
	name: string;
	play(): void;
}

export class SoundCue2D implements ISoundCue
{
	name: string = "";
	sources: string[] = [];
	play() {}
}