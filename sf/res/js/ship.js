export var SHIP;
(function (SHIP) {
    let Size;
    (function (Size) {
        Size[Size["Tiny"] = 0] = "Tiny";
        Size[Size["Small"] = 1] = "Small";
        Size[Size["Medium"] = 2] = "Medium";
        Size[Size["Large"] = 3] = "Large";
        Size[Size["Huge"] = 4] = "Huge";
        Size[Size["Gargantuan"] = 5] = "Gargantuan";
        Size[Size["Colossal"] = 6] = "Colossal";
    })(Size = SHIP.Size || (SHIP.Size = {}));
    let Frame;
    (function (Frame) {
        Frame[Frame["Battleship"] = 0] = "Battleship";
        Frame[Frame["BulkFreighter"] = 1] = "BulkFreighter";
        Frame[Frame["Carrier"] = 2] = "Carrier";
        Frame[Frame["Cruiser"] = 3] = "Cruiser";
        Frame[Frame["Destroyer"] = 4] = "Destroyer";
        Frame[Frame["Dreadnought"] = 5] = "Dreadnought";
        Frame[Frame["Explorer"] = 6] = "Explorer";
        Frame[Frame["Fighter"] = 7] = "Fighter";
        Frame[Frame["HeavyFreighter"] = 8] = "HeavyFreighter";
        Frame[Frame["Interceptor"] = 9] = "Interceptor";
        Frame[Frame["LightFreighter"] = 10] = "LightFreighter";
        Frame[Frame["Racer"] = 11] = "Racer";
        Frame[Frame["Shuttle"] = 12] = "Shuttle";
        Frame[Frame["Transport"] = 13] = "Transport";
    })(Frame = SHIP.Frame || (SHIP.Frame = {}));
})(SHIP || (SHIP = {}));
//# sourceMappingURL=ship.js.map