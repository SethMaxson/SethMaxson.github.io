interface IWikiPage
{
	information: string[];
	name: string;
}

interface IWikiPageMenuBarProps { }
interface IWikiPageMenuBarState { }
class WikiPageMenuBar extends React.Component<IWikiPageMenuBarProps, IWikiPageMenuBarState> {
	render()
	{
		return (
			<nav className="bd-subnavbar py-2" aria-label="Secondary navigation">
				<div className="container-xxl d-flex align-items-md-center">
					<form className="bd-search position-relative me-auto">
						<span className="algolia-autocomplete" style={{ position: 'relative', display: 'inline-block', direction: 'ltr' }}>
							<input type="search" className="form-control ds-input" id="search-input" placeholder="Search docs..." aria-label="Search docs for..." autoComplete="off" data-bd-docs-version={5.0} spellCheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style={{ position: 'relative', verticalAlign: 'top' }} />
							<pre aria-hidden="true" style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize: '16px', fontStyle: 'normal', fontVariant: 'normal', fontWeight: 400, wordSpacing: '0px', letterSpacing: 'normal', textIndent: '0px', textRendering: 'auto', textTransform: 'none' }} />
							<span className="ds-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0" style={{ position: 'absolute', top: '100%', zIndex: 100, display: 'none', left: '0px', right: 'auto' }}>
								<div className="ds-dataset-1" />
							</span>
						</span>
					</form>
					<div className="dropdown ms-3" style={{ display: 'none' }}>
						<button className="btn btn-bd-light dropdown-toggle" id="bd-versions" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
							<span className="d-none d-lg-inline">Bootstrap</span> v5.0
						</button>
						<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="bd-versions">
							<li><a className="dropdown-item current" aria-current="true" href="/dnd/pages/wiki/">Latest (5.0.x)</a></li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li><a className="dropdown-item" href="https://getbootstrap.com/docs/4.6/">v4.6.x</a></li>
							<li><a className="dropdown-item" href="https://getbootstrap.com/docs/3.4/">v3.4.1</a></li>
							<li><a className="dropdown-item" href="https://getbootstrap.com/2.3.2/">v2.3.2</a></li>
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li><a className="dropdown-item" href="/docs/versions/">All versions</a></li>
						</ul>
					</div>
					<button className="btn bd-sidebar-toggle d-md-none py-0 px-1 ms-3 order-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bd-docs-nav" aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
						<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="bi bi-expand" fill="currentColor" viewBox="0 0 16 16">
							<title>Expand</title>
							<path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="bi bi-collapse" fill="currentColor" viewBox="0 0 16 16">
							<title>Collapse</title>
							<path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z" />
						</svg>
					</button>
				</div>
			</nav>

		)
	}
}

interface IWikiNavSideBarLinkProps
{
	Active: boolean;
	Path: string;
	Title: string;
}
class WikiNavSideBarLink extends React.Component<IWikiNavSideBarLinkProps> {
	public static defaultProps = {
		Active: false,
    };
	render()
	{
		return (
			<li>
				<a href={`/dnd/pages/wiki/${this.props.Path}.html`} className={"d-inline-flex align-items-center rounded" + (this.props.Active? " active" : "")}>
					{this.props.Title}
				</a>
			</li>
		)
	}
}

interface IWikiNavSideBarProps { }
class WikiNavSideBar extends React.Component<IWikiNavSideBarProps> {
	render()
	{
		return (
			<aside className="bd-sidebar">
				<nav className="collapse bd-links" id="bd-docs-nav" aria-label="Docs navigation">
					<ul className="list-unstyled mb-0 py-3 pt-md-1">
						<li className="mb-1">
							<button className="btn d-inline-flex align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#getting-started-collapse" aria-expanded="false">
								Getting started
							</button>
							<div className="collapse" id="getting-started-collapse">
								<ul className="list-unstyled fw-normal pb-1 small">
									<WikiNavSideBarLink Active={true} Path="getting-started/introduction" Title="Introduction" />
									<WikiNavSideBarLink Path="getting-started/download" Title="Download" />
									<li><a href="/dnd/pages/wiki/getting-started/contents/" className="d-inline-flex align-items-center rounded">Contents</a></li>
									<li><a href="/dnd/pages/wiki/getting-started/browsers-devices/" className="d-inline-flex align-items-center rounded">Browsers &amp; devices</a></li>
									<li><a href="/dnd/pages/wiki/getting-started/javascript/" className="d-inline-flex align-items-center rounded">JavaScript</a></li>
									<li><a href="/dnd/pages/wiki/getting-started/build-tools/" className="d-inline-flex align-items-center rounded">Build tools</a></li>
									<li><a href="/dnd/pages/wiki/getting-started/webpack/" className="d-inline-flex align-items-center rounded">Webpack</a></li>
									<li><a href="/dnd/pages/wiki/getting-started/parcel/" className="d-inline-flex align-items-center rounded">Parcel</a></li>
									<li><a href="/dnd/pages/wiki/getting-started/accessibility/" className="d-inline-flex align-items-center rounded">Accessibility</a></li>
									<li><a href="/dnd/pages/wiki/getting-started/rfs/" className="d-inline-flex align-items-center rounded">RFS</a></li>
									<li><a href="/dnd/pages/wiki/getting-started/rtl/" className="d-inline-flex align-items-center rounded">RTL</a></li>
								</ul>
							</div>
						</li>
						<li className="mb-1">
							<button className="btn d-inline-flex align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#customize-collapse" aria-expanded="false">
								Customize
							</button>
							<div className="collapse" id="customize-collapse">
								<ul className="list-unstyled fw-normal pb-1 small">
									<li><a href="/dnd/pages/wiki/customize/overview/" className="d-inline-flex align-items-center rounded">Overview</a></li>
									<li><a href="/dnd/pages/wiki/customize/sass/" className="d-inline-flex align-items-center rounded">Sass</a></li>
									<li><a href="/dnd/pages/wiki/customize/options/" className="d-inline-flex align-items-center rounded">Options</a></li>
									<li><a href="/dnd/pages/wiki/customize/color/" className="d-inline-flex align-items-center rounded">Color</a></li>
									<li><a href="/dnd/pages/wiki/customize/components/" className="d-inline-flex align-items-center rounded">Components</a></li>
									<li><a href="/dnd/pages/wiki/customize/css-variables/" className="d-inline-flex align-items-center rounded">CSS variables</a></li>
									<li><a href="/dnd/pages/wiki/customize/optimize/" className="d-inline-flex align-items-center rounded">Optimize</a></li>
								</ul>
							</div>
						</li>
						<li className="my-3 mx-4 border-top" />
						<WikiNavSideBarLink Path="migration" Title="Migration" />
					</ul>
				</nav>
			</aside>
		)
	}
}

interface IWikiPageTableOfContentsProps { }
class WikiPageTableOfContents extends React.Component<IWikiPageTableOfContentsProps> {
	render()
	{
		return (
			<div className="bd-toc mt-4 mb-5 my-md-0 ps-xl-3 mb-lg-5 text-muted">
				<strong className="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
				<nav id="TableOfContents">
					<ul>
						<li><a href="#about">About</a></li>
						<li><a href="#example">Example</a></li>
						<li><a href="#content-types">Content types</a>
							<ul>
								<li><a href="#body">Body</a></li>
								<li><a href="#titles-text-and-links">Titles, text, and links</a></li>
								<li><a href="#images">Images</a></li>
								<li><a href="#list-groups">List groups</a></li>
								<li><a href="#kitchen-sink">Kitchen sink</a></li>
								<li><a href="#header-and-footer">Header and footer</a></li>
							</ul>
						</li>
						<li><a href="#sizing">Sizing</a>
							<ul>
								<li><a href="#using-grid-markup">Using grid markup</a></li>
								<li><a href="#using-utilities">Using utilities</a></li>
								<li><a href="#using-custom-css">Using custom CSS</a></li>
							</ul>
						</li>
						<li><a href="#text-alignment">Text alignment</a></li>
					</ul>
				</nav>
			</div>
		)
	}
}

interface IWikiPageBodyProps
{
	Page: IWikiPage;
}
class WikiPageBody extends React.Component<IWikiPageBodyProps> {
	render()
	{
		return (
			<div className="bd-content ps-lg-4">
				<h2>Summary</h2>
				<div>
					{this.props.Page.information.map((paragraph, index: number) =>
						<ParagraphFromRawHTML text={paragraph} key={index} />
					)}
				</div>

				<h2 id="about">About</h2>
				<p>A <strong>card</strong> is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options. If you’re familiar with Bootstrap 3, cards replace our old panels, wells, and thumbnails. Similar functionality to those components is available as modifier classes for cards.</p>

				<h2 id="example">Example</h2>
				<p>Cards are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization. Built with flexbox, they offer easy alignment and mix well with other Bootstrap components. They have no <code>margin</code> by default, so use <a href="/dnd/pages/wiki/utilities/spacing/">spacing utilities</a> as needed.</p>
				<p>Below is an example of a basic card with mixed content and a fixed width. Cards have no fixed width to start, so they’ll naturally fill the full width of its parent element. This is easily customized with our various <a href="#sizing">sizing options</a>.</p>

				<h2 id="content-types">Content types</h2>
				<p>Cards support a wide variety of content, including images, text, list groups, links, and more. Below are examples of what’s supported.</p>

				<h3 id="body">Body</h3>
				<p>The building block of a card is the <code>.card-body</code>. Use it whenever you need a padded section within a card.</p>

				<h3 id="titles-text-and-links">Titles, text, and links</h3>
				<p>Card titles are used by adding <code>.card-title</code> to a <code>&lt;h*&gt;</code> tag. In the same way, links are added and placed next to each other by adding <code>.card-link</code> to an <code>&lt;a&gt;</code> tag.</p>
				<p>Subtitles are used by adding a <code>.card-subtitle</code> to a <code>&lt;h*&gt;</code> tag. If the <code>.card-title</code> and the <code>.card-subtitle</code> items are placed in a <code>.card-body</code> item, the card title and subtitle are aligned nicely.</p>
			</div>
		)
	}
}

interface IWikiPageProps
{
	Page: IWikiPage;
}
interface IWikiPageState { }
class WikiPage extends React.Component<IWikiPageProps, IWikiPageState> {
	render()
	{
		return (
			<main className="bd-main order-1">
				<div className="bd-intro ps-lg-4">
					<h1 className="bd-title name" id="content">Geoss</h1>
					<p className="bd-lead">Bootstrap’s cards provide a flexible and extensible content container with multiple variants and options.</p>
				</div>
				<WikiPageTableOfContents />
				<WikiPageBody Page={this.props.Page} />
			</main>
		)
	}
}


interface IWikiViewerProps
{
	Pages: IWikiPage[];
}
interface IWikiViewerState
{
	selectedPage: IWikiPage;
	selectedIndex: number;
}
class WikiViewer extends React.Component<IWikiViewerProps, IWikiViewerState> {
	constructor(props: IWikiViewerProps)
	{
		super(props);
		this.changeGuild = this.changeGuild.bind(this);
		let WikiArticleTitle = GetURLParameter("name");
		let matchingPages: IWikiPage[] = [];
		if (WikiArticleTitle)
		{
			matchingPages = this.props.Pages.filter(el => el.name.toLowerCase() == WikiArticleTitle?.toLowerCase());
		}
		let selectedPage = matchingPages.length > 0 ? matchingPages[0] : this.props.Pages[0]

		this.state = {
			selectedPage: selectedPage,
			selectedIndex: 0
		};
	}
	render()
	{
		return (
			<div className="bg-dark bg-gradient" style={{ padding: "0px", minHeight: "100%", }}>
				<WikiPageMenuBar />
				<div className="container-xxl py-md-4 bd-layout bg-light">
					<WikiNavSideBar />
					<WikiPage Page={this.state.selectedPage} />
				</div>
			</div>

		);
	}
	changeGuild(index: number)
	{
		this.setState({ selectedPage: this.props.Pages[index], selectedIndex: index });
	}
}

const WIKIPAGES: IWikiPage[] = [
	{
		name: "Geoss",
		information: [
			`
			<p>
				Geoss is a world full of mystery and opportunity, watched over by many deities. The ranks of the deities have grown slowly over the centuries. Order is kept by the twelve oldest and most powerful of the deities, known as prime deities. Collectively they are referred to as the Prime Pantheon. The remaining gods and goddesses each swear their fealty to a single member of the prime pantheon. These subservient divines are known as lesser deities or demigods. While the origin of prime deities predates recorded history, most of the lesser deities are mortals who ascended to godhood. This occurs when a mortal receives genuine, sincere worship from another mortal. The strength of the worshiper's belief causes the recipient of the worship to transcend into divinity. The more active worshippers a demigod has, the more powerful they become. Theoretically, a demigod could become a prime deity with enough worshippers.
			</p>
			<p>
				Each of Geoss' many continents is home to unique cultures and civilizations. Vast seas and dangerous creatures have stood in the way of travel between continents, so the world remains largely unmapped and unexplored. However, man's drive to innovate is unrelenting. With the dangers of geographical exploration seemingly insurmountable, people turned their efforts to other fields.
			</p>
			<p>
				The unfettered ambitions of Geoss' citizens has not been without consequence. Many a great innovator has thrown caution aside in a reckless bid for more wealth or power. Over the centuries, careless experiments by such individuals has chipped away at the very fabric of reality. All over Geoss, rifts to other universes open for a few seconds at a time. Sometimes something or someone is pulled through these rifts into other universes, while other times something or someone is pushed through into Geoss. As more damage is done to the universe, more and larger rifts begin to appear.
			</p>
			<p>
				Recently, strange new technology has emerged through the rifts in the form of enchanted magic crystals. These allow a vessel to sail through the air with no need for wings or wind. People soon realized that seafaring vessels were particularly well suited for use with the crystals, resulting in the skies becoming flooded with retrofitted galleons and warships. Powerful entities vie for air superiority, but it is Cross, the self-declared pirate emperor, who now dominates the skies of Geoss.
			</p>
			`
		]
	},
];

ReactDOM.render(
	<WikiViewer Pages={WIKIPAGES.sort((a, b) => a.name > b.name && 1 || -1)} />,
	document.getElementById("viewer-panel")
);