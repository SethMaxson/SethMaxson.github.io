$(document).ready(function(){
	$("body>.container").append(
		$(
			`<footer class="footer">
				<p style="text-align: center;">mjcadz 2018 <i class="fa fa-bolt" aria-hidden="true"></i> v2.6</p>
			</footer>
		`)
	);
	$("body").prepend(
		$(`
			<nav class="navbar navbar-default navbar-fixed-left">
				<div class="container">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
					</div>
					<div id="navbar" class="navbar-collapse collapse">
						<ul class="nav navbar-nav">
							<li><a style="font-size:15px; color: #ffffff;" href="/sf/index.html">&nbsp;&nbsp;&nbsp;&nbsp;Home</a></li>
							<li><hr style="margin: 0 25px 0 25px; border-top: 1px solid #5ad8cc;"><a style="font-size:15px; color: #ffffff;" href="armor-generator.html">&nbsp;&nbsp;&nbsp;&nbsp;Armor Generator</a></li>
							<li><hr style="margin: 0 25px 0 25px; border-top: 1px solid #5ad8cc;"><a style="font-size:15px; color: #ffffff;" href="weapon-generator.html">&nbsp;&nbsp;&nbsp;&nbsp;Weapon Generator</a></li>
							<li><hr style="margin: 0 25px 0 25px; border-top: 1px solid #5ad8cc;"><a style="font-size:15px; color: #ffffff;" href="system-generator.html">&nbsp;&nbsp;&nbsp;&nbsp;System Generator</a></li>
							<li><hr style="margin: 0 25px 0 25px; border-top: 1px solid #5ad8cc;"><a style="font-size:15px; color: #ffffff;" href="settlement-generator.html">&nbsp;&nbsp;&nbsp;&nbsp;Settlement Generator</a></li>
							<li><hr style="margin: 0 25px 0 25px; border-top: 1px solid #5ad8cc;"><a style="font-size:15px; color: #ffffff;" href="starship-generator.html">&nbsp;&nbsp;&nbsp;&nbsp;Starship Generator</a></li>
							<li><hr style="margin: 0 25px 0 25px; border-top: 1px solid #5ad8cc;"><a style="font-size:15px; color: #ffffff;" href="loot-generator.html">&nbsp;&nbsp;&nbsp;&nbsp;Loot Generator</a></li>
							<li><hr style="margin: 0 25px 0 25px; border-top: 1px solid #5ad8cc;"><a style="font-size:15px; color: #ffffff;" href="encounter-generator.html>&nbsp;&nbsp;&nbsp;&nbsp;Encounter Generator</a></li>
							<li><hr style="margin: 0 25px 0 25px; border-top: 1px solid #5ad8cc;"><a style="font-size:15px; color: #ffffff;" href="character-concept-generator.html">&nbsp;&nbsp;&nbsp;&nbsp;Character Concept<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Generator</a></li>
							<li><hr style="margin: 0 25px 0 25px; border-top: 1px solid #5ad8cc;"><a style="font-size:15px; color: #ffffff;" href="monster-builder.html">&nbsp;&nbsp;&nbsp;&nbsp;Monster Builder</a></li>
						</ul>
					</div>
				</div>
			</nav>
		`)
	);
})