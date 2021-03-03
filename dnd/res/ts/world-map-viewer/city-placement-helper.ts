function attachPlacementHelper(mapElement: string) {
	$(mapElement).click(function(evt) {
		$(".location-tester").remove();
		var zoom = ($("#map-zoom").val() as number) * 0.01;
		let map = $(this) as JQuery<HTMLElement>;
		//@ts-ignore
		var x = (evt.pageX + 8 - map.offset().left)/(map.width() * zoom);
		//@ts-ignore
		var y = (evt.pageY + 8 - map.offset().top)/(map.height() * zoom);
		console.log(`evt.pageX: ${evt.pageX}, evt.pageY: ${evt.pageY}`);
		//@ts-ignore
		console.log(`map.offset().left: ${map.offset().left}, map.offset().top: ${map.offset().top}`);
		console.log(`X: ${x}, X: ${y}`);
		var newMarker = $(`<a href="#" class="point-of-interest smith village location-tester">
			<div class="map-marker-icon marker-town">&nbsp;</div>
		</a>`);
		map.append(newMarker);
		newMarker.css("left", (Math.round(x * 10000) / 100) + "%");
		newMarker.css("top", (Math.round(y * 10000) / 100) + "%");
	});
}