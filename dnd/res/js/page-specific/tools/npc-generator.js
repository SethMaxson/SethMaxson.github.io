"use strict";
const NPCCollectionHelpers = {
    AddNpcToCollection(collection, npc) {
        // if the item doesn't have an ID, generate one
        if (npc.id == undefined) {
            var hits = collection.all.filter(function (entry) {
                return entry.id == npc.name;
            });
            if (hits.length == 0) {
                npc.id = npc.name;
            }
            else {
                let counter = 0;
                let matchFound = false;
                let newID;
                do {
                    newID = (npc.name + counter);
                    hits = collection.all.filter(function (entry) {
                        return entry.id == newID;
                    });
                    if (hits.length == 0)
                        matchFound = true;
                    counter++;
                } while (matchFound == false);
                npc.id = newID;
            }
        }
        collection.all.push(npc);
        NPCCollectionHelpers.ApplyFilters(collection);
    },
    ApplyFilters(collection, races, genders, alignments) {
        collection.races = races || collection.races;
        collection.genders = genders || collection.genders;
        collection.alignments = alignments || collection.alignments;
        collection.filtered = [];
        for (let index = 0; index < collection.all.length; index++) {
            let shouldRender = true;
            const item = collection.all[index];
            if (collection.races.length > 0) {
                if (!collection.races.includes(item.race))
                    shouldRender = false;
            }
            if (collection.genders.length > 0) {
                if (!collection.genders.includes(item.gender))
                    shouldRender = false;
            }
            if (collection.alignments.length > 0) {
                if (!collection.alignments.includes(item.alignment))
                    shouldRender = false;
            }
            if (collection.relativeAges.length > 0) {
                if (!collection.relativeAges.includes(item.relativeAge))
                    shouldRender = false;
            }
            if (shouldRender) {
                collection.filtered.push(item);
            }
        }
        return collection.filtered;
    },
    ResetFilters(collection) {
        collection.races = [];
        collection.genders = [];
        collection.alignments = [];
        collection.relativeAges = [];
    }
};
class NPCGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.ClearRandomNPCs = () => {
            const newRandomNPCs = this.CloneNPCManager(this.state.randomNPCs);
            newRandomNPCs.all = [];
            newRandomNPCs.filtered = [];
            this.setState({
                randomNPCs: newRandomNPCs
            });
        };
        /** Creates a deep clone version of the specified NPCManager, for use in updating state. */
        this.CloneNPCManager = (npcManager) => {
            const newManager = Object.assign({}, npcManager);
            // return JSON.parse(JSON.stringify(npcManager));
            newManager.all = JSON.parse(JSON.stringify(npcManager.all));
            newManager.filtered = JSON.parse(JSON.stringify(npcManager.filtered));
            return newManager;
        };
        this.DeleteNPC = (index, isRandomCollection) => {
            let npcCollection = this.CloneNPCManager(isRandomCollection ? this.state.randomNPCs : this.state.loadedNPCs);
            this.RemoveNPCFromManager(npcCollection, index);
            if (isRandomCollection) {
                this.setState({ randomNPCs: npcCollection });
            }
            else {
                this.setState({ loadedNPCs: npcCollection });
            }
        };
        this.GenerateNPCs = (race, gender, age, alignment, number) => {
            const randomNPCs = this.CloneNPCManager(this.state.randomNPCs);
            // create NPCs
            for (let index = 0; index < number; index++) {
                const newnpc = new NPC();
                let alignmentToUse = undefined;
                if (alignment.length) {
                    alignmentToUse = randomize(alignment);
                }
                let raceToUse = race instanceof Array ? getRandomRaceFromList(race) : race;
                this.npcGenerator.randomizeNPC(newnpc, raceToUse, gender, age, alignmentToUse);
                NPCCollectionHelpers.AddNpcToCollection(randomNPCs, newnpc);
            }
            this.setState({
                randomNPCs: randomNPCs
            });
        };
        this.GetRelativeNumericAge = (npc) => {
            return this.npcGenerator.getNPCOldness(npc);
        };
        this.RemoveNPCFromManager = (manager, index) => {
            // remove from specified npc collection
            manager.all.splice(index, 1);
            manager.filtered.splice(index, 1);
        };
        this.SaveNPCs = () => {
            this.state.loadedNPCs.save();
        };
        this.SortNPCs = (isRandomCollection, property) => {
            let npcCollection = this.CloneNPCManager(isRandomCollection ? this.state.randomNPCs : this.state.loadedNPCs);
            npcCollection.sort(property);
            if (isRandomCollection) {
                this.setState({ randomNPCs: npcCollection });
            }
            else {
                this.setState({ loadedNPCs: npcCollection });
            }
        };
        this.TransferNPCBetweenManagers = (moveToRandomCollection, index) => {
            const loadedNPCs = this.CloneNPCManager(this.state.loadedNPCs);
            const randomNPCs = this.CloneNPCManager(this.state.randomNPCs);
            let donor = moveToRandomCollection ? loadedNPCs : randomNPCs;
            let target = moveToRandomCollection ? randomNPCs : loadedNPCs;
            // locate target npc
            var npc = donor.filtered[index];
            // add to random npc collection
            NPCCollectionHelpers.AddNpcToCollection(target, npc);
            // remove from saved npc collection
            this.RemoveNPCFromManager(donor, index);
            this.setState({
                loadedNPCs: loadedNPCs,
                randomNPCs: randomNPCs,
            });
        };
        this.state = {
            loadedNPCs: new NPCManager(),
            randomNPCs: new NPCManager(),
            species: [],
        };
        this.npcGenerator = new NPCDeepGenerator();
    }
    render() {
        return (React.createElement("div", { className: "container bg-secondary", style: { padding: 0 } },
            React.createElement("div", { className: "accordion accordion-flush", id: "accordionExample" },
                React.createElement("div", { className: "accordion-item" },
                    React.createElement("h2", { className: "accordion-header noprint", id: "headingOne" },
                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseOne", "aria-expanded": "false", "aria-controls": "collapseOne" }, "Loaded NPCs")),
                    React.createElement("div", { id: "collapseOne", className: "accordion-collapse collapse", "aria-labelledby": "headingOne", "data-bs-parent": "#accordionExample" },
                        React.createElement("div", { className: "accordion-body bg-secondary" },
                            React.createElement("div", { className: "row noprint mb-3" },
                                React.createElement("div", { className: "col-auto" },
                                    React.createElement("div", { className: "row noprint" },
                                        React.createElement("label", { className: "col-auto col-form-label", htmlFor: "loaded-sort-select" }, "Sort by:"),
                                        React.createElement("div", { className: "col-auto" },
                                            React.createElement("select", { className: "form-select", id: "loaded-sort-select", onChange: e => {
                                                    this.SortNPCs(false, e.target.value);
                                                } },
                                                React.createElement("option", { value: "name" }, "Name"),
                                                React.createElement("option", { value: "race" }, "Race"),
                                                React.createElement("option", { value: "gender" }, "Gender"),
                                                React.createElement("option", { value: "age" }, "Age"),
                                                React.createElement("option", { value: "alignment" }, "Alignment"),
                                                React.createElement("option", { value: "threat" }, "Threat"),
                                                React.createElement("option", { value: "intelligence" }, "Intelligence"))))),
                                React.createElement("div", { className: "col-auto" },
                                    React.createElement("button", { className: "btn btn-primary", onClick: this.SaveNPCs }, "Save!"))),
                            React.createElement(NpcCollectionDisplay, { IsRandomCollection: false, NpcCollection: this.state.loadedNPCs, DeleteNPC: this.DeleteNPC, GetRelativeNumericAge: this.GetRelativeNumericAge, TransferNPCBetweenManagers: this.TransferNPCBetweenManagers })))),
                React.createElement("div", { className: "accordion-item" },
                    React.createElement("h2", { className: "accordion-header noprint", id: "headingTwo" },
                        React.createElement("button", { className: "accordion-button", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseTwo", "aria-expanded": "true", "aria-controls": "collapseTwo" }, "Random NPCs")),
                    React.createElement("div", { id: "collapseTwo", className: "accordion-collapse collapse show", "aria-labelledby": "headingTwo", "data-bs-parent": "#accordionExample" },
                        React.createElement("div", { className: "accordion-body bg-secondary" },
                            React.createElement(NPCGeneratorSettings, { ClearRandomNPCs: this.ClearRandomNPCs, GenerateNPCs: this.GenerateNPCs, Species: this.state.species }),
                            React.createElement("div", { className: "mb-3 row noprint d-print-none" },
                                React.createElement("label", { className: "col-sm-1 col-form-label", htmlFor: "random-sort-select" }, "Sort by:"),
                                React.createElement("div", { className: "col-sm-11" },
                                    React.createElement("select", { className: "form-select", id: "random-sort-select", onChange: e => {
                                            this.SortNPCs(true, e.target.value);
                                        } },
                                        React.createElement("option", { value: "name" }, "Name"),
                                        React.createElement("option", { value: "race" }, "Race"),
                                        React.createElement("option", { value: "gender" }, "Gender"),
                                        React.createElement("option", { value: "age" }, "Age"),
                                        React.createElement("option", { value: "alignment" }, "Alignment"),
                                        React.createElement("option", { value: "threat" }, "Threat"),
                                        React.createElement("option", { value: "intelligence" }, "Intelligence")))),
                            React.createElement(NpcCollectionDisplay, { IsRandomCollection: true, NpcCollection: this.state.randomNPCs, DeleteNPC: this.DeleteNPC, GetRelativeNumericAge: this.GetRelativeNumericAge, TransferNPCBetweenManagers: this.TransferNPCBetweenManagers })))))));
    }
    componentDidMount() {
        const self = this;
        $.ajax({
            crossDomain: true,
            url: "/dnd/res/data/races.json",
            dataType: 'json'
        }).done(function (returnedData) {
            returnedData.sort(compareRaceJsonObjects);
            self.setState({ species: returnedData }, () => {
                //#region initialize jquery.multiselect.js
                //@ts-ignore
                $('#race-select').multiselect({
                    columns: 1,
                    placeholder: 'Surprise Me',
                    search: true,
                    selectAll: true
                });
                //#endregion initialize jquery.multiselect.js
            });
            //#region initialize jquery.multiselect.js
            //@ts-ignore
            $('#alignment-select').multiselect({
                columns: 3,
                placeholder: 'Surprise Me',
                selectAll: true,
                // selectGroup: true
            });
            //@ts-ignore
            $('#gender-select').multiselect({
                columns: 1,
                placeholder: 'Surprise Me'
            });
            //#endregion initialize jquery.multiselect.js
            for (let i = 0; i < returnedData.length; i++) {
                races.push(returnedData[i].ID);
            }
            getNPCs().done(function (items) {
                const loadedNPCs = new NPCManager(items);
                loadedNPCs.parse();
                self.setState({ loadedNPCs: loadedNPCs });
            });
            self.GenerateNPCs(undefined, undefined, undefined, [], 20);
        });
    }
}
class NPCGeneratorSettings extends React.Component {
    // public static defaultProps = {
    // 	friendshipLevel: storage.isGM? 6 : 1
    // };
    constructor(props) {
        super(props);
        this.generateNPCs = () => {
            this.props.GenerateNPCs(this.races, this.state.gender.length == 1 ? this.state.gender[0] : undefined, this.ages, this.state.alignments, this.state.numberToGenerate);
        };
        this.restoreDefaultSettings = () => {
            this.setState({
                ages: [],
                alignments: [],
                gender: ["female", "male"],
                numberToGenerate: 20,
                race: [],
                restrictRacesByAlignment: false
            });
        };
        this.updateNumberToGenerate = (e) => {
            this.setState({ numberToGenerate: e.target.valueAsNumber });
        };
        this.state = {
            ages: [],
            alignments: [],
            gender: ["female", "male"],
            numberToGenerate: 20,
            race: [],
            restrictRacesByAlignment: false,
        };
    }
    render() {
        return (React.createElement("div", { className: "generator-settings noprint bg-light rounded p-2 border border-1 mb-3" },
            React.createElement("button", { className: "btn btn-secondary", onClick: this.restoreDefaultSettings }, "Default Settings"),
            React.createElement("div", { className: "mb-3 row" },
                React.createElement("label", { className: "col-sm-2 col-form-label", htmlFor: "race-select" }, "Species:"),
                React.createElement("div", { className: "col-sm-10" },
                    React.createElement(MultiSelect, { OnChange: (value) => this.setState({ race: value }), Options: this.props.Species.map(species => {
                            return { value: species.ID, label: species.name };
                        }), Search: true, SelectAll: true, Value: this.state.race }))),
            React.createElement("div", { className: "mb-3 row" },
                React.createElement("label", { className: "col-sm-2 col-form-label", htmlFor: "gender-select" }, "Gender:"),
                React.createElement("div", { className: "col-sm-10" },
                    React.createElement(MultiSelect, { OnChange: (value) => this.setState({ gender: value }), Options: [
                            {
                                value: "female",
                                label: "Female"
                            },
                            {
                                value: "male",
                                label: "Male"
                            }
                        ], Search: false, SelectAll: false, Value: this.state.gender }))),
            React.createElement("div", { className: "mb-3 row" },
                React.createElement("label", { className: "col-sm-2 col-form-label", htmlFor: "age-select" }, "Age:"),
                React.createElement("div", { className: "col-sm-10" },
                    React.createElement(MultiSelect, { OnChange: (value) => this.setState({ ages: value }), Options: [
                            {
                                value: "child",
                                label: "Child"
                            },
                            {
                                value: "young adult",
                                label: "Young Adult"
                            },
                            {
                                value: "adult",
                                label: "Middle Age"
                            },
                            {
                                value: "old",
                                label: "Elder"
                            }
                        ], Search: true, SelectAll: true, Value: this.state.ages }))),
            React.createElement("div", { className: "mb-3 row" },
                React.createElement("label", { className: "col-sm-2 col-form-label", htmlFor: "alignment-select" }, "Alignment:"),
                React.createElement("div", { className: "col-sm-10" },
                    React.createElement(MultiSelect, { OnChange: (value) => this.setState({ alignments: value }), Options: [
                            { value: "LG", label: "Lawful Good" },
                            { value: "NG", label: "Neutral Good" },
                            { value: "CG", label: "Chaotic Good" },
                            { value: "LN", label: "Lawful Neutral" },
                            { value: "N", label: "Neutral" },
                            { value: "CN", label: "Chaotic Neutral" },
                            { value: "LE", label: "Lawful Evil" },
                            { value: "NE", label: "Neutral Evil" },
                            { value: "CE", label: "Chaotic Evil" },
                        ], Search: true, SelectAll: true, Value: this.state.alignments }))),
            React.createElement("label", { className: "form-label me-1", htmlFor: "alignment-restrict-races" }, "Only use races matching alignment:"),
            React.createElement("input", { className: "form-check-input", type: "checkbox", id: "alignment-restrict-races", checked: this.state.restrictRacesByAlignment, onChange: e => { this.setState({ restrictRacesByAlignment: e.target.checked }); } }),
            React.createElement("div", { className: "mb-3 row" },
                React.createElement("label", { className: "col-sm-2 col-form-label", htmlFor: "records-to-generate" }, "Number to create:"),
                React.createElement("div", { className: "col-sm-10" },
                    React.createElement("input", { type: "number", className: "form-control", id: "records-to-generate", value: this.state.numberToGenerate, onChange: this.updateNumberToGenerate }))),
            React.createElement("button", { className: "btn btn-primary me-1", onClick: this.generateNPCs }, "Generate!"),
            React.createElement("button", { className: "btn btn-danger", onClick: this.props.ClearRandomNPCs }, "Clear NPCs")));
    }
    get ages() {
        return this.state.ages.length > 0 ? this.state.ages : undefined;
    }
    get races() {
        let race = undefined;
        // get species setting
        if (this.state.race.length == 1) {
            race = this.state.race[0];
        }
        else if (this.state.race.length > 1) {
            race = this.state.race;
        }
        // get alignment setting
        if (this.state.alignments.length > 0 && this.state.restrictRacesByAlignment) {
            race = getRaceByAlignment(this.state.alignments);
        }
        return race;
    }
}
class NpcCollectionDisplay extends React.Component {
    constructor() {
        super(...arguments);
        this.Delete = (index) => {
            this.props.DeleteNPC(index, this.props.IsRandomCollection);
        };
        this.Transfer = (index) => {
            this.props.TransferNPCBetweenManagers(!this.props.IsRandomCollection, index);
        };
    }
    render() {
        return (React.createElement("div", { className: "table-responsive" },
            React.createElement("table", { className: "table table-light table-striped table-bordered" },
                React.createElement("thead", null,
                    React.createElement("tr", { className: "header-row table-dark" },
                        React.createElement("th", { className: "summary" }, "Summary"),
                        React.createElement("th", { className: "description" }, "Description"),
                        React.createElement("th", { className: "token" }, "Token"),
                        React.createElement("th", { className: "controls d-print-none" }, "Controls"))),
                React.createElement("tbody", null, this.props.NpcCollection.filtered.map((npc, index) => React.createElement(NpcRow, { Delete: this.Delete, TransferLabel: this.props.IsRandomCollection ? "Add" : "Remove", Transfer: this.Transfer, Index: index, NPC: npc, RelativeNumericAge: this.props.GetRelativeNumericAge(npc), key: index }))))));
    }
}
class NpcRow extends React.Component {
    constructor() {
        super(...arguments);
        this.CopyMapDescription = () => {
            const mapPageDescription = `${this.props.NPC.name} - ${this.props.NPC.alignment} ${this.props.NPC.relativeAge.capitalize()} ${this.props.NPC.gender.capitalize()} ${this.props.NPC.race.capitalize()}. Threat level: ${this.props.NPC.threat}. Intelligence level: ${this.props.NPC.intelligence}. ${this.props.NPC.description}`;
            navigator.clipboard.writeText(mapPageDescription);
        };
    }
    render() {
        let ageColor = `rgb(${Math.round(200 * this.props.RelativeNumericAge)},${Math.round(200 * (1 - this.props.RelativeNumericAge))},00)`;
        let imgSrc = getNPCImage(this.props.NPC);
        // var threatMod = threat.indexOf(this.props.NPC.threat)/(threat.length);
        return (React.createElement("tr", { className: "npc-row" },
            React.createElement("td", { className: "npc-name" },
                React.createElement("div", { style: { fontWeight: "bold" } }, this.props.NPC.name),
                React.createElement("div", { style: { fontStyle: "italic" } },
                    this.props.NPC.alignment,
                    React.createElement("span", { style: { color: ageColor } },
                        " ",
                        this.props.NPC.relativeAge,
                        " (",
                        this.props.NPC.age,
                        " years) "),
                    this.props.NPC.gender,
                    " ",
                    this.props.NPC.race),
                "Threat Level: ",
                this.props.NPC.threat,
                React.createElement("br", null),
                "Intelligence Level: ",
                this.props.NPC.intelligence),
            React.createElement("td", null, this.props.NPC.description),
            React.createElement("td", { style: { position: "relative" } },
                React.createElement("div", { className: "token", style: { backgroundImage: "url('" + imgSrc + "')" } })),
            React.createElement("td", { className: "noprint" },
                React.createElement("button", { className: "btn btn-secondary m-1", onClick: () => this.props.Transfer(this.props.Index) }, this.props.TransferLabel),
                React.createElement("button", { className: "btn btn-secondary m-1", onClick: this.CopyMapDescription }, "Copy description"),
                React.createElement("button", { className: "btn btn-secondary m-1", onClick: () => alert(HairGenerator.color(this.props.NPC.race, this.props.NPC.gender, this.props.NPC.relativeAge)) }, "Hair"),
                React.createElement("button", { className: "btn btn-danger m-1", onClick: () => this.props.Delete(this.props.Index) }, "Delete"))));
    }
}
class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleCheck = (value, adding) => {
            const newArray = this.props.Value.slice();
            if (adding) {
                newArray.push(value);
            }
            else {
                const index = newArray.indexOf(value);
                if (index > -1) {
                    newArray.splice(index, 1);
                }
            }
            this.props.OnChange(newArray);
        };
        this.selectAll = () => {
            this.props.OnChange(this.props.Options.map(option => option.value));
        };
        this.toggleExpand = () => {
            this.setState({ expanded: !this.state.expanded });
        };
        this.unselectAll = () => {
            this.props.OnChange([]);
        };
        this.state = {
            expanded: false,
            searchString: "",
        };
    }
    render() {
        let headerLabel = this.props.LabelWhenEmpty;
        if (this.props.Value.length > 5) {
            headerLabel = `${this.props.Value.length} selected`;
        }
        else if (this.props.Value.length > 0) {
            let selectedLabels = [];
            for (let i = 0; i < this.props.Options.length; i++) {
                const option = this.props.Options[i];
                if (this.props.Value.includes(option.value)) {
                    selectedLabels.push(option.label);
                }
                headerLabel = selectedLabels.join(", ");
            }
        }
        return (React.createElement("div", { className: "card" },
            React.createElement("div", { className: "card-header bg-white position-relative user-select-none" + ((this.props.Value.length > 0) ? "" : " text-muted"), style: { cursor: "pointer", textOverflow: "truncate" }, onClick: this.toggleExpand },
                headerLabel,
                React.createElement("span", { className: "position-absolute top-50 end-0 translate-middle text-black-50" }, this.state.expanded ? "▲" : "▼")),
            this.state.expanded &&
                React.createElement("ul", { className: "list-group list-group-flush user-select-none" },
                    this.props.Search &&
                        React.createElement("li", { className: "list-group-item" },
                            React.createElement("input", { className: "form-control mb-1", placeholder: "Search", type: "text", value: this.state.searchString, onChange: e => this.setState({ searchString: e.target.value }) })),
                    this.props.SelectAll &&
                        React.createElement("li", { className: "list-group-item" }, (this.props.Value.length != this.props.Options.length) ?
                            (React.createElement("button", { type: "button", className: "btn btn-outline-primary btn-sm", onClick: this.selectAll }, "Select All")) :
                            (React.createElement("button", { type: "button", className: "btn btn-outline-primary btn-sm", onClick: this.unselectAll }, "Unselect All"))),
                    this.props.Options.map((option, index) => {
                        if (this.state.searchString.length == 0 || option.label.toLowerCase().includes(this.state.searchString.toLowerCase())) {
                            return (React.createElement("li", { className: "list-group-item list-group-item-action", key: index, onClick: () => this.handleCheck(option.value, !this.props.Value.includes(option.value)) },
                                React.createElement("div", { className: "form-check" },
                                    React.createElement("input", { className: "form-check-input", type: "checkbox", checked: this.props.Value.includes(option.value), readOnly: true }),
                                    React.createElement("label", { className: "form-check-label" }, option.label))));
                        }
                    }))));
    }
}
MultiSelect.defaultProps = {
    LabelWhenEmpty: "Surprise Me",
    Search: false,
    SelectAll: false,
};
function compareRaceJsonObjects(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}
ReactDOM.render(React.createElement(NPCGenerator, null), document.getElementById("react-container"));
//# sourceMappingURL=npc-generator.js.map