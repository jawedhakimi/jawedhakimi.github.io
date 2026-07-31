(function (global) {
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function create(config) {
    var root = typeof config.root === "string" ? document.getElementById(config.root) : config.root;
    if (!root) return;
    root.classList.add("calc");
    root.innerHTML = "";

    var row = el("div", "row");
    var inputEls = {};
    (config.inputs || []).forEach(function (inp) {
      var wrap = el("div");
      var label = el("label", null, inp.label);
      var input = el("input");
      input.type = "number";
      input.value = inp.value;
      if (inp.min !== undefined) input.min = inp.min;
      if (inp.step !== undefined) input.step = inp.step;
      inputEls[inp.id] = input;
      wrap.appendChild(label);
      wrap.appendChild(input);
      row.appendChild(wrap);
    });
    root.appendChild(row);

    var outRow = el("div", "out-row");
    var outEls = {};
    (config.outputs || []).forEach(function (out) {
      var wrap = el("div", "out");
      var num = el("div", "num", "-");
      var lbl = el("div", "lbl", out.label);
      outEls[out.id] = num;
      wrap.appendChild(num);
      wrap.appendChild(lbl);
      outRow.appendChild(wrap);
    });
    root.appendChild(outRow);

    function recompute() {
      var values = {};
      Object.keys(inputEls).forEach(function (id) {
        values[id] = parseFloat(inputEls[id].value) || 0;
      });
      var results = {};
      try {
        results = config.compute(values) || {};
      } catch (e) {
        results = {};
      }
      Object.keys(outEls).forEach(function (id) {
        outEls[id].textContent = results[id] !== undefined ? results[id] : "-";
      });
    }

    Object.keys(inputEls).forEach(function (id) {
      inputEls[id].addEventListener("input", recompute);
    });
    recompute();
  }

  global.Calc = { create: create };
})(window);
