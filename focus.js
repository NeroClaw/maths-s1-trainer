/* ==========================================================================
   MODE FOCUS · une seule idée par écran
   Le contenu existant n'est pas réécrit : il est découpé en unités
   (une recette, une carte, un piège, une flashcard, une question) et
   affiché seul. Les nœuds sont déplacés, jamais clonés, donc les
   calculateurs et le quiz gardent leurs ids et leurs écouteurs.
   ========================================================================== */
(function () {
  'use strict';
  if (typeof CHAPTERS === 'undefined' || typeof app === 'undefined' || typeof saved === 'undefined') return;

  var DECKS = Object.create(null);
  var mounted = [];
  var state = { on: saved.focusOn !== false, ch: null, i: 0 };

  /* ------------------------------------------------------------------
     VIEW
     ------------------------------------------------------------------ */
  var view = document.createElement('section');
  view.className = 'panel';
  view.id = 'focus-view';
  view.setAttribute('role', 'tabpanel');
  view.innerHTML =
    '<div class="focus-head">' +
      '<span class="focus-eyebrow" id="focusEyebrow">Focus</span>' +
      '<h1 class="focus-title" id="focusTitle"></h1>' +
    '</div>' +
    '<div class="focus-top">' +
      '<span class="focus-count" id="focusCount">1 / 1</span>' +
      '<div class="focus-bar"><div class="focus-fill" id="focusFill"></div></div>' +
    '</div>' +
    '<p class="focus-label" id="focusLabel"></p>' +
    '<div class="focus-stage" id="focusStage" aria-live="polite"></div>' +
    '<nav class="focus-nav" aria-label="Navigation du mode focus">' +
      '<button class="btn btn--ghost" type="button" id="focusPrev" aria-label="Élément précédent">←</button>' +
      '<button class="btn" type="button" id="focusNext">Suivant →</button>' +
    '</nav>' +
    '<p class="focus-hint">Une seule carte à la fois. <kbd>←</kbd> <kbd>→</kbd> pour naviguer.</p>';
  app.appendChild(view);

  var stage = view.querySelector('#focusStage');
  var elCount = view.querySelector('#focusCount');
  var elFill = view.querySelector('#focusFill');
  var elLabel = view.querySelector('#focusLabel');
  var elTitle = view.querySelector('#focusTitle');
  var elEyebrow = view.querySelector('#focusEyebrow');

  /* ------------------------------------------------------------------
     DECK BUILDING
     ------------------------------------------------------------------ */
  function label(el, fallback) {
    if (!el.querySelector) return fallback;
    var t = el.querySelector('.recette__tag') || el.querySelector('h3') || el.querySelector('.ex__tag');
    if (t && t.textContent.trim()) return t.textContent.trim();
    return fallback;
  }

  function chunkBlock(block) {
    var groups = [];
    var titleEl = block.querySelector(':scope > .block__title');
    var title = titleEl ? titleEl.textContent.replace(/^[^A-Za-zÀ-ÿ0-9]+/, '').trim() : '';
    var buf = [];

    function flush() {
      if (!buf.length) return;
      groups.push({ els: buf.slice(), label: title || 'Repères', wrap: true });
      buf = [];
    }

    Array.prototype.forEach.call(block.children, function (el) {
      if (el === titleEl || el.classList.contains('hint')) return;

      if (el.classList.contains('quiz')) {
        flush();
        groups.push({ els: [el], label: /quiz/i.test(title) ? title : 'Quiz · ' + title });
        return;
      }

      if (el.classList.contains('flashdeck')) {
        flush();
        Array.prototype.forEach.call(el.children, function (f) {
          groups.push({ els: [f], label: 'Carte de rappel' });
        });
        return;
      }

      if (el.classList.contains('recette')) {
        flush();
        groups.push({ els: [el], label: label(el, title) });
        return;
      }

      if (el.classList.contains('card')) {
        flush();
        var traps = el.querySelectorAll(':scope > .trap');
        if (traps.length) {
          Array.prototype.forEach.call(traps, function (t) {
            var fl = t.querySelector('.trap__flag');
            groups.push({ els: [t], label: 'Piège · ' + (fl ? fl.textContent.trim() : ''), wrap: true });
          });
          return;
        }
        groups.push({ els: [el], label: label(el, title) });
        return;
      }

      if (el.classList.contains('trap')) {
        flush();
        var flag = el.querySelector('.trap__flag');
        groups.push({ els: [el], label: 'Piège · ' + (flag ? flag.textContent.trim() : ''), wrap: true });
        return;
      }

      if (el.matches('.copy, pre.copy')) {
        flush();
        groups.push({ els: [el], label: 'Copie modèle' });
        return;
      }

      buf.push(el);
    });
    flush();
    return groups;
  }

  function buildDeck(chId) {
    var panel = document.getElementById('panel-' + chId);
    if (!panel) return [{ els: [], label: 'Contenu indisponible' }];

    var blocks = panel.querySelectorAll(':scope > section.block');
    var groups = [];
    if (blocks.length) {
      Array.prototype.forEach.call(blocks, function (b) {
        groups = groups.concat(chunkBlock(b));
      });
    } else {
      Array.prototype.forEach.call(panel.querySelectorAll('.card'), function (c) {
        groups.push({ els: [c], label: '' });
      });
    }
    groups = groups.filter(function (g) { return g.els.length; });

    // Placeholders : permettent de remettre chaque nœud exactement où il était.
    groups.forEach(function (g) {
      g.nodes = g.els.map(function (el) {
        var ph = document.createElement('span');
        ph.className = 'focus-ph';
        ph.hidden = true;
        if (el.parentNode) el.parentNode.insertBefore(ph, el);
        return { el: el, ph: ph };
      });
      delete g.els;
    });
    return groups;
  }

  function deckFor(chId) {
    if (!DECKS[chId]) DECKS[chId] = buildDeck(chId);
    return DECKS[chId];
  }

  /* ------------------------------------------------------------------
     RENDER
     ------------------------------------------------------------------ */
  function unmount() {
    mounted.forEach(function (n) {
      if (n.ph.parentNode) n.ph.parentNode.insertBefore(n.el, n.ph);
    });
    mounted = [];
    stage.innerHTML = '';
  }

  function render() {
    if (!state.on) return;
    var ch = null;
    for (var k = 0; k < CHAPTERS.length; k++) if (CHAPTERS[k].id === state.ch) ch = CHAPTERS[k];
    if (!ch) ch = CHAPTERS[0];
    state.ch = ch.id;

    var deck = deckFor(ch.id);
    var total = deck.length;
    var i = Math.min(Math.max(state.i, 0), total - 1);
    state.i = i;

    saved.focus = saved.focus || {};
    saved.focus[ch.id] = i;
    persist();

    unmount();

    var slide = deck[i];
    if (slide.wrap || slide.nodes.length > 1) {
      var w = document.createElement('div');
      w.className = 'card';
      slide.nodes.forEach(function (n) { w.appendChild(n.el); });
      stage.appendChild(w);
    } else {
      slide.nodes.forEach(function (n) { stage.appendChild(n.el); });
    }
    mounted = slide.nodes;

    elEyebrow.textContent = 'Chapitre ' + ch.num + ' · Focus';
    elTitle.textContent = ch.title;
    elLabel.textContent = slide.label || '';
    elCount.textContent = (i + 1) + ' / ' + total;
    elFill.style.width = ((i + 1) / total * 100) + '%';
    view.querySelector('#focusPrev').disabled = i === 0;
    view.querySelector('#focusNext').textContent = i === total - 1 ? 'Chapitre suivant →' : 'Suivant →';
  }

  function go(delta) {
    var deck = deckFor(state.ch);
    var next = state.i + delta;
    if (next < 0) return;
    if (next >= deck.length) {
      var idx = -1;
      for (var k = 0; k < CHAPTERS.length; k++) if (CHAPTERS[k].id === state.ch) idx = k;
      if (idx > -1 && idx < CHAPTERS.length - 1) {
        state.ch = CHAPTERS[idx + 1].id;
        state.i = 0;
        if (typeof window.switchTab === 'function') window.switchTab(state.ch);
        else { setActiveTab(state.ch); render(); }
      }
      return;
    }
    state.i = next;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setActiveTab(id) {
    Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (b) {
      var on = b.id === 'tab-' + id;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
  }

  /* ------------------------------------------------------------------
     TOGGLE
     ------------------------------------------------------------------ */
  function apply(on) {
    state.on = on;
    saved.focusOn = on;
    persist();
    document.body.classList.toggle('is-focus', on);
    var btn = document.getElementById('focusBtn');
    if (btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) render();
    else unmount();
  }

  /* ------------------------------------------------------------------
     WIRING
     ------------------------------------------------------------------ */
  // switchTab est une déclaration de fonction globale : on l'enveloppe pour
  // que le changement d'onglet rafraîchisse aussi la vue focus.
  if (typeof window.switchTab === 'function') {
    var orig = window.switchTab;
    window.switchTab = function (id) {
      orig(id);
      if (state.on) { state.ch = id; state.i = (saved.focus && saved.focus[id]) || 0; render(); }
    };
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('#focusNext')) { go(1); return; }
    if (e.target.closest('#focusPrev')) { go(-1); return; }
    var t = e.target.closest('#focusBtn');
    if (t) { apply(!state.on); return; }
  });

  document.addEventListener('keydown', function (e) {
    if (!state.on) return;
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  // Swipe horizontal sur mobile.
  var x0 = null, y0 = null;
  stage.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) return;
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    var dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) go(dx < 0 ? 1 : -1);
    x0 = y0 = null;
  }, { passive: true });

  // Boot
  state.ch = (saved.last && document.getElementById('panel-' + saved.last)) ? saved.last : CHAPTERS[0].id;
  state.i = (saved.focus && saved.focus[state.ch]) || 0;
  apply(state.on);
  if (state.on) setActiveTab(state.ch);
})();
