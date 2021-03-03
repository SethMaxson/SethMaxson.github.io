$(document).ready(() =>
{
	$(document).on("keyup", ".filter-thing .search", function ()
	{
		let srch = ($(this) as JQuery<HTMLInputElement>).val()?.toString() || "";
		let filterables = $(this).closest(".filter-thing").find(".filterable-item");
		if (srch.length == 0) {
			filterables.show();
		}
		else
		{
			filterables.hide();
			filterables.each(function ()
			{
				if (fuzzySearch(srch, $(this).text())) {
					$(this).show();
					return;
				}
				else if ($(this).attr("data-tags") && fuzzySearch(srch, $(this).attr("data-tags") as string)) {
					$(this).show();
					return;
				}
			});
		}
	});
})

function fuzzySearch(needle: string, haystack: string): boolean {
	var hlen = haystack.length;
	var nlen = needle.length;
	if (nlen > hlen) {
		return false;
	}
	if (nlen === hlen) {
		return needle === haystack;
	}
	outer: for (var i = 0, j = 0; i < nlen; i++) {
		var nch = needle.charCodeAt(i);
		while (j < hlen) {
			if (haystack.charCodeAt(j++) === nch) {
				continue outer;
			}
		}
		return false;
	}
	return true;
}