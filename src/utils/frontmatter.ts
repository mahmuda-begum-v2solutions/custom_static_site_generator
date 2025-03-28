import dayjs from "dayjs";
import { FrontMatter, ResolvedFrontMatter } from "../types/front-matter.js";
import { CLIOptions } from "../types/cli-options.js";

export function resolveFrontMatter(
  raw: FrontMatter,
  cli: CLIOptions
): ResolvedFrontMatter {
  const title = cli.title || raw.title || "Untitled";
  const date = cli.date || raw.date || new Date().toISOString();
  const author = cli.author || raw.author || "Anonymous";
  const layout = cli.layout || raw.layout || "default";
  const description = cli.description || raw.description;
  const tagsRaw = cli.tags || raw.tags || [];

  const tags = Array.isArray(tagsRaw)
    ? tagsRaw
    : typeof tagsRaw === "string"
    ? tagsRaw.split(",").map((tag) => tag.trim())
    : [];

  const parsedDate = dayjs(date);
  const formattedDate = parsedDate.format("MMMM D, YYYY");
  const dateTime = parsedDate.toISOString();

  return {
    title,
    date,
    author,
    layout,
    description,
    tags,
    formattedDate,
    dateTime,
  };
}
