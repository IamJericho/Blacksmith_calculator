/* ============================================================
 BLACKSMITH MASTER DATA FILE
 Single source of truth for ALL craftables
 Plain JS (no modules)
 ============================================================ */

window.BLACKSMITH = {

  /* =========================
   MATERIAL KEY (LEGEND)
   ========================= */
  materialsKey: {
    A: "Cementing Paste",
    B: "Silica Pearls",
    C: "Crystal",
    D: "Durability",
    E: "Electronics",
    F: "Fiber",
    FW: "Fungal Wood",
    G: "Green Gems",
    H: "Hide",
    I: "Element",
    J: "Armor",
    K: "Chitin / Keratin",
    L: "Sulfur",
    M: "Metal Ingots",
    N: "Flint",
    O: "Obsidian",
    OP: "Organic Polymer",
    P: "Polymer",
    Q: "Damage",
    R: "Red Gems",
    RM: "Raw Metal",
    S: "Stone",
    T: "Thatch",
    U: "Silk",
    V: "Blue Gems",
    W: "Wood",
    X: "Absorbent Substrate",
    Y: "Clay",
    Z: "Pelt",
    BP: "Black Pearls",
    GB: "Congealed Gas Ball",
    MB: "Medical Brews",
    PM: "Prime Meat",    
    RE: "Red Element",
    SP: "Spark Powder",
    CB: "Charge Battery",
    SF: "Shell Fragment"
  },

  /* =========================
     SADDLES
     ========================= */
  saddles: {
    regular: {
      "Acrocanthosaurus": { materials: { H: 5317, F: 2798, M: 699 }, tek: 35 },
      "Allosaurus": { materials: { F: 1588, M: 280, H: 2990 }, tek: 20 },
      "Ankylosaurus": { materials: { F: 2341, M: 90, H: 2341 }, tek: 15 },
      "Araneo": { materials: { K: 911, H: 2369, F: 1883 }, tek: 20 },
      "Archelon": { materials: { F: 2211, H: 7520, M: 1769, W: 2211 }, tek: 40 },
      "Argentavis": { materials: { K: 1358, H: 3170, F: 1675 }, tek: 20 },
      "Armadoggo": { materials: { H: 1616, P: 44, M: 269, F: 2019 }, tek: 20 },
      "Arthropluera": { materials: { A: 126, N: 67, M: 252, W: 169, F: 420, H: 673, O: 294 }, tek: 20 },
      "Aurellax": { materials: { H: 2648, P: 441, M: 1324, F: 3090 }, tek: 40 },

      "Baryonyx": { materials: { F: 3252, M: 232, H: 2091 }, tek: 20 },
      "Basilisk": { materials: { A: 730, G: 386, M: 3654, F: 1289, H: 2321 }, tek: 90 },
      "Basilosaurus": { materials: { F: 1631, M: 448, H: 1631 }, tek: 20 },
      "Beelzebufo": { materials: { A: 41, H: 1404, F: 785, W: 247 }, tek: 15 },
      "Bison": { materials: { A: 528, H: 1939, F: 1057, M: 352 }, tek: 20 },
      "Brontosaurus": { materials: { F: 1625, M: 351, H: 3075 }, tek: 20 },
      "Burrowbuck": { materials: { F: 2700, M: 67, H: 5063, A: 337 }, tek: 50 },

      "Carbonemys": { materials: { A: 86, H: 1469, F: 821 }, tek: 15 },
      "Carcharodontosaurus": { materials: { K: 168, H: 4214, F: 2950, M: 1517 }, tek: 40 },
      "Carnotaurus": { materials: { F: 1593, M: 281, H: 3000 }, tek: 20 },
      "Castoroides": { materials: { A: 1085, H: 2248, T: 1395, F: 1550, M: 775 }, tek: 35 },
      "Ceratosaurus": { materials: { F: 2019, M: 149, H: 972 }, tek: 20 },
      "Chalicotherium": { materials: { F: 1481, M: 370, H: 2180 }, tek: 20 },
      "Cryolophosaurus": { materials: { H: 6686, B: 1966, M: 2123, F: 5505 }, tek: 40 },

      "Companion Ammo Box": { materials: { F: 256, M: 68, H: 42, J: 98 }, tek: 20 },
      "Companion Bait Trap": { materials: { F: 44, M: 2, H: 17, PM: 12, J: 94 }, tek: 20 },
      "Companion Battle Spikes": { materials: { F: 270, M: 81, H: 18, J: 94 }, tek: 20 },
      "Companion Camping Gear": { materials: { F: 380, H: 133, J: 107 }, tek: 20 },
      "Companion Medpack": { materials: { H: 108, M: 7, F: 144, MB: 21, J: 87 }, tek: 30 },
      "Companion Oxygen Tank": { materials: { H: 10, P: 31, M: 62, F: 104, J: 108 }, tek: 30 },
      "Companion Picknic Set": { materials: { M: 32, F: 328, T: 656 }, tek: 30 },
      "Companion Rucksack": { materials: { F: 278, M: 9, H: 185, J: 99 }, tek: 20 },
      "Companion Speed Booster": { materials: { H: 10, P: 61, M: 40, F: 101, M: 40, SP: 407, J: 108 }, tek: 40 },

      "Daeodon": { materials: { F: 1344, M: 173, H: 2515 }, tek: 20 },
      "Deinonychus (fluffy raptor)": { materials: { F: 984, W: 303, H: 1666 }, tek: 20 },
      "Deinosuchus (big croc)": { materials: { F: 1819, M: 454, H: 3456 }, tek: 20 },
      "Deinotherium": { materials: { A: 1394, H: 1394, W: 3253, F: 5298, M: 185 }, tek: 20 },
      "Desmodus": { materials: { F: 1616, M: 404, H: 2334, W: 1077 }, tek: 30 },
      "Diplodocus": { materials: { F: 9545, M: 3181, H: 13522, W: 3977 }, tek: 80 },
      "Dire Bear": { materials: { A: 922, H: 2766, F: 1199 }, tek: 20 },
      "Doedicurus": { materials: { F: 970, M: 44, H: 1764, S: 132 }, tek: 15 },
      "Dunkleosteus": { materials: { A: 1045, H: 2612, F: 1567, M: 696 }, tek: 30 },

      "Equus": { materials: { F: 1402, S: 701, H: 2103, W: 745 }, tek: 10 },
      "Fasolasuchus": { materials: { F: 1750, M: 262, H: 1312, W: 875 }, tek: 20 },

      "Gacha": { materials: { K: 1230, H: 2870, F: 1517 }, tek: 20 },
      "Gallimimus": { materials: { F: 1364, M: 213, H: 2046, W: 1023 }, tek: 15 },
      "Gasbags": { materials: { K: 1322, H: 3086, F: 1631 }, tek: 20 },
      "Gigadesmodus (Primitive)": { materials: { A: 160, H: 550, B: 220, F: 600, M: 225 }, tek: 15 },
      "Giganotosaurus": { materials: { F: 2929, M: 1004, H: 5690 }, tek: 40 },
      "Gigantoraptor": { materials: { F: 1376, M: 473, H: 2451, W: 1032 }, tek: 25 },

      "Helicoprion": { materials: { F: 1833, M: 550, H: 2934 }, tek: 30 },
      "Hyaenodon": { materials: { F: 1322, M: 170, H: 2473 }, tek: 20 },

      "Ichthyosaurus": { materials: { F: 795, H: 875, W: 318, N: 127, RM: 159 }, tek: 20 },
      "Iguanodon": { materials: { F: 413, W: 124, H: 661 }, tek: 10 },

      "Kaprosuchus": { materials: { K: 517, H: 1314, F: 955 }, tek: 10 },
      "Karkinos": { materials: { V: 638, FW: 1596, F: 1796, H: 1357 }, tek: 15 },
      
      "Lumina": { materials: { H: 14019, B: 3823, M: 2548, F: 9558 }, tek: 65 },
      "Lymantria": { materials: { K: 776, H: 1063, F: 1022 }, tek: 10 },
     
      "Maeguana": { materials: { F: 1254, M: 221, H: 2361 }, tek: 20 },
      "Magmasaur": { materials: { F: 1959, M: 5224, H: 3004, A: 1632 }, tek: 50 },      
      "Malwyn": { materials: { K: 561, H: 702, F: 2340, M: 1684 }, tek: 40 },
      "Mammoth": { materials: { F: 1246, M: 89, H: 2314 }, tek: 15 },
      "Managarmr": { materials: { K: 1163, H: 2715, F: 1435 }, tek: 20 },
      "Manta": { materials: { N: 188, M: 549, F: 1099, H: 1571, W: 392 }, tek: 50 },
      "Mantis": { materials: { F: 650, M: 303, H: 1041 }, tek: 20 },
      "Megalania": { materials: { F: 1957, M: 409, H: 2867 }, tek: 20 },
      "Megaloceros": { materials: { F: 1018, M: 46, H: 1850 }, tek: 15 },
      "Megalodon": { materials: { F: 1261, A: 244, H: 2359 }, tek: 10 },
      "Megalosaurus": { materials: { F: 2507, M: 442, H: 4720 }, tek: 25 },
      "Megaraptor": { materials: { F: 1870, M: 467, H: 3272 }, tek: 20 },
      "Megatherium": { materials: { A: 866, H: 2816, F: 1126, M: 476 }, tek: 25 },
      "Morellatops": { materials: { F: 646, W: 242, H: 1131 }, tek: 10 },
      "Mosasaurus": { materials: { A: 1308, H: 7475, B: 934, F: 5606, M: 3737 }, tek: 80 },

      "Ossidon": { materials: { F: 1601, M: 1200, H: 3042 }, tek: 40 },

      "Pachy": { materials: { F: 839, W: 258, H: 1421 }, tek: 20 },
      "Pachyrhinosaurus": { materials: { F: 734, W: 229, H: 1284 }, tek: 10 },
      "Palaeoctopus": { materials: { F: 4291, M: 1430, K: 572, H: 7868, W: 2145 }, tek: 50 },     
      "Pararacer": { materials: { F: 932, M: 84, H: 1695 }, tek: 15 },
      "Parasaur": { materials: { F: 423, W: 127, H: 678 }, tek: 10 },
      "Pelagornis": { materials: { K: 1050, H: 3222, F: 1751 }, tek: 25 },
      "Phiomia": { materials: { H: 286, F: 214, W: 71 }, tek: 25 },
      "Plesiosaur": { materials: { A: 579, H: 3566, F: 2228, B: 356 }, tek: 15 },
      "Procoptodon": { materials: { F: 3133, M: 1096, H: 7833, Z: 2349 }, tek: 40 },
      "Pteranodon": { materials: { K: 648, H: 1989, F: 1081 }, tek: 15 },
      "Pulmonoscorpius": { materials: { F: 847, W: 267, H: 1515 }, tek: 10 },

      "Quetzal": { materials: { A: 835, H: 6265, F: 4176, B: 710 }, tek: 20 },

      "Raptor": { materials: { F: 533, W: 164, H: 902 }, tek: 10 },
      "Ravager": { materials: { F: 915, H: 2087, FW: 805 }, tek: 20 },
      "Rex": { materials: { F: 1440, M: 360, H: 2736 }, tek: 25 },
      "Rhynio": { materials: { C: 257, H: 1285, P: 514, F: 1713, M: 1285 }, tek: 40 },
      "Rock Drake": { materials: { F: 1987, M: 1104, H: 3091, R: 750 }, tek: 35 },
      "Rock Golem": { materials: { F: 1295, M: 302, H: 2331 }, tek: 20 },
      "Roll Rat": { materials: { A: 739, G: 391, M: 3699, F: 1305, H: 2350 }, tek: 85 },

      "Sabertooth": { materials: { F: 1375, M: 177, H: 2573 }, tek: 15 },
      "Sarco": { materials: { A: 170, H: 1965, F: 640 }, tek: 10 },
      "Snow Owl": { materials: { K: 1215, H: 2836, F: 1499 }, tek: 15 },
      "Solwyn": { materials: { C: 992, M: 413, F: 1861, O: 661 }, tek: 20 },
      "Spino": { materials: { A: 415, H: 3511, F: 1848, B: 231 }, tek: 20 },
      "Stegosaurus": { materials: { F: 844, W: 269, H: 1534 }, tek: 10 },

      "Tapejara": { materials: { F: 1218, M: 304, H: 1759, W: 812 }, tek: 20 },
      "Terror Bird": { materials: { F: 574, W: 176, H: 972 }, tek: 10 },
      "Therizinosaurus": { materials: { F: 1970, M: 677, H: 3510, W: 1478 }, tek: 30 },
      "Thorny Dragon": { materials: { Y: 1199, H: 3810, W: 1764, F: 2116, M: 493 }, tek: 25 },
      "Thylacoleo": { materials: { F: 1178, M: 152, H: 2204 }, tek: 15 },
      "Tidepup": { materials: { F: 699, M: 139, A: 69, H: 1118, W: 279 }, tek: 30 },     
      "Trike": { materials: { F: 700, W: 218, H: 1225 }, tek: 10 },
      "Tusoteuthis": { materials: { A: 391, H: 2782, F: 6914, M: 260 }, tek: 15 },
      
      "Umbra": { materials: { F: 2117, M: 846, H: 3104, K: 423 }, tek: 30 },

      "Velonasaur": { materials: { K: 1235, H: 2881, F: 1523 }, tek: 15 },

      "Woolly Rhino": { materials: { A: 1417, H: 3543, F: 1842, M: 850 }, tek: 35 },
      "Xiphactinus": { materials: { A: 407, H: 2360, F: 1261, M: 122 }, tek: 15 },
      "Yi Ling": { materials: { F: 580, W: 178, H: 981 }, tek: 15 },
      "Yutyrannus": { materials: { F: 3144, M: 1212, H: 3818, B: 1123 }, tek: 40 }
    },

    platform: {
      "Brontosaurus Platform": { materials: { F: 2983, M: 826, A: 413, H: 5049, B: 1147 }, tek: 30 },
      "Dreadnoughtus Platform": { materials: { A: 2633, H: 10533, B: 2194, F: 7022, M: 5705 }, tek: 145 },
      "Gigadesmodus Platform (Primitive)": { materials: { A: 225, H: 600, B: 150, F: 525, M: 450 }, tek: 20 },
      "Grand Tortugar Platform (Not Capped 51.2 Armor)": { materials: { H: 1064, W: 2837, M: 443, F: 2660 }, tek: 45 },
      "Megachelon Platform": { materials: { F: 2223, M: 650, B: 359, H: 2668, SF: 188, A: 239 }, tek: 150 },
      "Mosasaurus Platform": { materials: { A: 1469, H: 7837, B: 2612, F: 5878, M: 9797 }, tek: 250 },
      "Paracer Platform": { materials: { A: 223, H: 2855, B: 401, F: 1784, M: 624 }, tek: 30 },
      "Plesiosaur Platform": { materials: { A: 431, H: 5335, B: 1216, F: 3177, M: 878 }, tek: 35 },
      "Quetzal Platform": { materials: { A: 1024, H: 5292, B: 1877, F: 3414, M: 1536 }, tek: 50 },
      "Shastasaurus Submarine": { materials: { A: 1665, E: 1248, B: 2081, C: 2913, M: 12488 }, tek: 230 }
    },
    teksaddles: {
      "Megalodon Tek Saddle": { materials: { J: 223.2 }, tek: 150 },
      "Mosasaurus Tek Saddle": { materials: { J: 223.2 }, tek: 250 },
      "Rex Tek Saddle": { materials: { J: 223.2 }, tek: 250 },
      "Rock Drake Tek Saddle": { materials: { J: 223.2 }, tek: 250 },
      "Tapejara Tek Saddle": { materials: { J: 223.2 }, tek: 150 },
    }
  },

  /* =========================
     EQUIPMENT
     ========================= */
  equipment: {

    /* ---------- TIER 1 ---------- */
    tier1: {
      weapons: {
        "AR": { materials: { A: 769, P: 923, M: 538, D: 209 }, tek: 25 },
        "Compound Bow": { materials: { M: 1320, A: 1165, P: 1476, D: 338 }, tek: 45 },
        "Cross Bow": { materials: { M: 102, F: 514, W: 146, D: 635 }, tek: 15 },
        "Fabricated Crossbow": { materials: { A: 511, M: 877, F: 1169, P: 2338, D: 816 }, tek: 30 },
        "Fabricated Pistol": { materials: { A: 477, P: 556, M: 318, D: 1359 }, tek: 30 },
        "Fabricated Sniper": { materials: { A: 1322, P: 1382, M: 961, D: 426 }, tek: 35 },
        "Flame Thrower": { materials: { E: 214, P: 1070, A: 713, M: 499, L: 142, D: 218 }, tek: 25 },
        "Goo Gun": { materials: { A: 475, E: 475, P: 1268, C: 634, M: 2378, D: 377 }, tek: 50 },       
        "Harpoon Launcher": { materials: { A: 862, H: 359, O: 718, W: 574, F: 862, M: 172, P: 431, D: 297 }, tek: 20 },
        "Longneck Rifle": { materials: { H: 361, W: 289, M: 1373, D: 398 }, tek: 45 },
        "Pump Shotgun": { materials: { A: 326, P: 398, M: 217, D: 1665 }, tek: 25 },
        "Pistol": { materials: { H: 234, W: 78, M: 939, D: 276 }, tek: 35 },
        "Riot Shield": { materials: { C: 1760, P: 1056, M: 352, B: 1056, D: 12939 }, tek: 45 },
        "Sword": { materials: { H: 224, W: 14, M: 746, D: 285 }, tek: 30 }
      },
      tools: {
        "Chainsaw": { materials: { A: 790, M: 790, E: 395, P: 1185, D: 602 }, tek: 30 },
        "Charge Lantern": { materials: { GB: 6295, M: 2046, R: 1259, E: 1888, P: 1888, CB: 51 }, tek: 65 },       
        "Climbing Pick": { materials: { F: 145, G: 58, FW: 29, M: 116, D: 325 }, tek: 20 },
        "Drake Claw": { materials: { C: 54, M: 273, F: 1094, A: 91, D: 81 }, tek: 20 },       
        "Hatchet": { materials: { H: 142, W: 14, M: 113, D: 125 }, tek: 20 },
        "Pick": { materials: { H: 158, W: 15, M: 15, D: 202 }, tek: 20 },
        "Shield": { materials: { A: 142, M: 570, H: 107, D: 7735 }, tek: 25 },
        "Sickle": { materials: { H: 242, W: 60, M: 272, D: 216 }, tek: 15 },
        "Pike": { materials: { H: 285, W: 142, M: 142, D: 168 }, tek: 20 },
        "Whip": { materials: { F: 387, U: 155, H: 155, W: 77, D: 138 }, tek: 20 }
      },
      armor: {
        "Glider Suit": { materials: { V: 64, H: 153, F: 256, M: 153, D: 2018 }, tek: 30 },

        "Flak Boots": { materials: { F: 57, M: 115, H: 86, D: 1013 }, tek: 15 },
        "Flak Chest": { materials: { F: 59, M: 194, H: 149, D: 883 }, tek: 15 },
        "Flak Gloves": { materials: { F: 31, M: 95, H: 79, D: 902 }, tek: 15 },
        "Flak Helm": { materials: { F: 42, M: 142, H: 99, D: 505 }, tek: 15 },
        "Flak Legs": { materials: { F: 75, M: 242, H: 181, D: 703 }, tek: 15 },

        "Scuba Flippers": { materials: { A: 70, F: 58, B: 47, K: 141, H: 141, D: 341 }, tek: 20 },
        "Scuba Legs": { materials: { F: 60, M: 30, H: 608, P: 608, D: 187, J: 19 }, tek: 20 },
        "Scuba Mask": { materials: { C: 146, H: 220, F: 88, B: 44, D: 234 }, tek: 20 },
        "Scuba Tank": { materials: { F: 108, M: 190, H: 272, P: 40, D: 268 }, tek: 15 }
      },
      mek: {
        "MDSM": { materials: { BP: 346, I: 346, P: 2078, C: 3233, M: 4619, D: 5000, J: 39 }, tek: 140 },
        "MRLM": { materials: { BP: 252, I: 252, P: 1050, C: 1681, M: 3783, D: 5000, Q: 193.8 }, tek: 125 },
        "MSCM": { materials: { BP: 349, I: 349, P: 2098, C: 2332, M: 4664, D: 5000, Q: 171.9 }, tek: 145 }
      }
    },

    /* ---------- TIER 2 ---------- */
    tier2: {
      weapons: {
        "AR": { materials: { A: 2531, P: 3037, M: 1771, D: 483 }, tek: 50 },
        "Compound Bow": { materials: { A: 4218, P: 5343, M: 4781, D: 716 }, tek: 110 },
        "Cross Bow": { materials: { F: 2730, W: 780, M: 546, D: 1690 }, tek: 30 },
        "Fabricated Crossbow": { materials: { A: 1785, M: 3060, F: 4081, P: 8162, D: 1907 }, tek: 150 },
        "Fabricated Pistol": { materials: { A: 1841, P: 2147, M: 1227, D: 2765 }, tek: 180 },
        "Fabricated Sniper": { materials: { A: 9910, P: 10360, M: 7207, D: 1208 }, tek: 160 },
        "Flame Thrower": { materials: { A: 4050, M: 2835, L: 810, E: 1215, P: 6075, D: 514 }, tek: 70 },
        "Goo Gun": { materials: { A: 1927, E: 1927, P: 5139, C: 2569, M: 9637, D: 765 }, tek: 210 },
        "Hand Cannon": { materials: { M: 4008, H: 1002, W: 334, D: 511 }, tek: 55 },       
        "Harpoon Launcher": { materials: { A: 4401, H: 1833, O: 3667, W: 2934, F: 4401, M: 8802, P: 2200, D: 1276 }, tek: 195 },
        "Longneck Rifle": { materials: { H: 2631, W: 2105, M: 10001, D: 1205 }, tek: 135 },
        "Pump Shotgun": { materials: { A: 2244, P: 2743, M: 1496, D: 3697 }, tek: 55 },
        "Riot Shield": { materials: { C: 15088, P: 9053, M: 3017, B: 9053, D: 38161 }, tek: 150 },
        "Shotgun": { materials: { H: 1766, W: 1412, M: 5651, D: 4060 }, tek: 130 },
        "Pike": { materials: { H: 1914, W: 957, M: 957, D: 521 }, tek: 35 },
        "Pistol": { materials: { H: 667, W: 222, M: 2668, D: 439 }, tek: 70 },
        "Sling Shot": { materials: { F: 1344, W: 336, H: 67, D: 436 }, tek: 15 },
        "Sword": { materials: { H: 707, W: 47, M: 2357, D: 743 }, tek: 50 },
        "Torch": { materials: { N: 62, W: 62, S: 62, D: 694 }, tek: 20 },
        "Wooden Club": { materials: { F: 961, W: 256, D: 752 }, tek: 20 }
      },
      tools: {
        "Chainsaw": { materials: { A: 3823, M: 3823, E: 1911, P: 5734, D: 1025 }, tek: 90 },
        "Climbing Pick": { materials: { F: 812, G: 325, FW: 162, M: 650, D: 813 }, tek: 30 },
        "Hatchet": { materials: { H: 787, W: 78, M: 630, D: 525 }, tek: 30 },
        "Pick": { materials: { H: 1275, W: 127, M: 127, D: 627 }, tek: 30 },
        "Shield": { materials: { A: 1286, M: 5147, H: 965, D: 19576 }, tek: 120 },
        // "Shovel (298 Asc)": { materials: { D: 325 }, tek: 100 },
        "Sickle": { materials: { H: 948, W: 237, M: 1066, D: 480 }, tek: 35 },
        "Whip": { materials: { F: 2215, U: 886, H: 886, W: 443, D: 551 }, tek: 25 }
      },
      armor: {
        "Glider Suit - (Not Max)": { materials: { V: 306, H: 735, F: 1225, M: 735, D: 4323 }, tek: 75 },
        "Gas Mask": { materials: { X: 134, P: 1347, C: 673, D: 473 }, tek: 50 },

        "Flak Boots": { materials: { F: 352, M: 704, H: 528, D: 1800 }, tek: 40 },
        "Flak Chest": { materials: { F: 368, M: 1192, H: 921, D: 1804 }, tek: 40 },
        "Flak Gloves": { materials: { F: 109, M: 328, H: 273, D: 1965 }, tek: 40 },
        "Flak Helm": { materials: { F: 239, M: 797, H: 558, D: 1878 }, tek: 40 },
        "Flak Legs": { materials: { F: 400, M: 1280, H: 960, D: 2006 }, tek: 40 },

        "Ghillie Boots": { materials: { F: 266, OP: 266, H: 399, D: 578 }, tek: 20 },
        "Ghillie Chest": { materials: { F: 294, OP: 441, H: 736, D: 565 }, tek: 20 },
        "Ghillie Gloves": { materials: { F: 107, OP: 160, H: 267, D: 520 }, tek: 20 },
        "Ghillie Helm": { materials: { F: 202, OP: 337, H: 471, D: 524 }, tek: 20 },
        "Ghillie Legs": { materials: { F: 257, OP: 412, H: 619, D: 439 }, tek: 20 },

        "Hazmat Boots": { materials: { V: 202, C: 404, H: 809, GB: 607, F: 1012, P: 404, D: 1116 }, tek: 50 },
        "Hazmat Chest": { materials: { V: 953, C: 1906, H: 1716, GB: 1716, F: 2478, P: 953, D: 1124 }, tek: 50 },
        "Hazmat Gloves": { materials: { V: 457, C: 915, H: 858, GB: 858, F: 2003, P: 114, D: 1109 }, tek: 50 },
        "Hazmat Helm": { materials: { V: 910, C: 1821, H: 1092, GB: 728, F: 1638, P: 728, D: 1119 }, tek: 50 },
        "Hazmat Legs": { materials: { V: 1147, C: 2294, H: 2581, GB: 1720, F: 3728, P: 860, D: 1125 }, tek: 50 },

        "Fur Boots": { materials: { F: 399, M: 799, H: 599, Z: 4797, D: 2045 }, tek: 65 },
        "Fur Helm": { materials: { F: 168, M: 560, H: 392, Z: 3140, D: 1935 }, tek: 60 },
        "Fur Chest": { materials: { F: 172, M: 561, H: 431, Z: 3454, D: 1298 }, tek: 60 },
        "Fur Gloves": { materials: { F: 113, M: 339, H: 283, Z: 2264, D: 1609 }, tek: 55 },
        "Fur Legs": { materials: { F: 186, M: 597, H: 447, Z: 3582, D: 1290 }, tek: 60 },

        "Desert Boots": { materials: { F: 220, U: 441, H: 539, D: 433 }, tek: 25 },
        "Desert Chest": { materials: { F: 713, U: 1070, H: 1783, D: 537 }, tek: 25 },
        "Desert Gloves": { materials: { F: 272, U: 544, H: 681, D: 515 }, tek: 25 },
        "Desert Helm": { materials: { C: 692, H: 692, U: 207, F: 415, B: 207, D: 537 }, tek: 25 },
        "Desert Legs": { materials: { F: 655, U: 982, H: 1647, D: 432 }, tek: 25 },

        "Arctic Boots": { materials: { F: 255, M: 170, H: 383, Z: 2045, D: 662 }, tek: 50 },
        "Arctic Chest": { materials: { F: 323, M: 323, H: 646, Z: 3232, D: 737 }, tek: 55 },
        "Arctic Gloves": { materials: { F: 143, M: 71, H: 287, Z: 1437, D: 1060 }, tek: 50 },
        "Arctic Helm": { materials: { F: 259, M: 173, H: 432, Z: 2423, D: 964 }, tek: 50 },
        "Arctic Legs": { materials: { F: 502, M: 401, H: 893, Z: 4820, D: 1124 }, tek: 60 },

        "Scuba Flippers": { materials: { A: 666, F: 555, B: 444, K: 1333, H: 1333, D: 636 }, tek: 25 },
        "Scuba Legs": { materials: { F: 266, M: 133, H: 2661, P: 2661, D: 665 }, tek: 25 },
        "Scuba Mask": { materials: { C: 488, H: 732, F: 293, B: 146, D: 526 }, tek: 25 },
        "Scuba Tank": { materials: { F: 329, M: 576, H: 822, P: 123, D: 474 }, tek: 30 },
      },
      mek: {
        "MDSM - (Not Max)": { materials: { BP: 736, I: 736, P: 4416, C: 6870, M: 9815, D: 5000, J: 42 }, tek: 280 },
        "MRLM - (Not Max)": { materials: { BP: 677, I: 677, P: 2824, C: 4519, M: 10169, D: 5000, Q: 211.0 }, tek: 250 },
      },
      tek: {
        "Tek Suits (Limit 2)": { materials: { J: 714.6, D: 1500 }, tek: 2500 }
      },
    }
  },
  /* =========================
   CURSED ==================== */
  cursed: {
    /* ---------- TIER 1 ---------- */
    tier1: {
      /* weapons: {},*/
      tools: {
        "Chainsaw": { materials: { E: 394, P: 1183, A: 788, M: 788, RE: 78, D: 302, Q: 272 }, tek: 250 },
      },
      armor: {
        "Flak Gloves": { materials: { H: 79, RE: 79, M: 94, F: 31, D: 657, J: 468 }, tek: 250 },
        "Flak Helmet": { materials: { H: 81, RE: 57, M: 115, F: 34, D: 373, J: 347 }, tek: 250 },
        "Flak Leggings": { materials: { H: 91, RE: 78, M: 251, F: 78, D: 584, J: 322 }, tek: 250 },
        "Riot Helmet": { materials: { F: 37, P: 625, B: 312, H: 87, RE: 125, C: 437, D: 303, J: 431 }, tek: 350 },
        "Riot Leggings": { materials: { H: 178, RE: 148, F: 74, P: 1039, B: 593, D: 527, J: 471 }, tek: 375 },
      }
    },
    /* ---------- TIER 2 ---------- */
    tier2: {
      weapons: {
        "Compound Bow": { materials: { M: 4143, RE: 487, P: 4630, A: 3655, D: 363, Q: 298 }, tek: 1150 },
        "Cross Bow": { materials: { M: 403, W: 576, RE: 57, F: 2016, D: 805, Q: 298 }, tek: 200 },
        "Harpoon": { materials: { F: 2807, M: 5614, P: 1403, W: 1871, H: 1169, O: 2339, RE: 233, A: 2807, D: 681, Q: 298 }, tek: 750 },
        "Longneck Rifle": { materials: { M: 4064, W: 855, RE: 213, H: 1069, D: 418, Q: 298 }, tek: 500 },
        "Pike": { materials: { M: 447, W: 447, RE: 44, H: 894, D: 252, Q: 298 }, tek: 300 },
        "Pump Shotgun": { materials: { A: 2098, P: 2564, M: 1398, RE: 466, D: 1873, Q: 298 }, tek: 1050 },
        "Sword": { materials: { H: 571, RE: 38, M: 1903, W: 38, D: 363, Q: 298 }, tek: 300 }
      },
      tools: {
        "Chainsaw": { materials: { E: 905, P: 2717, A: 1811, M: 1811, RE: 181, D: 492, Q: 298 }, tek: 500 },
        "Hatchet": { materials: { H: 462, RE: 46, M: 369, W: 46, D: 238, Q: 298 }, tek: 250 },
        "Pick": { materials: { H: 417, RE: 41, M: 41, W: 41, D: 234, Q: 296 }, tek: 250 },
      },
      armor: {
        "Flak Chest": { materials: { H: 614, RE: 307, M: 799, F: 245, D: 1059, J: 496 }, tek: 500 },
        "Flak Boots": { materials: { H: 196, RE: 164, M: 262, F: 131, D: 675, J: 496 }, tek: 400 },
        "Flak Gloves": { materials: { H: 182, RE: 182, M: 218, F: 72, D: 601, J: 496 }, tek: 450 },
        "Flak Helmet": { materials: { H: 421, RE: 301, M: 602, F: 180, D: 909, J: 496 }, tek: 650 },
        "Flak Leggings": { materials: { H: 934, RE: 389, M: 1245, F: 389, D: 1338, J: 496 }, tek: 550 },
      }
    }
  }
};
