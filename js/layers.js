addLayer("n", {
    name: "Normal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal("eeeeeeeeeeee1e308"), // Basically, all of them.
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Normal Points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
//  baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have. none: can't reset this layer.
//  exponent: 0.5, // Prestige currency exponent
//  gainMult() { // Calculate the multiplier for main currency from bonuses
//      mult = new Decimal(1)
//      return mult
//  }
//  gainExp() { // Calculate the exponent on main currency from bonuses
//      return new Decimal(1)
//  },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    achievements: {
        11: {
            name: "Blah",
            tooltip: "Buy <b>Blah</b>",
            done(){return hasUpgrade(this.layer,11)}
        },
    },
    upgrades: {
    11: {
        title: "",
        description: "Blah",
        cost: new Decimal(100),
    },
    },
    hotkeys: [
        {},
    ],
    layerShown(){return true}
})
