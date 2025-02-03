// contentlayer.config.ts
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { visit as visit2 } from "unist-util-visit";
import { codeImport } from "remark-code-import";

// node_modules/@shikijs/compat/dist/index.mjs
import fs from "node:fs";
import fsp from "node:fs/promises";

// node_modules/@shikijs/types/dist/index.mjs
var ShikiError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
};

// node_modules/@shikijs/transformers/dist/index.mjs
function transformerCompactLineOptions(lineOptions = []) {
  return {
    name: "@shikijs/transformers:compact-line-options",
    line(node, line) {
      const lineOption = lineOptions.find((o) => o.line === line);
      if (lineOption?.classes)
        this.addClassToHast(node, lineOption.classes);
      return node;
    }
  };
}
var symbol = Symbol("highlighted-lines");

// node_modules/@shikijs/compat/dist/index.mjs
import { bundledLanguages, bundledThemes, warnDeprecated, createHighlighter, normalizeTheme, tokenizeAnsiWithTheme } from "shiki";
import { normalizeTheme as normalizeTheme2, normalizeTheme as normalizeTheme3 } from "shiki";
var ShikiCompatError = class extends ShikiError {
  constructor(message) {
    super(message);
    this.name = "ShikiCompatError";
  }
};
var _warned = /* @__PURE__ */ new Set();
function warnOnce(message) {
  if (!_warned.has(message)) {
    console.warn(`[shiki-compat]: ${message}`);
    _warned.add(message);
  }
}
function stubFunction(name) {
  return () => {
    warnOnce(`\`${name}\` is a stub function in \`shiki-compat\` and does nothing.`);
  };
}
var setCDN = stubFunction("setCDN");
var setOnigasmWASM = stubFunction("setOnigasmWASM");
var setWasm = stubFunction("setWasm");
var setColorReplacements = stubFunction("setColorReplacements");
async function getHighlighter(options = {}) {
  warnDeprecated(`@shikijs/compat is deprecated and will be removed in v3, please migrate to the main shiki package`);
  const themes = options.themes || [];
  const langs = options.langs || [];
  if (options.theme)
    themes.unshift(options.theme);
  if (!themes.length)
    themes.push("nord");
  if (!langs.length)
    langs.push(...Object.keys(bundledLanguages));
  const shiki = await createHighlighter({
    ...options,
    themes,
    langs
  });
  const defaultTheme = shiki.getLoadedThemes()[0];
  function codeToTokensBase(code, lang, theme, options2) {
    const tokens = shiki.codeToTokensBase(code, {
      includeExplanation: true,
      lang,
      theme: theme || defaultTheme,
      ...options2
    });
    tokens.forEach((line) => {
      line.forEach((token) => {
        token.explanation || (token.explanation = []);
        delete token.offset;
      });
    });
    return tokens;
  }
  function codeToHtml(code, arg1, arg2, options2) {
    const options3 = (typeof arg1 === "string" ? options2 : arg1) || {};
    if (typeof arg1 === "string")
      options3.lang || (options3.lang = arg1);
    if (!("themes" in options3)) {
      options3.theme = "theme" in options3 ? options3.theme || defaultTheme : arg2 || defaultTheme;
    }
    if (options3.lineOptions) {
      options3.transformers || (options3.transformers = []);
      options3.transformers.push(transformerCompactLineOptions(options3.lineOptions));
    }
    return shiki.codeToHtml(code, options3);
  }
  function ansiToThemedTokens(ansi, options2 = {}) {
    const theme = shiki.getTheme(options2.theme || shiki.getLoadedThemes()[0]);
    return tokenizeAnsiWithTheme(theme, ansi);
  }
  return {
    ...shiki,
    ansiToThemedTokens,
    codeToTokensBase,
    codeToThemedTokens: codeToTokensBase,
    codeToHtml,
    ansiToHtml(code, options2) {
      return shiki.codeToHtml(code, {
        lang: "ansi",
        ...options2,
        theme: options2?.theme || defaultTheme
      });
    },
    getBackgroundColor(theme) {
      return shiki.getTheme(theme).bg;
    },
    getForegroundColor(theme) {
      return shiki.getTheme(theme).fg;
    },
    /**
     * @deprecated Not supported by Shiki
     */
    setColorReplacements(..._args) {
      throw new ShikiCompatError("`setColorReplacements` is not supported by @shikijs/compat");
    }
  };
}

// components/rehype/rehype-command.tsx
import { visit } from "unist-util-visit";
function rehypeCommand() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== "element" || node?.tagName !== "pre") {
        return;
      }
      if (node.properties?.["__rawString__"]?.startsWith("npm install")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand.replace("npm install", "yarn add");
        node.properties["__pnpmCommand__"] = npmCommand.replace("npm install", "pnpm add");
        node.properties["__bunCommand__"] = npmCommand.replace("npm install", "bun add");
      }
      if (node.properties?.["__rawString__"]?.startsWith("npx create-")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand.replace("npx create-", "yarn create ");
        node.properties["__pnpmCommand__"] = npmCommand.replace("npx create-", "pnpm create ");
        node.properties["__bunCommand__"] = npmCommand.replace("npx", "bunx --bun");
      }
      if (node.properties?.["__rawString__"]?.startsWith("npm create")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand.replace("npm create", "yarn create");
        node.properties["__pnpmCommand__"] = npmCommand.replace("npm create", "pnpm create");
        node.properties["__bunCommand__"] = npmCommand.replace("npm create", "bun create");
      }
      if (node.properties?.["__rawString__"]?.startsWith("npx") && !node.properties?.["__rawString__"]?.startsWith("npx create-")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand;
        node.properties["__pnpmCommand__"] = npmCommand.replace("npx", "pnpm dlx");
        node.properties["__bunCommand__"] = npmCommand.replace("npx", "bunx --bun");
      }
    });
  };
}

// app/styles/moonlight.json
var moonlight_default = {
  name: "moonlight",
  type: "dark",
  colors: {
    foreground: "#c8d3f5",
    focusBorder: "#82aaff",
    contrastBorder: "#15151b",
    "editorCursor.foreground": "#82aaff",
    "editorRuler.foreground": "#444a73bb",
    "scrollbar.shadow": "#00000022",
    "tree.indentGuidesStroke": "#828bb866",
    "editorLink.activeForeground": "#c8d3f5",
    "selection.background": "#c8d3f5",
    "progressBar.background": "#82aaff",
    "textLink.foreground": "#65bcff",
    "textLink.activeForeground": "#b2dfff",
    "editorLineNumber.foreground": "#444a73",
    "editorLineNumber.activeForeground": "#828bb8",
    "editorBracketMatch.border": "#82aaffbb",
    "editorBracketMatch.background": "#1F2028",
    "editorWhitespace.foreground": "#c8d3f540",
    "editor.background": "#1F2028",
    "editor.foreground": "#c8d3f5",
    "editor.lineHighlightBackground": "#2f334d",
    "editor.selectionBackground": "#828bb850",
    "editor.selectionHighlightBackground": "#444a73",
    "editor.findMatchBackground": "#444a73",
    "editor.findMatchBorder": "#86e1fc",
    "editor.findMatchHighlightBackground": "#444a73",
    "editorOverviewRuler.findMatchForeground": "#86e1fcbb",
    "editorOverviewRuler.errorForeground": "#ff757fcc",
    "editorOverviewRuler.infoForeground": "#65bcff66",
    "editorOverviewRuler.warningForeground": "#ffc777cc",
    "editorOverviewRuler.modifiedForeground": "#82aaff66",
    "editorOverviewRuler.addedForeground": "hsl(var(--green-900) / 0.4)",
    "editorOverviewRuler.deletedForeground": "#ff98a466",
    "editorOverviewRuler.bracketMatchForeground": "#3e68d7bb",
    "editorOverviewRuler.border": "#1F2028",
    "editorHoverWidget.background": "#15151b",
    "editorHoverWidget.border": "#000000aa",
    "editorIndentGuide.background": "#444a73bb",
    "editorIndentGuide.activeBackground": "#828bb8aa",
    "editorGroupHeader.tabsBackground": "#1c1d24",
    "editorGroup.border": "#15151b",
    "editorGutter.modifiedBackground": "#82aaff66",
    "editorGutter.addedBackground": "hsl(var(--green-900) / 0.4)",
    "editorGutter.deletedBackground": "#ff5370aa",
    "tab.activeBorder": "#82aaff",
    "tab.activeModifiedBorder": "#828bb8",
    "tab.unfocusedActiveBorder": "#828bb8",
    "tab.activeForeground": "#c8d3f5",
    "tab.activeBackground": "#1F2028",
    "tab.inactiveForeground": "#828bb8",
    "tab.inactiveBackground": "#1c1d24",
    "tab.unfocusedActiveForeground": "#c8d3f5",
    "tab.border": "#15151b",
    "statusBar.noFolderBackground": "#1F2028",
    "statusBar.border": "#15151b",
    "statusBar.background": "#1c1d24",
    "statusBar.foreground": "#828bb8",
    "statusBar.debuggingBackground": "#baacff",
    "statusBar.debuggingForeground": "#c8d3f5",
    "statusBarItem.hoverBackground": "#828bb820",
    "activityBar.background": "#1c1d24",
    "activityBar.border": "#1F202860",
    "activityBar.foreground": "#b4c2f0",
    "activityBarBadge.background": "#3e68d7",
    "activityBarBadge.foreground": "#ffffff",
    "titleBar.activeBackground": "#1c1d24",
    "titleBar.activeForeground": "#c8d3f5",
    "titleBar.inactiveBackground": "#1c1d24",
    "titleBar.inactiveForeground": "#828bb8",
    "sideBar.background": "#1c1d24",
    "sideBar.foreground": "#828bb8",
    "sideBar.border": "#15151b",
    "titleBar.border": "#15151b",
    "sideBarTitle.foreground": "#c8d3f5",
    "sideBarSectionHeader.background": "#1c1d24",
    "sideBarSectionHeader.border": "#2f334d",
    "input.background": "#15151b",
    "input.foreground": "#c8d3f5",
    "input.placeholderForeground": "#c8d3f5aa",
    "input.border": "#00000066",
    "inputValidation.errorBackground": "#c53b53",
    "inputValidation.errorForeground": "#ffffff",
    "inputValidation.errorBorder": "#ff537050",
    "inputValidation.infoBackground": "#446bbb",
    "inputValidation.infoForeground": "#ffffff",
    "inputValidation.infoBorder": "#82aaff50",
    "inputValidation.warningBackground": "#ad7c43",
    "inputValidation.warningForeground": "#ffffff",
    "inputValidation.warningBorder": "#ffc77750",
    "dropdown.foreground": "#c8d3f5",
    "dropdown.background": "#2f334d",
    "dropdown.border": "#00000066",
    "list.hoverForeground": "#c8d3f5",
    "list.hoverBackground": "#1c1d24",
    "list.activeSelectionBackground": "#383e5c",
    "list.activeSelectionForeground": "#ffffff",
    "list.inactiveSelectionForeground": "#c8d3f5",
    "list.inactiveSelectionBackground": "#292e46",
    "list.focusBackground": "#131421",
    "list.focusForeground": "#c8d3f5",
    "list.highlightForeground": "#86e1fc",
    "list.warningForeground": "#ffc777cc",
    "terminal.foreground": "#bcc4d6",
    "terminal.selectionBackground": "#c8d3f544",
    "terminal.ansiWhite": "#c8d3f5",
    "terminal.ansiBlack": "#000000",
    "terminal.ansiBlue": "#82aaff",
    "terminal.ansiCyan": "#86e1fc",
    "terminal.ansiGreen": "hsl(var(--green-900))",
    "terminal.ansiMagenta": "#fca7ea",
    "terminal.ansiRed": "#ff757f",
    "terminal.ansiYellow": "#ffc777",
    "terminal.ansiBrightWhite": "#c8d3f5",
    "terminal.ansiBrightBlack": "#828bb8",
    "terminal.ansiBrightBlue": "#82aaff",
    "terminal.ansiBrightCyan": "#86e1fc",
    "terminal.ansiBrightGreen": "hsl(var(--green-900))",
    "terminal.ansiBrightMagenta": "#fca7ea",
    "terminal.ansiBrightRed": "#ff757f",
    "terminal.ansiBrightYellow": "#ffc777",
    "terminal.border": "#2f334d",
    "scrollbarSlider.background": "#828bb830",
    "scrollbarSlider.hoverBackground": "#a9b8e830",
    "scrollbarSlider.activeBackground": "#82aaff",
    "minimap.findMatchHighlight": "#86e1fccc",
    "minimap.selectionHighlight": "#86e1fc33",
    "minimapGutter.addedBackground": "hsl(var(--green-900) / 0.4)",
    "minimapGutter.modifiedBackground": "#82aaff66",
    "editorSuggestWidget.background": "#15151b",
    "editorSuggestWidget.foreground": "#a9b8e8",
    "editorSuggestWidget.highlightForeground": "#86e1fc",
    "editorSuggestWidget.selectedBackground": "#2f334d",
    "editorSuggestWidget.border": "#00000033",
    "editorError.foreground": "#ff5370",
    "editorWarning.foreground": "#ffc777cc",
    "editorWidget.background": "#1c1d24",
    "editorWidget.resizeBorder": "#82aaff",
    "editorMarkerNavigation.background": "#c8d3f505",
    "widget.shadow": "#00000033",
    "panel.border": "#00000033",
    "panel.background": "#1c1d24",
    "panel.dropBackground": "#c8d3f5",
    "panelTitle.inactiveForeground": "#828bb8",
    "panelTitle.activeForeground": "#c8d3f5",
    "panelTitle.activeBorder": "#82aaff",
    "terminalCursor.foreground": "#82aaff",
    "diffEditor.insertedTextBackground": "hsl(var(--green-900) / 0.08)",
    "diffEditor.removedTextBackground": "#ff537020",
    "notifications.background": "#15151b",
    "notifications.foreground": "#c8d3f5",
    "notificationLink.foreground": "#82aaff",
    "badge.background": "#3e68d7",
    "badge.foreground": "#ffffff",
    "button.background": "#3e68d7",
    "button.hoverBackground": "#65bcffcc",
    "extensionButton.prominentBackground": "#3e68d7",
    "extensionButton.prominentHoverBackground": "#65bcffcc",
    "peekView.border": "#00000030",
    "peekViewEditor.background": "#c8d3f505",
    "peekViewTitle.background": "#c8d3f505",
    "peekViewResult.background": "#c8d3f505",
    "peekViewEditorGutter.background": "#c8d3f505",
    "peekViewTitleDescription.foreground": "#c8d3f560",
    "peekViewResult.matchHighlightBackground": "#828bb850",
    "peekViewEditor.matchHighlightBackground": "#828bb850",
    "debugToolBar.background": "#1c1d24",
    "pickerGroup.foreground": "#82aaff",
    "gitDecoration.deletedResourceForeground": "#ff5370dd",
    "gitDecoration.conflictingResourceForeground": "#ffc777cc",
    "gitDecoration.modifiedResourceForeground": "#82aaffee",
    "gitDecoration.untrackedResourceForeground": "#77e0c6dd",
    "gitDecoration.ignoredResourceForeground": "#777fabaa",
    "gitlens.trailingLineForegroundColor": "#828bb8aa",
    "editorCodeLens.foreground": "#828bb8",
    "peekViewResult.selectionBackground": "#828bb870",
    "breadcrumb.background": "#1F2028",
    "breadcrumb.foreground": "#828bb8",
    "breadcrumb.focusForeground": "#c8d3f5",
    "breadcrumb.activeSelectionForeground": "#82aaff",
    "breadcrumbPicker.background": "#1c1d24",
    "menu.background": "#1c1d24",
    "menu.foreground": "#c8d3f5",
    "menu.selectionBackground": "#00000050",
    "menu.selectionForeground": "#82aaff",
    "menu.selectionBorder": "#00000030",
    "menu.separatorBackground": "#c8d3f5",
    "menubar.selectionBackground": "#00000030",
    "menubar.selectionForeground": "#82aaff",
    "menubar.selectionBorder": "#00000030",
    "settings.dropdownForeground": "#c8d3f5",
    "settings.dropdownBackground": "#2f334d",
    "settings.dropdownBorder": "#15151b",
    "settings.numberInputForeground": "#c8d3f5",
    "settings.numberInputBackground": "#15151b",
    "settings.numberInputBorder": "#00000066",
    "settings.textInputForeground": "#c8d3f5",
    "settings.textInputBackground": "#15151b",
    "settings.textInputBorder": "#00000066",
    "settings.headerForeground": "#82aaff",
    "settings.modifiedItemIndicator": "#82aaff",
    "settings.checkboxBackground": "#131421",
    "settings.checkboxForeground": "#c8d3f5",
    "settings.checkboxBorder": "#00000066"
  },
  tokenColors: [
    {
      name: "Comment",
      scope: ["comment", "punctuation.definition.comment", "string.quoted.docstring"],
      settings: {
        foreground: "#858aa6"
      }
    },
    {
      name: "Variables and Plain Text",
      scope: ["variable", "support.variable", "string constant.other.placeholder", "text.html"],
      settings: {
        foreground: "hsl(var(--gray-1000))"
      }
    },
    {
      name: "DOM Variables",
      scope: ["support.variable.dom", "support.constant.math", "support.type.object.module", "support.variable.object.process", "support.constant.json"],
      settings: {
        foreground: "#ffc777"
      }
    },
    {
      name: "Nil",
      scope: ["constant.language.undefined", "constant.language.null"],
      settings: {
        foreground: "hsl(var(--pink-900))",
        fontStyle: "italic"
      }
    },
    {
      name: "PHP Constants",
      scope: ["constant.other.php"],
      settings: {
        foreground: "#ffc777"
      }
    },
    {
      name: "Colors",
      scope: ["constant.other.color"],
      settings: {
        foreground: "#ffffff"
      }
    },
    {
      name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: {
        foreground: "#ff5370"
      }
    },
    {
      name: "Invalid deprecated",
      scope: ["invalid.deprecated"],
      settings: {
        foreground: "#c099ff"
      }
    },
    {
      name: "Keyword, Storage",
      scope: ["keyword", "keyword.other.important"],
      settings: {
        foreground: "hsl(var(--purple-900))"
      }
    },
    {
      name: "Keyword, Storage",
      scope: ["storage.type", "storage.modifier", "keyword.control"],
      settings: {
        foreground: "hsl(var(--pink-900))",
        fontStyle: "italic"
      }
    },
    {
      name: "Keyword, Storage",
      scope: ["keyword.control", "storage"],
      settings: {}
    },
    {
      name: "Interpolation",
      scope: ["punctuation.definition.template-expression", "punctuation.section.embedded", "punctuation.definition.tag"],
      settings: {
        foreground: "hsl(var(--gray-1000))"
      }
    },
    {
      name: "Spread",
      scope: ["keyword.operator.spread", "keyword.operator.rest"],
      settings: {
        foreground: "hsl(var(--pink-900))",
        fontStyle: "bold"
      }
    },
    {
      name: "Operator, Misc",
      scope: ["punctuation", "punctuation.definition.string", "punctuation.definition.tag"],
      settings: {
        foreground: "hsl(var(--gray-900))"
      }
    },
    {
      name: "Operator, Misc",
      scope: [
        "keyword.operator",
        "keyword.control",
        "punctuation.support.type.property-name",
        "text.html.vue-html meta.tag",
        "punctuation.definition.keyword",
        "punctuation.terminator.rule",
        "punctuation.definition.entity",
        "constant.other.color",
        "meta.tag",
        "punctuation.separator.inheritance.php",
        "punctuation.definition.block.tag",
        "punctuation.definition.tag.html",
        "punctuation.definition.tag.begin.html",
        "punctuation.definition.tag.end.html",
        "meta.property-list",
        "meta.brace.square",
        "keyword.other.template",
        "keyword.other.substitution"
      ],
      settings: {
        foreground: "hsl(var(--pink-900))"
      }
    },
    {
      name: "Keyword Control",
      scope: ["keyword.control"],
      settings: {}
    },
    {
      name: "Tag",
      scope: ["entity.name.tag", "meta.tag", "markup.deleted.git_gutter"],
      settings: {
        foreground: "hsl(var(--pink-900))"
      }
    },
    {
      name: "Function, Special Method",
      scope: ["entity.name.function", "variable.function", "keyword.other.special-method"],
      settings: {
        foreground: "hsl(var(--amber-600))"
      }
    },
    {
      name: "Support Function",
      scope: ["support.function", "meta.function-call entity.name.function"],
      settings: {
        foreground: "hsl(var(--amber-600))"
      }
    },
    {
      name: "C-related Block Level Variables",
      scope: ["source.cpp meta.block variable.other"],
      settings: {
        foreground: "#ff757f"
      }
    },
    {
      name: "Other Variable, String Link",
      scope: ["support.other.variable", "string.other.link"],
      settings: {
        foreground: "#ff757f"
      }
    },
    {
      name: "Constant, Function Argument, Tag Attribute, Embedded",
      scope: [
        "variable.other.constant",
        "constant.language",
        "keyword.other.type.php",
        "storage.type.php",
        "support.constant",
        "constant.character",
        "constant.escape",
        "keyword.other.unit"
      ],
      settings: {
        foreground: "hsl(var(--purple-900))"
      }
    },
    {
      name: "Number, Boolean",
      scope: ["constant.numeric", "constant.language.boolean", "constant.language.json", "constant.language.infinity", "constant.language.nan"],
      settings: {
        foreground: "hsl(var(--purple-900))",
        fontStyle: "italic"
      }
    },
    {
      name: "Function Argument",
      scope: ["variable.parameter.function.language.special", "variable.parameter", "meta.function.parameter variable"],
      settings: {
        foreground: "hsl(var(--amber-700))",
        fontStyle: "italic"
      }
    },
    {
      name: "String, Symbols, Inherited Class, Markup Heading",
      scope: [
        "string",
        "constant.other.symbol",
        "constant.other.key",
        "entity.other.inherited-class",
        "markup.heading",
        "markup.inserted.git_gutter",
        "meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
        "meta.attribute-selector"
      ],
      settings: {
        fontStyle: "",
        foreground: "hsl(var(--green-900))"
      }
    },
    {
      name: "Object",
      scope: ["variable.other.object"],
      settings: {
        foreground: "hsl(var(--gray-1000))"
      }
    },
    {
      name: "Object Key",
      scope: [
        "string.alias.graphql",
        "string.unquoted.graphql",
        "string.unquoted.alias.graphql",
        "meta.field.declaration.ts variable.object.property",
        "variable.object.property"
      ],
      settings: {
        foreground: "hsl(var(--gray-1000))"
      }
    },
    {
      name: "Object Key",
      scope: ["meta.object-literal.key"],
      settings: {
        foreground: "hsl(var(--amber-700))",
        fontStyle: "italic"
      }
    },
    {
      name: "Nested Object Property",
      scope: ["meta.object.member", "variable.other.object.property"],
      settings: {
        foreground: "hsl(var(--gray-1000))"
      }
    },
    {
      name: "Object Property",
      scope: ["variable.other.property", "support.variable.property", "support.variable.property.dom"],
      settings: {
        foreground: "hsl(var(--gray-1000))"
      }
    },
    {
      name: "Haskell Constants",
      scope: ["source.haskell constant.other.haskell"],
      settings: {
        foreground: "#ff98a4"
      }
    },
    {
      name: "Haskell Imports",
      scope: ["source.haskell meta.import.haskell entity.name.namespace"],
      settings: {
        foreground: "#c8d3f5"
      }
    },
    {
      name: "Types Fixes",
      scope: ["source.haskell storage.type", "source.c storage.type", "source.java storage.type"],
      settings: {
        foreground: "#ffc777"
      }
    },
    {
      name: "Lambda Arrow",
      scope: ["storage.type.function"],
      settings: {
        foreground: "hsl(var(--pink-900))"
      }
    },
    {
      name: "Class, Support",
      scope: [
        "entity.name",
        "support.type",
        "support.class",
        "support.orther.namespace.use.php",
        "meta.use.php",
        "support.other.namespace.php",
        "markup.changed.git_gutter",
        "entity.other.inherited-class",
        "support.type.sys-types"
      ],
      settings: {
        foreground: "hsl(var(--blue-1000))"
      }
    },
    {
      name: "Entity types",
      scope: ["support.type"],
      settings: {
        foreground: "hsl(var(--blue-1000))"
      }
    },
    {
      name: "CSS Class and Support",
      scope: [
        "source.css support.type.property-name",
        "source.sass support.type.property-name",
        "source.scss support.type.property-name",
        "source.less support.type.property-name",
        "source.stylus support.type.property-name",
        "source.postcss support.type.property-name",
        "support.type.property-name.css",
        "support.type.vendored.property-name"
      ],
      settings: {
        foreground: "#82aaff"
      }
    },
    {
      name: "Sub-methods",
      scope: ["entity.name.module.js", "variable.import.parameter.js", "variable.other.class.js"],
      settings: {
        foreground: "#ff757f"
      }
    },
    {
      name: "Language methods",
      scope: ["variable.language"],
      settings: {
        foreground: "#ff757f"
      }
    },
    {
      name: "entity.name.method.js",
      scope: ["entity.name.method.js"],
      settings: {
        foreground: "#82aaff"
      }
    },
    {
      name: "meta.method.js",
      scope: ["meta.class-method.js entity.name.function.js", "variable.function.constructor"],
      settings: {
        foreground: "#82aaff"
      }
    },
    {
      name: "Attributes",
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: "hsl(var(--amber-600))",
        fontStyle: "italic"
      }
    },
    {
      name: "HTML Attributes",
      scope: ["text.html.basic entity.other.attribute-name.html", "text.html.basic entity.other.attribute-name"],
      settings: {
        foreground: "#ffc777"
      }
    },
    {
      name: "HTML Doctype",
      scope: ["meta.tag.metadata.doctype entity.name.tag", "meta.tag.metadata.doctype entity.other.attribute-name"],
      settings: {
        foreground: "#c099ff"
      }
    },
    {
      name: "CSS Classes",
      scope: ["entity.other.attribute-name.class"],
      settings: {
        foreground: "#ffc777"
      }
    },
    {
      name: "CSS ID's",
      scope: ["source.sass keyword.control"],
      settings: {
        foreground: "#82aaff"
      }
    },
    {
      name: "CSS psuedo selectors",
      scope: ["entity.other.attribute-name.pseudo-class", "entity.other.attribute-name.pseudo-element"],
      settings: {
        foreground: "#4fd6be"
      }
    },
    {
      name: "CSS Property value",
      scope: ["support.constant.property-value"],
      settings: {
        foreground: "#fca7ea"
      }
    },
    {
      name: "Inserted",
      scope: ["markup.inserted"],
      settings: {
        foreground: "hsl(var(--green-900))"
      }
    },
    {
      name: "Deleted",
      scope: ["markup.deleted"],
      settings: {
        foreground: "#ff757f"
      }
    },
    {
      name: "Changed",
      scope: ["markup.changed"],
      settings: {
        foreground: "#c099ff"
      }
    },
    {
      name: "Regular Expressions",
      scope: ["string.regexp"],
      settings: {
        foreground: "#b4f9f8"
      }
    },
    {
      name: "Regular Expressions - Punctuation",
      scope: ["punctuation.definition.group"],
      settings: {
        foreground: "#ff757f"
      }
    },
    {
      name: "Regular Expressions - Character Class",
      scope: ["constant.other.character-class.regexp", "keyword.control.anchor.regexp"],
      settings: {
        foreground: "#c099ff"
      }
    },
    {
      name: "Regular Expressions - Character Class Set",
      scope: ["constant.other.character-class.set.regexp"],
      settings: {
        foreground: "#ffc777"
      }
    },
    {
      name: "Regular Expressions - Quantifier",
      scope: ["keyword.operator.quantifier.regexp"],
      settings: {
        foreground: "#fca7ea"
      }
    },
    {
      name: "Escape Characters",
      scope: ["constant.character.escape"],
      settings: {
        foreground: "#86e1fc"
      }
    },
    {
      name: "URL",
      scope: ["*url*", "*link*", "*uri*"],
      settings: {
        fontStyle: "underline"
      }
    },
    {
      name: "Decorators",
      scope: ["tag.decorator.js entity.name.tag.js", "tag.decorator.js punctuation.definition.tag.js"],
      settings: {
        foreground: "#82aaff"
      }
    },
    {
      name: "CSS Units",
      scope: ["keyword.other.unit"],
      settings: {
        foreground: "#fc7b7b"
      }
    },
    {
      name: "ES7 Bind Operator",
      scope: ["source.js constant.other.object.key.js string.unquoted.label.js"],
      settings: {
        foreground: "#ff757f"
      }
    },
    {
      name: "JSON Key - Level 0",
      scope: ["source.json meta.structure.dictionary.json support.type.property-name.json"],
      settings: {
        foreground: "#82aaff"
      }
    },
    {
      name: "JSON Key - Level 1",
      scope: ["source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"],
      settings: {
        foreground: "#65bcff"
      }
    },
    {
      name: "JSON Key - Level 2",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
      ],
      settings: {
        foreground: "#ff757f"
      }
    },
    {
      name: "JSON Key - Level 3",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
      ],
      settings: {
        foreground: "#fca7ea"
      }
    },
    {
      name: "JSON Key - Level 4",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
      ],
      settings: {
        foreground: "#ffc777"
      }
    },
    {
      name: "JSON Key - Level 5",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
      ],
      settings: {
        foreground: "#4fd6be"
      }
    },
    {
      name: "JSON Key - Level 6",
      scope: [
        "source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
      ],
      settings: {
        foreground: "#82aaff"
      }
    },
    {
      name: "Plain Punctuation",
      scope: ["punctuation.definition.list_item.markdown"],
      settings: {
        foreground: "#828bb8"
      }
    },
    {
      name: "Block Punctuation",
      scope: ["meta.block", "punctuation.definition.block", "punctuation.definition.parameters", "punctuation.section.function"],
      settings: {
        foreground: "hsl(var(--gray-1000))"
      }
    },
    {
      name: "Block Punctuation",
      scope: ["meta.brace"],
      settings: {
        foreground: "hsl(var(--blue-900))"
      }
    },
    {
      name: "Markdown - Plain",
      scope: ["meta.jsx.children", "meta.embedded.block"],
      settings: {
        foreground: "hsl(var(--color))"
      }
    },
    {
      name: "Markdown - Markup Raw Inline",
      scope: ["text.html.markdown markup.inline.raw.markdown"],
      settings: {
        foreground: "#c099ff"
      }
    },
    {
      name: "Markdown - Markup Raw Inline Punctuation",
      scope: ["text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown"],
      settings: {
        foreground: "#86e1fc"
      }
    },
    {
      name: "Markdown - Heading punctuation",
      scope: ["markdown.heading", "markup.heading | markup.heading entity.name", "markup.heading.markdown punctuation.definition.heading.markdown"],
      settings: {
        foreground: "#86e1fc"
      }
    },
    {
      name: "Markup - Italic",
      scope: ["markup.italic"],
      settings: {
        fontStyle: "italic",
        foreground: "#ff757f"
      }
    },
    {
      name: "Markup - Bold",
      scope: ["markup.bold", "markup.bold string"],
      settings: {
        fontStyle: "bold",
        foreground: "#ff757f"
      }
    },
    {
      name: "Markup - Bold-Italic",
      scope: [
        "markup.bold markup.italic",
        "markup.italic markup.bold",
        "markup.quote markup.bold",
        "markup.bold markup.italic string",
        "markup.italic markup.bold string",
        "markup.quote markup.bold string"
      ],
      settings: {
        fontStyle: "bold",
        foreground: "#ff757f"
      }
    },
    {
      name: "Markup - Underline",
      scope: ["markup.underline"],
      settings: {
        fontStyle: "underline",
        foreground: "#ff966c"
      }
    },
    {
      name: "Markdown - Blockquote",
      scope: ["markup.quote punctuation.definition.blockquote.markdown"],
      settings: {
        foreground: "#86e1fc"
      }
    },
    {
      name: "Markup - Quote",
      scope: ["markup.quote"],
      settings: {
        fontStyle: "italic"
      }
    },
    {
      name: "Markdown - Link",
      scope: ["string.other.link.title.markdown"],
      settings: {
        foreground: "#82aaff"
      }
    },
    {
      name: "Markdown - Link Description",
      scope: ["string.other.link.description.title.markdown"],
      settings: {
        foreground: "#c099ff"
      }
    },
    {
      name: "Markdown - Link Anchor",
      scope: ["constant.other.reference.link.markdown"],
      settings: {
        foreground: "#ffc777"
      }
    },
    {
      name: "Markup - Raw Block",
      scope: ["markup.raw.block"],
      settings: {
        foreground: "#c099ff"
      }
    },
    {
      name: "Markdown - Fenced Bode Block Variable",
      scope: ["markup.fenced_code.block.markdown", "markup.inline.raw.string.markdown"],
      settings: {
        foreground: "#86e1fc"
      }
    },
    {
      name: "Markdown - Fenced Language",
      scope: ["variable.language.fenced.markdown"],
      settings: {
        foreground: "#86e1fc"
      }
    },
    {
      name: "Markdown - Separator",
      scope: ["meta.separator"],
      settings: {
        fontStyle: "bold",
        foreground: "#86e1fc"
      }
    },
    {
      name: "Markup - Table",
      scope: ["markup.table"],
      settings: {
        foreground: "#828bb8"
      }
    },
    {
      scope: "token.info-token",
      settings: {
        foreground: "#65bcff"
      }
    },
    {
      scope: "token.warn-token",
      settings: {
        foreground: "#ffc777"
      }
    },
    {
      scope: "token.error-token",
      settings: {
        foreground: "#ff757f"
      }
    },
    {
      scope: "token.debug-token",
      settings: {
        foreground: "#c099ff"
      }
    }
  ]
};

// contentlayer.config.ts
var computedFields = {
  slug: {
    type: "string",
    // resolve: doc => `/${doc._raw.flattenedPath}`,
    resolve: (doc) => `${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  url: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  }
};
var LinksProperties = defineNestedType(() => ({
  name: "LinksProperties",
  fields: {
    doc: {
      type: "string"
    },
    api: {
      type: "string"
    }
  }
}));
var Docs = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    description: {
      type: "string",
      required: false
    },
    published: {
      type: "boolean",
      default: false
    },
    summary: {
      type: "string",
      required: false
    },
    links: {
      type: "nested",
      of: LinksProperties
    },
    featured: {
      type: "boolean",
      default: false,
      required: false
    },
    component: {
      type: "boolean",
      default: false,
      required: false
    },
    toc: {
      type: "boolean",
      default: true,
      required: false
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "md",
  documentTypes: [Docs],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      // rehypeComponent,
      () => (tree) => {
        visit2(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
            if (codeEl.tagName !== "code") return;
            if (codeEl.data?.meta) {
              const regex = /event="([^"]*)"/;
              const match = codeEl.data?.meta.match(regex);
              if (match) {
                node.__event__ = match ? match[1] : null;
                codeEl.data.meta = codeEl.data.meta.replace(regex, "");
              }
            }
            node.__rawString__ = codeEl.children?.[0].value;
            node.__src__ = node.properties?.__src__;
            node.__style__ = node.properties?.__style__;
          }
        });
      },
      rehypeStringify,
      [
        rehypePrettyCode,
        {
          grid: true,
          theme: moonlight_default,
          keepBackground: false,
          highlightLines: true,
          tokensMap: {
            fn: "entity.name.function"
          },
          getHighlighter,
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          }
        }
      ],
      () => (tree) => {
        visit2(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }
            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }
            preElement.properties["__withMeta__"] = node.children.at(0).tagName === "figure";
            preElement.properties["__rawString__"] = node.__rawString__;
            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__;
            }
            if (node.__event__) {
              preElement.properties["__event__"] = node.__event__;
            }
            if (node.__style__) {
              preElement.properties["__style__"] = node.__style__;
            }
          }
        });
      },
      rehypeCommand,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor", "anchor_id text-color flex flex-row-reverse items-center gap-2"],
            ariaLabel: "Link to section"
          },
          content: [
            {
              type: "element",
              tagName: "svg",
              properties: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "17",
                height: "17",
                fillRule: "evenodd",
                clipRule: "evenodd",
                fill: "currentColor",
                viewBox: "0 0 15 15",
                className: ""
              },
              children: [
                {
                  type: "element",
                  tagName: "path",
                  properties: {
                    d: "M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
                  }
                }
              ]
            }
          ]
        }
      ]
      // rehypeCssBlocks
    ]
  }
});
export {
  computedFields,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-77YPPXLS.mjs.map
