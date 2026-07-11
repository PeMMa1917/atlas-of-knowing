/* ---- content-67b-arcade.js ---- */
/* ═══════════════════════════════════════════════════════════════════════
   THE ATLAS OF KNOWING · ARCADE TRIALS (content-67b-arcade.js)
   v37. Load after content-67. Installs the six canvas families into the
   trial engine: Slide of Provenance, Fallacy Volley, Boundary Maze,
   Rung Climb (with coyote time and a jump buffer, so the ledge forgives),
   Shadow Archive (step-based stealth with sight cones), and Tactica
   (turn-based matchup combat). Each cleans up its loop and listeners
   when the canvas leaves the document. No em dashes in authored strings.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  var E = window.TOKEngine;
  if (!E || !E.V37_TRIALS) { try { console.warn("[arcade] trial engine missing"); } catch (e) {} return; }
  var T = E.V37_TRIALS, V = E.V37, IMPL = T.IMPL;
  function esc(s) { return E.esc(String(s == null ? "" : s)); }
  function sfx(n) { try { if (E.sfx && E.sfx.play) E.sfx.play(n); } catch (e) {} }
  function toast(m) { try { E.toast(m); } catch (e) {} }
  function bonusTime() { return V.battleBonus().time * 4 + (V.hasAbility("stride") ? 5 : 0); }
  function lives() { return 1 + (V.vigor() >= 6 ? 1 : 0) + V.battleBonus().life; }
  function rnger(seed) { var s = seed >>> 0; return function () { s = (s * 1103515245 + 12345) >>> 0; return s; }; }

  /* shared arcade harness: canvas, loop, keys, cleanup */
  function arcade(els, w, h, subline) {
    els.body.innerHTML = '<div class="sub" style="margin-bottom:6px">' + subline + '</div>' +
      '<canvas id="v37cv" width="' + w + '" height="' + h + '" style="display:block;margin:0 auto;background:#111;border:1px solid #444;border-radius:8px;max-width:100%"></canvas>' +
      '<div id="v37hudline" class="sub" style="text-align:center;margin-top:6px"></div>';
    var cv = els.body.querySelector("#v37cv"), cx = cv.getContext("2d");
    var hud = els.body.querySelector("#v37hudline");
    var keys = {}, raf = 0, stopped = false;
    function kd(e) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].indexOf(e.key) >= 0) e.preventDefault();
      keys[e.key] = true; keys.last = e.key;
    }
    function ku(e) { keys[e.key] = false; }
    window.addEventListener("keydown", kd, true);
    window.addEventListener("keyup", ku, true);
    var H = {
      cv: cv, cx: cx, keys: keys,
      hud: function (t) { if (hud) hud.textContent = t; },
      loop: function (fn) {
        var last = performance.now();
        function step(now) {
          if (stopped || !cv.isConnected) { H.stop(); return; }
          var dt = Math.min(50, now - last); last = now;
          fn(dt, now);
          if (!stopped) raf = requestAnimationFrame(step);
        }
        raf = requestAnimationFrame(step);
      },
      stop: function () {
        if (stopped) return;
        stopped = true;
        cancelAnimationFrame(raf);
        window.removeEventListener("keydown", kd, true);
        window.removeEventListener("keyup", ku, true);
      }
    };
    return H;
  }

  /* ── 9 · SLIDE OF PROVENANCE ── */
  IMPL.slide = function (inst, els, done) {
    var nx = rnger(inst.seed), N = 3, S = 108;
    var board = [];
    for (var i = 0; i < N * N; i++) board.push(i); /* 8 = blank */
    var blank = N * N - 1;
    var shuffleMoves = inst.tutorial ? 12 : 28;
    for (var m = 0; m < shuffleMoves; m++) {
      var opts = neighbors(blank);
      var pick = opts[nx() % opts.length];
      board[blank] = board[pick]; board[pick] = N * N - 1; blank = pick;
    }
    function neighbors(ix) {
      var r = (ix / N) | 0, c = ix % N, out = [];
      if (r > 0) out.push(ix - N); if (r < N - 1) out.push(ix + N);
      if (c > 0) out.push(ix - 1); if (c < N - 1) out.push(ix + 1);
      return out;
    }
    var moves = 0, par = inst.tutorial ? 20 : 40;
    var A = arcade(els, S * N + 8, S * N + 8, "The folio arrived shredded into nine sliding pieces. Tap a piece beside the gap. Par for three stars: " + par + " moves.");
    function drawTileFace(cx, t, x, y) {
      cx.fillStyle = "#E8DFC8"; cx.fillRect(x, y, S - 4, S - 4);
      cx.fillStyle = "#5A4A32";
      var tr = (t / N) | 0, tc = t % N;
      /* fake document: lines shift by tile so the restored whole reads as one page */
      for (var l = 0; l < 5; l++) {
        var lw = 20 + ((t * 13 + l * 29) % 60);
        cx.fillRect(x + 10 - tc * 2, y + 12 + l * 16, lw, 5);
      }
      if (t === 0) { cx.fillStyle = "#8A2E2E"; cx.beginPath(); cx.arc(x + 20, y + 20, 12, 0, 7); cx.fill(); }
      if (t === 8) return;
      cx.fillStyle = "#333"; cx.font = "11px monospace";
      cx.fillText(String(t + 1), x + S - 20, y + S - 14);
    }
    function draw() {
      var cx = A.cx;
      cx.fillStyle = "#111"; cx.fillRect(0, 0, A.cv.width, A.cv.height);
      board.forEach(function (t, ix) {
        if (t === N * N - 1) return;
        var r = (ix / N) | 0, c = ix % N;
        drawTileFace(cx, t, c * S + 6, r * S + 6);
      });
      A.hud("Moves: " + moves);
    }
    A.cv.addEventListener("click", function (ev) {
      var rect = A.cv.getBoundingClientRect();
      var scale = A.cv.width / rect.width;
      var c = (((ev.clientX - rect.left) * scale - 6) / S) | 0, r = (((ev.clientY - rect.top) * scale - 6) / S) | 0;
      var ix = r * N + c;
      if (ix < 0 || ix >= N * N) return;
      if (neighbors(ix).indexOf(blank) < 0) return;
      board[blank] = board[ix]; board[ix] = N * N - 1;
      blank = ix; moves++; sfx("tick"); draw();
      if (board.every(function (t, i2) { return t === i2; })) {
        A.stop();
        done(true, moves <= par ? 3 : moves <= par * 1.6 ? 2 : 1, "Restored in " + moves + " moves. The seal sits top left, where the archivist said it would.");
      }
    });
    draw();
    A.loop(function () {});
  };

  /* ── 10 · FALLACY VOLLEY ── */
  var VOLLEY_BANK = [
    ["Her theory fails because she failed two classes back in school.", "adhom"],
    ["He argues for bike lanes, so he must want every car banned.", "straw"],
    ["Nine of ten people here believe it, so the claim stands.", "popular"],
    ["The rooster crowed, then the sun rose. The crowing raised the sun.", "cause"],
    ["Three dated documents and two instruments agree on the measurement.", "sound"],
    ["Ignore his lab results; he dresses like a clown on weekends.", "adhom"],
    ["She wants smaller classes, meaning she wants teachers fired everywhere.", "straw"],
    ["The video went viral, so the cure must be legitimate.", "popular"],
    ["Sales rose after the new logo, so the logo caused the rise.", "cause"],
    ["Two independent witnesses, interviewed apart, describe the same sequence.", "sound"],
    ["Why trust a historian who cannot even ride a horse?", "adhom"],
    ["They asked for a budget review, in other words for shutting the program.", "straw"],
    ["Every empire believed it, so believing it made empires.", "popular"],
    ["The patient improved after the amulet arrived. The amulet healed her.", "cause"],
    ["The archive's copy matches the museum's copy line by line.", "sound"],
    ["The critic never painted anything, so the critique collapses.", "adhom"],
    ["Asking about side effects means rejecting all medicine, apparently.", "straw"],
    ["A million streams cannot be wrong about musical quality.", "popular"],
    ["Storks arrive each spring; births rise each spring. Storks deliver babies.", "cause"],
    ["The replication used new data and reached the same curve.", "sound"]
  ];
  var VOLLEY_KEYS = [["adhom", "Against the person"], ["straw", "Straw figure"], ["popular", "Crowd appeal"], ["cause", "False cause"], ["sound", "Sound: let it pass"]];
  IMPL.volley = function (inst, els, done) {
    var nx = rnger(inst.seed);
    var deck = VOLLEY_BANK.slice(), rounds = [];
    var total = inst.tutorial ? 8 : 12;
    for (var i = 0; i < total; i++) rounds.push(deck.splice(nx() % deck.length, 1)[0]);
    var life = 2 + lives(), hit = 0, misses = 0, r = 0;
    var fallMs = (inst.tutorial ? 11000 : 8000) + bonusTime() * 300;
    els.body.innerHTML = '<div class="sub" style="margin-bottom:6px">Arguments fall. Name each before it lands, or wave the sound ones through. Lives: <span id="v37life"></span></div>' +
      '<div id="v37fallwrap" style="position:relative;height:190px;border:1px solid #444;border-radius:8px;overflow:hidden;background:#15121C">' +
      '<div id="v37fall" style="position:absolute;left:0;right:0;top:-40px;text-align:center;padding:0 14px"></div>' +
      '<div style="position:absolute;left:0;right:0;bottom:26px;border-top:2px dashed #c96f6f55"></div></div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-top:8px">' +
      VOLLEY_KEYS.map(function (k, ix) { return '<button class="btn small" data-vk="' + k[0] + '">' + (ix + 1) + ' · ' + k[1] + '</button>'; }).join("") + '</div>';
    var fallEl = els.body.querySelector("#v37fall"), wrap = els.body.querySelector("#v37fallwrap"), lifeEl = els.body.querySelector("#v37life");
    var y = -40, t0 = 0, raf = 0, judged = false, stopped = false;
    function lifeStr() { return "❤".repeat(life); }
    function stopAll() { stopped = true; cancelAnimationFrame(raf); }
    function judge(pick) {
      if (judged || stopped) return;
      judged = true;
      var truth = rounds[r][1];
      if (pick === truth) { hit++; sfx("chime"); fallEl.style.color = "#7fbf7f"; }
      else { misses++; life--; sfx("thud"); fallEl.style.color = "#c96f6f"; toast("It was: " + VOLLEY_KEYS.filter(function (k) { return k[0] === truth; })[0][1]); }
      if (lifeEl) lifeEl.textContent = lifeStr();
      setTimeout(next, 450);
    }
    function next() {
      r++;
      fallEl.style.color = "";
      if (life <= 0) { stopAll(); done(false, 0, "The volley won " + misses + " points. Fallacies score on speed; so can you, with reps."); return; }
      if (r >= total) { stopAll(); done(true, misses === 0 ? 3 : misses <= 2 ? 2 : 1, hit + " of " + total + " named true."); return; }
      launch();
    }
    function launch() {
      judged = false; y = -40; t0 = performance.now();
      fallEl.textContent = rounds[r][0];
      function step(now) {
        if (stopped || !fallEl.isConnected) { stopAll(); return; }
        var p = (now - t0) / fallMs;
        y = -40 + p * (wrap.clientHeight + 10);
        fallEl.style.top = y + "px";
        if (p >= 0.92 && !judged) { judge("__landed"); return; }
        raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    }
    els.body.querySelectorAll("[data-vk]").forEach(function (b) { b.onclick = function () { judge(b.getAttribute("data-vk")); }; });
    function keyer(e) {
      var ix = ["1", "2", "3", "4", "5"].indexOf(e.key);
      if (ix >= 0) { judge(VOLLEY_KEYS[ix][0]); }
      if (!fallEl.isConnected) window.removeEventListener("keydown", keyer, true);
    }
    window.addEventListener("keydown", keyer, true);
    launch();
  };

  /* ── 11 · BOUNDARY MAZE ── */
  IMPL.maze = function (inst, els, done) {
    var nx = rnger(inst.seed);
    var CW = 15, CH = 11, S = 30;
    function gen(seedAdd) {
      var rr = rnger(inst.seed + seedAdd);
      var g = [];
      for (var y2 = 0; y2 < CH; y2++) { g.push([]); for (var x2 = 0; x2 < CW; x2++) g[y2].push(1); }
      function carve(x3, y3) {
        g[y3][x3] = 0;
        var dirs = [[2, 0], [-2, 0], [0, 2], [0, -2]].sort(function () { return (rr() % 3) - 1; });
        dirs.forEach(function (d) {
          var nx2 = x3 + d[0], ny2 = y3 + d[1];
          if (nx2 > 0 && ny2 > 0 && nx2 < CW - 1 && ny2 < CH - 1 && g[ny2][nx2] === 1) {
            g[y3 + d[1] / 2][x3 + d[0] / 2] = 0; carve(nx2, ny2);
          }
        });
      }
      carve(1, 1);
      /* carve the fixed stations open in every layout */
      STATIONS.forEach(function (s2) { g[s2[1]][s2[0]] = 0; g[s2[1]][Math.max(1, s2[0] - 1)] = 0; });
      return g;
    }
    var STATIONS = [[13, 1], [7, 5], [1, 9], [13, 9]]; /* three premises + exit */
    var mazeA = gen(1), mazeB = gen(9999), grid = mazeA, swapped = false;
    var px = 1, py = 1, got = 0;
    var time = (inst.tutorial ? 90 : 60) + bonusTime();
    var half = time / 2;
    var A = arcade(els, CW * S, CH * S, "Collect the three premises, then take the door. At half time the walls rethink themselves. Arrow keys or WASD.");
    var stepCooldown = 0;
    function cell(x4, y4) { return (x4 < 0 || y4 < 0 || x4 >= CW || y4 >= CH) ? 1 : grid[y4][x4]; }
    A.loop(function (dt) {
      time -= dt / 1000;
      stepCooldown -= dt;
      if (time <= 0) { A.stop(); done(false, 0, "The boundary held. " + got + " of 3 premises gathered."); return; }
      if (!swapped && time <= half) {
        swapped = true; grid = mazeB; sfx("thud"); toast("The walls rethink themselves.");
        if (cell(px, py) === 1) { px = 1; py = 1; }
      }
      var k = A.keys, dx = 0, dy = 0;
      if (k.ArrowUp || k.w) dy = -1; else if (k.ArrowDown || k.s) dy = 1;
      else if (k.ArrowLeft || k.a) dx = -1; else if (k.ArrowRight || k.d) dx = 1;
      if ((dx || dy) && stepCooldown <= 0) {
        if (cell(px + dx, py + dy) === 0) { px += dx; py += dy; stepCooldown = 95; }
        else stepCooldown = 60;
      }
      STATIONS.forEach(function (s2, ix) {
        if (s2.done) return;
        if (px === s2[0] && py === s2[1]) {
          if (ix < 3) { s2.done = true; got++; sfx("chime"); toast("Premise " + got + " of 3."); }
          else if (got === 3) {
            A.stop();
            var rem = Math.round(time);
            done(true, rem > half ? 3 : rem > 12 ? 2 : 1, "Conclusion reached with " + rem + "s to spare.");
          }
        }
      });
      var cx = A.cx;
      cx.fillStyle = "#15121C"; cx.fillRect(0, 0, A.cv.width, A.cv.height);
      for (var y5 = 0; y5 < CH; y5++) for (var x5 = 0; x5 < CW; x5++) {
        if (grid[y5][x5] === 1) { cx.fillStyle = swapped ? "#4A3B5C" : "#31424E"; cx.fillRect(x5 * S, y5 * S, S - 1, S - 1); }
      }
      STATIONS.forEach(function (s2, ix) {
        if (s2.done) return;
        cx.font = "18px serif"; cx.textAlign = "center";
        cx.fillText(ix < 3 ? "📜" : (got === 3 ? "🚪" : "🔒"), s2[0] * S + S / 2, s2[1] * S + S / 2 + 6);
      });
      cx.font = "20px serif";
      cx.fillText("🧭", px * S + S / 2, py * S + S / 2 + 7);
      A.hud("Time " + Math.ceil(time) + "s · premises " + got + "/3" + (swapped ? " · second layout" : ""));
    });
  };

  /* ── 12 · RUNG CLIMB: platformer with coyote time ── */
  IMPL.climb = function (inst, els, done) {
    var nx = rnger(inst.seed);
    var W = 480, H = 340;
    var plats = [{ x: 0, y: H - 16, w: W }];
    var rungY = [H - 70, H - 124, H - 178, H - 232, H - 286];
    var RUNG_NAMES = ["Notice", "Name", "Connect", "Question", "Justify"];
    var rungs = rungY.map(function (y6, ix) {
      var x6 = 40 + nx() % (W - 140);
      plats.push({ x: x6 - 30, y: y6 + 18, w: 120 });
      return { x: x6 + 30, y: y6, ix: ix, got: false };
    });
    for (var e2 = 0; e2 < 3; e2++) plats.push({ x: nx() % (W - 90), y: 88 + nx() % (H - 160), w: 70 });
    var p = { x: 30, y: H - 40, vx: 0, vy: 0, onGround: false, coyote: 0, buffer: 0, respawn: { x: 30, y: H - 40 } };
    var next = 0, falls = 0;
    var time = (inst.tutorial ? 100 : 70) + bonusTime();
    var A = arcade(els, W, H, "Climb the Ladder of Knowing in order: notice, name, connect, question, justify. Arrows move, space or up jumps. The ledge forgives a late jump, briefly.");
    A.loop(function (dt) {
      time -= dt / 1000;
      if (time <= 0) { A.stop(); done(false, 0, "The clock outclimbed you at rung " + next + " of 5."); return; }
      var k = A.keys;
      var accel = (k.ArrowLeft || k.a) ? -1 : (k.ArrowRight || k.d) ? 1 : 0;
      p.vx += accel * dt * 0.02;
      p.vx *= 0.86;
      p.vy += dt * 0.028; /* gravity */
      if (k[" "] || k.ArrowUp || k.w) { p.buffer = 120; }
      p.buffer -= dt; p.coyote -= dt;
      if (p.buffer > 0 && (p.onGround || p.coyote > 0)) {
        p.vy = -7.6; p.onGround = false; p.coyote = 0; p.buffer = 0; sfx("tick");
      }
      p.x += p.vx * dt * 0.35; p.y += p.vy * dt * 0.06 * 6;
      if (p.x < 8) p.x = 8; if (p.x > W - 8) p.x = W - 8;
      var was = p.onGround; p.onGround = false;
      if (p.vy >= 0) plats.forEach(function (pl) {
        if (p.x >= pl.x - 6 && p.x <= pl.x + pl.w + 6 && p.y >= pl.y - 14 && p.y <= pl.y + Math.max(10, p.vy * 2)) {
          p.y = pl.y - 14; p.vy = 0; p.onGround = true;
        }
      });
      if (was && !p.onGround) p.coyote = 120; /* the forgiving ledge */
      if (p.y > H + 30) {
        falls++; sfx("thud");
        p.x = p.respawn.x; p.y = p.respawn.y; p.vx = 0; p.vy = 0;
        time -= 4;
      }
      var r2 = rungs[next];
      if (r2 && Math.abs(p.x - r2.x) < 16 && Math.abs(p.y - r2.y) < 20) {
        r2.got = true; next++;
        p.respawn = { x: r2.x, y: r2.y + 4 };
        sfx("chime");
        toast("Rung " + next + ": " + RUNG_NAMES[r2.ix] + ".");
        if (next === 5) {
          A.stop();
          done(true, falls === 0 ? 3 : falls <= 2 ? 2 : 1, "Five rungs in order, " + falls + " fall" + (falls === 1 ? "" : "s") + ". Justify sits highest for a reason.");
          return;
        }
      }
      var cx = A.cx;
      cx.fillStyle = "#121620"; cx.fillRect(0, 0, W, H);
      plats.forEach(function (pl) { cx.fillStyle = "#4A5F6E"; cx.fillRect(pl.x, pl.y, pl.w, 8); });
      rungs.forEach(function (r3) {
        if (r3.got) return;
        cx.font = "16px serif"; cx.textAlign = "center";
        cx.globalAlpha = r3.ix === next ? 1 : 0.35;
        cx.fillText("🪜", r3.x, r3.y + 6);
        cx.fillStyle = "#C9C4D4"; cx.font = "10px sans-serif";
        cx.fillText(RUNG_NAMES[r3.ix], r3.x, r3.y + 20);
        cx.globalAlpha = 1;
      });
      cx.font = "18px serif"; cx.textAlign = "center";
      cx.fillText("🧗", p.x, p.y + 8);
      A.hud("Time " + Math.ceil(time) + "s · next rung: " + (RUNG_NAMES[next] || "done") + " · falls " + falls);
    });
  };

  /* ── 13 · SHADOW ARCHIVE: step stealth ── */
  var SHADOW_MAPS = [
    ["#############",
     "#E....#.....#",
     "#.###.#.###.#",
     "#.#...#...#.#",
     "#.#.#####.#.#",
     "#...#...#...#",
     "###.#.#.#.###",
     "#...#.#.....#",
     "#.#####.###F#",
     "#############"],
    ["#############",
     "#E.....#....#",
     "#.####.#.##.#",
     "#....#...##.#",
     "####.#.#....#",
     "#....#.####.#",
     "#.####......#",
     "#......####.#",
     "#.####.#..F.#",
     "#############"]
  ];
  IMPL.shadow = function (inst, els, done) {
    var nx = rnger(inst.seed);
    var map = SHADOW_MAPS[inst.seed % SHADOW_MAPS.length].map(function (r) { return r.split(""); });
    var CH = map.length, CW = map[0].length, S = 30;
    var start = null, shelf = null;
    map.forEach(function (row, y7) { row.forEach(function (c7, x7) { if (c7 === "E") start = { x: x7, y: y7 }; if (c7 === "F") shelf = { x: x7, y: y7 }; }); });
    var guards = [
      { path: [[3, 3], [3, 5], [5, 5], [5, 3]], at: nx() % 4, dir: 1 },
      { path: [[9, 7], [9, 5], [7, 5], [7, 7]], at: nx() % 4, dir: 1 },
      { path: [[11, 1], [11, 3], [11, 5]], at: nx() % 3, dir: 1 }
    ];
    var p = { x: start.x, y: start.y }, carrying = false, turns = 0, spots = 0, cap = lives();
    var A = arcade(els, CW * S, CH * S, "Wardens patrol on rails; their lanterns see three tiles ahead. Lift the folio (F), return to the door (E). You step, then they step. Arrow keys or WASD.");
    function wall(x8, y8) { return x8 < 0 || y8 < 0 || x8 >= CW || y8 >= CH || map[y8][x8] === "#"; }
    function guardCells(g) {
      var here = g.path[g.at], nxt = g.path[(g.at + g.dir + g.path.length) % g.path.length];
      var fx = Math.sign(nxt[0] - here[0]), fy = Math.sign(nxt[1] - here[1]);
      var cells = [[here[0], here[1]]];
      for (var i2 = 1; i2 <= 3; i2++) {
        var cx2 = here[0] + fx * i2, cy2 = here[1] + fy * i2;
        if (wall(cx2, cy2)) break;
        cells.push([cx2, cy2]);
      }
      return cells;
    }
    function spotted() {
      return guards.some(function (g) { return guardCells(g).some(function (c8) { return c8[0] === p.x && c8[1] === p.y; }); });
    }
    function stepGuards() {
      guards.forEach(function (g) {
        g.at += g.dir;
        if (g.at >= g.path.length) { g.at = g.path.length - 2; g.dir = -1; }
        if (g.at < 0) { g.at = 1; g.dir = 1; }
      });
    }
    function draw() {
      var cx = A.cx;
      cx.fillStyle = "#100E16"; cx.fillRect(0, 0, A.cv.width, A.cv.height);
      for (var y9 = 0; y9 < CH; y9++) for (var x9 = 0; x9 < CW; x9++) {
        if (map[y9][x9] === "#") { cx.fillStyle = "#2E2640"; cx.fillRect(x9 * S, y9 * S, S - 1, S - 1); }
      }
      guards.forEach(function (g) {
        guardCells(g).forEach(function (c9, ix) {
          cx.fillStyle = ix === 0 ? "#C9A54E" : "rgba(201,165,78,.22)";
          cx.fillRect(c9[0] * S + 2, c9[1] * S + 2, S - 5, S - 5);
        });
      });
      cx.font = "17px serif"; cx.textAlign = "center";
      cx.fillText("🚪", start.x * S + S / 2, start.y * S + S / 2 + 6);
      if (!carrying) cx.fillText("📜", shelf.x * S + S / 2, shelf.y * S + S / 2 + 6);
      cx.fillText(carrying ? "🎒" : "🕵️", p.x * S + S / 2, p.y * S + S / 2 + 6);
      A.hud("Turns " + turns + " · folio " + (carrying ? "carried" : "on the shelf") + " · sightings " + spots + "/" + cap);
    }
    var cool = 0;
    A.loop(function (dt) {
      cool -= dt;
      var k = A.keys, dx = 0, dy = 0;
      if (k.ArrowUp || k.w) dy = -1; else if (k.ArrowDown || k.s) dy = 1;
      else if (k.ArrowLeft || k.a) dx = -1; else if (k.ArrowRight || k.d) dx = 1;
      if ((dx || dy) && cool <= 0) {
        cool = 140;
        if (!wall(p.x + dx, p.y + dy)) {
          p.x += dx; p.y += dy; turns++;
          if (p.x === shelf.x && p.y === shelf.y && !carrying) { carrying = true; sfx("chime"); toast("The folio slips into the satchel."); }
          if (p.x === start.x && p.y === start.y && carrying) {
            A.stop();
            done(true, spots === 0 ? 3 : spots === 1 ? 2 : 1, "Out in " + turns + " steps, seen " + spots + " time" + (spots === 1 ? "" : "s") + ".");
            return;
          }
          stepGuards();
          if (spotted()) {
            spots++; sfx("thud"); toast("A lantern swings your way.");
            p.x = start.x; p.y = start.y;
            if (spots > cap) { A.stop(); done(false, 0, "The wardens hold the stacks tonight. Their routes never change; yours can."); return; }
          }
        }
      }
      draw();
    });
  };

  /* ── 14 · TACTICA: GRID OF CLAIMS ── */
  IMPL.tactica = function (inst, els, done) {
    var nx = rnger(inst.seed);
    var N = 5, S = 62;
    /* matchups: each claim beats one doubt, loses to another */
    var KINDS = {
      evidence:   { n: "Evidence",    icon: "🔍", beats: "rumor",       side: "you" },
      definition: { n: "Definition",  icon: "📖", beats: "ambiguity",   side: "you" },
      example:    { n: "Example",     icon: "📌", beats: "abstraction", side: "you" },
      rumor:      { n: "Rumor",       icon: "🌫️", beats: "example",     side: "foe" },
      ambiguity:  { n: "Ambiguity",   icon: "❓", beats: "evidence",    side: "foe" },
      abstraction:{ n: "Abstraction", icon: "☁️", beats: "definition",  side: "foe" }
    };
    var units = [
      { k: "evidence", x: 0, y: 4 }, { k: "definition", x: 2, y: 4 }, { k: "example", x: 4, y: 4 },
      { k: "rumor", x: 4 - (nx() % 2), y: 0 }, { k: "ambiguity", x: 2, y: 0 }, { k: "abstraction", x: nx() % 2, y: 0 }
    ];
    var sel = null, yourTurn = true, turns = 0, lost = 0;
    var A = arcade(els, N * S, N * S + 30, "Your claims against the doubts. Move one step or strike an adjacent piece. Each piece beats one foe and loses to another: read the legend under the board.");
    function at(x, y) { return units.find(function (u) { return u.x === x && u.y === y && !u.dead; }); }
    function alive(side) { return units.filter(function (u) { return !u.dead && KINDS[u.k].side === side; }); }
    function strike(a, b) {
      if (KINDS[a.k].beats === b.k) { b.dead = true; sfx("chime"); }
      else { a.dead = true; sfx("thud"); if (KINDS[a.k].side === "you") lost++; }
    }
    function foeTurn() {
      alive("foe").forEach(function (f) {
        if (f.dead) return;
        var targets = alive("you");
        if (!targets.length) return;
        /* prefer an adjacent piece it beats; otherwise drift toward nearest prey */
        var adj = targets.filter(function (t2) { return Math.abs(t2.x - f.x) + Math.abs(t2.y - f.y) === 1; });
        var kill = adj.filter(function (t2) { return KINDS[f.k].beats === t2.k; });
        if (kill.length) { strike(f, kill[0]); return; }
        if (adj.length && nx() % 3 === 0) { strike(f, adj[0]); return; }
        var prey = targets.filter(function (t2) { return KINDS[f.k].beats === t2.k; })[0] || targets[0];
        var dx = Math.sign(prey.x - f.x), dy = Math.sign(prey.y - f.y);
        var moves = dx && dy ? (nx() % 2 ? [[dx, 0], [0, dy]] : [[0, dy], [dx, 0]]) : dx ? [[dx, 0]] : [[0, dy]];
        for (var i3 = 0; i3 < moves.length; i3++) {
          var mx = f.x + moves[i3][0], my = f.y + moves[i3][1];
          if (mx >= 0 && my >= 0 && mx < N && my < N && !at(mx, my)) { f.x = mx; f.y = my; break; }
        }
      });
      yourTurn = true;
      check();
    }
    function check() {
      if (!alive("foe").length) { A.stop(); done(true, lost === 0 ? 3 : lost === 1 ? 2 : 1, "The doubts cleared in " + turns + " turns, " + lost + " claim" + (lost === 1 ? "" : "s") + " spent."); return true; }
      if (!alive("you").length) { A.stop(); done(false, 0, "The doubts held the board. Matchups beat bravery here."); return true; }
      return false;
    }
    function draw() {
      var cx = A.cx;
      cx.fillStyle = "#141220"; cx.fillRect(0, 0, A.cv.width, A.cv.height);
      for (var y10 = 0; y10 < N; y10++) for (var x10 = 0; x10 < N; x10++) {
        cx.strokeStyle = "#333"; cx.strokeRect(x10 * S, y10 * S, S, S);
        if (sel && Math.abs(sel.x - x10) + Math.abs(sel.y - y10) === 1) {
          cx.fillStyle = "rgba(232,181,74,.14)"; cx.fillRect(x10 * S, y10 * S, S, S);
        }
      }
      units.forEach(function (u) {
        if (u.dead) return;
        var K2 = KINDS[u.k];
        cx.font = "24px serif"; cx.textAlign = "center";
        if (sel === u) { cx.fillStyle = "rgba(232,181,74,.3)"; cx.fillRect(u.x * S, u.y * S, S, S); }
        cx.fillText(K2.icon, u.x * S + S / 2, u.y * S + S / 2 + 4);
        cx.fillStyle = K2.side === "you" ? "#7fbf7f" : "#c96f6f";
        cx.font = "9px sans-serif";
        cx.fillText(K2.n, u.x * S + S / 2, u.y * S + S - 6);
      });
      cx.fillStyle = "#C9C4D4"; cx.font = "10px sans-serif"; cx.textAlign = "center";
      cx.fillText("🔍 beats 🌫️ · 📖 beats ❓ · 📌 beats ☁️ · and each loses to one of them", A.cv.width / 2, N * S + 18);
      A.hud(yourTurn ? "Your move: tap a claim, then a highlighted square. Striking a piece you cannot beat spends your piece." : "The doubts move.");
    }
    A.cv.addEventListener("click", function (ev) {
      if (!yourTurn) return;
      var rect = A.cv.getBoundingClientRect();
      var scale = A.cv.width / rect.width;
      var x11 = (((ev.clientX - rect.left) * scale) / S) | 0, y11 = (((ev.clientY - rect.top) * scale) / S) | 0;
      if (x11 < 0 || y11 < 0 || x11 >= N || y11 >= N) return;
      var u = at(x11, y11);
      if (u && KINDS[u.k].side === "you") { sel = u; draw(); return; }
      if (!sel) return;
      var dist = Math.abs(sel.x - x11) + Math.abs(sel.y - y11);
      if (dist !== 1) return;
      turns++;
      if (u) strike(sel, u);
      else { sel.x = x11; sel.y = y11; }
      sel = null; yourTurn = false; draw();
      if (!check()) setTimeout(function () { foeTurn(); draw(); }, 420);
    });
    draw();
    A.loop(function () {});
  };
})();
