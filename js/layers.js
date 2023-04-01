addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00bfbf",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades:{
        11: {
            title: "OK",
            cost: new Decimal(0),
        },
        12: {
            title: "OK",
            cost: new Decimal(0),
        },
        13: {
            title: "OK",
            cost: new Decimal(0),
        },
        14: {
            title: "OK",
            cost: new Decimal(0),
        },
        21: {
            title: "OK",
            cost: new Decimal(0),
        },
        22: {
            title: "OK",
            cost: new Decimal(0),
            style: {
                width: "240px"
            }
        },
        23: {
            title: "OK",
            cost: new Decimal(0),
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "p", 
            description: "P: Prestige reset", 
            onPress(){if (canReset(this.layer)) doReset(this.layer)}
        },
    ],
    layerShown(){return true}
})
