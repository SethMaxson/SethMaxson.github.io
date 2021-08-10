declare function login(): boolean;
interface IUserAccount {
    gm: boolean;
    id: number;
    p: string;
    u: string;
}
declare const accounts: IUserAccount[];
