"use strict";
$(document).ready(function () {
    $.ajax({
        crossDomain: true,
        url: "/dnd/res/data/random-tables.json",
        dataType: 'json',
        error: function (xmlHttpReq, status, err) {
            var something = xmlHttpReq;
        },
        success: function (items) {
            // ReactDOM.render(
            // 	<RandomTables tables={items.sort((a, b) => a.name > b.name && 1 || -1)} />,
            // 	document.getElementById("random-table-container")
            // );
            for (let index = 0; index < items.length; index++) {
                const e = items[index];
                if (e.show) {
                    $("#table-list").append($(`
						<option value="${e.name}">${e.name}</option>
					`));
                }
            }
            let tableName = GetURLParameter("table");
            let matchingTables = [];
            if (tableName) {
                matchingTables = items.filter(el => el.name.toLowerCase() == tableName?.toLowerCase());
            }
            let selectedTable = matchingTables.length > 0 ? matchingTables[0] : items[0];
            populateRows(selectedTable);
        }
    });
    $("#table-list").on("change", function () {
        var newVal = $(this).val();
        $.ajax({
            crossDomain: true,
            url: "/dnd/res/data/random-tables.json",
            dataType: 'json',
            error: function (xmlHttpReq, status, err) {
                var something = xmlHttpReq;
            },
            success: function (items) {
                let item = items.filter(function (entry) {
                    return entry.name == newVal;
                })[0];
                history.pushState(null, '', '/dnd/pages/tools/random-tables.html?table=' + item.name);
                populateRows(item);
            }
        });
    });
    function populateRows(item) {
        $("#roll-it").html("Roll 1d" + item.rows.length);
        $("#description").html(item.description);
        $("#result").html("");
        $("#random-table>tbody").html("");
        for (let index = 0; index < item.rows.length; index++) {
            const e = item.rows[index];
            $("#random-table>tbody").append($(`
				<tr>
					<td>${index + 1}</td>
					<td>${e}</td>
				</tr>
			`));
        }
    }
    $("#roll-it").click(function () {
        var die = $("#random-table tr").length;
        var result = rollDie(die);
        const el = $("#random-table tr")[result - 1];
        $("#result").html(result + ".<br/>" + el.children[1].innerText);
    });
});
class RandomTables extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("select", { name: "table-list", id: "table-list" }),
            React.createElement("button", { className: "btn-primary", id: "roll-it" }, "Roll 1d"),
            React.createElement("div", { id: "description" }),
            React.createElement("div", { id: "result" }),
            React.createElement("div", { className: "item", style: { marginTop: "1em" } },
                React.createElement("table", { id: "random-table" },
                    React.createElement("thead", null,
                        React.createElement("th", null, "#"),
                        React.createElement("th", null, "Result")),
                    React.createElement("tbody", null)))));
    }
}
//# sourceMappingURL=random-tables.js.map