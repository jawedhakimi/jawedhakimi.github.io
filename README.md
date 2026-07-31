# The Bench Notebook — source

Quarto project. `docs/` is the built site GitHub Pages serves; everything else is source.

## Structure

Each top-level folder is one chapter/section, matching the sidebar in `_quarto.yml`:

```
electrical-engineering/   one .qmd file per note, plus index.qmd as the chapter landing page
magnetics/
integrated-circuits/
microcontrollers/
software/
assets/
  css/styles.css          shared site styles (cards, calculator layout)
  js/calc-engine.js        shared calculator component, loaded on every page
  img/                     shared images and gifs
```

## Adding a new note

1. Create `<chapter>/<note-name>.qmd` (or a new top-level folder for a new chapter).
2. Add it to the `sidebar.contents` list in `_quarto.yml`.
3. Write the note: prose + `$$...$$` for LaTeX (Quarto renders this natively, no setup needed).
4. If it needs a calculator, add a raw HTML block:

```
<div id="my-calc"></div>
<script>
Calc.create({
  root: "my-calc",
  inputs: [{ id: "x", label: "X", value: 1, min: 0, step: 0.1 }],
  outputs: [{ id: "y", label: "Y" }],
  compute: function (v) { return { y: (v.x * 2).toFixed(2) }; }
});
</script>
```

`Calc.create` builds the input row and output cards for you — you only ever write the `compute` function. This is defined once in `assets/js/calc-engine.js` and reused everywhere, so calculator styling/behavior changes happen in one file.

## Build and deploy

```
quarto render
git add -A && git commit -m "..."
git push
```

`quarto render` regenerates `docs/`. GitHub Pages is configured to serve `main` branch, `/docs` folder, so a push is the entire deploy step.

## Migrating away from Quarto later

Content is plain Markdown + LaTeX in `.qmd` files (Pandoc markdown, readable by nearly any static site generator). The calculators are vanilla HTML/JS with no Quarto-specific APIs — copy the `<div>` + `<script>` block and `calc-engine.js` into any other site. The only Quarto-specific pieces are `_quarto.yml` (nav/sidebar config) and `custom.scss` (theme) — both replaceable independently of the content.
