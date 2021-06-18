function getColRowCode(det, base = 7){
        let tens = Math.floor((det-1)/base) + 1
        let extra = det % base == 0 ? base : det % base
        return 10 * tens + extra
}

function getNumberName(n){ //currently only works up to 1000
        if (n < 100) return getNumberNameLT100(n)
        if (n < 1000) {
                if (n % 100 == 0) return getNumberNameLT100(n / 100) + " Hundred"
                let hun = getNumberNameLT100(Math.floor(n / 100)) + " Hundred and "
                return hun + getNumberNameLT100(n % 100)
        }
}

function getNumberNameLT100(n){
        let units = {
                1: "One",
                2: "Two",
                3: "Three",
                4: "Four",
                5: "Five",
                6: "Six",
                7: "Seven",
                8: "Eight",
                9: "Nine",
        }
        let tens = {
                2: "Twenty",
                3: "Thirty",
                4: "Forty",
                5: "Fifty",
                6: "Sixty",
                7: "Seventy",
                8: "Eighty",
                9: "Ninety",
        }
        let forced = {
                10: "Ten",
                11: "Eleven",
                12: "Twelve",
                13: "Thirteen",
                14: "Fourteen",
                15: "Fifteen",
                16: "Sixteen",
                17: "Seventeen",
                18: "Eighteen", 
                19: "Nineteen",
        }
        if (forced[n] != undefined) return forced[n]
        if (n == 0) return "Zero"
        if (n % 10 == 0) return tens[n/10]
        if (n < 10) return units[n]
        return tens[Math.floor(n/10)] + "-" + units[n % 10].toLowerCase()
}

function getAchStuffFromNumber(n){
        let name = getNumberName(n)
        let done = function(){
                return hasAchievement("ach", getColRowCode(n)) || PROGRESSION_MILESTONES[n]() 
        }
        let tooltip = function(){
                return "Get " + PROGRESSION_MILESTONES_TEXT[n]
        }
        let unlocked 
        if (n <= 56) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return true
                }
        } else if (n <= 1111) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return player.tokens.total.gt(0) || tmp.n.layerShown || tmp.l.layerShown
                }
        } else if (n <= Infinity) {
                unlocked = function(){
                        if (player.ach.hiddenRows >= n/7) return false
                        return hasUpgrade("m", 23) || hasUnlockedPast("m")
                }
        } 
        return {name: name, done: done, tooltip: tooltip, unlocked: unlocked}
}

function getFirstNAchData(n){
        let obj = {}
        for (i = 1; i <= n; i++){
                obj[getColRowCode(i)] = getAchStuffFromNumber(i)
        }
        obj.rows = Math.ceil(n / 7)
        obj.cols = 7
        return obj
}

function hasCompletedFirstNRows(n){
	for (i = 1; i <= n; i++){
		for (j = 1; j <= 7; j++){
			x = String(i) + String(j)
			if (layers.ach.achievements[x] == undefined) return false
			if (!hasAchievement("ach", x)) return false
		}
	}
	return true
}

PROGRESSION_MILESTONES = {
        1:   () => player.h.points.root(1).gte(20),
        2:   () => player.h.points.root(2).gte(20),
        3:   () => player.h.points.root(3).gte(20),
        4:   () => player.h.deuterium.points.gte(Decimal.pow(100, 0)),
        5:   () => player.h.deuterium.points.gte(Decimal.pow(100, 1)),
        6:   () => player.h.atomic_hydrogen.points.div(5).gte(Decimal.pow(100, 0)),
        7:   () => player.h.atomic_hydrogen.points.div(5).gte(Decimal.pow(100, 1)),
        8:   () => player.h.deuterium.points.gte(Decimal.pow(100, 2)),
        9:   () => player.h.deuterium.points.gte(Decimal.pow(100, 3)),
        10:  () => player.h.atomic_hydrogen.points.div(5).gte(Decimal.pow(100, 2)),
        11:  () => player.h.atomic_hydrogen.points.div(5).gte(Decimal.pow(100, 3)),
        12:  () => player.h.points.root(7).gte(10),
        13:  () => player.h.points.root(11).gte(10),
        14:  () => player.h.points.root(15).gte(10),
        15:  () => player.h.points.root(22).gte(10),
        16:  () => player.h.points.root(30).gte(10),
        17:  () => player.h.points.root(42).gte(10),
        18:  () => player.h.points.root(56).gte(10),
        19:  () => player.h.points.root(77).gte(10),
        20:  () => player.h.points.root(101).gte(10),
        21:  () => player.h.points.root(135).gte(10),
        22:  () => player.h.points.root(176).gte(10),
        23:  () => player.h.points.root(231).gte(10),
        24:  () => player.h.points.root(297).gte(10),
        25:  () => player.h.points.root(385).gte(10),
        26:  () => player.h.points.root(490).gte(10),
        27:  () => player.h.points.root(627).gte(10),
        28:  () => player.h.points.root(792).gte(10),
        29:  () => player.c.points.root(1).gte(10),
        30:  () => player.c.points.root(2).gte(10),
        31:  () => player.c.points.root(3).gte(10),
        32:  () => player.c.points.root(4).gte(10),
        33:  () => player.c.points.root(5).gte(10),
        34:  () => player.c.points.root(6).gte(10),
        35:  () => player.c.points.root(7).gte(10),
        36:  () => player.o.points.root(1).gte(10),
        37:  () => player.o.points.root(2).gte(10),
        38:  () => player.o.points.root(3).gte(10),
        39:  () => player.o.points.root(4).gte(10),
        40:  () => player.o.points.root(5).gte(10),
        41:  () => player.o.points.root(6).gte(10),
        42:  () => player.o.points.root(7).gte(10),
        43:  () => player.c.points.root(9).gte(10),
        44:  () => player.c.points.root(12).gte(10),
        45:  () => player.c.points.root(15).gte(10),
        46:  () => player.c.points.root(18).gte(10),
        47:  () => player.c.points.root(21).gte(10),
        48:  () => player.c.points.root(24).gte(10),
        49:  () => player.c.points.root(27).gte(10),
        50:  () => player.o.points.root(9).gte(10),
        51:  () => player.o.points.root(12).gte(10),
        52:  () => player.o.points.root(15).gte(10),
        53:  () => player.o.points.root(18).gte(10),
        54:  () => player.o.points.root(21).gte(10),
        55:  () => player.o.points.root(24).gte(10),
        56:  () => player.o.points.root(27).gte(10),
        57:  () => player.tokens.total.gt(0),
        58:  () => player.tokens.total.gt(1),
        59:  () => player.tokens.total.gt(2),
        60:  () => player.tokens.total.gt(3),
        61:  () => player.tokens.total.gt(4),
        62:  () => player.tokens.total.gt(5),
        63:  () => player.tokens.total.gt(6),
        64:  () => player.tokens.total.gt(7),
        65:  () => player.tokens.total.gt(8),
        66:  () => player.tokens.total.gt(9),
        67:  () => player.tokens.total.gt(10),
        68:  () => player.tokens.total.gt(11),
        69:  () => player.tokens.total.gt(12),
        70:  () => player.tokens.total.gt(13),
        71:  () => player.tokens.total.gt(14),
        72:  () => player.tokens.total.gt(15),
        73:  () => player.tokens.total.gt(16),
        74:  () => player.tokens.total.gt(17),
        75:  () => player.tokens.total.gt(18),
        76:  () => player.tokens.total.gt(19),
        77:  () => player.tokens.total.gt(20),
        78:  () => player.tokens.total.gt(21),
        79:  () => player.tokens.total.gt(22),
        80:  () => player.tokens.total.gt(23),
        81:  () => player.tokens.total.gt(24),
        82:  () => player.tokens.total.gt(25),
        83:  () => player.tokens.total.gt(26),
        84:  () => player.tokens.total.gt(27),
        85:  () => player.tokens.total.gt(28),
        86:  () => player.tokens.total.gt(29),
        87:  () => player.tokens.total.gt(30),
        88:  () => player.tokens.total.gt(31),
        89:  () => player.tokens.total.gt(32),
        90:  () => player.tokens.total.gt(33),
        91:  () => player.tokens.total.gt(34),
        92:  () => player.tokens.total.gt(35),
        93:  () => player.tokens.total.gt(36),
        94:  () => player.tokens.total.gt(37),
        95:  () => player.tokens.total.gt(38),
        96:  () => player.tokens.total.gt(39),
        97:  () => player.tokens.total.gt(40),
        98:  () => player.tokens.total.gt(41),
        99:  () => player.tokens.total.gt(42),
        100: () => player.tokens.total.gt(43),
        101: () => player.tokens.total.gt(44),
        102: () => player.tokens.total.gt(45),
        103: () => player.tokens.total.gt(46),
        104: () => player.tokens.total.gt(47),
        105: () => player.tokens.total.gt(48),
        106: () => player.tokens.total.gt(49),
        107: () => player.tokens.total.gt(50),
        108: () => player.tokens.total.gt(51),
        109: () => player.tokens.total.gt(52),
        110: () => player.tokens.total.gt(53),
        111: () => player.tokens.total.gt(54),
        112: () => player.tokens.total.gt(55),
        113: () => player.tokens.total.gt(56),
        114: () => player.tokens.total.gt(57),
        115: () => player.tokens.total.gt(58),
        116: () => player.tokens.total.gt(59),
        117: () => player.tokens.total.gt(60),
        118: () => player.tokens.total.gt(61),
        119: () => player.tokens.total.gt(62),
        120: () => player.tokens.total.gt(63),
        121: () => player.tokens.total.gt(64),
        122: () => player.tokens.total.gt(65),
        123: () => player.tokens.total.gt(66),
        124: () => player.tokens.total.gt(67),
        125: () => player.tokens.total.gt(68),
        126: () => player.tokens.total.gt(69),
        127: () => player.tokens.total.gt(70),
        128: () => player.tokens.total.gt(71),
        129: () => player.tokens.total.gt(72),
        130: () => player.tokens.total.gt(73),
        131: () => player.tokens.total.gt(74),
        132: () => player.tokens.total.gt(75),
        133: () => player.tokens.total.gt(76),
        134: () => player.tokens.total.gt(77),
        135: () => player.tokens.total.gt(78),
        136: () => player.tokens.total.gt(79),
        137: () => player.tokens.total.gt(80),
        138: () => player.tokens.total.gt(81),
        139: () => player.tokens.total.gt(82),
        140: () => player.tokens.total.gt(83),
        141: () => player.n.points.max(10).log10().gt(7),
        142: () => player.n.points.max(10).log10().gt(10),
        143: () => player.n.points.max(10).log10().gt(15),
        144: () => player.n.points.max(10).log10().gt(20),
        145: () => player.n.points.max(10).log10().gt(27),
        146: () => player.n.points.max(10).log10().gt(35),
        147: () => player.n.points.max(10).log10().gt(45),
        148: () => player.tokens.total.gt(84),
        149: () => player.tokens.total.gt(85),
        150: () => player.tokens.total.gt(86),
        151: () => player.tokens.total.gt(87),
        152: () => player.tokens.total.gt(88),
        153: () => player.tokens.total.gt(89),
        154: () => player.tokens.total.gt(90),
        155: () => player.p.points.gt(Decimal.pow(10, 1)),
        156: () => player.p.points.gt(Decimal.pow(10, 2)),
        157: () => player.p.points.gt(Decimal.pow(10, 4)),
        158: () => player.p.points.gt(Decimal.pow(10, 8)),
        159: () => player.p.points.gt(Decimal.pow(10, 16)),
        160: () => player.p.points.gt(Decimal.pow(10, 32)),
        161: () => player.p.points.gt(Decimal.pow(10, 64)),
        162: () => player.mu.points.gte(7),
        163: () => player.mu.points.gte(14),
        164: () => player.mu.points.gte(21),
        165: () => player.mu.points.gte(28),
        166: () => player.mu.points.gte(35),
        167: () => player.mu.points.gte(42),
        168: () => player.mu.points.gte(49),
        169: () => player.mu.points.gte(56),
        170: () => player.mu.points.gte(63),
        171: () => player.mu.points.gte(70),
        172: () => player.mu.points.gte(77),
        173: () => player.mu.points.gte(84),
        174: () => player.mu.points.gte(91),
        175: () => player.mu.points.gte(98),
        176: () => player.l.total.gte(1),
        177: () => player.l.total.gte(2),
        178: () => player.l.total.gte(3),
        179: () => player.l.total.gte(4),
        180: () => player.l.total.gte(5),
        181: () => player.l.total.gte(6),
        182: () => player.l.total.gte(7),
        183: () => player.l.total.gte(Decimal.pow(10, 1)),
        184: () => player.l.total.gte(Decimal.pow(10, 2)),
        185: () => player.l.total.gte(Decimal.pow(10, 3)),
        186: () => player.l.total.gte(Decimal.pow(10, 4)),
        187: () => player.l.total.gte(Decimal.pow(10, 5)),
        188: () => player.l.total.gte(Decimal.pow(10, 6)),
        189: () => player.l.total.gte(Decimal.pow(10, 7)),
        190: () => player.l.total.gte(Decimal.pow(10, 8)),
        191: () => player.l.total.gte(Decimal.pow(10, 9)),
        192: () => player.l.total.gte(Decimal.pow(10, 10)),
        193: () => player.l.total.gte(Decimal.pow(10, 11)),
        194: () => player.l.total.gte(Decimal.pow(10, 12)),
        195: () => player.l.total.gte(Decimal.pow(10, 13)),
        196: () => player.l.total.gte(Decimal.pow(10, 14)),
        197: () => player.l.challenges[11] >= 2,
        198: () => player.l.challenges[11] >= 6,
        199: () => player.l.challenges[11] >= 10,
        200: () => player.l.challenges[11] >= 14,
        201: () => player.l.challenges[11] >= 18,
        202: () => player.l.challenges[11] >= 22,
        203: () => player.l.challenges[11] >= 26,
        204: () => player.l.challenges[11] >= 30,
        205: () => player.l.challenges[11] >= 34,
        206: () => player.l.challenges[11] >= 38,
        207: () => player.l.challenges[11] >= 42,
        208: () => player.l.challenges[11] >= 46,
        209: () => player.l.challenges[11] >= 50,
        210: () => player.l.challenges[11] >= 54,
        211: () => player.l.challenges[11] >= 58,
        212: () => player.l.challenges[11] >= 62,
        213: () => player.l.challenges[11] >= 66,
        214: () => player.l.challenges[11] >= 70,
        215: () => player.l.challenges[11] >= 74,
        216: () => player.l.challenges[11] >= 78,
        217: () => player.l.challenges[11] >= 82,
        218: () => player.l.challenges[11] >= 86,
        219: () => player.l.challenges[11] >= 90,
        220: () => player.l.challenges[11] >= 94,
        221: () => player.l.challenges[11] >= 98,
        222: () => player.l.challenges[11] >= 102,
        223: () => player.l.challenges[11] >= 106,
        224: () => player.l.challenges[11] >= 110,
        225: () => player.l.grid[102].gems.gt(0),
        226: () => player.l.grid[201].gems.gt(0),
        227: () => player.l.grid[202].gems.gt(0),
        228: () => player.l.grid[103].gems.gt(0),
        229: () => player.l.grid[203].gems.gt(0),
        230: () => player.l.grid[301].gems.gt(0),
        231: () => player.l.grid[302].gems.gt(0),
        232: () => player.l.grid[303].gems.gt(0),
        233: () => player.a.points.gte(2),
        234: () => player.a.points.gte(4),
        235: () => player.a.points.gte(8),
        236: () => player.a.points.gte(16),
        237: () => player.a.points.gte(32),
        238: () => player.a.points.gte(64),
        239: () => player.l.grid[104].gems.gt(0),
        240: () => player.l.grid[204].gems.gt(0),
        241: () => player.l.grid[304].gems.gt(0),
        242: () => player.l.grid[401].gems.gt(0),
        243: () => player.l.grid[402].gems.gt(0),
        244: () => player.l.grid[403].gems.gt(0),
        245: () => player.l.grid[404].gems.gt(0),
        246: () => player.l.grid[105].gems.gt(0),
        247: () => player.l.grid[205].gems.gt(0),
        248: () => player.l.grid[305].gems.gt(0),
        249: () => player.l.grid[405].gems.gt(0),
        250: () => player.l.grid[501].gems.gt(0),
        251: () => player.l.grid[502].gems.gt(0),
        252: () => player.l.grid[503].gems.gt(0),
        253: () => player.l.grid[504].gems.gt(0),
        254: () => player.l.grid[505].gems.gt(0),
        255: () => player.a.points.gte(1e2),
        256: () => player.a.points.gte(1e4),
        257: () => player.a.points.gte(1e8),
        258: () => player.a.points.gte(1e16),
        259: () => player.a.points.gte(1e32),
        260: () => player.a.protein.points.gte("1e1"),
        261: () => player.a.protein.points.gte("1e2"),
        262: () => player.a.protein.points.gte("1e4"),
        263: () => player.a.protein.points.gte("1e8"),
        264: () => player.a.protein.points.gte("1e16"),
        265: () => player.a.protein.points.gte("1e32"),
        266: () => player.a.protein.points.gte("1e64"),
        267: () => player.a.protein.points.gte("1e128"),
        268: () => player.a.protein.points.gte("1e256"),
        269: () => player.a.protein.points.gte("1e512"),
        270: () => player.a.protein.points.gte("1e1024"),
        271: () => player.a.protein.points.gte("1e2048"),
        272: () => player.a.protein.points.gte("1e4096"),
        273: () => player.a.protein.points.gte("1e8192"),
        274: () => player.a.protein.points.gte("1e1e4"),
        275: () => player.a.protein.points.gte("1e2e4"),
        276: () => player.a.protein.points.gte("1e5e4"),
        277: () => player.a.protein.points.gte("1e1e5"),
        278: () => player.a.protein.points.gte("1e2e5"),
        279: () => player.a.protein.points.gte("1e5e5"),
        280: () => player.a.protein.points.gte("1e1e6"),
        281: () => player.a.protein.points.gte("1e2e6"),
        282: () => player.a.protein.points.gte("1e5e6"),
        283: () => player.a.protein.points.gte("1e1e7"),
        284: () => player.a.protein.points.gte("1e2e7"),
        285: () => player.a.protein.points.gte("1e5e7"),
        286: () => player.a.protein.points.gte("1e1e8"),
        287: () => player.a.protein.points.gte("1e2e8"),
        288: () => player.a.protein.points.gte("1e5e8"),
        289: () => player.a.protein.points.gte("1e1e9"),
        290: () => player.a.protein.points.gte("1e2e9"),
        291: () => player.a.protein.points.gte("1e5e9"),
        292: () => player.a.protein.points.gte("1e1e10"),
        293: () => player.a.protein.points.gte("1e2e10"),
        294: () => player.a.protein.points.gte("1e5e10"),
        295: () => player.d.points.gte(1),
        296: () => player.d.points.gte(3),
        297: () => player.d.points.gte(5),
        298: () => player.d.points.gte(17),
        299: () => player.d.points.gte(257),
        300: () => player.d.points.gte(65537),
        301: () => player.d.points.gte(4294967297),
}

PROGRESSION_MILESTONES_TEXT = {
        1:   "Twenty Hydrogen",
        2:   "Four Hundred Hydrogen",
        3:   "Eight Thousand Hydrogen",
        4:   "One Deuterium",
        5:   "One Hundred Deuterium",
        6:   "Five Atomic Hydrogen",
        7:   "Five Hundred Atomic Hydrogen",
        8:   "Ten Thousand Deuterium",
        9:   "One Million Deuterium",
        10:  "Fifty Thousand Atomic Hydrogen",
        11:  "Five Million Atomic Hydrogen",
        12:  "Ten Million Hydrogen",
        13:  "One Hundred Billion Hydrogen",
        14:  "10^15 Hydrogen",
        15:  "10^22 Hydrogen",
        16:  "10^30 Hydrogen",
        17:  "10^42 Hydrogen",
        18:  "10^56 Hydrogen",
        19:  "10^77 Hydrogen",
        20:  "10^101 Hydrogen",
        21:  "10^135 Hydrogen",
        22:  "10^176 Hydrogen",
        23:  "10^231 Hydrogen",
        24:  "10^297 Hydrogen",
        25:  "10^385 Hydrogen",
        26:  "10^490 Hydrogen",
        27:  "10^627 Hydrogen",
        28:  "10^792 Hydrogen",
        29:  "10^1 Carbon",
        30:  "10^2 Carbon",
        31:  "10^3 Carbon",
        32:  "10^4 Carbon",
        33:  "10^5 Carbon",
        34:  "10^6 Carbon",
        35:  "10^7 Carbon",
        36:  "10^1 Oxygen",
        37:  "10^2 Oxygen",
        38:  "10^3 Oxygen",
        39:  "10^4 Oxygen",
        40:  "10^5 Oxygen",
        41:  "10^6 Oxygen",
        42:  "10^7 Oxygen",
        43:  "10^9 Carbon",
        44:  "10^12 Carbon",
        45:  "10^15 Carbon",
        46:  "10^18 Carbon",
        47:  "10^21 Carbon",
        48:  "10^24 Carbon",
        49:  "10^27 Carbon",
        50:  "10^9 Oxygen",
        51:  "10^12 Oxygen",
        52:  "10^15 Oxygen",
        53:  "10^18 Oxygen",
        54:  "10^21 Oxygen",
        55:  "10^24 Oxygen",
        56:  "10^27 Oxygen",
        57:  "a token",
        58:  "2 tokens",
        59:  "3 tokens",
        60:  "4 tokens",
        61:  "5 tokens",
        62:  "6 tokens",
        63:  "7 tokens",
        64:  "8 tokens",
        65:  "9 tokens",
        66:  "10 tokens",
        67:  "11 tokens",
        68:  "12 tokens",
        69:  "13 tokens",
        70:  "14 tokens",
        71:  "15 tokens",
        72:  "16 tokens",
        73:  "17 tokens",
        74:  "18 tokens",
        75:  "19 tokens",
        76:  "20 tokens",
        77:  "21 tokens",
        78:  "22 tokens",
        79:  "23 tokens",
        80:  "24 tokens",
        81:  "25 tokens",
        82:  "26 tokens",
        83:  "27 tokens",
        84:  "28 tokens",
        85:  "29 tokens",
        86:  "30 tokens",
        87:  "31 tokens",
        88:  "32 tokens",
        89:  "33 tokens",
        90:  "34 tokens",
        91:  "35 tokens",
        92:  "36 tokens",
        93:  "37 tokens",
        94:  "38 tokens",
        95:  "39 tokens",
        96:  "40 tokens",
        97:  "41 tokens",
        98:  "42 tokens",
        99:  "43 tokens",
        100: "44 tokens",
        101: "45 tokens",
        102: "46 tokens",
        103: "47 tokens",
        104: "48 tokens",
        105: "49 tokens",
        106: "50 tokens",
        107: "51 tokens",
        108: "52 tokens",
        109: "53 tokens",
        110: "54 tokens",
        111: "55 tokens",
        112: "56 tokens",
        113: "57 tokens",
        114: "58 tokens",
        115: "59 tokens",
        116: "60 tokens",
        117: "61 tokens",
        118: "62 tokens",
        119: "63 tokens",
        120: "64 tokens",
        121: "65 tokens",
        122: "66 tokens",
        123: "67 tokens",
        124: "68 tokens",
        125: "69 tokens",
        126: "70 tokens",
        127: "71 tokens",
        128: "72 tokens",
        129: "73 tokens",
        130: "74 tokens",
        131: "75 tokens",
        132: "76 tokens",
        133: "77 tokens",
        134: "78 tokens",
        135: "79 tokens",
        136: "80 tokens",
        137: "81 tokens",
        138: "82 tokens",
        139: "83 tokens",
        140: "84 tokens",
        141: "10^7 Nitrogen",
        142: "10^10 Nitrogen",
        143: "10^15 Nitrogen",
        144: "10^20 Nitrogen",
        145: "10^27 Nitrogen",
        146: "10^35 Nitrogen",
        147: "10^45 Nitrogen",
        148: "85 tokens",
        149: "86 tokens",
        150: "87 tokens",
        151: "88 tokens",
        152: "89 tokens",
        153: "90 tokens",
        154: "91 tokens",
        155: "10 Phosphorus",
        156: "100 Phosphorus",
        157: "1e4 Phosphorus",
        158: "1e8 Phosphorus",
        159: "1e16 Phosphorus",
        160: "1e32 Phosphorus",
        161: "1e64 Phosphorus",
        162: "7 µ",
        163: "14 µ",
        164: "21 µ",
        165: "28 µ",
        166: "35 µ",
        167: "42 µ",
        168: "49 µ",
        169: "56 µ",
        170: "63 µ",
        171: "70 µ",
        172: "77 µ",
        173: "84 µ",
        174: "91 µ",
        175: "98 µ",
        176: "a life :(",
        177: "2 lives",
        178: "3 lives",
        179: "4 lives",
        180: "5 lives",
        181: "6 lives",
        182: "7 lives",
        183: "10 lives",
        184: "100 lives",
        185: "1e3 lives",
        186: "1e4 lives",
        187: "1e5 lives",
        188: "1e6 lives",
        189: "1e7 lives",
        190: "1e8 lives",
        191: "1e9 lives",
        192: "1e10 lives",
        193: "1e11 lives",
        194: "1e12 lives",
        195: "1e13 lives",
        196: "1e14 lives",
        197: "2 Dilation completions",
        198: "6 Dilation completions",
        199: "10 Dilation completions",
        200: "14 Dilation completions",
        201: "18 Dilation completions",
        202: "22 Dilation completions",
        203: "26 Dilation completions",
        204: "30 Dilation completions",
        205: "34 Dilation completions",
        206: "38 Dilation completions",
        207: "42 Dilation completions",
        208: "46 Dilation completions",
        209: "50 Dilation completions",
        210: "54 Dilation completions",
        211: "58 Dilation completions",
        212: "62 Dilation completions",
        213: "66 Dilation completions",
        214: "70 Dilation completions",
        215: "74 Dilation completions",
        216: "78 Dilation completions",
        217: "82 Dilation completions",
        218: "86 Dilation completions",
        219: "90 Dilation completions",
        220: "94 Dilation completions",
        221: "98 Dilation completions",
        222: "102 Dilation completions",
        223: "106 Dilation completions",
        224: "110 Dilation completions",
        225: "a C12 Gem",
        226: "a C21 Gem",
        227: "a C22 Gem",
        228: "a C13 Gem",
        229: "a C23 Gem",
        230: "a C31 Gem",
        231: "a C32 Gem",
        232: "a C33 Gem",
        233: "2 Amino Acids",
        234: "4 Amino Acids",
        235: "8 Amino Acids",
        236: "16 Amino Acids",
        237: "32 Amino Acids",
        238: "64 Amino Acids",
        239: "a C14 Gem",
        240: "a C24 Gem",
        241: "a C34 Gem",
        242: "a C41 Gem",
        243: "a C42 Gem",
        244: "a C43 Gem",
        245: "a C44 Gem",
        246: "a C15 Gem",
        247: "a C25 Gem",
        248: "a C35 Gem",
        249: "a C45 Gem",
        250: "a C51 Gem",
        251: "a C52 Gem",
        252: "a C53 Gem",
        253: "a C54 Gem",
        254: "a C55 Gem",
        255: "1e2 Amino Acids",
        256: "1e4 Amino Acids",
        257: "1e8 Amino Acids",
        258: "1e16 Amino Acids",
        259: "1e32 Amino Acids",
        260: "10 Protein",
        261: "1e2 Protein",
        262: "1e4 Protein",
        263: "1e8 Protein",
        264: "1e16 Protein",
        265: "1e32 Protein",
        266: "1e64 Protein",
        267: "1e128 Protein",
        268: "1e256 Protein",
        269: "1e512 Protein",
        270: "1e1,024 Protein",
        271: "1e2,048 Protein",
        272: "1e4,096 Protein",
        273: "1e8,192 Protein",
        274: "1e10,000 Protein",
        275: "1e20,000 Protein",
        276: "1e50,000 Protein",
        277: "1e100,000 Protein",
        278: "1e200,000 Protein",
        279: "1e500,000 Protein",
        280: "1e1,000,000 Protein",
        281: "1e2,000,000 Protein",
        282: "1e5,000,000 Protein",
        283: "1e10,000,000 Protein",
        284: "1e20,000,000 Protein",
        285: "1e50,000,000 Protein",
        286: "1e100,000,000 Protein",
        287: "1e200,000,000 Protein",
        288: "1e500,000,000 Protein",
        289: "1e1e9 Protein",
        290: "1e2e9 Protein",
        291: "1e5e9 Protein",
        292: "1e1e10 Protein",
        293: "1e2e10 Protein",
        294: "1e5e10 Protein",
        295: "1 DNA",
        296: "3 DNA",
        297: "5 DNA",
        298: "17 DNA",
        299: "257 DNA",
        300: "65,537 DNA",
        301: "4,294,967,297 DNA",
}









