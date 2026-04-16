import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const cssPath = path.join(repoRoot, "src/styles/global.css");
const srcRoot = path.join(repoRoot, "src");

const css = fs.readFileSync(cssPath, "utf8");

function extractBlock(marker) {
  const start = css.indexOf(marker);
  if (start === -1) {
    throw new Error(`Could not find CSS block for ${marker}`);
  }

  const openBrace = css.indexOf("{", start);
  let depth = 0;

  for (let index = openBrace; index < css.length; index += 1) {
    const char = css[index];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(openBrace + 1, index);
      }
    }
  }

  throw new Error(`Could not parse CSS block for ${marker}`);
}

function parseVars(block) {
  const vars = new Map();
  for (const match of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    vars.set(`--${match[1]}`, match[2].trim());
  }
  return vars;
}

function parseOklch(value) {
  if (!value.startsWith("oklch(") || !value.endsWith(")")) {
    throw new Error(`Unsupported color format: ${value}`);
  }

  const raw = value.slice(6, -1).trim();
  const [colorPart, alphaPart] = raw.split("/").map((part) => part.trim());
  const [l, c, h] = colorPart.split(/\s+/).map(Number);

  return {
    l,
    c,
    h,
    alpha: alphaPart === undefined ? 1 : Number(alphaPart),
  };
}

function toSrgb({ l, c, h, alpha = 1 }) {
  const hueRadians = (h * Math.PI) / 180;
  const a = c * Math.cos(hueRadians);
  const b = c * Math.sin(hueRadians);

  const lPrime = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
  const mPrime = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
  const sPrime = Math.pow(l - 0.0894841775 * a - 1.291485548 * b, 3);

  const linear = {
    r: +4.0767416621 * lPrime - 3.3077115913 * mPrime + 0.2309699292 * sPrime,
    g: -1.2684380046 * lPrime + 2.6097574011 * mPrime - 0.3413193965 * sPrime,
    b: -0.0041960863 * lPrime - 0.7034186147 * mPrime + 1.707614701 * sPrime,
  };

  const encode = (channel) => {
    const clamped = Math.max(0, Math.min(1, channel));
    return clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  return {
    r: encode(linear.r),
    g: encode(linear.g),
    b: encode(linear.b),
    alpha,
  };
}

function composite(foreground, background) {
  const alpha = foreground.alpha ?? 1;
  return {
    r: foreground.r * alpha + background.r * (1 - alpha),
    g: foreground.g * alpha + background.g * (1 - alpha),
    b: foreground.b * alpha + background.b * (1 - alpha),
    alpha: 1,
  };
}

function toLinear(channel) {
  return channel <= 0.04045
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function luminance(color) {
  return (
    0.2126 * toLinear(color.r) +
    0.7152 * toLinear(color.g) +
    0.0722 * toLinear(color.b)
  );
}

function contrastRatio(foreground, background) {
  const luminances = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

function getResolvedColor(themeVars, name, backdropName = "--site-bg") {
  const value = themeVars.get(name);
  if (!value) {
    throw new Error(`Missing theme token ${name}`);
  }

  const parsed = toSrgb(parseOklch(value));
  if ((parsed.alpha ?? 1) < 1) {
    return composite(parsed, getResolvedColor(themeVars, backdropName));
  }
  return parsed;
}

function getLiteralColor(value) {
  return toSrgb(parseOklch(value));
}

const themes = [
  { name: "dark", vars: parseVars(extractBlock(":root")) },
  { name: "light", vars: parseVars(extractBlock('html[data-theme="light"]')) },
];

const checks = [
  {
    label: "Body text on body background",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-text"),
      background: getResolvedColor(vars, "--site-bg"),
    }),
  },
  {
    label: "Muted text on body background",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-text-muted"),
      background: getResolvedColor(vars, "--site-bg"),
    }),
  },
  {
    label: "Soft text on body background",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-text-soft"),
      background: getResolvedColor(vars, "--site-bg"),
    }),
  },
  {
    label: "Soft text on surface",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-text-soft"),
      background: getResolvedColor(vars, "--site-surface"),
    }),
  },
  {
    label: "Soft text on control background",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-text-soft"),
      background: getResolvedColor(vars, "--site-control-bg"),
    }),
  },
  {
    label: "Primary button text on accent",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-on-accent"),
      background: getResolvedColor(vars, "--site-accent"),
    }),
  },
  {
    label: "Primary button text on accent hover",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-on-accent"),
      background: getResolvedColor(vars, "--site-accent-strong"),
    }),
  },
  {
    label: "Chip text on chip background",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-accent-strong"),
      background: getResolvedColor(vars, "--site-accent-soft"),
    }),
  },
  {
    label: "Muted nav text on nav background",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-text-muted"),
      background: getResolvedColor(vars, "--site-nav-bg"),
    }),
  },
  {
    label: "Primary nav text on nav background",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-text"),
      background: getResolvedColor(vars, "--site-nav-bg"),
    }),
  },
  {
    label: "Kicker accent on body background",
    minimum: 3,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-accent"),
      background: getResolvedColor(vars, "--site-bg"),
    }),
  },
  {
    label: "Search button text on control background",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-text"),
      background: getResolvedColor(vars, "--site-control-bg"),
    }),
  },
  {
    label: "Selection text on accent-soft",
    minimum: 4.5,
    measure: (vars) => ({
      foreground: getResolvedColor(vars, "--site-text"),
      background: getResolvedColor(vars, "--site-accent-soft"),
    }),
  },
  {
    label: "Badge overlay text on overlay background",
    minimum: 4.5,
    measure: () => ({
      foreground: getLiteralColor("oklch(0.94 0.03 75)"),
      background: composite(
        getLiteralColor("oklch(0 0 0 / 0.62)"),
        getLiteralColor("oklch(0.14 0.012 55)"),
      ),
    }),
  },
];

let failureCount = 0;

console.log("WCAG AA contrast audit");

for (const theme of themes) {
  console.log(`\n[${theme.name}]`);
  for (const check of checks) {
    const { foreground, background } = check.measure(theme.vars);
    const ratio = contrastRatio(foreground, background);
    const status = ratio >= check.minimum ? "PASS" : "FAIL";

    if (status === "FAIL") {
      failureCount += 1;
    }

    console.log(
      `${status} ${check.label}: ${ratio.toFixed(2)}:1 (minimum ${check.minimum}:1)`,
    );
  }
}

function walk(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(entryPath));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

const trackedExtensions = new Set([".astro", ".css", ".js", ".jsx", ".md", ".mdx", ".mjs", ".ts", ".tsx"]);
const literalColorPattern = /#[0-9a-fA-F]{3,8}\b|(?:rgb|rgba|hsl|hsla|oklab|oklch)\([^)]*\)/g;
const utilityColorPattern =
  /\b(?:bg|text|border|from|via|to|decoration|fill|stroke)-(?:white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\d{2,3})?\b/g;

const warnings = [];

for (const filePath of walk(srcRoot)) {
  if (!trackedExtensions.has(path.extname(filePath))) continue;
  if (filePath === cssPath) continue;

  const relativePath = path.relative(repoRoot, filePath);
  const lines = fs.readFileSync(filePath, "utf8").split("\n");

  lines.forEach((line, index) => {
    if (line.includes("bg-site-") || line.includes("text-site-") || line.includes("border-site-")) {
      return;
    }

    const matches = [
      ...(line.match(literalColorPattern) ?? []),
      ...(line.match(utilityColorPattern) ?? []),
    ];

    if (matches.length === 0) {
      return;
    }

    warnings.push({
      relativePath,
      lineNumber: index + 1,
      matches: [...new Set(matches)],
      snippet: line.trim(),
    });
  });
}

if (warnings.length > 0) {
  console.log("\nWarnings: hard-coded color usage outside shared theme tokens");
  for (const warning of warnings) {
    console.log(
      `WARN ${warning.relativePath}:${warning.lineNumber} [${warning.matches.join(", ")}] ${warning.snippet}`,
    );
  }
}

if (failureCount > 0) {
  console.error(`\nContrast audit failed with ${failureCount} failing check(s).`);
  process.exit(1);
}

console.log("\nContrast audit passed.");
