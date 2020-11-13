"use strict";
class PreviewModal {
    constructor(header = "", content = "") {
        this.element = $(`<div class="modal details"></div>`);
        this.element.html(`
		<div class="modal-header">
			<h2>${header}</h2>
			<div class="select button">X</div>
		</div>
		<div class="modal-content">${content}</div>
		`);
        let target = this;
        this.element.find(".modal-header>.select").on("click", function () {
            $(target.element).remove();
            $('.no-scroll').removeClass('no-scroll');
        });
    }
    set header(val) {
        this.element.find(".modal-header>h2").html(val);
    }
    set content(val) {
        this.element.find(".modal-content").html(val);
    }
}
//# sourceMappingURL=modal-preview.js.map