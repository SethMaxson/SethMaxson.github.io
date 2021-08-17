interface INavProps
{
}
class Nav extends React.Component<INavProps> {
	render()
	{
		return (
			<div className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
				<a className="navbar-brand" target="mainFrame" href="/dnd/pages/maps/worldatlas.html">Geoss</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<div className="navbar-nav me-auto">
						<a className="nav-item nav-link" href="/index.html">Sites List</a>
						<div className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="navbarWorldDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								World
							</a>
							<div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarWorldDropdown">
								<a className="dropdown-item" href="/dnd/pages/world/races.html" target="mainFrame">Races</a>
								<a className="dropdown-item" href="/dnd/pages/world/guilds.html" target="mainFrame">Guilds</a>
								<a className="dropdown-item" href="/dnd/pages/world/census-data-viewer.html" target="mainFrame">Census Data</a>
								<a className="dropdown-item" href="/dnd/pages/maps/index.html" target="mainFrame">Maps</a>
							</div>
						</div>
						<div className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="navbarLoreDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Lore
							</a>
							<div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarLoreDropdown">
								<a className="dropdown-item" href="/dnd/pages/lore/pantheon.html" target="mainFrame">Pantheon</a>
								<a className="dropdown-item" href="/dnd/pages/lore/godfall_artifacts.html" target="mainFrame">Godfall Artifacts</a>
								<a className="dropdown-item" href="/dnd/pages/lore/sessionnotes.html" target="mainFrame">Session Notes</a>
								<div className="dropdown-divider"></div>
								<h6 className="dropdown-header">Characters</h6>
								<a className="dropdown-item" href="/dnd/pages/lore/characters/hallofheroes.html" target="mainFrame">Hall of Heroes</a>
								<a className="dropdown-item" href="/dnd/pages/lore/characters/character-viewer.html" target="mainFrame">Party</a>
								<a className="dropdown-item" href="/dnd/pages/lore/characters/allies.html" target="mainFrame">Allies</a>
							</div>
						</div>
						<div className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="navbarRulesDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Rules
							</a>
							<div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarRulesDropdown">
								<a className="dropdown-item" href="/dnd/pages/rules/reincarnation.html" target="mainFrame">Reincarnation</a>
								<a className="dropdown-item" href="/dnd/pages/rules/tenetsofgodhood.html" target="mainFrame">Tenets of Godhood</a>
								<a className="dropdown-item" href="/dnd/pages/rules/items/weapons.html" target="mainFrame">Weapons</a>
							</div>
						</div>
						<div className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="navbarToolDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Tools
							</a>
							<div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarToolDropdown">
								<a className="dropdown-item" href="/dnd/pages/world/moods/mood-viewer.html" target="mainFrame">Moods</a>
								<a className="dropdown-item" href="/dnd/pages/tools/random-tables.html" target="mainFrame">Random Tables</a>
								<a className="dropdown-item" href="/dnd/pages/tools/table.html" target="mainFrame">Table</a>
								<a className="dropdown-item" href="/dnd/pages/tools/travel-calculator.html" target="mainFrame">Travel Calculator</a>
								<a className="dropdown-item disabled" href="/dnd/pages/tools/charactercreation.html" target="mainFrame">Character Creation</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="/dnd/pages/adventures/index.html" target="mainFrame">Adventures</a>
								<a className="dropdown-item" href="/dnd/pages/tools/generators/index.html" target="mainFrame">Random Generators</a>
								<div className="dropdown-divider"></div>
								<h6 className="dropdown-header">Campaign I</h6>
								<a className="dropdown-item" href="/dnd/pages/tools/militarystrength.html" target="mainFrame">Military Strength</a>
							</div>
						</div>
					</div>
					<LoginButton />
				</div>
			</div>
		);
	}
}


ReactDOM.render(
	<Nav />,
	document.getElementById("top-nav")
);