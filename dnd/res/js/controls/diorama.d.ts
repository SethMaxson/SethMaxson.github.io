/// <reference types="react" />
interface IDioramaProps {
    title: string;
    background: string;
    cutouts: ICutout[];
}
interface IDioramaStandeeProps {
    height: number;
    image: string;
    name: string;
}
declare class DioramaStandee extends React.Component<IDioramaStandeeProps> {
    render(): JSX.Element;
}
interface IDioramaProps {
    title: string;
    background: string;
    cutouts: ICutout[];
}
declare class Diorama extends React.Component<IDioramaProps> {
    render(): JSX.Element;
}
