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

// ui/rehype/rehype-command.tsx
import * as React33 from "react";

// ui/tabs.tsx
import * as React3 from "react";

// hooks/use-id.ts
import React2, { useState, useEffect, useLayoutEffect } from "react";
var useIsomorphicEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;
var __useId = React2["useId".toString()] || (() => void 0);
function useReactId() {
  const id = __useId();
  return id ? `${id.replace(/:/g, "")}` : "";
}
function randomId() {
  return `${Math.random().toString(36).slice(2, 11)}`;
}
function useId(staticId) {
  const reactId = useReactId();
  const [uuid, setUuid] = useState(reactId);
  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);
  if (typeof staticId === "string") {
    return staticId;
  }
  if (typeof window === "undefined") {
    return reactId;
  }
  return uuid;
}

// hooks/use-uncontrolled.ts
import { useState as useState2 } from "react";
function useUncontrolled({ value, defaultValue, finalValue, onChange = () => {
} }) {
  const [uncontrolledValue, setUncontrolledValue] = useState2(defaultValue !== void 0 ? defaultValue : finalValue);
  const handleUncontrolledChange = (val, ...payload) => {
    setUncontrolledValue(val);
    onChange?.(val, ...payload);
  };
  if (value !== void 0) {
    return [value, onChange, true];
  }
  return [uncontrolledValue, handleUncontrolledChange, false];
}

// ui/tabs.tsx
import { cvx, rem, ocx } from "cretex";

// lib/utils.ts
import x from "cretex";
import { twMerge } from "tailwind-merge";
function cn(...merge) {
  return twMerge(x.cnx(...merge));
}

// ui/tabs.tsx
var classes = cvx({
  variants: {
    selector: {
      root: "stylelayer-tabs",
      tab: "tabs-tab data-[active]:text-color",
      tabLabel: "tabs-tab-label",
      tabSection: "tabs-tab-section",
      panel: "tabs-panel",
      list: "tabs-list flex flex-wrap [justify-content:--tabs-justify,flex-start] [gap:--tabs-list-gap] [--tab-grow:unset] flex-row data-[orientation=vertical]:flex-col"
    },
    variant: { default: "default", outline: "outline", pills: "pills" }
  }
});
var ctx = React3.createContext(void 0);
var useTabs = () => React3.useContext(ctx);
var VALUE_ERROR = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value";
var Tabs = React3.forwardRef((_props, ref) => {
  const {
    defaultValue,
    value,
    onChange,
    children,
    id,
    classNames,
    styles,
    unstyled,
    round: round2 = 6,
    loop = true,
    inverted = false,
    keepMounted = true,
    activateTabWithKeyboard = true,
    allowTabDeactivation = false,
    orientation = "horizontal",
    color = "hsl(var(--color))",
    variant = "default",
    placement = "left",
    dir = "ltr",
    ...props
  } = _props;
  const uid = useId(id);
  const [currentTab, setCurrentTab] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const stylesApi = { dir, unstyled, classNames, styles };
  return /* @__PURE__ */ React3.createElement(
    ctx.Provider,
    {
      value: {
        placement,
        value: currentTab,
        orientation,
        id: uid,
        loop,
        activateTabWithKeyboard,
        getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
        getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
        onChange: setCurrentTab,
        allowTabDeactivation,
        variant,
        round: round2,
        inverted,
        keepMounted,
        getStyles,
        color,
        ...stylesApi
      }
    },
    /* @__PURE__ */ React3.createElement(
      Root,
      {
        ...{
          ref,
          id: uid,
          color: typeof color === "object" ? void 0 : color,
          ...stylesApi,
          ...props
        }
      },
      children
    )
  );
});
Tabs.displayName = "Tabs";
var Root = React3.forwardRef((_props, ref) => {
  const { unstyled, className, classNames, style, styles, dir, ...props } = _props;
  const { unstyled: _unstyled, classNames: _classNames, styles: _styles, ...ctx3 } = useTabs();
  const stylesApi = { className, style, unstyled: unstyled || _unstyled, classNames: classNames || _classNames, styles: styles || _styles, ...ctx3 };
  return /* @__PURE__ */ React3.createElement("div", { ...{ ref, dir: dir || ctx3?.dir, ...ctx3.getStyles("root", stylesApi), ...props } });
});
Root.displayName = "Tabs/Root";
var TabsList = React3.forwardRef((_props, ref) => {
  const { role = "tablist", unstyled, className, classNames, style, styles, dir, grow, justify, ...props } = _props;
  const { unstyled: _unstyled, classNames: _classNames, styles: _styles, ...ctx3 } = useTabs();
  const stylesApi = {
    className,
    style: { "--tabs-justify": justify, ...style },
    unstyled: unstyled || _unstyled,
    classNames: classNames || _classNames,
    styles: styles || _styles,
    ...ctx3
  };
  return /* @__PURE__ */ React3.createElement(
    "div",
    {
      ...{
        ref,
        role,
        "data-grow": grow ? "true" : void 0,
        dir: dir || ctx3?.dir,
        // "data-active": "" ? "true" : undefined,
        ...ctx3.getStyles("list", stylesApi),
        ...props
      }
    }
  );
});
TabsList.displayName = "Tabs/TabsList";
var TabsTab = React3.forwardRef((_props, ref) => {
  const {
    role = "tab",
    type = "button",
    tabIndex,
    "aria-selected": arsel,
    "aria-controls": arcon,
    "aria-disabled": ardis,
    children,
    rightSection,
    leftSection,
    value,
    onClick,
    onKeyDown,
    disabled,
    color,
    unstyled,
    className,
    classNames,
    style,
    styles,
    dir,
    id,
    ...props
  } = _props;
  const { unstyled: _unstyled, classNames: _classNames, styles: _styles, ...ctx3 } = useTabs();
  const active = value === ctx3.value;
  const activateTab = (event) => {
    ctx3.onChange(ctx3.allowTabDeactivation ? value === ctx3.value ? null : value : value);
    onClick?.(event);
  };
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    const elements = Array.from(findElementAncestor(event.currentTarget, '[role="tablist"]')?.querySelectorAll('[role="tab"]') || []).filter(
      (node) => onSameLevel(event.currentTarget, node, '[role="tablist"]')
    );
    const current = elements.findIndex((el) => event.currentTarget === el);
    const _nextIndex = getNextIndex(current, elements, ctx3.loop);
    const _previousIndex = getPreviousIndex(current, elements, ctx3.loop);
    const nextIndex = dir === "rtl" ? _previousIndex : _nextIndex;
    const previousIndex = dir === "rtl" ? _nextIndex : _previousIndex;
    const orientation = ctx3.orientation || "horizontal";
    switch (event.key) {
      case "ArrowRight": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[nextIndex].focus();
          ctx3.activateTabWithKeyboard && elements[nextIndex].click();
        }
        break;
      }
      case "ArrowLeft": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[previousIndex].focus();
          ctx3.activateTabWithKeyboard && elements[previousIndex].click();
        }
        break;
      }
      case "ArrowUp": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_previousIndex].focus();
          ctx3.activateTabWithKeyboard && elements[_previousIndex].click();
        }
        break;
      }
      case "ArrowDown": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_nextIndex].focus();
          ctx3.activateTabWithKeyboard && elements[_nextIndex].click();
        }
        break;
      }
      case "Home": {
        event.stopPropagation();
        event.preventDefault();
        !elements[0].disabled && elements[0].focus();
        break;
      }
      case "End": {
        event.stopPropagation();
        event.preventDefault();
        const last = elements.length - 1;
        !elements[last].disabled && elements[last].focus();
        break;
      }
    }
  };
  const stylesApi = {
    unstyled: unstyled || _unstyled,
    classNames: classNames || _classNames,
    styles: styles || _styles,
    ...ctx3
  };
  return /* @__PURE__ */ React3.createElement(
    "button",
    {
      ...{
        ref,
        role,
        type,
        disabled,
        id: id || ctx3.getTabId(value),
        dir: dir || ctx3?.dir,
        "aria-disabled": ardis || disabled,
        "aria-selected": arsel || active,
        "aria-controls": arcon || ctx3.getPanelId(value),
        "data-active": active ? "true" : void 0,
        "data-disabled": disabled ? "true" : void 0,
        tabIndex: tabIndex || active || ctx3.value === null ? 0 : -1,
        onClick: activateTab,
        onKeyDown: handleKeyDown,
        ...ctx3.getStyles("tab", { className, style: { "--tabs-color": color, ...style }, ...stylesApi }),
        ...props
      }
    },
    leftSection && /* @__PURE__ */ React3.createElement("span", { ...ctx3.getStyles("tabSection", stylesApi), "data-position": "left" }, leftSection),
    children && /* @__PURE__ */ React3.createElement("span", { ...ctx3.getStyles("tabLabel", stylesApi) }, children),
    rightSection && /* @__PURE__ */ React3.createElement("span", { ...ctx3.getStyles("tabSection", stylesApi), "data-position": "right" }, rightSection)
  );
});
TabsTab.displayName = "Tabs/TabsTab";
var TabsPanel = React3.forwardRef((_props, ref) => {
  const { role = "tabpanel", "aria-labelledby": arlab, unstyled, className, classNames, style, styles, dir, value, keepMounted, children, id, ...props } = _props;
  const { unstyled: _unstyled, classNames: _classNames, styles: _styles, ...ctx3 } = useTabs();
  const active = ctx3.value === value;
  const content = ctx3.keepMounted || keepMounted ? children : active ? children : null;
  const stylesApi = {
    className,
    style: ocx([style, !active && { display: "none" }]),
    unstyled: unstyled || _unstyled,
    classNames: classNames || _classNames,
    styles: styles || _styles,
    ...ctx3
  };
  return /* @__PURE__ */ React3.createElement(
    "div",
    {
      ...{
        ref,
        role,
        dir: dir || ctx3?.dir,
        id: id || ctx3.getPanelId(value),
        "aria-labelledby": arlab || ctx3.getTabId(value),
        ...ctx3.getStyles("panel", stylesApi),
        ...props,
        hidden: !active
      }
    },
    content
  );
});
TabsPanel.displayName = "Tabs/TabsPanel";
function getStyles(selector, options = {}) {
  const { className, classNames, color, style, styles, unstyled, round: round2, orientation, inverted, placement, variant } = options;
  function selected(select, state) {
    return selector === select ? state : void 0;
  }
  const dataShared = { "data-placement": orientation === "vertical" && placement ? placement : void 0 };
  const unstyle = typeof unstyled === "object" ? unstyled?.[selector] : unstyled;
  return {
    "data-tabs": cn(selector),
    "data-orientation": orientation,
    "data-variant": variant,
    ...selected("root", {
      "data-inverted": orientation === "horizontal" && inverted ? "true" : void 0,
      ...dataShared
    }),
    ...selected("list", { "data-inverted": inverted ? "true" : void 0, ...dataShared }),
    ...selected("tab", { "data-inverted": inverted ? "true" : void 0, ...dataShared }),
    className: cn(!unstyle && classes({ selector }), classNames?.[selector], className),
    style: {
      ...selected("root", {
        "--tabs-round": rem(round2),
        ...typeof color === "object" ? { "--tabs-color": color.bg, "--tabs-text-color": color.text } : { "--tabs-color": color, "--tabs-text-color": "hsl(var(--background))" }
      }),
      ...styles?.[selector],
      ...style
    }
  };
}
function getSafeId(uid, errorMessage) {
  return (value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(errorMessage);
    }
    return `${uid}-${value}`;
  };
}
function onSameLevel(target, sibling, parentSelector) {
  return findElementAncestor(target, parentSelector) === findElementAncestor(sibling, parentSelector);
}
function findElementAncestor(element, selector) {
  let _element = element;
  while ((_element = _element.parentElement) && !_element.matches(selector)) {
  }
  return _element;
}
function getPreviousIndex(current, elements, loop) {
  for (let i = current - 1; i >= 0; i -= 1) {
    if (!elements[i].disabled) return i;
  }
  if (loop) {
    for (let i = elements.length - 1; i > -1; i -= 1) {
      if (!elements[i].disabled) return i;
    }
  }
  return current;
}
function getNextIndex(current, elements, loop) {
  for (let i = current + 1; i < elements.length; i += 1) {
    if (!elements[i].disabled) return i;
  }
  if (loop) {
    for (let i = 0; i < elements.length; i += 1) {
      if (!elements[i].disabled) return i;
    }
  }
  return current;
}
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

// ui/button.tsx
import * as React6 from "react";

// ui/loader.tsx
import * as React4 from "react";
import { ocx as ocx2 } from "cretex";
function clamp(value, precision = 1) {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}
function getStyles2(loader, selector, options) {
  const dynamicStyles = ["duration", "color", "size"].reduce(
    (acc, key) => {
      const value = options?.[key];
      if (value !== void 0) {
        acc[`--${loader}-${key}`] = key === "duration" ? `${clamp(value)}s` : key === "size" && typeof value === "number" ? `${value}px` : String(value);
      }
      return acc;
    },
    {}
  );
  return {
    "data-loader": loader,
    [`data-${loader}`]: selector,
    className: cn({ "stylelayer-loader": selector === "root" }, !options?.unstyled?.[selector], options?.classNames?.[selector], options?.className),
    style: ocx2(dynamicStyles, options?.styles?.[selector], options?.style)
  };
}
var LoaderSpinner = React4.forwardRef(function LoaderSpinner2(_props, ref) {
  const { size: size4 = "20px", color, duration = 1.2, unstyled, className, classNames, style, styles, ...props } = _props;
  return /* @__PURE__ */ React4.createElement("div", { ...{ ref, ...getStyles2("spinner", "root", { size: size4, color, duration, unstyled, className, style, styles }), ...props } }, [...Array(12)].map((_, index2) => /* @__PURE__ */ React4.createElement(
    "div",
    {
      key: index2,
      ...getStyles2("spinner", "bar", {
        unstyled,
        classNames,
        style: {
          "--child-delay": `${clamp(-duration - index2 / -10)}s`,
          transform: `rotate(${clamp(30 * index2)}deg) translate(146%)`
        },
        styles
      })
    }
  )));
});
LoaderSpinner.displayName = "LoaderSpinner";
var LoaderOrbit = React4.forwardRef(function LoaderOrbit2(_props, ref) {
  const { size: size4 = "3rem", color, duration = 1.2, unstyled, className, classNames, style, styles, children, ...props } = _props;
  return /* @__PURE__ */ React4.createElement("div", { ...{ ref, ...getStyles2("orbit", "root", { size: size4, color, duration, unstyled, className, classNames, style, styles }), ...props } }, /* @__PURE__ */ React4.createElement("div", { ...getStyles2("orbit", "inner", { unstyled, classNames, styles }) }, [...Array(2)].map((_, index2) => /* @__PURE__ */ React4.createElement("div", { key: index2, ...getStyles2("orbit", "orbit", { unstyled, classNames, styles }) }))), children);
});
var LoaderClockWise = React4.forwardRef(function LoaderClockWise2(_props, ref) {
  const { size: size4 = "3rem", color, duration = 1.2, unstyled, className, classNames, style, styles, ...props } = _props;
  return /* @__PURE__ */ React4.createElement("div", { ...{ ref, ...getStyles2("clockwise", "root", { size: size4, color, duration, unstyled, className, classNames, style, styles }), ...props } }, [...Array(2)].map((_, index2) => /* @__PURE__ */ React4.createElement("div", { key: index2, ...getStyles2("clockwise", "clockwise", { unstyled, classNames, styles }) })));
});
var LoaderDots = React4.forwardRef(function LoaderDots2(_props, ref) {
  const { size: size4 = "3rem", color, duration = 1.2, unstyled, className, classNames, style, styles, ...props } = _props;
  return /* @__PURE__ */ React4.createElement("div", { ...{ ref, ...getStyles2("dots", "root", { size: size4, color, duration, unstyled, className, classNames, style, styles }), ...props } }, [...Array(4)].map((_, index2) => /* @__PURE__ */ React4.createElement(
    "div",
    {
      key: index2,
      ...getStyles2("dots", "dots", {
        unstyled,
        classNames,
        styles,
        style: { "--dots-delay": `${clamp(0.2 * index2)}s` }
      })
    }
  )));
});
var LoaderBuffer = React4.forwardRef(function LoaderBuffer2(_props, ref) {
  const { size: size4 = "3rem", color, duration = 1, unstyled, className, classNames, style, styles, ...props } = _props;
  return /* @__PURE__ */ React4.createElement("div", { ...{ ref, ...getStyles2("buffer", "root", { size: size4, color, duration, unstyled, className, classNames, style, styles }), ...props } }, [...Array(5)].map((_, index2) => /* @__PURE__ */ React4.createElement(
    "div",
    {
      key: index2,
      ...getStyles2("buffer", "buffer", {
        unstyled,
        classNames,
        styles,
        style: { "--buffer-delay": `${clamp((index2 + 1) / 5 * duration)}s` }
      })
    }
  )));
});
var LoaderRises = React4.forwardRef(function LoaderRises2(_props, ref) {
  const { size: size4 = "3rem", color, duration = 1, unstyled, className, classNames, style, styles, ...props } = _props;
  return /* @__PURE__ */ React4.createElement("div", { ...{ ref, ...getStyles2("rises", "root", { size: size4, color, duration, unstyled, className, classNames, style, styles }), ...props } }, /* @__PURE__ */ React4.createElement("span", { className: "sr-only hidden" }));
});
var loaderMap = {
  spinner: LoaderSpinner,
  orbit: LoaderOrbit,
  clockwise: LoaderClockWise,
  dots: LoaderDots,
  buffer: LoaderBuffer,
  rises: LoaderRises
};
var Loader = React4.forwardRef((_props, ref) => {
  const { variant = "spinner", ...props } = _props;
  const Component = loaderMap[variant];
  return /* @__PURE__ */ React4.createElement(Component, { ref, ...props });
});
Loader.displayName = "Loader";
Loader.Spinner = LoaderSpinner;
Loader.Orbit = LoaderOrbit;
Loader.ClockWise = LoaderClockWise;
Loader.Dots = LoaderDots;
Loader.Buffer = LoaderBuffer;
Loader.Rises = LoaderRises;

// ui/polymorphic-slot.tsx
import * as React5 from "react";
var PolymorphicSlot = React5.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React5.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React5.Children.count(newElement) > 1) return React5.Children.only(null);
        return React5.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ React5.createElement(SlotClone, { ...slotProps, ref: forwardedRef }, React5.isValidElement(newElement) ? React5.cloneElement(newElement, void 0, newChildren) : null);
  }
  return /* @__PURE__ */ React5.createElement(SlotClone, { ...slotProps, ref: forwardedRef }, children);
});
PolymorphicSlot.displayName = "PolymorphicSlot";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
var SlotClone = React5.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (React5.isValidElement(children)) {
    const childrenRef = getElementRef(children);
    return React5.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      // @ts-ignore
      ref: forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef,
      // @ts-ignore
      style: { ...slotProps.style, ...children.props.style },
      // @ts-ignore
      className: cn(slotProps.className, children.props.className)
    });
  }
  return React5.Children.count(children) > 1 ? React5.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
var Slottable = ({ children }) => {
  return /* @__PURE__ */ React5.createElement(React5.Fragment, null, children);
};
function isSlottable(child) {
  return React5.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) return element.ref;
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
function injectComponentIntoFirstChild(children, component) {
  if (React5.isValidElement(children)) {
    return React5.cloneElement(children, {
      children: /* @__PURE__ */ React5.createElement(React5.Fragment, null, component, children.props.children)
    });
  }
  if (Array.isArray(children)) {
    const [firstChild, ...rest] = children;
    if (React5.isValidElement(firstChild)) {
      return [
        React5.cloneElement(firstChild, {
          children: /* @__PURE__ */ React5.createElement(React5.Fragment, null, component, firstChild.props?.children, " ")
        }),
        ...rest
      ];
    }
  }
  return children;
}
var Polymorphic = React5.forwardRef(function Polymorphic2(_props, ref) {
  const { asChild = false, el, ...props } = _props;
  const Component = asChild ? PolymorphicSlot : el || "div";
  return /* @__PURE__ */ React5.createElement(Component, { ...{ ref, ...props } });
});

// ui/button.tsx
import { cvx as cvx2 } from "cretex";
var UnstyledButton = React6.forwardRef((_props, ref) => {
  const { asChild = false, type = "button", role = "button", children, loading, disabled, ...props } = _props;
  const Btn = asChild ? PolymorphicSlot : "button";
  const loadingComponent = loading && /* @__PURE__ */ React6.createElement(Loader, { size: 14 });
  const enhancedChildren = injectComponentIntoFirstChild(children, loadingComponent);
  return /* @__PURE__ */ React6.createElement(Btn, { ...{ ref, type, role, disabled: loading || disabled, ...props } }, asChild ? enhancedChildren : /* @__PURE__ */ React6.createElement(React6.Fragment, null, loadingComponent, children));
});
UnstyledButton.displayName = "UnstyledButton";
var buttonVariants = cvx2({
  assign: "inline-flex cursor-pointer appearance-none items-center justify-center rounded-md text-[14px] text-[clamp(0.75rem,0.65rem+0.65vw,0.9rem)] font-medium leading-tight transition-[transform,color,background-color,border-color,text-decoration-color,fill,stroke] duration-75 [-moz-appearance:none] [-webkit-appearance:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background active:scale-[.985] disabled:pointer-events-none disabled:gap-2 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-color text-background border-color focus-visible:ring-color/35 [@media(hover:hover)]:hover:bg-color/90 disabled:opacity-50 disabled:[--spinner-color:hsl(var(--background))]",
      destructive: "bg-destructive text-white border-destructive focus-visible:ring-destructive/35 [@media(hover:hover)]:hover:bg-destructive-foreground",
      constructive: "bg-constructive text-white border-constructive focus-visible:ring-constructive/35 [@media(hover:hover)]:hover:bg-constructive-foreground",
      conservative: "bg-conservative text-white border-conservative focus-visible:ring-conservative/35 [@media(hover:hover)]:hover:bg-conservative-foreground",
      primitive: "bg-primitive text-muted-foreground border border-primitive-emphasis [@media(hover:hover)]:hover:text-color focus-visible:ring-primitive-emphasis/35 [@media(hover:hover)]:hover:bg-accent",
      outline: "bg-background text-muted-foreground focus-visible:ring-muted-foreground/35 border [@media(hover:hover)]:hover:bg-muted/50 [@media(hover:hover)]:hover:text-color",
      ghost: "focus-visible:ring-muted/35 [@media(hover:hover)]:hover:bg-muted text-muted-foreground [@media(hover:hover)]:hover:text-color",
      link: "text-color py-0 px-0 underline-offset-4 active:scale-100 [@media(hover:hover)]:hover:text-constructive [@media(hover:hover)]:hover:underline"
    },
    size: {
      default: "h-8 px-4 py-2",
      sm: "h-8 min-w-8 px-3",
      lg: "h-10 min-w-10 px-8",
      badge: "min-w-[54px] py-1 px-1 z-10 rounded-full text-center text-[12px] font-medium leading-none disabled:gap-[.09375rem]",
      icon: "h-[--sz] w-[--sz] min-h-[--sz,var(--min-sz)] min-w-[--sz,var(--min-sz)] [--sz:2rem] py-1 px-1 border"
    },
    color: {
      default: "",
      base: "text-black dark:text-white bg-[#e6e4e9] dark:bg-[#1a1a1a] [@media(hover:hover)]:hover:bg-[#e2e2e2] dark:[@media(hover:hover)]:hover:bg-[#202020]",
      blue: "bg-[#228be61a] text-[#339af0] border-[#339af0] disabled:[--spinner-color:#339af0] [@media(hover:hover)]:hover:bg-[#228be62a] [@media(hover:hover)]:hover:text-[#3a9def]",
      grape: "bg-[#be4bdb1a] text-[#cc5de8] border-[#cc5de8] disabled:[--spinner-color:#cc5de8] [@media(hover:hover)]:hover:bg-[#be4bdb2a] [@media(hover:hover)]:hover:text-[#da68f6]",
      green: "bg-[#12b8861a] text-[#20c997] border-[#20c997] disabled:[--spinner-color:#20c997] [@media(hover:hover)]:hover:bg-[#12b8862a] [@media(hover:hover)]:hover:text-[#23cf9d]",
      red: "bg-[#fa52521a] text-[#ff6b6b] border-[#ff6b6b] disabled:[--spinner-color:#ff6b6b] [@media(hover:hover)]:hover:bg-[#fa52522a] [@media(hover:hover)]:hover:text-[#fd7171]",
      "gradient-blue": "bg-[linear-gradient(#0dccea,#0d70ea)] text-white disabled:[--spinner-color:white] border-[#0d70ea] [@media(hover:hover)]:hover:bg-[linear-gradient(#0dccea,#0d70ea)]",
      "gradient-orange": "bg-[linear-gradient(-180deg,#FF7E31,#E62C03)] text-white disabled:[--spinner-color:white] border-[#E62C03] [@media(hover:hover)]:hover:bg-[#d4d3d5]",
      "outline-base": "outline-2 outline outline-slate-500 bg-slate-500/20 text-slate-600 disabled:[--spinner-color:#475569] [@media(hover:hover)]:hover:bg-slate-600/20",
      "outline-indigo": "outline-2 outline outline-indigo-500 bg-indigo-500/20 text-indigo-600 disabled:[--spinner-color:#4f46e5] [@media(hover:hover)]:hover:bg-indigo-600/20",
      "outline-teal": "outline-2 outline outline-teal-500 bg-teal-500/20 text-teal-600 disabled:[--spinner-color:#0d9488] [@media(hover:hover)]:hover:bg-teal-600/20"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function buttonStyle(variants, className) {
  return cn(!variants?.unstyled && buttonVariants({ ...variants }), className);
}
var Button = React6.forwardRef((_props, ref) => {
  const { unstyled, className, variant = "default", color, size: size4, ...props } = _props;
  return /* @__PURE__ */ React6.createElement(UnstyledButton, { ...{ ref, className: buttonStyle({ color, size: size4, unstyled, variant }, className), ...props } });
});
Button.displayName = "Button";

// ui/rehype/event.ts
import { z } from "zod";
var eventSchema = z.object({
  name: z.enum([
    "copy_npm_command",
    "copy_usage_import_code",
    "copy_usage_code",
    "copy_primitive_code",
    "copy_theme_code",
    "copy_block_code",
    "copy_chunk_code",
    "enable_lift_mode",
    "copy_chart_code",
    "copy_chart_theme",
    "copy_chart_data",
    "copy_color"
  ]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional()
});

// hooks/use-local-storage.ts
import { useState as useState3, useCallback as useCallback2, useEffect as useEffect3 } from "react";

// hooks/use-window-event.ts
import { useEffect as useEffect2 } from "react";

// hooks/use-local-storage.ts
function deserializeJSON(value) {
  try {
    return value && JSON.parse(value);
  } catch {
    return value;
  }
}
function createStorageHandler(type) {
  const getItem = (key) => {
    try {
      return window[type].getItem(key);
    } catch (error) {
      console.warn("use-local-storage: Failed to get value from storage, localStorage is blocked", error);
      return null;
    }
  };
  const setItem = (key, value) => {
    try {
      window[type].setItem(key, value);
    } catch (error) {
      console.warn("use-local-storage: Failed to set value to storage, localStorage is blocked", error);
    }
  };
  const removeItem = (key) => {
    try {
      window[type].removeItem(key);
    } catch (error) {
      console.warn("use-local-storage: Failed to remove value from storage, localStorage is blocked", error);
    }
  };
  return { getItem, setItem, removeItem };
}
var readLocalStorageValue = readValue("localStorage");
function readValue(type) {
  const { getItem } = createStorageHandler(type);
  return function read({ key, initialValue, deserialize = deserializeJSON }) {
    let storageBlockedOrSkipped;
    try {
      storageBlockedOrSkipped = typeof window === "undefined" || !(type in window) || window[type] === null;
    } catch (_e) {
      storageBlockedOrSkipped = true;
    }
    if (storageBlockedOrSkipped) {
      return initialValue;
    }
    const storageValue = getItem(key);
    return storageValue !== null ? deserialize(storageValue) : initialValue;
  };
}

// ui/icons/ctx.tsx
import * as React7 from "react";
var InitialSize = /* @__PURE__ */ ((InitialSize2) => {
  InitialSize2["unset"] = "unset";
  InitialSize2["xxs"] = "xxs";
  InitialSize2["xxxs"] = "xxxs";
  InitialSize2["xs"] = "xs";
  InitialSize2["base"] = "base";
  InitialSize2["sm"] = "sm";
  InitialSize2["md"] = "md";
  InitialSize2["lg"] = "lg";
  InitialSize2["xl"] = "xl";
  InitialSize2["xxl"] = "xxl";
  InitialSize2["xxxl"] = "xxxl";
  return InitialSize2;
})(InitialSize || {});
var getInitialSizes = (size4) => {
  const sizeMap = {
    unset: void 0,
    xs: "10px",
    xxs: "12px",
    xxxs: "14px",
    base: "16px",
    sm: "18px",
    md: "22px",
    lg: "32px",
    xl: "48px",
    xxl: "86px",
    xxxl: "112px"
  };
  return sizeMap[size4];
};
function getSizes(Size) {
  const { size: size4 = "16px", height, width, h, w, ratio } = Size;
  const sizeMap = getInitialSizes(size4);
  const inSz = Object.values(InitialSize);
  const initialSize = (sz2) => inSz.includes(sz2);
  function parseSize(sz2) {
    return typeof sz2 === "number" ? sz2 : parseFloat(sz2.replace(/[^\d.-]/g, ""));
  }
  function applyRatio(sz2, ratio2 = 1) {
    if (!sz2) return;
    const newSize = parseSize(sz2) * ratio2;
    return typeof sz2 === "number" ? `${newSize / 16}rem` : sz2;
  }
  const sz = (sz2) => initialSize(sz2) ? sizeMap : sz2;
  const sizer = (rt) => initialSize(size4) ? applyRatio(sizeMap, rt) : applyRatio(size4, rt);
  return {
    sz,
    h: height || h || sz(sizer(ratio?.h)),
    w: width || w || sz(sizer(ratio?.w))
  };
}
function getSvg(Svg2) {
  const {
    xmlns = "http://www.w3.org/2000/svg",
    viewBox = "0 0 24 24",
    "aria-hidden": ariaHidden = "true",
    currentFill = "stroke",
    w,
    h,
    size: size4,
    width,
    height,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    ratio,
    color,
    ...props
  } = Svg2;
  const sz = getSizes({ size: size4, h, w, height, width, ratio });
  const attr = { viewBox, xmlns, height: sz.h, width: sz.w, "aria-hidden": ariaHidden, ...props };
  const isNumber = (value) => !isNaN(Number(value)) && Number(value) > 0;
  const isColor = (value) => typeof value === "string" && (/^#[0-9A-Fa-f]{3,6}$/.test(value) || // Hex color
  /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(value) || // RGB
  /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/.test(value) || // RGBA
  /^[a-zA-Z]+$/.test(value));
  const strokeIsColor = typeof stroke === "string" && isColor(stroke) ? stroke : void 0;
  const strokeIsWidth = strokeWidth || (isNumber(stroke) ? stroke : void 0);
  const _props_ = {
    fill,
    stroke: strokeIsColor,
    strokeWidth: strokeIsWidth,
    strokeLinecap,
    strokeLinejoin,
    ...attr
  };
  switch (currentFill) {
    case "stroke":
      _props_.fill = fill || "none";
      _props_.stroke = strokeIsColor || color || "currentColor";
      _props_.strokeWidth = strokeIsWidth || "2";
      _props_.strokeLinecap = strokeLinecap || "round";
      _props_.strokeLinejoin = strokeLinejoin || "round";
      break;
    case "fill":
      _props_.fill = fill || color || "currentColor";
      _props_.stroke = strokeIsColor || "none";
      _props_.strokeWidth = strokeIsWidth || "0";
      _props_.strokeLinecap = void 0;
      _props_.strokeLinejoin = void 0;
      break;
    case "fill-stroke":
      _props_.fill = fill || color || "currentColor";
      _props_.stroke = strokeIsColor || "currentColor";
      _props_.strokeWidth = strokeIsWidth || "2";
      _props_.strokeLinecap = strokeLinecap || "round";
      _props_.strokeLinejoin = strokeLinejoin || "round";
      break;
    default:
      break;
  }
  return { props: _props_, ...sz };
}
var Svg = React7.forwardRef((props, ref) => /* @__PURE__ */ React7.createElement("svg", { ...{ ref, ...getSvg({ ...props }).props } }));
Svg.displayName = "Svg";

// ui/scroll-area.tsx
import * as React17 from "react";

// node_modules/@radix-ui/react-scroll-area/dist/index.mjs
import * as React23 from "react";

// node_modules/@radix-ui/react-primitive/dist/index.mjs
import * as React10 from "react";
import * as ReactDOM from "react-dom";

// node_modules/@radix-ui/react-slot/dist/index.mjs
import * as React9 from "react";

// node_modules/@radix-ui/react-compose-refs/dist/index.mjs
import * as React8 from "react";
function setRef2(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs2(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef2(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef2(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return React8.useCallback(composeRefs2(...refs), refs);
}

// node_modules/@radix-ui/react-slot/dist/index.mjs
import { Fragment as Fragment3, jsx } from "react/jsx-runtime";
var Slot = React9.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React9.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable2);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React9.Children.count(newElement) > 1) return React9.Children.only(null);
        return React9.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ jsx(SlotClone2, { ...slotProps, ref: forwardedRef, children: React9.isValidElement(newElement) ? React9.cloneElement(newElement, void 0, newChildren) : null });
  }
  return /* @__PURE__ */ jsx(SlotClone2, { ...slotProps, ref: forwardedRef, children });
});
Slot.displayName = "Slot";
var SlotClone2 = React9.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (React9.isValidElement(children)) {
    const childrenRef = getElementRef2(children);
    return React9.cloneElement(children, {
      ...mergeProps2(slotProps, children.props),
      // @ts-ignore
      ref: forwardedRef ? composeRefs2(forwardedRef, childrenRef) : childrenRef
    });
  }
  return React9.Children.count(children) > 1 ? React9.Children.only(null) : null;
});
SlotClone2.displayName = "SlotClone";
var Slottable2 = ({ children }) => {
  return /* @__PURE__ */ jsx(Fragment3, { children });
};
function isSlottable2(child) {
  return React9.isValidElement(child) && child.type === Slottable2;
}
function mergeProps2(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// node_modules/@radix-ui/react-primitive/dist/index.mjs
import { jsx as jsx2 } from "react/jsx-runtime";
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Node2 = React10.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx2(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node2 };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
}

// node_modules/@radix-ui/react-presence/dist/index.mjs
import * as React22 from "react";

// node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
import * as React11 from "react";
var useLayoutEffect22 = Boolean(globalThis?.document) ? React11.useLayoutEffect : () => {
};

// node_modules/@radix-ui/react-presence/dist/index.mjs
import * as React12 from "react";
function useStateMachine(initialState, machine) {
  return React12.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : React22.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef3(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React22.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = React22.useState();
  const stylesRef = React22.useRef({});
  const prevPresentRef = React22.useRef(present);
  const prevAnimationNameRef = React22.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React22.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect22(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect22(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(event.animationName);
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: React22.useCallback((node2) => {
      if (node2) stylesRef.current = getComputedStyle(node2);
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
function getElementRef3(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// node_modules/@radix-ui/react-context/dist/index.mjs
import * as React13 from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext32(rootComponentName, defaultContext) {
    const BaseContext = React13.createContext(defaultContext);
    const index2 = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider2 = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index2] || BaseContext;
      const value = React13.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx3(Context.Provider, { value, children });
    };
    Provider2.displayName = rootComponentName + "Provider";
    function useContext22(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index2] || BaseContext;
      const context = React13.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider2, useContext22];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React13.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React13.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext32, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React13.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

// node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
import * as React14 from "react";
function useCallbackRef(callback) {
  const callbackRef = React14.useRef(callback);
  React14.useEffect(() => {
    callbackRef.current = callback;
  });
  return React14.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}

// node_modules/@radix-ui/react-direction/dist/index.mjs
import * as React15 from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var DirectionContext = React15.createContext(void 0);
function useDirection(localDir) {
  const globalDir = React15.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}

// node_modules/@radix-ui/number/dist/index.mjs
function clamp2(value, [min2, max2]) {
  return Math.min(max2, Math.max(min2, value));
}

// node_modules/@radix-ui/primitive/dist/index.mjs
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

// node_modules/@radix-ui/react-scroll-area/dist/index.mjs
import * as React16 from "react";
import { Fragment as Fragment4, jsx as jsx5, jsxs } from "react/jsx-runtime";
function useStateMachine2(initialState, machine) {
  return React16.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext, createScrollAreaScope] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea = React23.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = React23.useState(null);
    const [viewport, setViewport] = React23.useState(null);
    const [content, setContent] = React23.useState(null);
    const [scrollbarX, setScrollbarX] = React23.useState(null);
    const [scrollbarY, setScrollbarY] = React23.useState(null);
    const [cornerWidth, setCornerWidth] = React23.useState(0);
    const [cornerHeight, setCornerHeight] = React23.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = React23.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = React23.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsx5(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsx5(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = React23.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = React23.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxs(Fragment4, { children: [
      /* @__PURE__ */ jsx5(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsx5(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsx5("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = React23.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    React23.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsx5(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsx5(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsx5(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsx5(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = React23.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = React23.useState(false);
  React23.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsx5(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsx5(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = React23.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine2("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  React23.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  React23.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsx5(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsx5(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = React23.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = React23.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsx5(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsx5(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = React23.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = React23.useRef(null);
  const pointerOffsetRef = React23.useRef(0);
  const [sizes, setSizes] = React23.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsx5(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset4 = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset4}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsx5(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset4 = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset4}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = React23.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = React23.useState();
  const ref = React23.useRef(null);
  const composeRefs3 = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  React23.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsx5(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs3,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = React23.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = React23.useState();
  const ref = React23.useRef(null);
  const composeRefs3 = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  React23.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsx5(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs3,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = React23.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = React23.useState(null);
  const composeRefs3 = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = React23.useRef(null);
  const prevWebkitUserSelectRef = React23.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x2 = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x: x2, y });
    }
  }
  React23.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar?.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  React23.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsx5(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsx5(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs3,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = React23.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsx5(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsx5(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = React23.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = React23.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    React23.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsx5(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x2 = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x: x2, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = React23.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsx5(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = React23.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = React23.useState(0);
  const [height, setHeight] = React23.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    const height2 = context.scrollbarX?.offsetHeight || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    const width2 = context.scrollbarY?.offsetWidth || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsx5(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset4 = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset4;
  const minPointerPos = sizes.scrollbar.paddingStart + offset4;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp2(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = React23.useRef(0);
  React23.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return React23.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect22(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root2 = ScrollArea;
var Viewport = ScrollAreaViewport;
var Scrollbar = ScrollAreaScrollbar;
var Thumb = ScrollAreaThumb;
var Corner = ScrollAreaCorner;

// ui/scroll-area.tsx
import { cvx as cvx3, ocx as ocx3, rem as rem2 } from "cretex";
var classes2 = cvx3({
  variants: {
    selector: {
      root: "h-full w-full overflow-hidden",
      viewport: "group/sa !flex flex-nowrap size-full",
      scrollbar: "flex touch-none select-none p-0.5 bg-[--bg] ease-out transition-colors [transition-duration:160ms]",
      thumb: "relative flex-1 rounded-full bg-[--sa-thumb-color] cursor-grab active:cursor-grabbing before:absolute before:size-full before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:min-h-11 before:min-w-11",
      corner: "bg-[--sa-track-color,transparent]"
    },
    viewport: {
      vertical: "flex-col",
      horizontal: "flex-row"
    },
    scrollbar: {
      vertical: "w-[--sa-thumb-size]",
      horizontal: "flex-col h-[--sa-thumb-size]"
    }
  }
});
function getStyles3(selector, options = {}) {
  const { className, classNames, color = "hsl(var(--muted))", orientation, style, styles, type, unstyled, size: size4 = 10 } = options;
  const isUnstyled = typeof unstyled === "object" ? unstyled?.[selector] : unstyled;
  const root = selector === "root";
  const scrollbar = selector === "scrollbar";
  const viewport = selector === "viewport";
  const isOrient = (select) => select ? orientation : void 0;
  return {
    "data-orientation": orientation,
    className: cn(
      !isUnstyled && classes2({
        selector,
        scrollbar: isOrient(scrollbar),
        viewport: isOrient(viewport)
      }),
      scrollbar && !isUnstyled && ["[&:not(:empty)]:[--bg:--sa-track-color,transparent]"],
      classNames?.[selector],
      className
    ),
    style: ocx3(
      styles?.[selector],
      style,
      root && [typeof color === "object" ? { "--sa-track-color": color.track, "--sa-thumb-color": color.thumb } : { "--sa-thumb-color": color }, { "--sa-thumb-size": rem2(size4) }],
      type === "never" && scrollbar && { display: "none", visibility: "hidden" }
    )
  };
}
var ScrollArea2 = React17.forwardRef((_props, ref) => {
  const {
    orientation = "vertical",
    className,
    type,
    classNames,
    color,
    style,
    styles,
    unstyled,
    children,
    asChild = true,
    size: size4,
    dangerouslySetInnerHTML,
    viewportProps,
    ...props
  } = _props;
  const stylesApi = { classNames, styles, unstyled };
  const stylesRest = { orientation, ...stylesApi };
  return /* @__PURE__ */ React17.createElement(Root2, { ...{ ref, type: type === "never" ? void 0 : type, ...getStyles3("root", { className, style, color, size: size4, ...stylesRest }), ...props } }, /* @__PURE__ */ React17.createElement(Viewport, { ...{ asChild, dangerouslySetInnerHTML, ...getStyles3("viewport", stylesRest), ...viewportProps } }, children), /* @__PURE__ */ React17.createElement(Scrollbar, { ...{ orientation: "vertical", ...getStyles3("scrollbar", { orientation: "vertical", ...stylesApi }) } }, /* @__PURE__ */ React17.createElement(Thumb, { ...getStyles3("thumb", stylesRest) })), /* @__PURE__ */ React17.createElement(Scrollbar, { ...{ orientation: "horizontal", ...getStyles3("scrollbar", { orientation: "horizontal", ...stylesApi }) } }, /* @__PURE__ */ React17.createElement(Thumb, { ...getStyles3("thumb", stylesRest) })), /* @__PURE__ */ React17.createElement(Corner, { ...getStyles3("corner", stylesApi) }));
});
ScrollArea2.displayName = "ScrollArea";

// ui/rehype/rehype-command.tsx
import { visit } from "unist-util-visit";

// ui/tooltip.tsx
import * as React32 from "react";

// node_modules/@radix-ui/react-tooltip/dist/index.mjs
import * as React30 from "react";

// node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import * as React19 from "react";

// node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
import * as React18 from "react";
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp);
  React18.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}

// node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import { jsx as jsx6 } from "react/jsx-runtime";
var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = React19.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = React19.forwardRef(
  (props, forwardedRef) => {
    const {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = React19.useContext(DismissableLayerContext);
    const [node, setNode] = React19.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = React19.useState({});
    const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index2 = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index2 >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target;
      const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
      if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
      onPointerDownOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const focusOutside = useFocusOutside((event) => {
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    useEscapeKeydown((event) => {
      const isHighestLayer = index2 === context.layers.size - 1;
      if (!isHighestLayer) return;
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);
    React19.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
          ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    React19.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);
    React19.useEffect(() => {
      const handleUpdate = () => force({});
      document.addEventListener(CONTEXT_UPDATE, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ jsx6(
      Primitive.div,
      {
        ...layerProps,
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
          ...props.style
        },
        onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      }
    );
  }
);
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = React19.forwardRef((props, forwardedRef) => {
  const context = React19.useContext(DismissableLayerContext);
  const ref = React19.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  React19.useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);
  return /* @__PURE__ */ jsx6(Primitive.div, { ...props, ref: composedRefs });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = useCallbackRef(onPointerDownOutside);
  const isPointerInsideReactTreeRef = React19.useRef(false);
  const handleClickRef = React19.useRef(() => {
  });
  React19.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true }
          );
        };
        var handleAndDispatchPointerDownOutsideEvent = handleAndDispatchPointerDownOutsideEvent2;
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent2();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef(onFocusOutside);
  const isFocusInsideReactTreeRef = React19.useRef(false);
  React19.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}

// node_modules/@radix-ui/react-id/dist/index.mjs
import * as React20 from "react";
var useReactId2 = React20["useId".toString()] || (() => void 0);
var count = 0;
function useId2(deterministicId) {
  const [id, setId] = React20.useState(useReactId2());
  useLayoutEffect22(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}

// node_modules/@radix-ui/react-popper/dist/index.mjs
import * as React26 from "react";

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp3(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x2,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x2,
    right: x2 + width,
    bottom: y + height,
    x: x2,
    y
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x2,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x2,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x: x2,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x2,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x2,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset4 = clamp3(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset4 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset4,
        centerOffset: center - offset4 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x2,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x2 + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x2,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x3,
              y: y2
            } = _ref;
            return {
              x: x3,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x2,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp3(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp3(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var limitShift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x: x2,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset4 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x: x2,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset4, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = ["top", "left"].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x2 = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x: x2,
    y
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x2 = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x: x2,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x2 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x2 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x2,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var hide2 = hide;
var arrow2 = arrow;
var limitShift2 = limitShift;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
import * as React21 from "react";
import { useLayoutEffect as useLayoutEffect3, useEffect as useEffect9 } from "react";
import * as ReactDOM2 from "react-dom";
var index = typeof document !== "undefined" ? useLayoutEffect3 : useEffect9;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React21.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React21.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React21.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React21.useState(null);
  const [_floating, _setFloating] = React21.useState(null);
  const setReference = React21.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React21.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React21.useRef(null);
  const floatingRef = React21.useRef(null);
  const dataRef = React21.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React21.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM2.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React21.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React21.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React21.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React21.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x2 = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x2 + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x2,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React21.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === "function" ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow2({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return arrow2({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
var offset3 = (options, deps) => ({
  ...offset2(options),
  options: [options, deps]
});
var shift3 = (options, deps) => ({
  ...shift2(options),
  options: [options, deps]
});
var limitShift3 = (options, deps) => ({
  ...limitShift2(options),
  options: [options, deps]
});
var flip3 = (options, deps) => ({
  ...flip2(options),
  options: [options, deps]
});
var size3 = (options, deps) => ({
  ...size2(options),
  options: [options, deps]
});
var hide3 = (options, deps) => ({
  ...hide2(options),
  options: [options, deps]
});
var arrow3 = (options, deps) => ({
  ...arrow$1(options),
  options: [options, deps]
});

// node_modules/@radix-ui/react-arrow/dist/index.mjs
import * as React24 from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var NAME = "Arrow";
var Arrow = React24.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ jsx7(
    Primitive.svg,
    {
      ...arrowProps,
      ref: forwardedRef,
      width,
      height,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: props.asChild ? children : /* @__PURE__ */ jsx7("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Arrow.displayName = NAME;
var Root3 = Arrow;

// node_modules/@radix-ui/react-use-size/dist/index.mjs
import * as React25 from "react";
function useSize(element) {
  const [size4, setSize] = React25.useState(void 0);
  useLayoutEffect22(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size4;
}

// node_modules/@radix-ui/react-popper/dist/index.mjs
import { jsx as jsx8 } from "react/jsx-runtime";
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = (props) => {
  const { __scopePopper, children } = props;
  const [anchor, setAnchor] = React26.useState(null);
  return /* @__PURE__ */ jsx8(PopperProvider, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME = "PopperAnchor";
var PopperAnchor = React26.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopper, virtualRef, ...anchorProps } = props;
    const context = usePopperContext(ANCHOR_NAME, __scopePopper);
    const ref = React26.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    React26.useEffect(() => {
      context.onAnchorChange(virtualRef?.current || ref.current);
    });
    return virtualRef ? null : /* @__PURE__ */ jsx8(Primitive.div, { ...anchorProps, ref: composedRefs });
  }
);
PopperAnchor.displayName = ANCHOR_NAME;
var CONTENT_NAME = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME);
var PopperContent = React26.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopper,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      ...contentProps
    } = props;
    const context = usePopperContext(CONTENT_NAME, __scopePopper);
    const [content, setContent] = React26.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [arrow5, setArrow] = React26.useState(null);
    const arrowSize = useSize(arrow5);
    const arrowWidth = arrowSize?.width ?? 0;
    const arrowHeight = arrowSize?.height ?? 0;
    const desiredPlacement = side + (align !== "center" ? "-" + align : "");
    const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries
    };
    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy === "always"
        });
        return cleanup;
      },
      elements: {
        reference: context.anchor
      },
      middleware: [
        offset3({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
        avoidCollisions && shift3({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === "partial" ? limitShift3() : void 0,
          ...detectOverflowOptions
        }),
        avoidCollisions && flip3({ ...detectOverflowOptions }),
        size3({
          ...detectOverflowOptions,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow5 && arrow3({ element: arrow5, padding: arrowPadding }),
        transformOrigin({ arrowWidth, arrowHeight }),
        hideWhenDetached && hide3({ strategy: "referenceHidden", ...detectOverflowOptions })
      ]
    });
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const handlePlaced = useCallbackRef(onPlaced);
    useLayoutEffect22(() => {
      if (isPositioned) {
        handlePlaced?.();
      }
    }, [isPositioned, handlePlaced]);
    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const [contentZIndex, setContentZIndex] = React26.useState();
    useLayoutEffect22(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);
    return /* @__PURE__ */ jsx8(
      "div",
      {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...floatingStyles,
          transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex,
          ["--radix-popper-transform-origin"]: [
            middlewareData.transformOrigin?.x,
            middlewareData.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...middlewareData.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: props.dir,
        children: /* @__PURE__ */ jsx8(
          PopperContentProvider,
          {
            scope: __scopePopper,
            placedSide,
            onArrowChange: setArrow,
            arrowX,
            arrowY,
            shouldHideArrow: cannotCenterArrow,
            children: /* @__PURE__ */ jsx8(
              Primitive.div,
              {
                "data-side": placedSide,
                "data-align": placedAlign,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: !isPositioned ? "none" : void 0
                }
              }
            )
          }
        )
      }
    );
  }
);
PopperContent.displayName = CONTENT_NAME;
var ARROW_NAME = "PopperArrow";
var OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow = React26.forwardRef(function PopperArrow2(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props;
  const contentContext = useContentContext(ARROW_NAME, __scopePopper);
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ jsx8(
      "span",
      {
        ref: contentContext.onArrowChange,
        style: {
          position: "absolute",
          left: contentContext.arrowX,
          top: contentContext.arrowY,
          [baseSide]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[contentContext.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[contentContext.placedSide],
          visibility: contentContext.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ jsx8(
          Root3,
          {
            ...arrowProps,
            ref: forwardedRef,
            style: {
              ...arrowProps.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
PopperArrow.displayName = ARROW_NAME;
function isNotNull(value) {
  return value !== null;
}
var transformOrigin = (options) => ({
  name: "transformOrigin",
  options,
  fn(data) {
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
    const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
    const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
    let x2 = "";
    let y = "";
    if (placedSide === "bottom") {
      x2 = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x2 = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x2 = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x2 = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return { data: { x: x2, y } };
  }
});
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
var Root22 = Popper;
var Anchor = PopperAnchor;
var Content = PopperContent;
var Arrow2 = PopperArrow;

// node_modules/@radix-ui/react-portal/dist/index.mjs
import * as React27 from "react";
import ReactDOM3 from "react-dom";
import { jsx as jsx9 } from "react/jsx-runtime";
var PORTAL_NAME = "Portal";
var Portal = React27.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React27.useState(false);
  useLayoutEffect22(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM3.createPortal(/* @__PURE__ */ jsx9(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal.displayName = PORTAL_NAME;

// node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
import * as React28 from "react";
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  }
}) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);
  const setValue = React28.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue;
        const value2 = typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value2 !== prop) handleChange(value2);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const uncontrolledState = React28.useState(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React28.useRef(value);
  const handleChange = useCallbackRef(onChange);
  React28.useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);
  return uncontrolledState;
}

// node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
import * as React29 from "react";
import { jsx as jsx10 } from "react/jsx-runtime";
var NAME2 = "VisuallyHidden";
var VisuallyHidden = React29.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsx10(
      Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: {
          // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
          position: "absolute",
          border: 0,
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          wordWrap: "normal",
          ...props.style
        }
      }
    );
  }
);
VisuallyHidden.displayName = NAME2;
var Root4 = VisuallyHidden;

// node_modules/@radix-ui/react-tooltip/dist/index.mjs
import { jsx as jsx11, jsxs as jsxs2 } from "react/jsx-runtime";
var [createTooltipContext, createTooltipScope] = createContextScope("Tooltip", [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var PROVIDER_NAME = "TooltipProvider";
var DEFAULT_DELAY_DURATION = 700;
var TOOLTIP_OPEN = "tooltip.open";
var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
var TooltipProvider = (props) => {
  const {
    __scopeTooltip,
    delayDuration = DEFAULT_DELAY_DURATION,
    skipDelayDuration = 300,
    disableHoverableContent = false,
    children
  } = props;
  const [isOpenDelayed, setIsOpenDelayed] = React30.useState(true);
  const isPointerInTransitRef = React30.useRef(false);
  const skipDelayTimerRef = React30.useRef(0);
  React30.useEffect(() => {
    const skipDelayTimer = skipDelayTimerRef.current;
    return () => window.clearTimeout(skipDelayTimer);
  }, []);
  return /* @__PURE__ */ jsx11(
    TooltipProviderContextProvider,
    {
      scope: __scopeTooltip,
      isOpenDelayed,
      delayDuration,
      onOpen: React30.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        setIsOpenDelayed(false);
      }, []),
      onClose: React30.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(
          () => setIsOpenDelayed(true),
          skipDelayDuration
        );
      }, [skipDelayDuration]),
      isPointerInTransitRef,
      onPointerInTransitChange: React30.useCallback((inTransit) => {
        isPointerInTransitRef.current = inTransit;
      }, []),
      disableHoverableContent,
      children
    }
  );
};
TooltipProvider.displayName = PROVIDER_NAME;
var TOOLTIP_NAME = "Tooltip";
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
var Tooltip = (props) => {
  const {
    __scopeTooltip,
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    disableHoverableContent: disableHoverableContentProp,
    delayDuration: delayDurationProp
  } = props;
  const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
  const popperScope = usePopperScope(__scopeTooltip);
  const [trigger, setTrigger] = React30.useState(null);
  const contentId = useId2();
  const openTimerRef = React30.useRef(0);
  const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
  const delayDuration = delayDurationProp ?? providerContext.delayDuration;
  const wasOpenDelayedRef = React30.useRef(false);
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: (open2) => {
      if (open2) {
        providerContext.onOpen();
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
      } else {
        providerContext.onClose();
      }
      onOpenChange?.(open2);
    }
  });
  const stateAttribute = React30.useMemo(() => {
    return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
  }, [open]);
  const handleOpen = React30.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    wasOpenDelayedRef.current = false;
    setOpen(true);
  }, [setOpen]);
  const handleClose = React30.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    setOpen(false);
  }, [setOpen]);
  const handleDelayedOpen = React30.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      wasOpenDelayedRef.current = true;
      setOpen(true);
      openTimerRef.current = 0;
    }, delayDuration);
  }, [delayDuration, setOpen]);
  React30.useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
      }
    };
  }, []);
  return /* @__PURE__ */ jsx11(Root22, { ...popperScope, children: /* @__PURE__ */ jsx11(
    TooltipContextProvider,
    {
      scope: __scopeTooltip,
      contentId,
      open,
      stateAttribute,
      trigger,
      onTriggerChange: setTrigger,
      onTriggerEnter: React30.useCallback(() => {
        if (providerContext.isOpenDelayed) handleDelayedOpen();
        else handleOpen();
      }, [providerContext.isOpenDelayed, handleDelayedOpen, handleOpen]),
      onTriggerLeave: React30.useCallback(() => {
        if (disableHoverableContent) {
          handleClose();
        } else {
          window.clearTimeout(openTimerRef.current);
          openTimerRef.current = 0;
        }
      }, [handleClose, disableHoverableContent]),
      onOpen: handleOpen,
      onClose: handleClose,
      disableHoverableContent,
      children
    }
  ) });
};
Tooltip.displayName = TOOLTIP_NAME;
var TRIGGER_NAME = "TooltipTrigger";
var TooltipTrigger = React30.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTooltip, ...triggerProps } = props;
    const context = useTooltipContext(TRIGGER_NAME, __scopeTooltip);
    const providerContext = useTooltipProviderContext(TRIGGER_NAME, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const ref = React30.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onTriggerChange);
    const isPointerDownRef = React30.useRef(false);
    const hasPointerMoveOpenedRef = React30.useRef(false);
    const handlePointerUp = React30.useCallback(() => isPointerDownRef.current = false, []);
    React30.useEffect(() => {
      return () => document.removeEventListener("pointerup", handlePointerUp);
    }, [handlePointerUp]);
    return /* @__PURE__ */ jsx11(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsx11(
      Primitive.button,
      {
        "aria-describedby": context.open ? context.contentId : void 0,
        "data-state": context.stateAttribute,
        ...triggerProps,
        ref: composedRefs,
        onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
          if (event.pointerType === "touch") return;
          if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
            context.onTriggerEnter();
            hasPointerMoveOpenedRef.current = true;
          }
        }),
        onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
          context.onTriggerLeave();
          hasPointerMoveOpenedRef.current = false;
        }),
        onPointerDown: composeEventHandlers(props.onPointerDown, () => {
          isPointerDownRef.current = true;
          document.addEventListener("pointerup", handlePointerUp, { once: true });
        }),
        onFocus: composeEventHandlers(props.onFocus, () => {
          if (!isPointerDownRef.current) context.onOpen();
        }),
        onBlur: composeEventHandlers(props.onBlur, context.onClose),
        onClick: composeEventHandlers(props.onClick, context.onClose)
      }
    ) });
  }
);
TooltipTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME2 = "TooltipPortal";
var [PortalProvider, usePortalContext] = createTooltipContext(PORTAL_NAME2, {
  forceMount: void 0
});
var TooltipPortal = (props) => {
  const { __scopeTooltip, forceMount, children, container } = props;
  const context = useTooltipContext(PORTAL_NAME2, __scopeTooltip);
  return /* @__PURE__ */ jsx11(PortalProvider, { scope: __scopeTooltip, forceMount, children: /* @__PURE__ */ jsx11(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx11(Portal, { asChild: true, container, children }) }) });
};
TooltipPortal.displayName = PORTAL_NAME2;
var CONTENT_NAME2 = "TooltipContent";
var TooltipContent = React30.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME2, props.__scopeTooltip);
    const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
    const context = useTooltipContext(CONTENT_NAME2, props.__scopeTooltip);
    return /* @__PURE__ */ jsx11(Presence, { present: forceMount || context.open, children: context.disableHoverableContent ? /* @__PURE__ */ jsx11(TooltipContentImpl, { side, ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsx11(TooltipContentHoverable, { side, ...contentProps, ref: forwardedRef }) });
  }
);
var TooltipContentHoverable = React30.forwardRef((props, forwardedRef) => {
  const context = useTooltipContext(CONTENT_NAME2, props.__scopeTooltip);
  const providerContext = useTooltipProviderContext(CONTENT_NAME2, props.__scopeTooltip);
  const ref = React30.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const [pointerGraceArea, setPointerGraceArea] = React30.useState(null);
  const { trigger, onClose } = context;
  const content = ref.current;
  const { onPointerInTransitChange } = providerContext;
  const handleRemoveGraceArea = React30.useCallback(() => {
    setPointerGraceArea(null);
    onPointerInTransitChange(false);
  }, [onPointerInTransitChange]);
  const handleCreateGraceArea = React30.useCallback(
    (event, hoverTarget) => {
      const currentTarget = event.currentTarget;
      const exitPoint = { x: event.clientX, y: event.clientY };
      const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
      const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
      const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
      const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
      setPointerGraceArea(graceArea);
      onPointerInTransitChange(true);
    },
    [onPointerInTransitChange]
  );
  React30.useEffect(() => {
    return () => handleRemoveGraceArea();
  }, [handleRemoveGraceArea]);
  React30.useEffect(() => {
    if (trigger && content) {
      const handleTriggerLeave = (event) => handleCreateGraceArea(event, content);
      const handleContentLeave = (event) => handleCreateGraceArea(event, trigger);
      trigger.addEventListener("pointerleave", handleTriggerLeave);
      content.addEventListener("pointerleave", handleContentLeave);
      return () => {
        trigger.removeEventListener("pointerleave", handleTriggerLeave);
        content.removeEventListener("pointerleave", handleContentLeave);
      };
    }
  }, [trigger, content, handleCreateGraceArea, handleRemoveGraceArea]);
  React30.useEffect(() => {
    if (pointerGraceArea) {
      const handleTrackPointerGrace = (event) => {
        const target = event.target;
        const pointerPosition = { x: event.clientX, y: event.clientY };
        const hasEnteredTarget = trigger?.contains(target) || content?.contains(target);
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea);
        if (hasEnteredTarget) {
          handleRemoveGraceArea();
        } else if (isPointerOutsideGraceArea) {
          handleRemoveGraceArea();
          onClose();
        }
      };
      document.addEventListener("pointermove", handleTrackPointerGrace);
      return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
    }
  }, [trigger, content, pointerGraceArea, onClose, handleRemoveGraceArea]);
  return /* @__PURE__ */ jsx11(TooltipContentImpl, { ...props, ref: composedRefs });
});
var [VisuallyHiddenContentContextProvider, useVisuallyHiddenContentContext] = createTooltipContext(TOOLTIP_NAME, { isInside: false });
var TooltipContentImpl = React30.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTooltip,
      children,
      "aria-label": ariaLabel,
      onEscapeKeyDown,
      onPointerDownOutside,
      ...contentProps
    } = props;
    const context = useTooltipContext(CONTENT_NAME2, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const { onClose } = context;
    React30.useEffect(() => {
      document.addEventListener(TOOLTIP_OPEN, onClose);
      return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
    }, [onClose]);
    React30.useEffect(() => {
      if (context.trigger) {
        const handleScroll = (event) => {
          const target = event.target;
          if (target?.contains(context.trigger)) onClose();
        };
        window.addEventListener("scroll", handleScroll, { capture: true });
        return () => window.removeEventListener("scroll", handleScroll, { capture: true });
      }
    }, [context.trigger, onClose]);
    return /* @__PURE__ */ jsx11(
      DismissableLayer,
      {
        asChild: true,
        disableOutsidePointerEvents: false,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside: (event) => event.preventDefault(),
        onDismiss: onClose,
        children: /* @__PURE__ */ jsxs2(
          Content,
          {
            "data-state": context.stateAttribute,
            ...popperScope,
            ...contentProps,
            ref: forwardedRef,
            style: {
              ...contentProps.style,
              // re-namespace exposed content custom properties
              ...{
                "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
              }
            },
            children: [
              /* @__PURE__ */ jsx11(Slottable2, { children }),
              /* @__PURE__ */ jsx11(VisuallyHiddenContentContextProvider, { scope: __scopeTooltip, isInside: true, children: /* @__PURE__ */ jsx11(Root4, { id: context.contentId, role: "tooltip", children: ariaLabel || children }) })
            ]
          }
        )
      }
    );
  }
);
TooltipContent.displayName = CONTENT_NAME2;
var ARROW_NAME2 = "TooltipArrow";
var TooltipArrow = React30.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTooltip, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeTooltip);
    const visuallyHiddenContentContext = useVisuallyHiddenContentContext(
      ARROW_NAME2,
      __scopeTooltip
    );
    return visuallyHiddenContentContext.isInside ? null : /* @__PURE__ */ jsx11(Arrow2, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
TooltipArrow.displayName = ARROW_NAME2;
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const paddedExitPoints = [];
  switch (exitSide) {
    case "top":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y + padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "bottom":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y - padding }
      );
      break;
    case "left":
      paddedExitPoints.push(
        { x: exitPoint.x + padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "right":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x - padding, y: exitPoint.y + padding }
      );
      break;
  }
  return paddedExitPoints;
}
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom }
  ];
}
function isPointInPolygon(point, polygon) {
  const { x: x2, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x2 < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x) return -1;
    else if (a.x > b.x) return 1;
    else if (a.y < b.y) return -1;
    else if (a.y > b.y) return 1;
    else return 0;
  });
  return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
  if (points.length <= 1) return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
      else break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
      else break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) {
    return upperHull;
  } else {
    return upperHull.concat(lowerHull);
  }
}
var Provider = TooltipProvider;
var Root32 = Tooltip;
var Trigger = TooltipTrigger;
var Content2 = TooltipContent;

// ui/tooltip.tsx
import { createPortal } from "react-dom";

// hooks/use-merged-ref.ts
import { useCallback as useCallback9, useRef as useRef9 } from "react";
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}

// hooks/use-touch.ts
import React31 from "react";
function useTouch(_touch) {
  const { touch = true, defaultOpen = false, onOpenChange, open: openChange } = _touch;
  const [isOpen, setIsOpen] = React31.useState(defaultOpen);
  const triggerRef = React31.useRef(null);
  const open = openChange !== void 0 ? openChange : isOpen;
  const setOpen = onOpenChange !== void 0 ? onOpenChange : setIsOpen;
  const [isTouchDevice, setIsTouchDevice] = React31.useState(false);
  React31.useEffect(() => {
    const el = triggerRef.current;
    const onMouseEnter = () => {
      if (!isTouchDevice) setOpen(true);
    };
    const onMouseLeave = () => {
      if (!isTouchDevice) setOpen(false);
    };
    const onMouseMove = () => {
      if (isTouchDevice) setIsTouchDevice(false);
    };
    const onTouchStart = () => {
      if (!isTouchDevice) setIsTouchDevice(true);
      setOpen(true);
    };
    const onTouchEnd = () => {
      setOpen(false);
    };
    const windowTouchStart = () => {
      if (!isTouchDevice) setIsTouchDevice(true);
    };
    if (el) {
      if (touch) {
        el.addEventListener("touchstart", onTouchStart);
        el.addEventListener("touchend", onTouchEnd);
      }
      window.addEventListener("touchstart", windowTouchStart);
      window.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      el.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      if (el) {
        if (touch) {
          el.removeEventListener("touchstart", onTouchStart);
          el.removeEventListener("touchend", onTouchEnd);
        }
        window.removeEventListener("touchstart", windowTouchStart);
        window.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.removeEventListener("mousemove", onMouseMove);
      }
    };
  }, [isTouchDevice, setOpen, triggerRef, touch]);
  return { touch, open, triggerRef };
}

// ui/tooltip.tsx
var ctx2 = React32.createContext(void 0);
var useTooltipCtx = () => React32.useContext(ctx2);
function TooltipProvider2(_props) {
  const { children, open: openChange, defaultOpen, onOpenChange, touch, skipDelayDuration, ...rest } = _props;
  const { open, triggerRef } = useTouch({
    open: openChange,
    defaultOpen,
    onOpenChange,
    touch
  });
  const value = { open, triggerRef, defaultOpen, onOpenChange, touch, skipDelayDuration, ...rest };
  return /* @__PURE__ */ React32.createElement(ctx2.Provider, { value }, /* @__PURE__ */ React32.createElement(Provider, { ...{ skipDelayDuration } }, /* @__PURE__ */ React32.createElement(Root32, { ...value }, children)));
}
var TooltipTrigger2 = React32.forwardRef((_props, ref) => {
  const { touch, triggerRef } = useTooltipCtx();
  return /* @__PURE__ */ React32.createElement(Trigger, { ...{ ref: mergeRefs(triggerRef, ref), "data-touch": `${touch}`, ..._props } });
});
TooltipTrigger2.displayName = TooltipTrigger.displayName;
var TooltipContent2 = React32.forwardRef(function TooltipContent3({ className, sideOffset = 4, children, withArrow, align, side, ...props }, ref) {
  if (typeof document === "undefined") return null;
  return createPortal(
    /* @__PURE__ */ React32.createElement(
      Content2,
      {
        ...{
          ref,
          align,
          side,
          sideOffset: withArrow ? Number(sideOffset) + 9 : sideOffset,
          className: cn(
            "group/content relative z-50 flex items-center justify-center rounded-md border bg-background px-3 py-1.5 text-sm text-muted-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 [&_[data-tooltip]]:text-background",
            className
          ),
          ...props
        }
      },
      children,
      withArrow && /* @__PURE__ */ React32.createElement("svg", { fill: "currentColor", viewBox: "0 0 15 6", strokeWidth: "0", "data-side": side, "data-align": align, "data-tooltip": "arrow", className: arrow4 }, /* @__PURE__ */ React32.createElement("path", { d: "m.7.4c.4,0,.8.2,1.1.5l4,4.1c.5.5,1.1.7,1.7.7s1.2-.2,1.7-.7L13.2.9c.3-.3.7-.5,1.1-.5s.4-.2.4-.4H.3c0,.2.2.4.4.4Z" }), /* @__PURE__ */ React32.createElement(
        "path",
        {
          "data-arrow": "border",
          d: "m12.9.6l-4,4.1c-.8.8-2,.8-2.8,0L2.1.6c-.4-.4-.9-.6-1.4-.6h-.7c0,.4.3.7.7.7s.7.1.9.4l4,4.1c.5.5,1.2.8,1.9.8s1.4-.3,1.9-.8L13.4,1.1c.2-.2.6-.4.9-.4S15,.4,15,0h-.7C13.8,0,13.3.2,12.9.6Z"
        }
      ))
    ),
    document.body
  );
});
TooltipContent2.displayName = Content2.displayName;
var Tooltip2 = React32.forwardRef((_props, ref) => {
  const {
    open,
    onOpenChange,
    defaultOpen,
    delayDuration = 0,
    disableHoverableContent,
    content,
    contentProps,
    sideOffset,
    skipDelayDuration,
    className,
    classNames,
    style,
    styles,
    withArrow,
    touch = true,
    align = "center",
    side = "bottom",
    ...props
  } = _props;
  return /* @__PURE__ */ React32.createElement(TooltipProvider2, { ...{ skipDelayDuration, open, touch, onOpenChange, defaultOpen, delayDuration, disableHoverableContent } }, /* @__PURE__ */ React32.createElement(TooltipTrigger2, { ...{ ref, className: cn(className, classNames?.trigger), style: { ...style, ...styles?.trigger }, ...props } }), content && /* @__PURE__ */ React32.createElement(
    TooltipContent2,
    {
      ...{
        side,
        align,
        sideOffset,
        withArrow,
        className: cn(classNames?.content, contentProps?.className),
        style: { ...styles?.content, ...contentProps?.style },
        ...contentProps
      }
    },
    content
  ));
});
Tooltip2.displayName = "Tooltip";
var arrow4 = cn(
  "absolute !h-[9px] !w-[23px] group-data-[align=center]/content:group-data-[side=bottom]/content:inset-x-auto group-data-[align=center]/content:group-data-[side=left]/content:inset-y-auto group-data-[align=center]/content:group-data-[side=right]/content:inset-y-auto group-data-[align=center]/content:group-data-[side=top]/content:inset-x-auto group-data-[align=end]/content:group-data-[side=bottom]/content:right-2 group-data-[align=end]/content:group-data-[side=left]/content:bottom-4 group-data-[align=end]/content:group-data-[side=right]/content:bottom-4 group-data-[align=end]/content:group-data-[side=top]/content:right-2 group-data-[align=start]/content:group-data-[side=bottom]/content:left-2 group-data-[align=start]/content:group-data-[side=left]/content:top-4 group-data-[align=start]/content:group-data-[side=right]/content:top-4 group-data-[align=start]/content:group-data-[side=top]/content:left-2 group-data-[side=bottom]/content:bottom-[calc(100%-0px)] group-data-[side=left]/content:left-[calc(100%-7px)] group-data-[side=right]/content:right-[calc(100%-7px)] group-data-[side=top]/content:top-[calc(100%-0px)] group-data-[side=bottom]/content:rotate-180 group-data-[side=left]/content:-rotate-90 group-data-[side=right]/content:rotate-90 group-data-[side=top]/content:rotate-0 [&_[data-arrow=border]]:text-border"
);

// ui/rehype/rehype-command.tsx
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
//# sourceMappingURL=compiled-contentlayer-config-FCKZZ7R7.mjs.map
