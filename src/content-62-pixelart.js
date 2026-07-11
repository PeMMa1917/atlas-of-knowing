/* ---- content-62-pixelart.js ---- */
/* ═══════════════════════════════════════════════════════════════════════
   THE ATLAS OF KNOWING · PIXEL RELIQUARY (content-62)
   v37.1. Load after content-61 (relic data), before content-63.

   Every one of the 522 objects gets a unique pixel sprite, generated
   deterministically from its id: a category template chosen from the
   object's icon and name, a palette keyed to its concept, an accent
   keyed to its rarity, and seeded per-pixel variation. Same save, same
   sprite, forever; no two objects render alike. No image files, no
   network, no copyright questions.

   API (window.TOKEngine.V37_PX):
     canvasFor(id, scale)  -> <canvas> (cached per id+scale)
     dataFor(id, scale)    -> dataURL string
     imgHtml(id, scale, cls) -> '<img ...>' snippet, esc-safe
     cardCanvas(kind, seed, scale) / cardHtml -> claim, fact, dispute,
       and material sprites for the Assembly Bench
     templateOf(id)        -> template key (the Bench reads material types)
     MATERIAL_OF           -> template key -> raw material name

   The pack also paints a small splash card when a relic is acquired,
   so students meet the pixel form of the object the moment they find it.
   No em dashes in authored strings.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.TOKEngine;
  if (!E || !E.RELIQUARY) { try { console.warn("[px] reliquary missing"); } catch (e) {} return; }
  var R = E.RELIQUARY;

  function hashN(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; } return h; }
  function rnger(seed) { var s = seed >>> 0; return function () { s = (s * 1103515245 + 12345) >>> 0; return s; }; }

  /* ── 16x16 templates. Chars: . transparent, 1 outline, 2 primary,
     3 secondary, 4 accent, 5 highlight, 6 shadow ── */
  var T = {};
  T.book = [
    "................",
    "..111111111111..",
    ".12222222322221.",
    ".12222222322221.",
    ".12555222322221.",
    ".12555222322221.",
    ".12222222322221.",
    ".12222222322221.",
    ".12222222322221.",
    ".12444222322221.",
    ".12222222322221.",
    ".12222222322221.",
    ".12222222322221.",
    ".16666666366661.",
    "..111111111111..",
    "................"];
  T.scroll = [
    "................",
    "...1111111111...",
    "..135222222531..",
    "..132222222231..",
    "...1222222221...",
    "...1224442221...",
    "...1222222221...",
    "...1222222221...",
    "...1224442221...",
    "...1222222221...",
    "...1222222221...",
    "...1224442221...",
    "..132222222231..",
    "..136222222631..",
    "...1111111111...",
    "................"];
  T.map = [
    "................",
    ".11111111111111.",
    ".12222332222221.",
    ".12223333222221.",
    ".12222332222421.",
    ".12222222224441.",
    ".12522222222421.",
    ".12552222222221.",
    ".12225522222221.",
    ".12222552222221.",
    ".12222255222331.",
    ".12222225522331.",
    ".12222222222221.",
    ".16666666666661.",
    ".11111111111111.",
    "................"];
  T.tablet = [
    "................",
    "....11111111....",
    "...1222222221...",
    "..122222222221..",
    "..122444442221..",
    "..122222222221..",
    "..122444442221..",
    "..122222222221..",
    "..122444442221..",
    "..122222222221..",
    "..122444422221..",
    "..122222222221..",
    "..126666666621..",
    "...1666666661...",
    "....11111111....",
    "................"];
  T.letter = [
    "................",
    "................",
    "..111111111111..",
    ".12222222222221.",
    ".12122222222121.",
    ".12212222221221.",
    ".12221222212221.",
    ".12222122122221.",
    ".12222211222221.",
    ".12222222222221.",
    ".12244444442221.",
    ".12222222222221.",
    ".16666666666661.",
    "..111111111111..",
    "................",
    "................"];
  T.telescope = [
    "................",
    "..........111...",
    ".........15551..",
    "........1555541.",
    ".......12222441.",
    "......12222241..",
    ".....12222241...",
    "....12222221....",
    "...12222221.....",
    "...1222221......",
    "..1312221.......",
    "..1331121.......",
    "..133311........",
    ".1333331........",
    ".1111111........",
    "................"];
  T.scale = [
    "................",
    ".......11.......",
    ".......11.......",
    "..1111111111111.",
    ".1.....11.....1.",
    ".1.....11.....1.",
    "13.3...11...3.31",
    "13333..11..33331",
    ".133..111...331.",
    "..1...111....1..",
    "......111.......",
    ".....11111......",
    "....1222221.....",
    "...122222221....",
    "...166666661....",
    "................"];
  T.flask = [
    "................",
    "......1111......",
    "......1221......",
    "......1221......",
    "......1221......",
    ".....122221.....",
    "....12222221....",
    "...1222222221...",
    "..122233332221..",
    "..123333333321..",
    ".12333333333321.",
    ".12333344333321.",
    ".12333333333321.",
    "..133333333331..",
    "...1111111111...",
    "................"];
  T.machine = [
    "................",
    ".11111111111111.",
    ".12222222222221.",
    ".12444244424441.",
    ".12222222222221.",
    ".12333333333321.",
    ".12355555555321.",
    ".12355555555321.",
    ".12333333333321.",
    ".12222222222221.",
    ".12442244224421.",
    ".12442244224421.",
    ".12222222222221.",
    ".16161616161611.",
    ".11111111111111.",
    "................"];
  T.radio = [
    "................",
    "......1.........",
    ".....1.1....1...",
    "....1...1..1....",
    ".11111111111111.",
    ".12222222222221.",
    ".12333333322221.",
    ".12355555322441.",
    ".12355555322221.",
    ".12333333322441.",
    ".12222222222221.",
    ".12444444222221.",
    ".12222222222221.",
    ".16666666666661.",
    ".11111111111111.",
    "................"];
  T.coin = [
    "................",
    ".....111111.....",
    "....15555551....",
    "...1552222551...",
    "..155222222551..",
    "..152224422251..",
    ".15522444422551.",
    ".15224444442251.",
    ".15224444442251.",
    ".15522444422551.",
    "..152224422251..",
    "..155222222551..",
    "...1552222551...",
    "....15555551....",
    ".....111111.....",
    "................"];
  T.chart = [
    "................",
    ".11111111111111.",
    ".12222222222221.",
    ".12222222244221.",
    ".12222222244221.",
    ".12222244244221.",
    ".12222244244221.",
    ".12233244244221.",
    ".12233244244221.",
    ".12233244244221.",
    ".12533244244221.",
    ".12533244244221.",
    ".12222222222221.",
    ".16666666666661.",
    ".11111111111111.",
    "................"];
  T.gameboard = [
    "................",
    ".11111111111111.",
    ".12323232323231.",
    ".13232323232321.",
    ".12323232323231.",
    ".13232323232321.",
    ".12323232323231.",
    ".13232453232321.",
    ".12323542323231.",
    ".13232323232321.",
    ".12323232323231.",
    ".13232323232321.",
    ".12323232323231.",
    ".16161616161661.",
    ".11111111111111.",
    "................"];
  T.ball = [
    "................",
    ".....111111.....",
    "....12222251....",
    "...1222225551...",
    "..122222255551..",
    "..122222225551..",
    ".12224442225551.",
    ".12244444222251.",
    ".12244444222221.",
    ".12224442222221.",
    "..122222222221..",
    "..162222222261..",
    "...1662222661...",
    "....16666661....",
    ".....111111.....",
    "................"];
  T.textile = [
    "................",
    ".11111111111111.",
    ".13232323232321.",
    ".12323232323231.",
    ".14444444444441.",
    ".12323232323231.",
    ".13232323232321.",
    ".12323232323231.",
    ".14444444444441.",
    ".13232323232321.",
    ".12323232323231.",
    ".13232323232321.",
    ".14444444444441.",
    ".12323232323231.",
    ".11111111111111.",
    "................"];
  T.mask = [
    "................",
    ".....111111.....",
    "....12222221....",
    "...1222222221...",
    "..122222222221..",
    "..124422224421..",
    "..121122211221..",
    "..122222222221..",
    "..122244422221..",
    "..122222222221..",
    "...1222112221...",
    "...1221221221...",
    "....12222221....",
    ".....122221.....",
    "......1111......",
    "................"];
  T.statue = [
    "................",
    "......1111......",
    ".....122221.....",
    ".....122221.....",
    "......1221......",
    ".....122221.....",
    "....12222221....",
    "...1222222221...",
    "...1222222221...",
    "....12222221....",
    "....12222221....",
    "...1222222221...",
    "..122222222221..",
    ".16666666666661.",
    ".11111111111111.",
    "................"];
  T.painting = [
    "................",
    ".44444444444444.",
    ".41111111111114.",
    ".41222222222214.",
    ".41222355322214.",
    ".41223555532214.",
    ".41222355322214.",
    ".41222222222214.",
    ".41332222233214.",
    ".41333223333214.",
    ".41333333333214.",
    ".41222222222214.",
    ".41111111111114.",
    ".44444444444444.",
    "................",
    "................"];
  T.pot = [
    "................",
    ".....111111.....",
    "....12222221....",
    ".....122221.....",
    "....12222221....",
    "...1222222221...",
    "..122222222221..",
    ".12222444222221.",
    ".12224444222221.",
    ".12222444222221.",
    ".12222222222221.",
    "..122222222221..",
    "...1222222221...",
    "....16666661....",
    ".....111111.....",
    "................"];
  T.bell = [
    "................",
    ".......11.......",
    "......1441......",
    "......1221......",
    ".....122221.....",
    "....12222221....",
    "....12222221....",
    "...1222222221...",
    "...1222222221...",
    "..122222222221..",
    "..122222222221..",
    ".11111111111111.",
    "....16666661....",
    "......1661......",
    ".......11.......",
    "................"];
  T.tool = [
    "................",
    "......1111......",
    ".....144441.....",
    ".....144441.....",
    "......1441......",
    "......1221......",
    "......1221......",
    "......1221......",
    "......1221......",
    "......1221......",
    "......1221......",
    "......1221......",
    ".....122221.....",
    ".....166661.....",
    "......1111......",
    "................"];
  T.plant = [
    "................",
    ".......11.......",
    "......1331......",
    ".....133331.....",
    "..11.13331.11...",
    ".1331.131.1331..",
    ".13331.1.13331..",
    "..1331111331....",
    "....132231......",
    ".....1221.......",
    ".....1221.......",
    "....122221......",
    "...12222221.....",
    "...16666661.....",
    "....111111......",
    "................"];
  T.bone = [
    "................",
    "..11............",
    ".15511..........",
    ".15551..........",
    "..15551.........",
    "...15551........",
    "....12251.......",
    ".....12251......",
    "......12251.....",
    ".......12251....",
    "........12251...",
    ".........15551..",
    "..........15551.",
    "...........1551.",
    "............11..",
    "................"];
  T.amulet = [
    "................",
    ".......11.......",
    "......1221......",
    ".....121121.....",
    ".....1221.......",
    "....122221......",
    "...12222221.....",
    "..1222444221....",
    "..1224444421....",
    "..1224444421....",
    "..1222444221....",
    "...12222221.....",
    "....122221......",
    ".....1221.......",
    "......11........",
    "................"];
  T.key = [
    "................",
    "....11111.......",
    "...1555551......",
    "..155222551.....",
    "..152222251.....",
    "..152222251.....",
    "..155222551.....",
    "...1555551......",
    "....11221.......",
    "......1221......",
    "......12241.....",
    "......12441.....",
    "......1221......",
    "......12441.....",
    ".......1141.....",
    "................"];
  T.boat = [
    "................",
    ".......11.......",
    ".......121......",
    ".......1221.....",
    ".......12221....",
    ".......122221...",
    ".......1222221..",
    ".......121111...",
    ".......11.......",
    ".11111111111111.",
    ".12222222222221.",
    "..122222222221..",
    "...1222222221...",
    "....16666661....",
    ".....111111.....",
    "................"];
  T.building = [
    "................",
    ".......11.......",
    "......1441......",
    ".....122221.....",
    "....12222221....",
    "...1222222221...",
    "..122222222221..",
    ".11111111111111.",
    ".12212221222121.",
    ".12212221222121.",
    ".12222222222221.",
    ".12212221222121.",
    ".12212221222121.",
    ".16666666666661.",
    ".11111111111111.",
    "................"];
  T.food = [
    "................",
    "................",
    "....11111111....",
    "...1322222231...",
    "..132222222231..",
    "..123333333321..",
    ".12244444442221.",
    ".12444444444221.",
    ".12444554444221.",
    ".12244455442221.",
    "..122444442221..",
    "..112222222211..",
    ".16666666666661.",
    "..111111111111..",
    "................",
    "................"];
  T.drum = [
    "................",
    "................",
    "...1111111111...",
    "..155555555551..",
    ".15522222222551.",
    ".12222222222221.",
    ".13122222222131.",
    ".12312222221321.",
    ".12213222213221.",
    ".12221322132221.",
    ".12222131312221.",
    ".12222213122221.",
    ".12222131312221.",
    "..166666666661..",
    "...1111111111...",
    "................"];
  T.pen = [
    "................",
    "...........11...",
    "..........1441..",
    ".........14441..",
    "........14441...",
    ".......12241....",
    "......12221.....",
    ".....12221......",
    "....12221.......",
    "...12221........",
    "..12221.........",
    ".13221..........",
    ".1331...........",
    ".11.............",
    "................",
    "................"];
  T.camera = [
    "................",
    "................",
    ".....1111.......",
    ".11111221111111.",
    ".12222222222221.",
    ".12222111222241.",
    ".12221555122221.",
    ".12215222512221.",
    ".12215222512221.",
    ".12221555122221.",
    ".12222111222221.",
    ".12222222222221.",
    ".11111111111111.",
    "................",
    "................",
    "................"];
  T.globe = [
    "................",
    ".....111111.....",
    "....13322331....",
    "...1332223331...",
    "..122332233221..",
    "..123322332221..",
    ".12233223322321.",
    ".12332233222331.",
    ".12232233223321.",
    ".12223322332221.",
    "..122233223321..",
    "..123222332231..",
    "...1322233321...",
    "....13322331....",
    ".....111111.....",
    "................"];
  T.banner = [
    "................",
    ".11..........11.",
    ".12111111111121.",
    ".12222222222221.",
    ".12244444442221.",
    ".12222222222221.",
    ".12222444222221.",
    ".12222222222221.",
    ".12222222222221.",
    ".1221222212221..",
    ".1221122112211..",
    ".122.1221.221...",
    ".12...12...21...",
    ".11...11...11...",
    "................",
    "................"];
  T.card = [
    "................",
    "...1111111111...",
    "..122222222221..",
    "..125555555521..",
    "..122222222221..",
    "..124444444421..",
    "..124444444421..",
    "..122222222221..",
    "..124444442221..",
    "..124444442221..",
    "..122222222221..",
    "..124442222221..",
    "..122222222221..",
    "..166666666661..",
    "...1111111111...",
    "................"];
  T.gem = [
    "................",
    "................",
    "....11111111....",
    "...1555522221...",
    "..155552222221..",
    ".15555222222221.",
    ".12222222222221.",
    "..122222222221..",
    "...1222222221...",
    "....12222221....",
    ".....122221.....",
    "......1221......",
    ".......11.......",
    "................",
    "................",
    "................"];
  T.chest = [
    "................",
    "...1111111111...",
    "..122222222221..",
    ".12222222222221.",
    ".12222222222221.",
    ".11111111111111.",
    ".13333313333331.",
    ".13333141333331.",
    ".13333144133331.",
    ".13333141333331.",
    ".13333313333331.",
    ".13333333333331.",
    ".16666666666661.",
    ".11111111111111.",
    "................",
    "................"];

  /* material name per template: the Bench reads this for dissection */
  var MATERIAL_OF = {
    book: "Paper", scroll: "Paper", letter: "Paper", map: "Paper", chart: "Paper", pen: "Ink",
    tablet: "Stone", statue: "Stone", building: "Stone", bone: "Bone",
    telescope: "Brass", scale: "Brass", machine: "Silicon", radio: "Silicon", camera: "Glass", flask: "Glass",
    coin: "Silver", amulet: "Silver", key: "Brass", gem: "Glass",
    textile: "Cloth", banner: "Cloth", mask: "Wood", tool: "Wood", boat: "Wood", drum: "Wood", gameboard: "Wood",
    painting: "Pigment", pot: "Clay", food: "Clay", bell: "Bronze", globe: "Paper", plant: "Seed", ball: "Cloth", card: "Paper", chest: "Wood"
  };

  /* emoji and name keywords pick the template */
  var EMOJI_T = {
    "📖": "book", "📕": "book", "📚": "book", "📔": "book", "📓": "book", "📒": "book", "📗": "book", "📘": "book", "📙": "book",
    "📜": "scroll", "📃": "scroll", "📄": "letter", "✉️": "letter", "💌": "letter", "📰": "letter", "🗞️": "letter", "📇": "card", "🎫": "card", "🃏": "card", "🧾": "letter",
    "🗺️": "map", "🧭": "globe", "🌍": "globe", "🌎": "globe", "🌏": "globe", "🗿": "statue",
    "🔭": "telescope", "🔬": "telescope", "📡": "radio", "📻": "radio", "🎥": "camera", "📷": "camera", "📸": "camera", "🎞️": "camera",
    "⚖️": "scale", "📏": "tool", "📐": "tool", "🧮": "gameboard", "⌛": "flask", "⏳": "flask", "🕰️": "machine", "⏰": "machine", "⌚": "machine",
    "🧪": "flask", "⚗️": "flask", "🧫": "flask", "🧬": "flask", "💉": "flask", "💊": "flask", "🌡️": "flask",
    "💻": "machine", "🖥️": "machine", "🕹️": "machine", "📱": "machine", "☎️": "radio", "📞": "radio", "🤖": "machine", "⚙️": "machine", "🔌": "machine", "💾": "machine", "💿": "coin", "📀": "coin",
    "🪙": "coin", "💰": "coin", "💵": "coin", "💴": "coin", "💶": "coin", "💷": "coin", "🏦": "building",
    "📊": "chart", "📈": "chart", "📉": "chart", "🗳️": "chest", "📦": "chest", "🗃️": "chest", "🗄️": "chest",
    "🎲": "gameboard", "♟️": "gameboard", "🎮": "machine", "🧩": "gameboard", "🀄": "gameboard",
    "⚽": "ball", "🏀": "ball", "🏈": "ball", "⚾": "ball", "🎾": "ball", "🏏": "tool", "🏆": "amulet", "🥇": "coin", "🥈": "coin", "🥉": "coin", "🎽": "textile",
    "🧵": "textile", "🧶": "textile", "👘": "textile", "🥻": "textile", "🧣": "textile", "👗": "textile", "🎗️": "textile", "🏳️": "banner", "🏴": "banner", "🚩": "banner", "🎌": "banner",
    "🎭": "mask", "👺": "mask", "👹": "mask", "🗽": "statue", "🖼️": "painting", "🎨": "painting", "🖌️": "pen", "🖋️": "pen", "✒️": "pen", "✏️": "pen", "🖊️": "pen", "🪶": "pen",
    "🏺": "pot", "⚱️": "pot", "🫖": "pot", "🍵": "food", "🥣": "food", "🍲": "food", "🍚": "food", "🥘": "food", "🌽": "plant", "🌾": "plant", "🌿": "plant", "🍃": "plant", "🌱": "plant", "🍇": "plant", "🥔": "plant", "🌰": "plant",
    "🔔": "bell", "🛎️": "bell", "📯": "drum", "🥁": "drum", "🪘": "drum", "🎻": "drum", "🎸": "drum", "🎺": "drum", "🎷": "drum", "🪕": "drum", "🎹": "gameboard", "🎼": "letter", "🎶": "letter",
    "🔨": "tool", "🪓": "tool", "⛏️": "tool", "🛠️": "tool", "🗡️": "tool", "⚔️": "tool", "🏹": "tool", "🪃": "tool", "🔧": "tool", "🪚": "tool", "🧰": "chest",
    "🦴": "bone", "🦷": "bone", "🐚": "amulet", "🪨": "tablet", "💎": "gem", "🔮": "gem", "📿": "amulet", "🧿": "amulet", "💍": "amulet", "👑": "amulet",
    "🗝️": "key", "🔑": "key", "🔒": "chest", "🔐": "chest",
    "⛵": "boat", "🛶": "boat", "🚢": "boat", "🛰️": "radio", "🚀": "tool", "✈️": "boat", "🛩️": "boat",
    "🏛️": "building", "🕌": "building", "⛩️": "building", "🏰": "building", "🗼": "building", "⛪": "building", "🕍": "building", "🛕": "building", "🏯": "building", "🧱": "tablet",
    "🔍": "gem", "🔎": "gem", "🕯️": "bell", "💡": "bell", "🏮": "bell", "🪔": "bell"
  };
  var NAME_T = [
    [/map|chart of|atlas|portolan|cartogr/i, "map"], [/book|bible|qur|manuscript|folio|edition|codex|notebook|diary|dictionar|encyclop/i, "book"],
    [/scroll|papyrus|parchment/i, "scroll"], [/letter|telegram|memo|newspaper|gazette|poster|pamphlet|leaflet|ballot|certificate|passport|card|license/i, "letter"],
    [/tablet|stele|inscription|stone|obelisk|rune/i, "tablet"], [/telescope|microscope|sextant|astrolabe|quadrant|lens|observ/i, "telescope"],
    [/scale|balance|weight|meter|gauge|thermometer|barometer/i, "scale"], [/flask|vial|beaker|vaccine|serum|pill|bottle|jar/i, "flask"],
    [/computer|engine|machine|chip|circuit|processor|calculator|difference|enigma|server/i, "machine"], [/radio|telegraph|antenna|satellite|phone|transmitter/i, "radio"],
    [/coin|currency|dollar|peso|franc|yen|banknote|money|cowrie|medal|record\b/i, "coin"], [/graph|diagram|census|table|spreadsheet|ledger|tally|statistic/i, "chart"],
    [/chess|game|dice|board|domino|senet|go\b|mahjong|puzzle/i, "gameboard"], [/ball|football|cricket|bat\b|racket|jersey|marathon|olympic/i, "ball"],
    [/cloth|kente|textile|quilt|tapestry|weav|silk|sari|kimono|hanbok|robe|dress|garment|flag|banner/i, "textile"],
    [/mask/i, "mask"], [/statue|bust|figurine|sculpture|bronze of|moai|venus/i, "statue"], [/painting|portrait|fresco|mural|canvas|print of|woodblock|icon\b/i, "painting"],
    [/pot|vase|amphora|urn|bowl|ceramic|porcelain|teapot|chawan/i, "pot"], [/bell|gong|chime/i, "bell"],
    [/hammer|axe|adze|chisel|plow|loom|tool|spear|sword|arrow|knife/i, "tool"], [/seed|grain|maize|rice|wheat|herb|plant|tea\b|coffee|spice|pepper/i, "plant"],
    [/bone|fossil|skull|skeleton|tooth|shell/i, "bone"], [/amulet|talisman|rosary|beads|pendant|ring\b|crown|necklace|charm/i, "amulet"],
    [/key\b/i, "key"], [/canoe|ship|boat|raft|vessel|outrigger/i, "boat"], [/temple|mosque|cathedral|pagoda|monument|arch|gate|tower|wall\b/i, "building"],
    [/recipe|dish|kimchi|bread|cheese|meal|food|curry|soup/i, "food"], [/drum|kora|flute|violin|guitar|harp|instrument|gramophone|cylinder/i, "drum"],
    [/pen\b|quill|brush|stylus|ink/i, "pen"], [/camera|photograph|film|reel|daguerre/i, "camera"], [/globe/i, "globe"]
  ];
  function templateOf(id) {
    var o = R.byId[id];
    if (!o) return "chest";
    if (o._tpl) return o._tpl;
    var t = EMOJI_T[o.icon];
    if (!t) { for (var i = 0; i < NAME_T.length; i++) if (NAME_T[i][0].test(o.name)) { t = NAME_T[i][1]; break; } }
    if (!t) t = { r61: "book", r62: "flask", r63: "painting", r64: "chart", r65: "amulet", r66: "banner", v37: "gem" }[o.id.slice(0, 3)] || "chest";
    o._tpl = t;
    return t;
  }

  /* ── palettes: concept hue, region shade, rarity accent ── */
  var HUE = { Evidence: 205, Certainty: 30, Truth: 48, Interpretation: 285, Power: 350, Justification: 20,
    Explanation: 180, Objectivity: 210, Perspective: 260, Culture: 12, Values: 320, Responsibility: 145 };
  var RAR_ACCENT = { legendary: [46, 90, 62], epic: [268, 55, 66], rare: [210, 55, 64], common: [90, 8, 62] };
  function hsl(h, s, l) {
    s /= 100; l /= 100;
    var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; } else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; } else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
  }
  function paletteFor(o, seed) {
    var nx = rnger(seed);
    var hue = ((HUE[o.tags.c] || 200) + (nx() % 25) - 12 + 360) % 360;
    var shade = 30 + (hashN(o.region) % 14);
    var ra = RAR_ACCENT[o.rarity] || RAR_ACCENT.common;
    return {
      "1": [24, 20, 30],
      "2": hsl(hue, 42 + nx() % 18, shade + 18),
      "3": hsl((hue + 25 + nx() % 40) % 360, 38, shade + 8),
      "4": hsl(ra[0], ra[1], ra[2]),
      "5": hsl(hue, 30, Math.min(86, shade + 42)),
      "6": hsl(hue, 34, Math.max(14, shade - 6))
    };
  }

  /* ── render + cache ── */
  var cache = {};
  function paint(rows, pal, seed, flip, scatter) {
    var cv = document.createElement("canvas");
    cv.width = 16; cv.height = 16;
    var cx = cv.getContext("2d");
    if (!cx) return cv;
    var img = cx.createImageData(16, 16), d = img.data;
    var nx = rnger(seed ^ 0x9e3779b9);
    var scatterCells = {};
    for (var s = 0; s < scatter; s++) scatterCells[(nx() % 16) + "," + (nx() % 16)] = true;
    for (var y = 0; y < 16; y++) {
      var row = rows[y] || "................";
      for (var x = 0; x < 16; x++) {
        var ch = row[flip ? 15 - x : x];
        if (!ch || ch === ".") continue;
        var col = pal[ch];
        if (!col) continue;
        if (ch === "2" && scatterCells[x + "," + y]) col = pal["4"];
        if (ch === "3" && scatterCells[x + "," + y]) col = pal["5"];
        var i = (y * 16 + x) * 4;
        d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = 255;
      }
    }
    cx.putImageData(img, 0, 0);
    return cv;
  }
  function scaled(base, scale) {
    var cv = document.createElement("canvas");
    cv.width = 16 * scale; cv.height = 16 * scale;
    var cx = cv.getContext("2d");
    if (cx) { cx.imageSmoothingEnabled = false; cx.drawImage(base, 0, 0, cv.width, cv.height); }
    return cv;
  }
  function canvasFor(id, scale) {
    scale = scale || 3;
    var k = id + "@" + scale;
    if (cache[k]) return cache[k];
    var o = R.byId[id];
    var seed = hashN(id);
    var rows = T[templateOf(id)] || T.chest;
    var pal = paletteFor(o || { tags: { c: "Evidence" }, region: "hall", rarity: "common" }, seed);
    var cv = scaled(paint(rows, pal, seed, (seed >>> 4) % 2 === 1, 3 + (seed % 4)), scale);
    cache[k] = cv;
    return cv;
  }
  function dataFor(id, scale) {
    try { return canvasFor(id, scale).toDataURL(); } catch (e) { return ""; }
  }
  function imgHtml(id, scale, cls) {
    var u = dataFor(id, scale || 3);
    var o = R.byId[id];
    if (!u) return o ? E.esc(o.icon || "◈") : "◈";
    return '<img src="' + u + '" alt="' + E.esc(o ? o.name : id) + '" style="image-rendering:pixelated;vertical-align:middle;width:' + (16 * (scale || 3)) + 'px;height:' + (16 * (scale || 3)) + 'px" class="' + (cls || "") + '">';
  }

  /* card sprites for the Bench: claims, facts, disputes, materials */
  var CARD_PAL = {
    claim: { "1": [24, 20, 30], "2": [222, 214, 190], "3": [200, 190, 160], "4": [111, 168, 220], "5": [244, 240, 228], "6": [150, 140, 118] },
    fact: { "1": [24, 20, 30], "2": [222, 214, 190], "3": [200, 190, 160], "4": [232, 181, 74], "5": [244, 240, 228], "6": [150, 140, 118] },
    dispute: { "1": [24, 20, 30], "2": [222, 200, 200], "3": [205, 170, 170], "4": [201, 111, 111], "5": [244, 232, 232], "6": [150, 120, 118] }
  };
  var MAT_HUE = { Paper: 45, Ink: 240, Stone: 220, Bone: 55, Brass: 40, Silicon: 200, Glass: 190, Silver: 210, Cloth: 0, Wood: 28, Pigment: 300, Clay: 18, Bronze: 30, Seed: 100 };
  function cardCanvas(kind, seed, scale) {
    scale = scale || 3;
    var k = "card:" + kind + ":" + seed + "@" + scale;
    if (cache[k]) return cache[k];
    var rows, pal;
    if (CARD_PAL[kind]) { rows = T.card; pal = CARD_PAL[kind]; }
    else {
      rows = T.gem;
      var hue = MAT_HUE[kind] != null ? MAT_HUE[kind] : 90;
      pal = { "1": [24, 20, 30], "2": hsl(hue, 35, 52), "3": hsl(hue, 30, 40), "4": hsl(hue, 45, 66), "5": hsl(hue, 28, 78), "6": hsl(hue, 32, 30) };
    }
    var cv = scaled(paint(rows, pal, hashN(kind + String(seed)), false, 2), scale);
    cache[k] = cv;
    return cv;
  }
  function cardHtml(kind, seed, scale) {
    try {
      return '<img src="' + cardCanvas(kind, seed, scale).toDataURL() + '" alt="' + E.esc(kind) + '" style="image-rendering:pixelated;vertical-align:middle;width:' + (16 * (scale || 3)) + 'px;height:' + (16 * (scale || 3)) + 'px">';
    } catch (e) { return E.esc(kind); }
  }

  E.V37_PX = { canvasFor: canvasFor, dataFor: dataFor, imgHtml: imgHtml, cardCanvas: cardCanvas, cardHtml: cardHtml, templateOf: templateOf, MATERIAL_OF: MATERIAL_OF, T: T };

  /* ── acquisition splash: meet the pixel form the moment you find it ── */
  E.on("v37_relic", function (ev) {
    if (!ev || !ev.id) return;
    var o = R.byId[ev.id];
    if (!o || document.getElementById("v37splash")) return;
    var col = (R.RARITY[o.rarity] || {}).col || "#9AA49A";
    var wrap = document.createElement("div");
    wrap.id = "v37splash";
    wrap.style.cssText = "position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:9500;background:#1A1626;border:2px solid " + col + ";border-radius:12px;padding:12px 18px;text-align:center;color:#E8E3F0;box-shadow:0 8px 30px rgba(0,0,0,.5);max-width:340px;pointer-events:none;opacity:0;transition:opacity .25s, top .25s";
    wrap.innerHTML = imgHtml(ev.id, 5) +
      '<div style="margin-top:6px;font-weight:bold">' + E.esc(o.name) + '</div>' +
      '<div style="color:' + col + ';font-size:.85em">' + ((R.RARITY[o.rarity] || {}).n || "") + ' · ' + E.esc(o.tags.c) + '</div>';
    document.body.appendChild(wrap);
    requestAnimationFrame(function () { wrap.style.opacity = "1"; wrap.style.top = "16%"; });
    setTimeout(function () { wrap.style.opacity = "0"; }, 2300);
    setTimeout(function () { try { wrap.remove(); } catch (e) {} }, 2700);
  });
})();
