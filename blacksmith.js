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
      A:  "Cementing Paste",
      B:  "Silica Pearls",
      C:  "Crystal",
      D:  "Durability",
      E:  "Electronics",
      F:  "Fiber",
      FW: "Fungal Wood",
      G:  "Green Gems",
      H:  "Hide",
      I:  "Element",
      J:  "Armor",
      K:  "Chitin / Keratin",
      L:  "Sulfur",
      M:  "Metal Ingots",
      N:  "Flint",
      O:  "Obsidian",
      OP: "Organic Polymer",
      P:  "Polymer",
      Q:  "Damage",
      R:  "Red Gems",
      RM: "Raw Metal",
      S:  "Stone",
      T:  "Thatch",
      U:  "Silk",
      V:  "Blue Gems",
      W:  "Wood",
      X:  "Absorbent Substrate",
      Y:  "Clay",
      Z:  "Pelt",
      BP: "Black Pearls",
      GB: "Congealed Gas Ball",
      RE: "Red Element"
    },

  /* =========================
     SADDLES
     ========================= */
  saddles: {
    regular: {
      "Allosaurus":{materials:{F:2394,M:422,H:4507},tek:25},
      "Ankylosaurus":{materials:{F:2158,M:154,H:4008},tek:20},
      "Araneo":{materials:{K:1345,H:3497,F:1883},tek:25},
      "Archelon":{materials:{F:8617,H:12208,M:2872,W:3590},tek:75},
      "Argentavis":{materials:{K:2207,H:5151,F:2722},tek:25},
      "Armadoggo":{materials:{F:3557,M:474,H:2845,P:79},tek:25},
      "Arthropluera":{materials:{A:211,N:112,M:423,W:282,F:705,H:1128,O:493},tek:25},
      "Aurellax":{materials:{F:3213,M:1377,H:2754,P:459},tek:45},

      "Baryonyx":{materials:{F:5190,M:370,H:3336},tek:25},
      "Basilisk":{materials:{A:1170,G:619,M:5852,F:2065,H:3717},tek:135},
      "Basilosaurus":{materials:{F:3532,M:777,H:2825},tek:35},
      "Beelzebufo":{materials:{A:74,H:2520,F:1408,W:444},tek:15},
      "Bison":{materials:{A:1046,H:3836,F:2092,M:697},tek:30},
      "Brontosaurus":{materials:{F:2297,M:496,H:4346},tek:25},

      "Carbonemys":{materials:{A:155,H:2636,F:1473},tek:15},
      "Carcharodontosaurus":{materials:{K:276,H:6913,F:4839,M:2489},tek:65},
      "Carnotaurus":{materials:{F:2274,M:401,H:4281},tek:25},
      "Castoroides":{materials:{A:2109,H:4369,T:2711,F:3013,M:1506},tek:50},
      "Ceratosaurus":{materials:{F:3787,M:280,H:1823},tek:25},
      "Chalicotherium":{materials:{F:2461,M:615,H:3623},tek:30},

      "Companion Ammo Box":{materials:{F:227,M:60,H:37},tek:20},
      "Companion Rucksack":{materials:{F:278,M:9,H:185},tek:20},

      "Daeodon":{materials:{F:1344,M:173,H:2515},tek:20},
      "Deinonychus":{materials:{F:2425,W:746,H:4104},tek:25},
      "Deinosuchus":{materials:{F:2662,M:665,H:5059},tek:30},
      "Deinotherium":{materials:{A:1968,H:1968,W:4594,F:7482,M:262},tek:25},
      "Desmodus":{materials:{F:12939,M:3234,H:18689,W:8626},tek:80},      
      "Diplodocus":{materials:{F:9545,M:3181,H:13522,W:3977},tek:80},
      "Dire Bear":{materials:{A:1291,H:3873,F:1678},tek:25},
      "Doedicurus":{materials:{F:1695,M:77,H:3082,S:231},tek:20},
      "Dunkleosteus":{materials:{A:1749,H:4374,F:2624,M:1166},tek:40},

      "Equus":{materials:{F:2066,S:1033,H:3099,W:1097},tek:15},
      "Fasolasuchus":{materials:{F:2629,M:394,H:1971,W:1314},tek:25},

      "Gacha":{materials:{K:2241,H:5229,F:2764},tek:25},
      "Gallimimus":{materials:{F:2408,M:376,H:3613,W:1806},tek:25},
      "Gasbags":{materials:{K:1885,H:4399,F:2325},tek:25},
      "Gigadesmodus (Primitive)":{materials:{A:160,H:550,B:220,F:600,M:225},tek:25},
      "Giganotosaurus":{materials:{F:4838,M:1659,H:9401},tek:50},
      "Gigantoraptor":{materials:{F:2548,M:875,H:4538,W:1911},tek:35},

      "Helicoprion":{materials:{F:3261,M:978,H:5217},tek:35},
      "Hyaenodon":{materials:{F:2160,M:278,H:4041},tek:25},

      "Ichthyosaurus":{materials:{F:795,H:874,W:318,N:127,RM:159},tek:20},
      "Iguanodon":{materials:{F:669,W:200,H:1071},tek:15},

      "Karkinos":{materials:{V:1202,FW:3005,F:3381,H:2555},tek:20},
      "Lymantria":{materials:{K:1399,H:1915,F:1841},tek:15},

      "Maeguana":{materials:{F:2126,M:375,H:4002},tek:25},
      "Malwyn":{materials:{K:830,H:1038,F:3462,M:2492},tek:65},
      "Mammoth":{materials:{F:1926,M:137,H:3577},tek:20},
      "Managarmr":{materials:{K:2326,H:5429,F:2869},tek:25},
      "Mantis":{materials:{F:1076,M:502,H:1722},tek:30},
      "Megalania":{materials:{F:3407,M:713,H:4992},tek:30},
      "Megaloceros":{materials:{F:1536,M:69,H:2793},tek:20},
      "Megalosaurus":{materials:{F:2507,M:442,H:4720},tek:25},
      "Megatherium":{materials:{A:1568,H:5099,F:2039,M:862},tek:35},
      "Megataptor":{materials:{F:1729,M:432,H:3027},tek:25},
      "Morellaptops":{materials:{F:1074,W:402,H:188},tek:15},
      "Mosasaurus":{materials:{A:1943,H:11105,B:1388,F:8328,M:5552},tek:130},

      "Ossidon":{materials:{F:2687,M:2015,H:5106},tek:60},

      "Pachy":{materials:{F:955,W:294,H:1617},tek:15},
      "Pachyrhinosaurus":{materials:{F:1096,W:342,H:1918},tek:15},
      "Pararacer":{materials:{F:1566,M:142,H:2848},tek:20},
      "Parasaur":{materials:{F:646,W:194,H:1035},tek:15},
      "Pelagornis":{materials:{K:1050,H:3222,F:1751},tek:25},
      "Plesiosaur":{materials:{A:850,H:5231,F:3269,B:523},tek:20},
      "Procoptodon":{materials:{F:3151,M:1103,H:7879,Z:2363},tek:40},
      "Pulmonoscorpius":{materials:{F:1395,W:440,H:2496},tek:15},
      "Pteranodon":{materials:{K:1118,H:3429,F:1863},tek:25},

      "Quetzal":{materials:{A:1261,H:9462,F:6308,B:1072},tek:30},

      "Raptor":{materials:{F:826,W:254,H:1399},tek:15},
      "Ravager":{materials:{F:1908,H:4352,FW:1679},tek:25},
      "Rex":{materials:{F:2967,M:741,H:5637},tek:30},
      "Rhynio":{materials:{C:380,H:1904,P:761,F:2539,M:1904},tek:55},
      "Rock Drake":{materials:{F:3334,M:1852,H:5186,R:1259},tek:55},
      "Rock Golem":{materials:{F:2015,M:470,H:3628},tek:25},
      "Roll Rat":{materials:{A:1168,G:618,M:5842,F:2062,H:3711},tek:135},

      "Sabertooth":{materials:{F:2066,M:266,H:3866},tek:25},
      "Sarco":{materials:{A:284,H:3272,F:1066},tek:15},
      "Snow Owl":{materials:{K:2047,H:4777,F:2525},tek:25},
      "Solwyn":{materials:{C:1902,M:792,F:3567,O:1268},tek:35},
      "Spino":{materials:{K:587,H:4961,F:2611,B:326},tek:25},
      "Stegosaurus":{materials:{F:1498,W:476,H:2723},tek:15},

      "Tapejara":{materials:{F:2438,M:609,H:3521,W:1625},tek:30},
      "Terror Bird":{materials:{F:1013,W:311,H:1714},tek:15},
      "Therizinosaurus":{materials:{F:1970,M:677,H:3510,W:1478},tek:30},
      "Thorny Dragon":{materials:{Y:1199,H:3810,W:1764,F:2116,M:493},tek:25},
      "Thylacoleo":{materials:{F:2045,M:263,H:3826},tek:25},
      "Trike":{materials:{F:1052,W:329,H:1842},tek:15},
      "Tusoteuthis":{materials:{A:701,H:4991,F:12401,M:467},tek:25},

      "Velonasaur":{materials:{K:2290,H:5344,F:2825},tek:25},

      "Woolly Rhino":{materials:{A:1417,H:3543,F:1842,M:850},tek:35},
      "Xiphactinus":{materials:{A:753,H:4371,F:2336,M:226},tek:20},
      "Yi Ling":{materials:{F:508,W:156,H:860},tek:15},
      "Yutyrannus":{materials:{F:5548,M:2140,H:6737,B:1981},tek:60}
    },

    platform: {
      "Brontosaurus Platform":{materials:{A:675,H:8254,B:1876,F:4877,M:1350},tek:45},
      "Dreadnoughtus Platform":{materials:{A:4533,H:18133,B:3777,F:12088,M:9822},tek:215},
      "Gigadesmodus Platform (Primitive)":{materials:{A:225,H:600,B:150,F:525,M:450},tek:30},      
      "Mosasaurus Platform":{materials:{A:2707,H:14438,B:4812,F:10829,M:18048},tek:380},
      "Paraceratherium Platform":{materials:{A:359,H:4597,B:646,F:2873,M:1005},tek:40},
      "Plesiosaur Platform":{materials:{A:431,H:5335,B:1216,F:3177,M:878},tek:35},
      "Quetzal Platform":{materials:{A:1641,H:8483,B:3010,F:5473,M:2462},tek:65},
      "Shastasaurus Platform":{materials:{A:2605,E:1954,B:3256,C:4559,M:19541},tek:410}
    }
  },

  /* =========================
     EQUIPMENT
     ========================= */
  equipment: {

    /* ---------- TIER 1 ---------- */
    tier1: {
      weapons:{
        "AR":{materials:{A:769,P:923,M:538,D:209},tek:25},
        "Compound Bow":{materials:{A:1190,P:1507,M:1348,D:299},tek:45},
        "Cross Bow":{materials:{F:551,W:157,M:110,D:400},tek:15},
        "Fabricated Crossbow":{materials:{A:511,M:877,F:1169,P:2338,D:544},tek:30},
        "Fabricated Pistol":{materials:{A:415,P:485,M:277,D:990},tek:25},
        "Fabricated Sniper":{materials:{A:1322,P:1382,M:961,D:426},tek:35},
        "Flame Thrower":{materials:{A:742,M:519,L:148,E:222,P:1113,D:205},tek:25},
        "Harpoon Launcher":{materials:{A:862,H:359,O:718,W:574,F:862,M:172,P:431,D:297},tek:20},
        "Longneck Rifle":{materials:{H:361,W:289,M:1373,D:398},tek:45},
        "Pump Shotgun":{materials:{A:548,P:670,M:365,D:1328},tek:25},
        "Pistol":{materials:{H:234,W:78,M:939,D:276},tek:35},
        "Riot Shield":{materials:{C:1760,P:1056,M:352,B:1056,D:12939},tek:45},          
        "Sword":{materials:{H:224,W:14,M:746,D:285},tek:30}
      },
      tools:{
        "Chainsaw":{materials:{A:773,M:773,E:386,P:1160,D:600},tek:30},
        "Climbing Pick":{materials:{F:159,G:63,FW:31,M:127,D:222},tek:20},
        "Hatchet":{materials:{H:142,W:14,M:113,D:125},tek:20},
        "Pick":{materials:{H:158,W:15,M:15,D:202},tek:20},
        "Shield":{materials:{A:142,M:570,H:107,D:7735},tek:25},
        "Sickle":{materials:{H:242,W:60,M:272,D:216},tek:15},
        "Pike":{materials:{H:285,W:142,M:142,D:168},tek:20},
        "Whip":{materials:{F:387,U:155,H:155,W:77,D:138},tek:20}
      },
      armor:{
        "Glider Suit":{materials:{V:25,H:60,F:100,M:60,D:1000},tek:15},
      
        "Flak Boots":{materials:{F:57,M:115,H:86,D:429},tek:15},
        "Flak Chest":{materials:{F:63,M:206,H:159,D:433},tek:15},
        "Flak Gloves":{materials:{F:30,M:92,H:77,D:629},tek:15},
        "Flak Helm":{materials:{F:42,M:142,H:99,D:505},tek:15},
        "Flak Legs":{materials:{F:75,M:242,H:181,D:588},tek:15},
      
        "Scuba Flippers":{materials:{A:70,F:58,B:47,K:141,H:141,D:341},tek:20},
        "Scuba Legs":{materials:{F:60,M:30,H:608,P:608,D:187,J:19},tek:20},
        "Scuba Mask":{materials:{C:146,H:220,F:88,B:44,D:234},tek:20},
        "Scuba Tank":{materials:{F:105,M:184,H:263,P:39,D:229},tek:15}
      },
      mek:{
          "MDSM":{materials:{BP:346,I:346,P:2078,C:3233,M:4619,D:5000,J:39},tek:140},
          "MRLM":{materials:{BP:252,I:252,P:1050,C:1681,M:3783,D:5000,Q:193.8},tek:125},
          "MSCM":{materials:{BP:349,I:349,P:2098,C:2332,M:4664,D:5000,Q:171.9},tek:145}
      }
    },

    /* ---------- TIER 2 ---------- */
    tier2: {
      weapons:{
        "AR":{materials:{A:2531,P:3037,M:1771,D:483},tek:50},
        "Compound Bow":{materials:{A:4218,P:5343,M:4781,D:716},tek:110},
        "Cross Bow":{materials:{F:3287,W:939,M:657,D:1286},tek:30},
        "Fabricated Crossbow":{materials:{A:1882,M:3227,F:4302,P:8605,D:2765},tek:185},        
        "Fabricated Pistol":{materials:{A:1841,P:2147,M:1227,D:2765},tek:180},
        "Fabricated Sniper":{materials:{A:9910,P:10360,M:7207,D:1208},tek:160},
        "Flame Thrower":{materials:{A:4050,M:2835,L:810,E:1215,P:6075,D:514},tek:70},
        "Goo Gun":{materials:{A:1927,E:1927,P:5139,C:2569,M:9637,D:765},tek:210},
        "Harpoon Launcher":{materials:{A:4401,H:1833,O:3667,W:2934,F:4401,M:8802,P:2200,D:1276},tek:195},
        "Longneck Rifle":{materials:{H:1124,W:899,M:4273,D:932},tek:105},
        "Pump Shotgun":{materials:{A:2897,P:3540,M:1931,D:3360},tek:55},
        "Riot Shield":{materials:{C:9695,P:5817,M:1939,B:5817,D:25958},tek:70},        
        "Shotgun":{materials:{H:1766,W:1412,M:5651,D:4060},tek:130},
        "Pistol":{materials:{H:667,W:222,M:2668,D:439},tek:70},
        "Sling Shot":{materials:{F:1344,W:336,H:67,D:436},tek:15},
        "Sword":{materials:{H:1268,W:84,M:4229,D:751},tek:100},
        "Torch":{materials:{N:62,W:62,S:62,D:694},tek:20},
        "Wooden Club":{materials:{F:961,W:256,D:752},tek:20}
      },      
      tools:{
        "Chainsaw":{materials:{A:3823,M:3823,E:1911,P:5734,D:1025},tek:90},
        "Climbing Pick":{materials:{F:812,G:325,FW:162,M:650,D:813},tek:30},
        "Hatchet":{materials:{H:787,W:78,M:630,D:525},tek:30},
        "Pick":{materials:{H:699,W:69,M:69,D:472},tek:25},
        "Shield":{materials:{A:1286,M:5147,H:965,D:19576},tek:120},
        "Sickle":{materials:{H:948,W:237,M:1066,D:480},tek:35},
        "Pike":{materials:{H:1914,W:957,M:957,D:521},tek:35},
        "Whip":{materials:{F:2215,U:886,H:886,W:443,D:551},tek:25}
      },      
      armor:{
        "Gas Mask":{materials:{X:134,P:1347,C:673,D:473},tek:30},
        
        "Flak Boots":{materials:{F:451,M:703,H:527,D:1425},tek:30},
        "Flak Chest":{materials:{F:368,M:1192,H:921,D:1804},tek:40},
        "Flak Gloves":{materials:{F:164,M:493,H:411,D:1730},tek:25},
        "Flak Helm":{materials:{F:165,M:551,H:386,D:1474},tek:30},
        "Flak Legs":{materials:{F:400,M:1280,H:960,D:2006},tek:40},
        
        "Ghillie Boots":{materials:{F:266,OP:266,H:399,D:578},tek:20},
        "Ghillie Chest":{materials:{F:294,OP:441,H:736,D:565},tek:20},
        "Ghillie Gloves":{materials:{F:107,OP:160,H:267,D:520},tek:20},
        "Ghillie Helm":{materials:{F:189,OP:315,H:441,D:373},tek:20},
        "Ghillie Legs":{materials:{F:257,OP:412,H:619,D:439},tek:20},
        
        "Hazmat Boots":{materials:{V:422,C:844,H:1689,GB:1267,F:2111,P:864,D:1007},tek:25},
        "Hazmat Chest":{materials:{V:1337,C:2674,H:2406,GB:2406,F:3476,P:1337,D:720},tek:25},
        "Hazmat Gloves":{materials:{V:636,C:1273,H:1193,GB:1193,F:2785,P:159,D:1077},tek:25},
        "Hazmat Helm":{materials:{V:1713,C:3427,H:2056,GB:1370,F:3084,P:1370,D:1041},tek:25},
        "Hazmat Legs":{materials:{V:913,C:1827,H:2055,GB:1370,F:2969,P:685,D:929},tek:25},
        
        "Fur Boots":{materials:{F:399,M:799,H:599,Z:4797,D:2045},tek:65},
        "Fur Helm":{materials:{F:168,M:560,H:392,Z:3140,D:1935},tek:60},
        "Fur Chest":{materials:{F:172,M:561,H:431,Z:3454,D:1298},tek:60},
        "Fur Gloves":{materials:{F:113,M:339,H:283,Z:2264,D:1609},tek:55},
        "Fur Legs":{materials:{F:186,M:597,H:447,Z:3582,D:1290},tek:60},
        
        "Desert Boots":{materials:{F:220,U:441,H:539,D:433},tek:25},
        "Desert Chest":{materials:{F:713,U:1070,H:1783,D:537},tek:25},
        "Desert Gloves":{materials:{F:272,U:544,H:681,D:515},tek:25},
        "Desert Helm":{materials:{C:692,H:692,U:207,F:415,B:207,D:537},tek:25},
        "Desert Legs":{materials:{F:655,U:982,H:1647,D:432},tek:25},
        
        "Arctic Boots":{materials:{F:255,M:170,H:383,Z:2045,D:662},tek:50},
        "Arctic Chest":{materials:{F:323,M:323,H:646,Z:3232,D:737},tek:55},
        "Arctic Gloves":{materials:{F:143,M:71,H:287,Z:1437,D:1060},tek:50},
        "Arctic Helm":{materials:{F:259,M:173,H:432,Z:2423,D:964},tek:50},
        "Arctic Legs":{materials:{F:502,M:401,H:893,Z:4820,D:1124},tek:60},
        
        "Scuba Flippers":{materials:{A:666,F:555,B:444,K:1333,H:1333,D:636},tek:25},
        "Scuba Legs":{materials:{F:266,M:133,H:2661,P:2661,D:665},tek:25},
        "Scuba Mask":{materials:{C:488,H:732,F:293,B:146,D:526},tek:25},
        "Scuba Tank":{materials:{F:329,M:576,H:822,P:123,D:474},tek:30}
        },
   
    }
  },
      /* =========================
       CURSED ==================== */
  cursed: {
        /* ---------- TIER 1 ---------- */
    tier1: {
      /* weapons: {},
      tools: {},
      armor: {} */
    },
    /* ---------- TIER 2 ---------- */
    tier2: {
      weapons: {
        "Compound Bow":{materials:{F:1213,RE:34,M:242,W:346,D:652},tek:60},
        "Sword":{materials:{H:571,RE:38,M:1903,W:38,D:363,},tek:60}
      },/* 
      tools: {},
      armor: {} */
    }
  } 
};
