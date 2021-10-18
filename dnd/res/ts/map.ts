const kmppx = 1; //km per pixel on world map
var airshipGrid = 25; //the grid the Airships snap to when moving
var dragging = false;
var dragStartX: number, dragStartY: number, dragStopX: number, dragStopY: number;
var shiftkey = false;
var ctrlkey = false;
const keys = {
	ctrl: false,
	shift: false
}
var centerX;

$(document).ready(function(){
	initializeMap();
})

function initializeMap()
{
	centerX = parseFloat($(".map-container").css("left"));
	$(document).on("change", "#map-zoom", function() {
		var zoom = $(this).val() as number * 0.01;
		const previousZoom = parseFloat($("#previous-zoom").val() as  string);

		const windowHeight = $(window).height() as number;
		const windowWidth = $("#map-body").width() as number;

		// $(".map").css("transform-origin", originLeft + "px " + originTop + "px");

		const windowScale = ($(window).width() as number/(previousZoom*2));
		const newWindowScale = ($(window).width() as number / (zoom * 2));
		const mapContainer = $(".map-container") as JQuery<HTMLElement>;
		// var initialLeft = parseFloat($(".map-container").css("left")) + newWindowScale - windowScale;
		var initialLeft = parseFloat(mapContainer.css("left"));
		const initialWidth = mapContainer[0].clientWidth;
		mapContainer.css("transform", `scale(${zoom})`);

		const heightMod = -1 * (mapContainer[0].clientHeight / 2);
		const widthMod = -1 * (mapContainer[0].clientWidth / 2);
		const topPos = (heightMod * (1 - zoom));
		const bottomPos = (heightMod * (1 + zoom)) + windowHeight;
		const leftPos = (widthMod * (1 - zoom));
		const rightPos = (widthMod * (1 + zoom)) + windowWidth;
		(mapContainer.offset() as JQuery.Coordinates).top = 0;
		(mapContainer.offset() as JQuery.Coordinates).left = 0;
		const curTop = parseFloat(mapContainer.css("top"));
		const curLeft = parseFloat(mapContainer.css("left"));


		const adjustedClientHeight = mapContainer[0].clientHeight * zoom;
		const adjustedClientWidth = mapContainer[0].clientWidth * zoom;
		const verticalPositionMinimum = adjustedClientHeight < windowHeight ? topPos : bottomPos;
		const verticalPositionMaximum = adjustedClientHeight < windowHeight ? bottomPos : topPos;

		if (curTop < verticalPositionMinimum) {
			mapContainer.css("top", verticalPositionMinimum + "px");
		}
		else if (curTop > verticalPositionMaximum) {
			mapContainer.css("top", verticalPositionMaximum + "px");
		}

		if (adjustedClientWidth < windowWidth) {
			if (curLeft <= leftPos) {
				mapContainer.css("left", leftPos + "px");
			}
			else if (curLeft > rightPos) {
				mapContainer.css("left", rightPos + "px");
			}
		}
		else {
			if (curLeft >= leftPos) {
				mapContainer.css("left", leftPos + "px");
			}
			else if (curLeft < rightPos) {
				mapContainer.css("left", rightPos + "px");
			}
			else {
				mapContainer.css("left", (initialLeft) + "px");
			}
		}

		updateMapCSSForZoom(zoom);
	});

	$(document).on("keydown", "#map-body", function(e){
		if (e.keyCode == 16) {
			shiftkey = true;
		} else if (e.keyCode == 17) {
			ctrlkey = true;
		}
	});
	$(document).on("keyup", "#map-body", function(e){
		if (e.keyCode == 16) {
			shiftkey = false;
		} else if (e.keyCode == 17) {
			ctrlkey = false;
		}
	});
	$(document).on("wheel mousewheel", ".map-container", function(e){
		let delta = 0;
		let oe = e.originalEvent as WheelEvent;
		//@ts-ignore
		if (oe.wheelDelta !== undefined)
			//@ts-ignore
			delta = oe.wheelDelta;
		else
			delta = oe.deltaY * -1;

		handleZoomUpdate(delta);
	});
	$(".map-container").draggable({
		drag: function(event, ui) {
			// ui.offset.top = 5625;
			var zoom = $("#map-zoom").val() as number * 0.01;
			const heightMod = -1 * (ui.helper[0].clientHeight / 2);
			const widthMod = -1 * (ui.helper[0].clientWidth / 2);

			const windowHeight = $(window).height() as number;
			const windowWidth = $("#map-body").width() as number;

			ui.offset.top = 0;
			ui.offset.left = $("#map-body").width() as number;
			const topPos = (heightMod * (1 - zoom));
			const bottomPos = (heightMod * (1 + zoom)) + windowHeight;
			const leftPos = (widthMod * (1 - zoom));
			const rightPos = (widthMod * (1 + zoom)) + windowWidth;

			const clientHeight = ui.helper[0].clientHeight * zoom;
			const clientWidth = ui.helper[0].clientWidth * zoom;

			const maxTopPosition = clientHeight < windowHeight ? topPos : bottomPos;
			const minTopPosition = clientHeight < windowHeight ? bottomPos : topPos;
			ui.position.top = Math.max(ui.position.top, maxTopPosition);
			ui.position.top = Math.min(ui.position.top, minTopPosition);

			const maxLeftPosition = clientWidth < windowWidth ? leftPos : rightPos;
			const minLeftPosition = clientWidth < windowWidth ? rightPos : leftPos;
			ui.position.left = Math.max(ui.position.left, maxLeftPosition);
			ui.position.left = Math.min(ui.position.left, minLeftPosition);

			centerX = ui.position.left - (windowWidth / (zoom*2));
			$("#CenterX").text("Center: " + centerX + "px | Adjusted Map Width: " + Math.round(clientWidth) + "px | Pixels shown in viewport: " + Math.round(windowWidth / (zoom*2)) + "px");
		},

		scroll: false
	});
	$(".map-container").position({
		my: "center center",
		at: "center center",
		of: "#map-body"
	});
	$(".airship.party").draggable({
		drag: function(event, ui) {
			partyDrag(event, ui, 105); // 105km/hr
		},
		start: function(event, ui) {
			partyDragStart(event, ui);
		},
		stop: function(event, ui) {
			partyDragStop(event, ui);
		},
		scroll: false,
	});

	$("#map-zoom").change();
}

function Airship(left: string, top: string, name?: string, image?: string, crew?: string[]) {
	crew = crew || ["Namfoodle", "Thunder", "Teomyr", "Redji", "Zenrya", "Bud"];
	name = name || "Airship";
	image = image || "/dnd/img/maps/Airship.png";

	// var output = "<div class=\"airship party droppable\" style=\"left:" + left + "; top:" + top + "\">";
	// 	output += "<img src=\"/dnd/img/maps/Airship.png\" alt=\"Airship\"/><span class=\"city-preview\"><h1>Party Ship</h1>";
	// 	output += characterList(crew);
	// 	output += "</span></div>";
	var output = $(`
	<div class=\"airship party droppable\" style=\"left:${left}; top:${top}\">
		<img src=\"${image}\" alt=\"Airship\"/>
		<button class="manage-crew smol">Manage Crew</button>
		<span class=\"city-preview\">
			<h1>${name}</h1>
		</span>
	</div>`);
	output.find(".city-preview").append(characterList(crew));
	$(".map-container").append(output);

	$(".airship.party").draggable({
		drag: function(event, ui) {
			partyDrag(event, ui, 105);
		},
		start: function(event, ui) {
			partyDragStart(event, ui);
		},
		stop: function(event, ui) {
			partyDragStop(event, ui);
		},
		// drop: partyDroppable,
		scroll: false,
	});
}

function Pedestrian(left: string = "50%", top: string = "50%", name: string | string[] = "Party", image: string | string[] = "/dnd/img/maps/icons/jasper.png")
{
	//@ts-ignore
	if (name.constructor !== Array) name = [name];
	//@ts-ignore
	if (image.constructor !== Array)  image = [image];

	var output;

	if (name.length > 1) {
		output = `
		<div class=\"pedestrian party pixels stay-visible\" style=\"left:${left}; top:${top}\">
			<div class="scale-me">
			</div>
			<span class=\"city-preview\">
				<h1>Party</h1>
			</span>
		</div>`;
		output = $(output);
		// var imgWidth = Math.floor(100 div image.length)
		for (let i = image.length - 1; i >= 0; i--) {
			const img = image[i];
			// output.find(".scale-me").prepend($(`<img src=\"${img}\" alt=\"Party\" style=\"width:${100/image.length}%;" />`));
			output.find(".scale-me").prepend($(`<img src=\"${img}\" alt=\"Party\" style=\"width:50%; height:50%;" />`));
		}
		output.find(".city-preview").append(characterList(name as string[]));
	} else {
		output = `
		<div class=\"pedestrian party pixels stay-visible\" style=\"left:${left}; top:${top}\">
			<img class="scale-me" src=\"${image[0]}\" alt=\"Party\"/>
			<span class=\"city-preview\">
				<h1>${name[0]}</h1>
			</span>
		</div>`;
		output = $(output);
	}


	$("#map-container").append(output);
	$(output).draggable({
		drag: function(event, ui) {
			partyDrag(event, ui, 5);
		},
		start: function(event, ui) {
			partyDragStart(event, ui);
		},
		stop: function(event, ui) {
			partyDragStop(event, ui);
		},
		scroll: false,
	});
}

function PedestrianNPC(left: string = "50%", top: string = "50%", name: string | string[] = "Party", image: string | string[] = "/dnd/img/maps/icons/jasper.png")
{
	//@ts-ignore
	if (name.constructor !== Array) name = [name];
	//@ts-ignore
	if (image.constructor !== Array)  image = [image];

	var output;

	if (name.length > 1) {
		output = `
		<div class=\"pedestrian party pixels npc hideable\" style=\"left:${left}; top:${top}\">
			<span class=\"city-preview\">
				<h1>Party</h1>
			</span>
		</div>`;
		output = $(output);
		// var imgWidth = Math.floor(100 div image.length)
		for (let i = image.length - 1; i >= 0; i--) {
			const img = image[i];
			output.prepend($(`<img src=\"${img}\" alt=\"Party\" style=\"width:${100/image.length}%;" />`));
		}
		output.find(".city-preview").append(characterList(name as string[]));
	} else {
		output = `
		<div class=\"pedestrian party pixels npc hideable\" style=\"left:${left}; top:${top}\">
			<img src=\"${image[0]}\" alt=\"Party\"/>
			<span class=\"city-preview\">
				<h1>${name[0]}</h1>
			</span>
		</div>`;
		output = $(output);
	}

	$("#map-container").append(output);
	$(".pedestrian.party").draggable({
		drag: function(event, ui) {
			partyDrag(event, ui, 5);
		},
		start: function(event, ui) {
			partyDragStart(event, ui);
		},
		stop: function(event, ui) {
			partyDragStop(event, ui);
		},
		scroll: false,
	});
}

function PartyBattle(left: string = "50%", top: string = "50%", name: string | string[] = "Party Member", image: string | string[] = "/dnd/img/maps/icons/jasper.png", target: string = "#map-container")
{
	//@ts-ignore
	if (image.constructor !== Array)  image = [image];

	var output;
	var size = airshipGrid + 'px';

	if (image.length > 1) {
		// output = `
		// <div class=\"pedestrian party pixels stay-visible battle-token\" style=\"width:${size}; height:${size}; left:${left}; top:${top}\">
		// 	<img class="wide-shot scale-me" src="${image[0]}" style="width:100%;" alt="${name[0]}"/>
		// 	<div class="close-up jasper-battle idle" style="width:200%; position:absolute; top:50%; left:50%; transform:translate(-50%, -100%);">
		// 	</div>
		// 	<span class=\"city-preview\">
		// 		<h1>${name[0]}</h1>
		// 	</span>
		// </div>`;
		output = `
		<div class=\"pedestrian party pixels stay-visible battle-token\" style=\"width:${size}; height:${size}; left:${left}; top:${top}\">
			<img class="wide-shot scale-me" src="${image[0]}" style="width:100%;" alt="${name}"/>
			<img class="close-up" src="${image[1]}" alt="${name}" style="width:120%; height:120%; position:absolute; top:70%; left:50%; transform:translate(-50%, -100%);pointer-events:none;" />
			<span class=\"city-preview\">
				<h1>${name}</h1>
			</span>
		</div>`;
		output = $(output);
	} else {
		output = `
		<div class=\"pedestrian party pixels stay-visible\" style=\"width:${size}; height:${size}; left:${left}; top:${top}\">
			<img class="scale-me" src=\"${image[0]}\" alt=\"Party\"/>
			<span class=\"city-preview\">
				<h1>${name}</h1>
			</span>
		</div>`;
		output = $(output);
	}


	$(target).append(output);
	if (left.includes('%')) {
		left = (Math.round(parseFloat(left) * $(".map-container")[0].clientWidth / (airshipGrid*100)) * airshipGrid) + "px";
		output.css("left", left);
	} else if (!left.includes('px')) {
		left = (parseFloat(left) * airshipGrid) + "px";
		output.css("left", left);
	}
	if (top.includes('%')) {
		top = Math.round(parseFloat(top) * $(".map-container")[0].clientHeight / (airshipGrid*100)) * airshipGrid + "px";
		output.css("top", top);
	} else if (!top.includes('px')) {
		top = (parseFloat(top) * airshipGrid) + "px";
		output.css("top", top);
	}
	$(output).draggable({
		drag: function(event, ui) {
			partyDrag(event, ui, 5);
		},
		start: function(event, ui) {
			partyDragStart(event, ui);
		},
		stop: function(event, ui) {
			partyDragStop(event, ui);
		},
		scroll: false,
		stack: ".draggable"
	});
}

function FlyingThing(left: string = "50%", top: string = "50%", name: string | string[] = "Party", image: string | string[] = "/dnd/img/maps/icons/jasper.png")
{
	//@ts-ignore
	if (name.constructor !== Array) name = [name];
	//@ts-ignore
	if (image.constructor !== Array)  image = [image];

	var output;

	if (name.length > 1) {
		output = `
		<div class=\"pedestrian party pixels\" style=\"left:${left}; top:${top}\">
			<span class=\"city-preview\">
				<h1>Party</h1>
			</span>
		</div>`;
		output = $(output);
		// var imgWidth = Math.floor(100 div image.length)
		for (let i = image.length - 1; i >= 0; i--) {
			const img = image[i];
			output.prepend($(`<img src=\"${img}\" alt=\"Party\" style=\"width:${100/image.length}%;" />`));
		}
		output.find(".city-preview").append(characterList(name as string[]));
	} else {
		output = `
		<div class=\"pedestrian party pixels\" style=\"left:${left}; top:${top}\">
			<img src=\"${image[0]}\" alt=\"Party\"/>
			<span class=\"city-preview\">
				<h1>${name[0]}</h1>
			</span>
		</div>`;
		output = $(output);
	}

	$("#map-container").append(output);
	$(".pedestrian.party").draggable({
		drag: function(event, ui) {
			partyDrag(event, ui, 15); // 15kmph
		},
		start: function(event, ui) {
			partyDragStart(event, ui);
		},
		stop: function(event, ui) {
			partyDragStop(event, ui);
		},
		scroll: false,
	});
}

function partyDrag(event: JQueryEventObject, ui: JQueryUI.DraggableEventUIParams, speed: number) {
	dragging = true;
	var zoom = $("#map-zoom").val() as number * 0.01;
	if (ctrlkey) {
		ui.position.left = dragStartX;
		ui.position.top = dragStartY;
	} else {
		ui.position.top = Math.round(((event.pageY/zoom) - $(".map-container").position().top/zoom - (ui.helper.height() as number/2))/airshipGrid)*airshipGrid;
		ui.position.left = Math.round(((event.pageX/zoom) - $(".map-container").position().left/zoom - (ui.helper.width() as number/2))/airshipGrid)*airshipGrid;
	}
	dragStopX = ui.position.left;
	dragStopY = ui.position.top;
	var deltaX = (dragStopX - dragStartX);
	var deltaY = (dragStopY - dragStartY);
	var distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) * kmppx;
	var time = Math.round(distance*100/speed)/100;
	if (shiftkey) {
		time = 0;
	}
	$("#TripDistance").text((Math.round(distance*100)/100) + "km");
	$("#TripTime").text(time + "hours");
	var array = $(".pedestrian.party").toArray();
	array.sort(SortByY);
	for (let i = 0; i < array.length; i++) {
		var el = array[i];
		let jel = $(el);
		jel.css("z-index", (i + 5));
	}
}

function partyDragStop(event: JQueryEventObject, ui: JQueryUI.DraggableEventUIParams) {
	dragging = false;
}

function partyDragStart(event: JQueryEventObject, ui: JQueryUI.DraggableEventUIParams) {
	var zoom = $("#map-zoom").val() as number * 0.01;
	dragStartX = Math.round(((event.pageX/zoom) - $(".map-container").position().left/zoom - (ui.helper.width() as number/2))/airshipGrid)*airshipGrid;
	dragStartY = Math.round(((event.pageY/zoom) - $(".map-container").position().top/zoom - (ui.helper.height() as number/2))/airshipGrid)*airshipGrid;
}

function partyDroppable()
{
	$(".airship.party").droppable({
		accept: ".pedestrian",
		//@ts-ignore
		classes: {
			"ui-droppable-hover": "ui-state-hover"
		},
		drop: function( event, ui ) {
			if (shiftkey) {
				$( this ).addClass( "ui-state-highlight" );
				var addedCharacters = [];
				if ($(ui.draggable).find(".character-list").length) {
					$(ui.draggable).find(".character-list li").each(function(node) {
						addedCharacters.push($(this).text());
					});
				} else {
					addedCharacters.push($(ui.draggable).find("h1").text());
				}
				if ($(this).find(".character-list").length) {
					$(this).find(".character-list li").each(function(node) {
						addedCharacters.push($(this).text());
					});
					$(this).find(".character-list").remove();
				}

				$(this).find("span").append(characterList(addedCharacters));
				$(ui.draggable).remove();
			}
		}
	  });
}

function characterList(characters: string[]): string {
	var output = "<ul class=\"character-list\">";
	characters.forEach(e => {
		output += "<li>" + e + "</li>";
	});
	output += "</ul>";
	return output;
}

function CrewManager(object1: any, object2: any, name1: string, name2: string) {
	var output = `
	<div class=\"party-transfer\">
		<table>
			<tr>
				<td class="transfer-header">
					${name1}:
				</td>
				<td>
					&#160;
				</td>
				<td class="transfer-header">
					${name2}:
				</td>
			</tr>
			<tr>
				<td class="transfer-left">
					&#160;
				</td>
				<td>
					&#160;
				</td>
				<td class="transfer-right">
					&#160;
				</td>
			</tr>
		</table>
		<div class="buttons">
			<button class="cancel">Cancel</button>
			<button class="accept">Accept</button>
		</div>
	</div>`;

	$("body").append($(output));
	// $(".pedestrian.party").draggable({
	// 	drag: function(event, ui) {
	// 		partyDrag(event, ui, 15); // 15kmph
	// 	},
	// 	start: function(event, ui) {
	// 		partyDragStart(event, ui);
	// 	},
	//  stop: function(event, ui) {
	//  	partyDragStop(event, ui);
	//  },
	// 	scroll: false,
	// });
}
// class PartyShip extends React.Component {
// 	render() {
// 		return (
// 			<div class="airship party" style={{left: 43.5 + '%'}, {top: 39 + "%"}}>
// 				<img src="/dnd/img/maps/Airship.png" alt="Airship"/>
// 				<span class="city-preview">
// 					<h1>Party Ship</h1>
// 				</span>
// 			</div>
// 		)
// 	}
// }

// ReactDOM.render(
// 	<PartyShip />,
// 	document.getElementById("airship-container")
// )


// // const MapLabel = (props) => <span class="city-preview"><h1>{props.name}</h1></span>;



$(document).ready(function(){
	$("body").on("mousedown", ".manage-crew", function(e){
		CrewManager(null, null, "Ship", "Way Party");
	});
	$("body").on("mousedown", ".cancel", function(e){
		e.target.parentNode.parentNode.remove();
	});
	$("body").on("mousedown", "div.buttons>.accept", function(e){
		CrewManager(null, null, "Ship", "Way Party");
	});
});

function SortByY(a: HTMLElement, b: HTMLElement){
	var aTop = parseFloat($(a).css("top"));
	var bTop = parseFloat($(b).css("top"));
	return ((aTop < bTop) ? -1 : ((aTop > bTop) ? 1 : 0));
}

function updateMapCSSForZoom(zoom: number)
{
	$(".map-container .smol").css("fontSize", (18 / zoom) + "px");
	$(".map-container .med").css("fontSize", (20 / zoom) + "px");
	$(".city-preview").find("p").css("fontSize", (18 / zoom) + "px");
	$(".city-preview").find("ul").css("fontSize", (18 / zoom) + "px");
	$(".city-preview").find("ul").css("lineHeight", (20 / zoom) + "px");
	$(".city-preview").find("h1").css("fontSize", (20 / zoom) + "px");
	$(".stay-visible").find("img.scale-me").css({
		"width": (50 / zoom) + "px",
		"height": (50 / zoom) + "px",
	});
	$(".stay-visible").find("div.scale-me").css({
		"width": (100 / zoom) + "px",
		"height": (100 / zoom) + "px",
	});

	$(".city-preview").css("width", Math.round(500/zoom) + "px");
	$(".city-preview").css("padding", Math.round(10/zoom) + "px");
	$(".map-container").removeClass("z50");
	$("#previous-zoom").val(zoom);
	if (zoom >= 0.45) {
		$('.village').css("display", "block");
		$('.city').css("display", "block");
		$('.metropolis').css("display", "block");
		$('.continent').css("display", "none");
		$(".map-container").addClass("z50");
	}
	else if (zoom > 0.3) {
		$('.village').css("display", "none");
		$('.city').css("display", "block");
		$('.metropolis').css("display", "block");
		$('.continent').css("display", "none");
	}
	else if (zoom > 0.1) {
		$('.village').css("display", "none");
		$('.city').css("display", "none");
		$('.metropolis').css("display", "block");
		$('.continent').css("display", "block");
	}
	else{
		$('.village').css("display", "none");
		$('.city').css("display", "none");
		$('.metropolis').css("display", "none");
		$('.continent').css("display", "block");
	}
}

function handleZoomUpdate(delta: number)
{
	const startZoom = $("#map-zoom").val() as number * 1;
	let newZoom = startZoom;
	if(delta > 0) {
		newZoom += 5;
	}
	else{
		newZoom -= 5;
	}
	$("#map-zoom").val(newZoom);
	$("#map-zoom").change();
}