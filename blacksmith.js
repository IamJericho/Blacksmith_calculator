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
      "Acrocanthosaurus": { materials: { H: 5317, F: 2798, M: 699 } },
      "Allosaurus": { materials: { F: 1539, M: 271, H: 2897 } },
      "Ankylosaurus": { materials: { F: 1191, M: 85, H: 2212 } },
      "Araneo": { materials: { K: 911, H: 2369, F: 1883 } },
      "Archelon": { materials: { F: 2211, H: 7520, M: 1769, W: 2211 } },
      "Argentavis": { materials: { K: 1358, H: 3170, F: 1675 } },
      "Armadoggo": { materials: { H: 1567, P: 43, M: 261, F: 1959 } },
      "Arthropluera": { materials: { A: 135, N: 72, M: 270, W: 180, F: 450, H: 720, O: 315 } },
      "Aurellax": { materials: { H: 2709, P: 451, M: 1354, F: 3161 } },

      "Baryonyx": { materials: { F: 3252, M: 232, H: 2091 } },
      "Basilisk": { materials: { A: 775, G: 410, M: 3879, F: 1369, H: 2464 } },
      "Basilosaurus": { materials: { F: 1631, M: 448, H: 1631 } },
      "Beelzebufo": { materials: { A: 41, H: 1404, F: 785, W: 247 } },
      "Bison": { materials: { A: 655, H: 2403, F: 1311, M: 437 } },
      "Boaratos": { materials: { O: 1440, H: 7200, F: 8640, M: 1440 }, additionalTek: 20 },     
      "Brontosaurus": { materials: { F: 1625, M: 351, H: 3075 } },
      "Burrowbuck": { materials: { F: 1101, M: 27, H: 2065, A: 137 } },

      "Carbonemys": { materials: { A: 86, H: 1469, F: 821 } },
      "Carcharodontosaurus": { materials: { K: 168, H: 4214, F: 2950, M: 1517 } },
      "Carnotaurus": { materials: { F: 1486, M: 262, H: 2797 } },
      "Castoroides": { materials: { A: 1113, H: 2306, T: 1431, F: 1590, M: 795 } },
      "Ceratosaurus": { materials: { F: 2107, M: 156, H: 1014 } },
      "Chalicotherium": { materials: { F: 1481, M: 370, H: 2180 } },
      "Concavenator": { materials: { F: 1545, M: 193, H: 2705, C: 386 }, additionalTek: 20 },     
      "Cryolophosaurus": { materials: { H: 6686, B: 1966, M: 2123, F: 5505 } },

      "Companion Ammo Box": { materials: { F: 256, M: 68, H: 42, J: 98 } },
      "Companion Bait Trap": { materials: { F: 44, M: 2, H: 17, PM: 12, J: 94 } },
      "Companion Battle Spikes": { materials: { F: 270, M: 81, H: 18, J: 94 } },
      "Companion Camping Gear": { materials: { F: 380, H: 133, J: 107 } },
      "Companion Medpack": { materials: { H: 108, M: 7, F: 144, MB: 21, J: 87 } },
      "Companion Oxygen Tank": { materials: { H: 10, P: 31, M: 62, F: 104, J: 108 } },
      "Companion Picknic Set": { materials: { M: 32, F: 328, T: 656, J:109 } },
      "Companion Rucksack": { materials: { F: 278, M: 9, H: 185, J: 99 } },
      "Companion Speed Booster": { materials: { H: 10, P: 61, F: 101, M: 40, SP: 407, J: 108 } },

      "Daeodon": { materials: { F: 1435, M: 185, H: 2686 } },
      "Deinonychus (fluffy raptor)": { materials: { F: 984, W: 303, H: 1666 } },
      "Deinosuchus (big croc)": { materials: { F: 1822, M: 455, H: 3462 } },
      "Deinotherium": { materials: { A: 1394, H: 1394, W: 3253, F: 5298, M: 185 } },
      "Desmodus": { materials: { F: 1616, M: 404, H: 2334, W: 1077 } },
      "Diplodocus": { materials: { F: 5330, M: 1776, H: 7551, W: 2221 } },
      "Dire Bear": { materials: { A: 922, H: 2766, F: 1199 } },
      "Doedicurus": { materials: { F: 969, M: 44, H: 1762, S: 132 } },
      "Dunkleosteus": { materials: { A: 1045, H: 2612, F: 1567, M: 696 } },

      "Equus": { materials: { F: 1413, S: 706, H: 2120, W: 750 } },
      "Fasolasuchus": { materials: { F: 1750, M: 262, H: 1312, W: 875 } },

      "Gacha": { materials: { K: 1399, H: 3264, F: 1725 } },
      "Gallimimus": { materials: { F: 1364, M: 213, H: 2046, W: 1023 } },
      "Gasbags": { materials: { K: 1312, H: 3062, F: 1618 } },
      "Gigadesmodus (Primitive)": { materials: { A: 160, H: 550, B: 220, F: 600, M: 225 } },
      "Giganotosaurus": { materials: { F: 2929, M: 1004, H: 5690 } },
      "Gigantoraptor": { materials: { F: 1495, M: 514, H: 2663, W: 1121 } },

      "Helicoprion": { materials: { F: 2220, M: 666, H: 3552 } },
      "Hyaenodon": { materials: { F: 1284, M: 165, H: 2403 } },

      "Ichthyosaurus": { materials: { F: 795, H: 875, W: 318, N: 127, RM: 159 } },
      "Iguanodon": { materials: { F: 454, W: 136, H: 727 } },

      "Kaprosuchus": { materials: { K: 541, H: 1375, F: 1000 } },
      "Karkinos": { materials: { V: 674, FW: 1685, F: 1895, H: 1432 } },
      
      "Lumina": { materials: { H: 3292, B: 897, M: 598, F: 2244 } },
      "Lymantria": { materials: { K: 776, H: 1063, F: 1022 } },
     
      "Maeguana": { materials: { F: 1491, M: 263, H: 2806 } },
      "Magmasaur": { materials: { F: 1332, M: 3554, H: 2043, A: 1110 }, additionalTek: 20 },      
      "Malwyn": { materials: { K: 561, H: 702, F: 2340, M: 1684 } },
      "Mammoth": { materials: { F: 1246, M: 89, H: 2314 } },
      "Managarmr": { materials: { K: 1163, H: 2715, F: 1435 } },
      "Manta": { materials: { N: 188, M: 549, F: 1099, H: 1571, W: 392 } },
      "Mantis": { materials: { F: 583, M: 272, H: 934 } },
      "Megalania": { materials: { F: 1758, M: 368, H: 2576 } },
      "Megaloceros": { materials: { F: 1018, M: 46, H: 1850 } },
      "Megalodon": { materials: { F: 1229, A: 237, H: 2299 } },
      "Megalosaurus": { materials: { F: 1594, M: 281, H: 3001 } },
      "Megaraptor": { materials: { F: 1870, M: 467, H: 3272 } },
      "Megatherium": { materials: { A: 872, H: 2834, F: 1133, M: 479 } },
      "Morellatops": { materials: { F: 689, W: 258, H: 1206 } },
      "Mosasaurus": { materials: { A: 1308, H: 7475, B: 934, F: 5606, M: 3737 } },

      "Ossidon": { materials: { F: 1601, M: 1200, H: 3042 } },

      "Pachy": { materials: { F: 839, W: 258, H: 1421 } },
      "Pachyrhinosaurus": { materials: { F: 734, W: 229, H: 1284 } },
      "Palaeoctopus": { materials: { F: 4291, M: 1430, K: 572, H: 7868, W: 2145 }, additionalTek: 20 },     
      "Pararacer": { materials: { F: 997, M: 90, H: 1813 } },
      "Parasaur": { materials: { F: 423, W: 127, H: 678 } },
      "Pelagornis": { materials: { K: 692, H: 2122, F: 1153 } },
      "Phiomia": { materials: { H: 286, F: 214, W: 71 } },
      "Plesiosaur": { materials: { A: 579, H: 3566, F: 2228, B: 356 } },
      "Procoptodon": { materials: { F: 3133, M: 1096, H: 7833, Z: 2349 } },
      "Pteranodon": { materials: { K: 648, H: 1989, F: 1081 } },
      "Pulmonoscorpius": { materials: { F: 846, W: 267, H: 1515 } },

      "Quetzal": { materials: { A: 835, H: 6265, F: 4176, B: 710 } },

      "Raptor": { materials: { F: 566, W: 174, H: 959 } },
      "Ravager": { materials: { F: 1171, H: 2670, FW: 1030 } },
      "Rex": { materials: { F: 1684, M: 421, H: 3200 } },
      "Rhynio": { materials: { C: 263, H: 1315, P: 526, F: 1753, M: 1315 } },
      "Rock Drake": { materials: { F: 2009, M: 1116, H: 3126, R: 759 } },
      "Rock Golem": { materials: { F: 1227, M: 286, H: 2208 } },
      "Roll Rat": { materials: { A: 759, G: 402, M: 3799, F: 1341, H: 2413 } },

      "Sabertooth": { materials: { F: 1375, M: 177, H: 2573 } },
      "Sarco": { materials: { A: 170, H: 1965, F: 640 } },
      "Snow Owl": { materials: { K: 1216, H: 2838, F: 1500 } },
      "Solwyn": { materials: { C: 857, M: 357, F: 1608, O: 571 } },
      "Spino": { materials: { A: 421, H: 3558, F: 1872, B: 234 } },
      "Stegosaurus": { materials: { F: 844, W: 268, H: 1534 } },

      "Tapejara": { materials: { F: 1645, M: 411, H: 2376, W: 1096 } },
      "Terror Bird": { materials: { F: 557, W: 171, H: 943 } },
      "Therizinosaurus": { materials: { F: 1970, M: 677, H: 3510, W: 1478 } },
      "Thorny Dragon": { materials: { Y: 765, H: 2430, W: 1125, F: 1350, M: 315 } },
      "Thylacoleo": { materials: { F: 1397, M: 180, H: 2615 } },
      "Tidepup": { materials: { F: 699, M: 139, A: 69, H: 1118, W: 279 } },     
      "Trike": { materials: { F: 700, W: 218, H: 1225 } },
      "Tusoteuthis": { materials: { A: 391, H: 2782, F: 6914, M: 260 } },
      
      "Umbra": { materials: { F: 2117, M: 846, H: 3104, K: 423 }, additionalTek: 20 },

      "Velonasaur": { materials: { K: 1318, H: 3077, F: 1626 } },

      "Woolly Rhino": { materials: { A: 857, H: 2143, F: 1114, M: 514 } },
      "Xiphactinus": { materials: { A: 409, H: 2374, F: 1268, M: 122 } },
      "Yi Ling": { materials: { F: 610, W: 187, H: 1033 } },
      "Yutyrannus": { materials: { F: 3144, M: 1212, H: 3818, B: 1123 } }
    },

    platform: {
      "Brontosaurus Platform": { materials: { F: 2606, M: 721, A: 360, H: 4411, B: 1002 } },
      "Dreadnoughtus Platform": { materials: { A: 2496, H: 9984, B: 2080, F: 6656, M: 5408 } },
      "Gigadesmodus Platform (Primitive)": { materials: { A: 225, H: 600, B: 150, F: 525, M: 450 } },
      "Grand Tortugar Platform (Not Capped 51.2 Armor)": { materials: { H: 1064, W: 2837, M: 443, F: 2660 } },
      "Megachelon Platform": { materials: { F: 2311, M: 675, B: 373, H: 2773, SF: 195, A: 248 } },
      "Mosasaurus Platform": { materials: { A: 1469, H: 7837, B: 2612, F: 5878, M: 9797 } },
      "Paracer Platform": { materials: { A: 217, H: 2779, B: 390, F: 1736, M: 607 } },
      "Plesiosaur Platform": { materials: { A: 468, H: 5792, B: 1320, F: 3450, M: 954 } },
      "Quetzal Platform": { materials: { A: 1039, H: 5371, B: 1906, F: 3465, M: 1559 } },
      "Shastasaurus Submarine": { materials: { A: 1728, E: 1296, B: 2160, C: 3024, M: 12963 } }
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
        "AR": { materials: { A: 769, P: 923, M: 538, D: 209 } },
        "Compound Bow": { materials: { M: 1320, A: 1165, P: 1476, D: 338 } },
        "Cross Bow": { materials: { M: 102, F: 514, W: 146, D: 635 } },
        "Fabricated Crossbow": { materials: { A: 511, M: 877, F: 1169, P: 2338, D: 816 } },
        "Fabricated Pistol": { materials: { A: 477, P: 556, M: 318, D: 1359 } },
        "Fabricated Sniper": { materials: { A: 1322, P: 1382, M: 961, D: 426 } },
        "Flame Thrower": { materials: { E: 214, P: 1070, A: 713, M: 499, L: 142, D: 218 } },
        "Harpoon Launcher": { materials: { A: 816, H: 340, O: 680, W: 544, F: 816, M: 1632, P: 408, D: 403 } },
        "Longneck Rifle": { materials: { H: 351, W: 281, M: 1335, D: 417 } },
        "Pike": { materials: { H: 283, W: 141, M: 141, D: 227 } },
        "Pistol": { materials: { H: 234, W: 78, M: 939, D: 276 } },
        "Pump Shotgun": { materials: { A: 326, P: 398, M: 217, D: 1665 } },       
        "Riot Shield": { materials: { C: 1748, P: 1048, M: 349, B: 1048, D: 14262 } },
        "Sword": { materials: { H: 238, W: 15, M: 793, D: 403 } }
      },
      tools: {
        "Cart": { materials: { A: 243, M: 487, F: 7312, W: 7312, D: 263 } },
        "Chainsaw": { materials: { A: 790, M: 790, E: 395, P: 1185, D: 602 } },
        "Climbing Pick": { materials: { F: 145, G: 58, FW: 29, M: 116, D: 325 } },
        "Drake Claw": { materials: { C: 54, M: 273, F: 1094, A: 91, D: 81 } },       
        "Hatchet": { materials: { H: 787, W: 78, M: 630, D: 525 } },
        "Pick": { materials: { H: 1275, W: 127, M: 127, D: 627 } },
        "Shield": { materials: { A: 142, M: 570, H: 107, D: 7735 } },
        "Shovel (298 Asc)": { materials: { A:70, M: 175, W: 175, D: 234 } },       
        "Sickle": { materials: { H: 242, W: 60, M: 272, D: 216 } },
        "Torch": { materials: { N: 1, W: 1, S: 1, D: 695 } },
        "Whip": { materials: { F: 387, U: 155, H: 155, W: 77, D: 138 } },
        "Wooden Club": { materials: { F: 961, W: 256, D: 752 } }       
      },
      armor: {
        "Glider Suit - (Not Max)": { materials: { V: 354, H: 851, F: 1418, M: 851, D: 4447 } },
        "Gas Mask": { materials: { X: 5, P: 57, C: 28, D: 85 } },

        "Flak Boots": { materials: { F: 352, M: 704, H: 528, D: 1800 } },
        "Flak Chest": { materials: { F: 368, M: 1192, H: 921, D: 1804 } },
        "Flak Gloves": { materials: { F: 109, M: 328, H: 273, D: 1965 } },
        "Flak Helm": { materials: { F: 239, M: 797, H: 558, D: 1878 } },
        "Flak Legs": { materials: { F: 400, M: 1280, H: 960, D: 2006 } },

        "Hazmat Boots": { materials: { V: 202, C: 404, H: 809, GB: 607, F: 1012, P: 404, D: 1116 } },
        "Hazmat Chest": { materials: { V: 953, C: 1906, H: 1716, GB: 1716, F: 2478, P: 953, D: 1124 } },
        "Hazmat Gloves": { materials: { V: 457, C: 915, H: 858, GB: 858, F: 2003, P: 114, D: 1109 } },
        "Hazmat Helm": { materials: { V: 910, C: 1821, H: 1092, GB: 728, F: 1638, P: 728, D: 1119 } },
        "Hazmat Legs": { materials: { V: 1147, C: 2294, H: 2581, GB: 1720, F: 3728, P: 860, D: 1125 } },

        "Scuba Flippers": { materials: { A: 70, F: 58, B: 47, K: 141, H: 141, D: 341 } },
        "Scuba Legs": { materials: { F: 60, M: 30, H: 608, P: 608, D: 187, J: 19 } },
        "Scuba Mask": { materials: { C: 146, H: 220, F: 88, B: 44, D: 234 } },
        "Scuba Tank": { materials: { F: 66, M: 117, H: 167, P: 25, D: 264 } }
      },
     /* mek: {
        "MDSM": { materials: { BP: 346, I: 346, P: 2078, C: 3233, M: 4619, D: 5000, J: 39 } },
        "MRLM": { materials: { BP: 252, I: 252, P: 1050, C: 1681, M: 3783, D: 5000, Q: 193.8 } },
        "MSCM": { materials: { BP: 349, I: 349, P: 2098, C: 2332, M: 4664, D: 5000, Q: 171.9 } }
      } */
    },

    /* ---------- TIER 2 ---------- */
    /* tier2: {
      weapons: {
        "AR": { materials: { A: 2531, P: 3037, M: 1771, D: 483 } },
        "Compound Bow": { materials: { A: 4218, P: 5343, M: 4781, D: 716 } },
        "Cross Bow": { materials: { F: 2730, W: 780, M: 546, D: 1690 } },
        "Fabricated Crossbow": { materials: { A: 1785, M: 3060, F: 4081, P: 8162, D: 1907 } },
        "Fabricated Pistol": { materials: { A: 1841, P: 2147, M: 1227, D: 2765 } },
        "Fabricated Sniper": { materials: { A: 9910, P: 10360, M: 7207, D: 1208 } },
        "Flame Thrower": { materials: { A: 4050, M: 2835, L: 810, E: 1215, P: 6075, D: 514 } },
        "Goo Gun": { materials: { A: 1927, E: 1927, P: 5139, C: 2569, M: 9637, D: 765 } },
        "Hand Cannon": { materials: { M: 4008, H: 1002, W: 334, D: 511 } },       
        "Harpoon Launcher": { materials: { A: 4401, H: 1833, O: 3667, W: 2934, F: 4401, M: 8802, P: 2200, D: 1276 } },
        "Longneck Rifle": { materials: { H: 2631, W: 2105, M: 10001, D: 1205 } },
        "Pump Shotgun": { materials: { A: 2244, P: 2743, M: 1496, D: 3697 } },
        "Riot Shield": { materials: { C: 15088, P: 9053, M: 3017, B: 9053, D: 38161 } },
        "Shotgun": { materials: { H: 1766, W: 1412, M: 5651, D: 4060 } },
        "Pike": { materials: { H: 1914, W: 957, M: 957, D: 521 } },
        "Pistol": { materials: { H: 667, W: 222, M: 2668, D: 439 } },
        "Sling Shot": { materials: { F: 1344, W: 336, H: 67, D: 436 } },
        "Sword": { materials: { H: 707, W: 47, M: 2357, D: 743 } },
        "Torch": { materials: { N: 62, W: 62, S: 62, D: 694 } },
        "Wooden Club": { materials: { F: 961, W: 256, D: 752 } }
       },
       tools: {
        "Chainsaw": { materials: { A: 3823, M: 3823, E: 1911, P: 5734, D: 1025 } },
        "Climbing Pick": { materials: { F: 812, G: 325, FW: 162, M: 650, D: 813 } },
        "Hatchet": { materials: { H: 787, W: 78, M: 630, D: 525 } },
        "Pick": { materials: { H: 1275, W: 127, M: 127, D: 627 } },
        "Shield": { materials: { A: 1286, M: 5147, H: 965, D: 19576 } },
        // "Shovel (298 Asc)": { materials: { D: 325 } },
        "Sickle": { materials: { H: 948, W: 237, M: 1066, D: 480 } },
        "Whip": { materials: { F: 2215, U: 886, H: 886, W: 443, D: 551 } }
       },
       armor: {
        "Glider Suit - (Not Max)": { materials: { V: 306, H: 735, F: 1225, M: 735, D: 4323 } },
        "Gas Mask": { materials: { X: 134, P: 1347, C: 673, D: 473 } },

        "Flak Boots": { materials: { F: 352, M: 704, H: 528, D: 1800 } },
        "Flak Chest": { materials: { F: 368, M: 1192, H: 921, D: 1804 } },
        "Flak Gloves": { materials: { F: 109, M: 328, H: 273, D: 1965 } },
        "Flak Helm": { materials: { F: 239, M: 797, H: 558, D: 1878 } },
        "Flak Legs": { materials: { F: 400, M: 1280, H: 960, D: 2006 } },

        "Ghillie Boots": { materials: { F: 266, OP: 266, H: 399, D: 578 } },
        "Ghillie Chest": { materials: { F: 294, OP: 441, H: 736, D: 565 } },
        "Ghillie Gloves": { materials: { F: 107, OP: 160, H: 267, D: 520 } },
        "Ghillie Helm": { materials: { F: 202, OP: 337, H: 471, D: 524 } },
        "Ghillie Legs": { materials: { F: 257, OP: 412, H: 619, D: 439 } },

        "Hazmat Boots": { materials: { V: 202, C: 404, H: 809, GB: 607, F: 1012, P: 404, D: 1116 } },
        "Hazmat Chest": { materials: { V: 953, C: 1906, H: 1716, GB: 1716, F: 2478, P: 953, D: 1124 } },
        "Hazmat Gloves": { materials: { V: 457, C: 915, H: 858, GB: 858, F: 2003, P: 114, D: 1109 } },
        "Hazmat Helm": { materials: { V: 910, C: 1821, H: 1092, GB: 728, F: 1638, P: 728, D: 1119 } },
        "Hazmat Legs": { materials: { V: 1147, C: 2294, H: 2581, GB: 1720, F: 3728, P: 860, D: 1125 } },

        "Fur Boots": { materials: { F: 399, M: 799, H: 599, Z: 4797, D: 2045 } },
        "Fur Helm": { materials: { F: 168, M: 560, H: 392, Z: 3140, D: 1935 } },
        "Fur Chest": { materials: { F: 172, M: 561, H: 431, Z: 3454, D: 1298 } },
        "Fur Gloves": { materials: { F: 113, M: 339, H: 283, Z: 2264, D: 1609 } },
        "Fur Legs": { materials: { F: 186, M: 597, H: 447, Z: 3582, D: 1290 } },

        "Desert Boots": { materials: { F: 220, U: 441, H: 539, D: 433 } },
        "Desert Chest": { materials: { F: 713, U: 1070, H: 1783, D: 537 } },
        "Desert Gloves": { materials: { F: 272, U: 544, H: 681, D: 515 } },
        "Desert Helm": { materials: { C: 692, H: 692, U: 207, F: 415, B: 207, D: 537 } },
        "Desert Legs": { materials: { F: 655, U: 982, H: 1647, D: 432 } },

        "Arctic Boots": { materials: { F: 255, M: 170, H: 383, Z: 2045, D: 662 } },
        "Arctic Chest": { materials: { F: 323, M: 323, H: 646, Z: 3232, D: 737 } },
        "Arctic Gloves": { materials: { F: 143, M: 71, H: 287, Z: 1437, D: 1060 } },
        "Arctic Helm": { materials: { F: 259, M: 173, H: 432, Z: 2423, D: 964 } },
        "Arctic Legs": { materials: { F: 502, M: 401, H: 893, Z: 4820, D: 1124 } },

        "Scuba Flippers": { materials: { A: 666, F: 555, B: 444, K: 1333, H: 1333, D: 636 } },
        "Scuba Legs": { materials: { F: 266, M: 133, H: 2661, P: 2661, D: 665 } },
        "Scuba Mask": { materials: { C: 488, H: 732, F: 293, B: 146, D: 526 } },
        "Scuba Tank": { materials: { F: 329, M: 576, H: 822, P: 123, D: 474 } },
       },
       mek: {
        "MDSM - (Not Max)": { materials: { BP: 736, I: 736, P: 4416, C: 6870, M: 9815, D: 5000, J: 42 } },
        "MRLM - (Not Max)": { materials: { BP: 677, I: 677, P: 2824, C: 4519, M: 10169, D: 5000, Q: 211.0 } },
       },
       tek: {
         "Tek Suits (Limit 2)": { materials: { J: 714.6, D: 1500 } }
       },
    }*/
  },
  /* =========================
   CURSED ==================== */
  
  /* ---------- TIER 1 ---------- */
  /* cursed: {
    tier1: {
       weapons: {}, 
       tools: {
         "Chainsaw": { materials: { E: 394, P: 1183, A: 788, M: 788, RE: 78, D: 302, Q: 272 } },
       },
       armor: {
         "Flak Gloves": { materials: { H: 79, RE: 79, M: 94, F: 31, D: 657, J: 468 } },
         "Flak Helmet": { materials: { H: 81, RE: 57, M: 115, F: 34, D: 373, J: 347 } },
         "Flak Leggings": { materials: { H: 91, RE: 78, M: 251, F: 78, D: 584, J: 322 } },
         "Riot Helmet": { materials: { F: 37, P: 625, B: 312, H: 87, RE: 125, C: 437, D: 303, J: 431 } },
         "Riot Leggings": { materials: { H: 178, RE: 148, F: 74, P: 1039, B: 593, D: 527, J: 471 } },
       }
      }, */
    /* ---------- TIER 2 ---------- */
    /*tier2: {
       weapons: {
         "Compound Bow": { materials: { M: 4143, RE: 487, P: 4630, A: 3655, D: 363, Q: 298 } },
         "Cross Bow": { materials: { M: 403, W: 576, RE: 57, F: 2016, D: 805, Q: 298 } },
         "Harpoon": { materials: { F: 2807, M: 5614, P: 1403, W: 1871, H: 1169, O: 2339, RE: 233, A: 2807, D: 681, Q: 298 } },
         "Longneck Rifle": { materials: { M: 4064, W: 855, RE: 213, H: 1069, D: 418, Q: 298 } },
         "Pike": { materials: { M: 447, W: 447, RE: 44, H: 894, D: 252, Q: 298 } },
         "Pump Shotgun": { materials: { A: 2098, P: 2564, M: 1398, RE: 466, D: 1873, Q: 298 } },
         "Sword": { materials: { H: 571, RE: 38, M: 1903, W: 38, D: 363, Q: 298 } }
       },
       tools: {
         "Chainsaw": { materials: { E: 905, P: 2717, A: 1811, M: 1811, RE: 181, D: 492, Q: 298 } },
         "Hatchet": { materials: { H: 462, RE: 46, M: 369, W: 46, D: 238, Q: 298 } },
         "Pick": { materials: { H: 417, RE: 41, M: 41, W: 41, D: 234, Q: 296 } },
       },
       armor: {
         "Flak Chest": { materials: { H: 614, RE: 307, M: 799, F: 245, D: 1059, J: 496 } },
         "Flak Boots": { materials: { H: 196, RE: 164, M: 262, F: 131, D: 675, J: 496 } },
         "Flak Gloves": { materials: { H: 182, RE: 182, M: 218, F: 72, D: 601, J: 496 } },
         "Flak Helmet": { materials: { H: 421, RE: 301, M: 602, F: 180, D: 909, J: 496 } },
         "Flak Leggings": { materials: { H: 934, RE: 389, M: 1245, F: 389, D: 1338, J: 496 } },
       }
    } */
};


/* Calculate recipe-based client prices from the pricing engine.
   Tek saddles retain their fixed prices until crafting recipes are available. */
(function syncBlacksmithPrices() {
  if (!window.DTJ_PRICING || typeof window.DTJ_PRICING.priceItem !== "function") {
    throw new Error("Load pricingEngine.js before blacksmith.js");
  }
  const collections = [window.BLACKSMITH.saddles, window.BLACKSMITH.equipment, window.BLACKSMITH.cursed];
  for (const collection of collections) {
    if (!collection) continue;
    for (const section of Object.values(collection)) {
      if (!section || section === window.BLACKSMITH.saddles.teksaddles) continue;
      for (const entry of Object.values(section)) {
        if (!entry || typeof entry !== "object") continue;
        if (entry.materials) {
          entry.tek = window.DTJ_PRICING.priceItem(entry.materials).CC.ideal + (entry.additionalTek || 0);
        } else {
          for (const item of Object.values(entry)) {
            if (item && item.materials) {
              item.tek = window.DTJ_PRICING.priceItem(item.materials).CC.ideal + (item.additionalTek || 0);
            }
          }
        }
      }
    }
  }
})();
