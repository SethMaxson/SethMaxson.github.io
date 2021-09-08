/// <reference types="react" />
interface IWikiPage {
    information: string[];
    name: string;
}
interface IWikiPageMenuBarProps {
}
interface IWikiPageMenuBarState {
}
declare class WikiPageMenuBar extends React.Component<IWikiPageMenuBarProps, IWikiPageMenuBarState> {
    render(): JSX.Element;
}
interface IWikiNavSideBarLinkProps {
    Active: boolean;
    Path: string;
    Title: string;
}
declare class WikiNavSideBarLink extends React.Component<IWikiNavSideBarLinkProps> {
    static defaultProps: {
        Active: boolean;
    };
    render(): JSX.Element;
}
interface IWikiNavSideBarProps {
}
declare class WikiNavSideBar extends React.Component<IWikiNavSideBarProps> {
    render(): JSX.Element;
}
interface IWikiPageTableOfContentsProps {
}
declare class WikiPageTableOfContents extends React.Component<IWikiPageTableOfContentsProps> {
    render(): JSX.Element;
}
interface IWikiPageBodyProps {
    Page: IWikiPage;
}
declare class WikiPageBody extends React.Component<IWikiPageBodyProps> {
    render(): JSX.Element;
}
interface IWikiPageProps {
    Page: IWikiPage;
}
interface IWikiPageState {
}
declare class WikiPage extends React.Component<IWikiPageProps, IWikiPageState> {
    render(): JSX.Element;
}
interface IWikiViewerProps {
    Pages: IWikiPage[];
}
interface IWikiViewerState {
    selectedPage: IWikiPage;
    selectedIndex: number;
}
declare class WikiViewer extends React.Component<IWikiViewerProps, IWikiViewerState> {
    constructor(props: IWikiViewerProps);
    render(): JSX.Element;
    changeGuild(index: number): void;
}
declare const WIKIPAGES: IWikiPage[];
