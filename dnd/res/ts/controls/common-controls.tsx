interface IParagraphFromRawHTMLProps
{
	text: string;
}
class ParagraphFromRawHTML extends React.Component<IParagraphFromRawHTMLProps> {
	render() {
		return (
			<p dangerouslySetInnerHTML={{ __html: this.props.text }} />
		);
	}
}