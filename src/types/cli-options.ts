export interface CLIOptions {
  file?: string; // Input markdown file (e.g., about.md)
  title?: string; // Override the title from front matter
  date?: string; // Override the publish date (ISO or readable)
  author?: string; // Override the author name
  layout?: string; // Layout template to use (e.g., article, blog)
  description?: string; // Meta description for SEO
  tags?: string[]; // Array of tags (e.g., ["tech", "vue", "typescript"])
  out?: string; // Output HTML filename (e.g., about.html)
}
