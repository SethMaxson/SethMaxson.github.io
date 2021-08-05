/// <reference types="react" />
interface IGift {
    id: number;
    name: string;
    description: string;
    cost: number;
}
interface IGiftMachineProps {
    gifts: IGift[];
}
declare class GiftMachine extends React.Component<IGiftMachineProps> {
    render(): JSX.Element;
}
declare const GIFTS: IGift[];
