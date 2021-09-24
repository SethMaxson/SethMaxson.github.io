/// <reference types="react" />
interface IBrochureProps {
    agency: string;
    title: string;
}
declare class Brochure extends React.Component<IBrochureProps> {
    static defaultProps: {
        agency: string;
    };
    render(): JSX.Element;
}
