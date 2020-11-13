// var dragStartX, dragStartY, dragStopX, dragStoptY;
// const focal = {
// 	x:0,
// 	y:0
// };
// var centerX;

$(document).ready(function(){
	centerX = parseFloat($(".map-container").css("left"));
	// $("#map-zoom").change(function() {
	// 	var zoom = $(this).val() * 0.01;
	// 	zoomMap(zoom);
	// 	keepMapInBoundaries(zoom);
	// 	scaleMapObjects(zoom);
	// });

	$("#map-container").mousedown(function() {
		var zoom = $("#map-zoom").val() * 0.01;
		zoomMap(zoom);
	});

	$(".map-container").position({
		my: "center center",
		at: "center center",
		of: "#map-body"
	});

	// $('#map-body').on('wheel mousewheel', function(e){
	// 	var delta;
	// 	var startZoom = $("#map-zoom").val() * 1;
	// 	var newZoom = startZoom;
	// 	if (e.originalEvent.wheelDelta !== undefined)
	// 		delta = e.originalEvent.wheelDelta;
	// 	else
	// 		delta = e.originalEvent.deltaY * -1;

	// 		if(delta > 0) {
	// 			newZoom += 5;
	// 		}
	// 		else{
	// 			newZoom -= 5;
	// 		}
	// 		$("#map-zoom").val(newZoom);
	// 		$("#map-zoom").change();
	// });

	$(".map-container").draggable({
		drag: function(event, ui) {
			// ui.offset.top = 5625;
			var zoom = $("#map-zoom").val() * 0.01;
			const heightMod = -1 * (ui.helper[0].clientHeight / 2);
			const widthMod = -1 * (ui.helper[0].clientWidth / 2);
			ui.offset.top = 0;
			ui.offset.left = $("#map-body").width();
			const topPos = (heightMod * (1 - zoom));
			const bottomPos = (heightMod * (1 + zoom)) + $(window).height();
			const leftPos = (widthMod * (1 - zoom));
			const rightPos = (widthMod * (1 + zoom)) + $("#map-body").width();

			const clihi = ui.helper[0].clientHeight * zoom;
			const wihi = $(window).height();
			const cliwi = ui.helper[0].clientWidth * zoom;
			const wiwi = $("#map-body").width();
			if (clihi < wihi) {
				if ((ui.position.top) < topPos) {
					ui.position.top = topPos;
				}
				else if ((ui.position.top) > bottomPos) {
					ui.position.top = bottomPos;
				}
			}
			else {
				if ((ui.position.top) > topPos) {
					ui.position.top = topPos;
				}
				else if ((ui.position.top) < bottomPos) {
					ui.position.top = bottomPos;
				}
			}

			if (cliwi < wiwi) {
				if ((ui.position.left) < leftPos) {
					ui.position.left = leftPos;
				}
				else if ((ui.position.left) > rightPos) {
					ui.position.left = rightPos;
				}
			}
			else {
				if ((ui.position.left) > leftPos) {
					ui.position.left = leftPos;
				}
				else if ((ui.position.left) < rightPos) {
					ui.position.left = rightPos;
				}
			}
			// centerX = ui.position.left - (wiwi / (zoom*2));
			centerX = ui.position.left;
			var so = getScreenOffset(zoom);
			focal.x = cliwi + centerX - so.x;
			$("#CenterX").text("Center: " + centerX + "px | Adjusted Map Width: " + Math.round(cliwi) + "px | Pixels shown in viewport: " + Math.round(wiwi / (zoom)) + "px | screen offset: X:" + so.x + ", Y:" + so.y);
		},

		scroll: false
	});
})

function scaleMapObjects(zoom) {
	$(".stay-visible").find("img.scale-me").css({
		"width": (50 / zoom) + "px",
		"height": (50 / zoom) + "px",
	});
	$(".stay-visible").find("div.scale-me").css({
		"width": (100 / zoom) + "px",
		"height": (100 / zoom) + "px",
	});

	$(".hover-preview").css("width", Math.round(500/zoom) + "px");
	$(".hover-preview").css("padding", Math.round(10/zoom) + "px");
	$(".map-container").removeClass("z50");
	$("#previous-zoom").val(zoom);
	if (zoom >= 0.45) {
		$('.village').css("display", "block");
		$('.city').css("display", "block");
		$('.planet-label').css("display", "block");
		$('.system .label').css("display", "block");
		$(".map-container").addClass("z50");
	}
	else if (zoom > 0.3) {
		$('.village').css("display", "none");
		$('.city').css("display", "block");
		$('.planet-label').css("display", "block");
		$('.system .label').css("display", "block");
	}
	else if (zoom > 0.1) {
		$('.village').css("display", "none");
		$('.city').css("display", "none");
		$('.planet-label').css("display", "block");
		$('.system .label').css("display", "block");
		// $('.system .label').css("display", "none");
		// $('.near-space .label').css("display", "block");
	}
	else{
		$('.village').css("display", "none");
		$('.city').css("display", "none");
		$('.planet-label').css("display", "none");
		$('.system .label').css("display", "none");
		$('.near-space .label').css("display", "block");
	}
}

function mapFocus(x, y) {
	x = x || 0;
	y = y || 0;
	var zoom = $("#map-zoom").val() * 0.01;
	var so = getScreenOffset(zoom);
	const w = $("#map-container").width() / 2;
	const left = x + so.x - w;
	$("#map-container").css("left", left);
	console.log(left);
}

function getScreenOffset(zoom){
	const h = $(window).height();
	const w = $(window).width();
	// var y = Math.max(h, h/zoom);
	// var x = Math.max(w, w/zoom);
	var y = h;
	var x = w;
	// var y = h/zoom;
	// var x = w/zoom;
	y = Math.round(y/2);
	x = Math.round(x/2);
	return { x: x, y: y};
}

function keepMapInBoundaries(zoom) {
	const previousZoom = parseFloat($("#previous-zoom").val());
	const factor = previousZoom/zoom;
	const windowScale = ($(window).width()/(previousZoom*2));
	const newWindowScale = ($(window).width()/(zoom*2));
	// var initialLeft = parseFloat($(".map-container").css("left")) + newWindowScale - windowScale;
	var initialLeft = parseFloat($(".map-container").css("left"));
	const initialWidth = $(".map-container")[0].clientWidth;

	const heightMod = -1 * ($(".map-container")[0].clientHeight / 2);
	const widthMod = -1 * ($(".map-container")[0].clientWidth / 2);
	const topPos = (heightMod * (1 - zoom));
	const bottomPos = (heightMod * (1 + zoom)) + $(window).height();
	const leftPos = (widthMod * (1 - zoom));
	const rightPos = (widthMod * (1 + zoom)) + $("#map-body").width();
	$(".map-container").offset.top = 0;
	$(".map-container").offset.left = 0;
	const curTop = parseFloat($(".map-container").css("top"));
	const curLeft = parseFloat($(".map-container").css("left"));


	const clihi = $(".map-container")[0].clientHeight * zoom;
	const wihi = $(window).height();
	const cliwi = $(".map-container")[0].clientWidth * zoom;
	const wiwi = $("#map-body").width();
	if (clihi < wihi) {
		if (curTop <= topPos) {
			$(".map-container").css("top", topPos + "px");
		}
		else if (curTop > bottomPos) {
			$(".map-container").css("top", bottomPos + "px");
		}
	}
	else {
		if (curTop >= topPos) {
			$(".map-container").css("top", topPos + "px");
		}
		else if (curTop < bottomPos) {
			$(".map-container").css("top", bottomPos + "px");
		}
	}

	if (cliwi < wiwi) {
		if (curLeft <= leftPos) {
			$(".map-container").css("left", leftPos + "px");
		}
		else if (curLeft > rightPos) {
			$(".map-container").css("left", rightPos + "px");
		}
	}
	else {
		if (curLeft >= leftPos) {
			$(".map-container").css("left", leftPos + "px");
		}
		else if (curLeft < rightPos) {
			$(".map-container").css("left", rightPos + "px");
		}
		else {
			$(".map-container").css("left", (initialLeft) + "px");
		}
	}
}

function zoomMap(zoom) {
	var zoomString = "scale(" + zoom + ")";
	var originLeft = $("#map-body").scrollLeft() + ($("#map-body").width() / 2);
	var originTop = $("#map-body").scrollTop() + ($("#map-body").height() / 2);
	// $(".map").css("transform-origin", originLeft + "px " + originTop + "px");
	$(".map").css("transform", zoomString);
	updateFontSize(zoom);

	// Test
	$("#TripTime").text("Focal: X: " + focal.x + ", Y: " + focal.y);
}

function updateFontSize(zoom) {
	const f18 = (18 / zoom) + "px";
	const f20 = (20 / zoom) + "px";
	$(".map-container .smol").css("fontSize", f18);
	$(".map-container .med").css("fontSize", f20);
	$(".hover-preview").find("p").css("fontSize", f18);
	$(".hover-preview").find("ul").css("fontSize", f18).css("lineHeight", f20);
	$(".hover-preview").find("h1").css("fontSize", f20);
	$('.system .label').css("fontSize", (24 / zoom) + "px");
}

function getSystemSize(system) {
	var size = 0;
	for (let index = 0; index < system.planets.length; index++) {
		const planet = system.planets[index];
		var di = parseFloat(planet.diameter) || 1;
		di = (planet.type=="Planet" || planet.type=="Star")? di : 0;
		size += di;
	}
	size = size * scale * 2;
	return size;
}

function getPlanetSize(planet) {
	var size = parseFloat(planet.Diameter);
	if (size == "NaN") size = 1;
	size = size * scale;
	return Math.max(size, scale);
}

function systemPreview(systemName) {
	$.ajax({
		crossDomain: true,
		url: "/sf/res/data/systems.json",
		dataType: 'html',
		error: function (xmlHttpReq, status, err) {
			var something = xmlHttpReq;
		},
		success: function (returnedData) {
			var items = JSON.parse(returnedData).items;
			for (let index = 0; index < items.length; index++) {
				const sys = items[index];
				if (sys.name == systemName) {
					const div = $(`
					<div name="${sys.name}"">
						<div class="smith system-label label">${sys.name}</div>
						<div>${sys.titles.toString()}</div>
						<div>${sys.space}</div>
					</div>`);
					for (let i = 0; i < sys.planets.length; i++) {
						const planet = sys.planets[i];
						div.append(
							$(`<div class="planet" style="width: 10%; height:10%;"></div>`)
						);
					}
					$("body").append($(
						`<div class="popup">
							${div.html()}
							<div class="exit">X</div>
						</div>
						`
					));
					break;
				}
			}
		}
	});
}