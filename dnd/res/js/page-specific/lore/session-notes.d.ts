/// <reference types="react" />
interface ICampaign1OriginalNotesProps {
}
declare class Campaign1OriginalNotes extends React.Component<ICampaign1OriginalNotesProps> {
    render(): JSX.Element;
}
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
    accordionID: string;
    date: string;
    sessionNumber: number;
    title: string;
}
declare class SessionEntry extends React.Component<ISessionEntryProps> {
    render(): JSX.Element;
}
interface ISessionPartyListProps {
}
declare class SessionPartyList extends React.Component<ISessionPartyListProps> {
    render(): JSX.Element;
}
interface ISessionBodyProps {
}
declare class SessionBody extends React.Component<ISessionBodyProps> {
    render(): JSX.Element;
}
interface ISessionNotesProps {
    campaignId: number;
    sessionNumber: number;
}
declare class SessionNotes extends React.Component<ISessionNotesProps> {
    render(): JSX.Element;
}
interface ICampaignNotesProps {
    campaignId: number;
}
declare class CampaignNotes extends React.Component<ICampaignNotesProps> {
    render(): JSX.Element;
}
