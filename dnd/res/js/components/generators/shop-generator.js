"use strict";
class ShopGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.clear = () => {
            this.setState({ inventory: [] });
        };
        this.generateInventory = () => {
            const itemRarity = this.state.maxItemRarity == "null" ? undefined : this.state.maxItemRarity;
            const itemType = this.state.maxItemRarity == "null" ? undefined : this.state.maxItemRarity;
            const newItemArray = this.state.inventory.concat(generateItems(itemRarity, itemType, 0, this.state.rowsToGenerate));
            this.setState({ inventory: newItemArray });
        };
        this.state = {
            inventory: [],
            itemType: "null",
            maxItemRarity: "null",
            rowsToGenerate: 20,
        };
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "Shop Inventory"),
            React.createElement("p", { className: "px-2" }, "Generate shop inventories for when players want to do a mall episode."),
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "card-body" },
                    React.createElement("div", { className: "mb-3 row" },
                        React.createElement("label", { className: "col-sm-1 col-form-label" }, "Max Item Rarity:"),
                        React.createElement("div", { className: "col-sm-11" },
                            React.createElement("select", { className: "form-select", onChange: e => this.setState({ maxItemRarity: e.target.value }), value: this.state.maxItemRarity },
                                React.createElement("option", { value: "null" }, "Any max item rarity"),
                                React.createElement("option", { disabled: true }, "--------------"),
                                React.createElement("option", { value: "None" }, "None"),
                                React.createElement("option", { value: "Common" }, "Common"),
                                React.createElement("option", { value: "Uncommon" }, "Uncommon"),
                                React.createElement("option", { value: "Rare" }, "Rare"),
                                React.createElement("option", { value: "Very Rare" }, "Very Rare"),
                                React.createElement("option", { value: "Legendary" }, "Legendary"),
                                React.createElement("option", { value: "Artifact" }, "Artifact")))),
                    React.createElement("div", { className: "mb-3 row" },
                        React.createElement("label", { className: "col-sm-1 col-form-label" }, "Item Type:"),
                        React.createElement("div", { className: "col-sm-11" },
                            React.createElement("select", { className: "form-select", onChange: e => this.setState({ itemType: e.target.value }), value: this.state.itemType },
                                React.createElement("option", { value: "null" }, "Surprise Me"),
                                React.createElement("option", { disabled: true }, "--------------"),
                                React.createElement("option", { value: "armor" }, "Armor"),
                                React.createElement("option", { value: "potion" }, "Potion"),
                                React.createElement("option", { value: "ring" }, "Ring"),
                                React.createElement("option", { value: "scroll" }, "Scroll"),
                                React.createElement("option", { value: "weapon" }, "Weapon"),
                                React.createElement("option", { value: "wondrous item" }, "Wondrous Item")))),
                    React.createElement("button", { type: "button", onClick: this.generateInventory, className: "btn btn-primary m-1" }, "Generate"),
                    React.createElement("button", { type: "button", onClick: this.clear, className: "btn btn-danger m-1" }, "Clear Inventory"),
                    React.createElement("button", { type: "button", className: "btn btn-info m-1", "data-bs-toggle": "modal", "data-bs-target": "#price-details" }, "Pricing Information"))),
            React.createElement("table", { className: "table table-light table-striped" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Type"),
                        React.createElement("th", null, "Rarity"),
                        React.createElement("th", null, "Price"),
                        React.createElement("th", null, "Count"))),
                React.createElement("tbody", null, this.state.inventory.map((item, index) => React.createElement("tr", { key: index },
                    React.createElement("td", null, item.name),
                    React.createElement("td", null, item.type),
                    React.createElement("td", null, item.rarity),
                    React.createElement("td", null,
                        item.price,
                        "gp"),
                    React.createElement("td", null, item.count))))),
            React.createElement("div", { className: "modal", id: "price-details", tabIndex: -1 },
                React.createElement("div", { className: "modal-dialog modal-dialog-centered modal-dialog-scrollable" },
                    React.createElement("div", { className: "modal-content" },
                        React.createElement("div", { className: "modal-header" },
                            React.createElement("h5", { className: "modal-title" }, "Modal title"),
                            React.createElement("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })),
                        React.createElement("div", { className: "modal-body" },
                            React.createElement("p", null, "Price ranges are as follows:"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("b", null, "Common: "),
                                    " 50gp - 100gp"),
                                React.createElement("li", null,
                                    React.createElement("b", null, "Uncommon: "),
                                    " 101gp - 500gp"),
                                React.createElement("li", null,
                                    React.createElement("b", null, "Rare: "),
                                    " 501gp - 5,000gp"),
                                React.createElement("li", null,
                                    React.createElement("b", null, "Very Rare: "),
                                    " 5,001gp - 50,000gp"),
                                React.createElement("li", null,
                                    React.createElement("b", null, "Legendary: "),
                                    " 50,001gp - 500,000gp"))))))));
    }
}
//# sourceMappingURL=shop-generator.js.map