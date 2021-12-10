/// <reference types="react" />
declare type OrganizationViewerTab = "guilds" | "mercenaries";
declare function isOfTypeGuildMenuTab(keyInput: string): keyInput is OrganizationViewerTab;
interface IGuildNameProps {
    name: string;
    tagline: string;
}
declare class GuildName extends React.Component<IGuildNameProps> {
    render(): JSX.Element;
}
interface IGuildSymbolProps {
    image: string;
}
declare class GuildSymbol extends React.Component<IGuildSymbolProps> {
    render(): JSX.Element;
}
interface IGuild {
    dmNotes: string[];
    information: string[];
    name: string;
    tagline: string;
    image?: string;
}
interface IGuildViewProps {
    JsonObject: IGuild;
}
interface IGuildViewState {
}
declare class GuildView extends React.Component<IGuildViewProps, IGuildViewState> {
    constructor(props: IGuildViewProps);
    render(): JSX.Element;
}
interface IGuildViewerProps {
    guilds: IGuild[];
}
interface IGuildViewerState {
    selectedGuild: IGuild;
    selectedIndex: number;
    viewingItem: boolean;
}
declare class GuildViewer extends React.Component<IGuildViewerProps, IGuildViewerState> {
    constructor(props: IGuildViewerProps);
    render(): JSX.Element;
    changeGuild(index: number): void;
}
interface IOrganizationViewerProps {
}
interface IOrganizationViewerState {
    selectedTab: OrganizationViewerTab;
}
declare class OrganizationViewer extends React.Component<IOrganizationViewerProps, IOrganizationViewerState> {
    constructor(props: IOrganizationViewerProps);
    render(): JSX.Element;
}
declare const GUILDS: IGuild[];
