import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { resolveFrontMatter } from "./utils/frontmatter.js";
import type { CLIOptions } from "./types/cli-options.js";
import { renderTemplate } from "./utils/render.js";

// Parse CLI arguments into CLIOptions (or extended CLI option types)
function parseArgs<T extends CLIOptions = CLIOptions>(): T {
  const args = process.argv.slice(2);
  console.log("Args:", process.argv);
  const options = {} as T;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Support --key=value
    if (arg.startsWith("--") && arg.includes("=")) {
      const [rawKey, value] = arg.slice(2).split("="); // "file=sample.md" → ["file", "sample.md"]
      const key = rawKey as keyof T;
      if (key === "tags" && typeof value === "string") {
        // Convert comma-separated string into array of trimmed tags
        options[key] = value
          .split(",")
          .map((tag) => tag.trim()) as T[typeof key];
      } else {
        options[key] = value as T[typeof key];
      }

      // Support --key value
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2) as keyof T;
      const value = args[i + 1];
      if (value && !value.startsWith("--")) {
        if (key === "tags") {
          // Handle --tags tag1,tag2 form
          options[key] = value
            .split(",")
            .map((tag) => tag.trim()) as T[typeof key];
        } else {
          options[key] = value as T[typeof key];
        }
        i++; // Skip the next one since we just consumed it
      }
    }
  }

  return options;
}

async function generatePage<T extends CLIOptions = CLIOptions>() {
  const options = parseArgs<T>();

  console.log("✅ Parsed CLI options:", options);

  // Optional: if using `debug`, conditionally log more
  if ((options as any).debug) {
    console.log("🔍 Debug mode ON");
    return;
  }

  if (!options.file) {
    console.error("❌ Please provide a markdown file using --file");
    process.exit(1);
  }

  let inputPath = path.isAbsolute(options.file)
    ? options.file
    : path.resolve("src", "content", options.file);

  // Fallback to sample.md if original file doesn't exist
  if (!fs.existsSync(inputPath)) {
    console.warn(
      `⚠️ File "${options.file}" not found. Falling back to sample.md`
    );
    options.file = "sample.md";
    inputPath = path.resolve("src", "content", "sample.md");
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Fallback file sample.md not found: ${inputPath}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(inputPath, "utf-8");
  const { content, data } = matter(rawContent);

  const frontMatter = resolveFrontMatter(data, options);
  const htmlContent = marked(content);

  const layoutDir = path.join(process.cwd(), "src", "templates");
  const selectedLayout = frontMatter.layout || "sample";
  let layoutPath = path.join(layoutDir, `${selectedLayout}.ejs`);

  if (!fs.existsSync(layoutPath)) {
    console.warn(
      `⚠️ Layout "${selectedLayout}.ejs" not found. Falling back to sample.ejs`
    );
    layoutPath = path.join(layoutDir, "sample.ejs");

    if (!fs.existsSync(layoutPath)) {
      console.error(`❌ Fallback layout sample.ejs not found: ${layoutPath}`);
      process.exit(1);
    }
  }

  let finalHtml = "";

  if (selectedLayout === "layout") {
    const pageName = path.basename(options.file, ".md");
    const innerTemplatePath = path.join(layoutDir, `${pageName}.ejs`);

    let innerContent = htmlContent;

    if (fs.existsSync(innerTemplatePath)) {
      const innerTemplate = fs.readFileSync(innerTemplatePath, "utf-8");
      innerContent = renderTemplate(innerTemplate, {
        ...frontMatter,
        content: htmlContent,
      });
    } else {
      console.warn(
        `⚠️ Inner content template "${pageName}.ejs" not found. Using markdown content instead.`
      );
    }

    const layoutTemplate = fs.readFileSync(layoutPath, "utf-8");
    finalHtml = renderTemplate(layoutTemplate, {
      ...frontMatter,
      cliOptions: options,
      content: innerContent,
    });
  } else {
    const template = fs.readFileSync(layoutPath, "utf-8");
    finalHtml = renderTemplate(template, {
      ...frontMatter,
      cliOptions: options,
      content: htmlContent,
    });
  }

  const outputName = options.out || options.file.replace(/\.md$/, ".html");
  const outputPath = path.resolve("dist", outputName);

  fs.mkdirSync("dist", { recursive: true });
  fs.writeFileSync(outputPath, finalHtml, "utf-8");

  console.log(`✅ Generated: ${outputPath}`);
}

interface MyOptions extends CLIOptions {
  debug?: boolean;
}

generatePage<MyOptions>();
