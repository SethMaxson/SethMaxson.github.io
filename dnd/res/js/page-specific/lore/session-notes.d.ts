/// <reference types="react" />
interface ISessionNotesViewerProps {
}
declare class SessionNotesViewer extends React.Component<ISessionNotesViewerProps> {
    render(): JSX.Element;
}
interface ISessionNotesCategoryHeaderProps {
    text?: string;
}
declare class SessionNotesCategoryHeader extends React.Component<ISessionNotesCategoryHeaderProps> {
    render(): JSX.Element;
}
interface ISessionEntryProps {
    campaignID: string;
    date: string;
    paragraphs: string[];
    sessionNumber: number;
    title: string;
}
declare class SessionEntry extends React.Component<ISessionEntryProps> {
    render(): JSX.Element;
}
interface ISessionPartyListProps {
    characters?: string[];
}
declare class SessionPartyList extends React.Component<ISessionPartyListProps> {
    render(): JSX.Element;
}
