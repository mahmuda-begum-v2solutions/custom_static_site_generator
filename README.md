# ⚡ Custom Static Site Generator Demo

## 🛠 Installation

```sh
npm init -y
tsc --init
npm install marked ejs gray-matter
npm install -D typescript
npm install -D @types/node
npm i --save-dev @types/ejs
npm install --save-dev rimraf
npm install --save-dev http-server
npm install dayjs
npm install module-alias
```

rimraf --> support cross platform for removing files

module-alias --> not required

## 🚧 Build the Project

### Choose one of the following based on your use case and environment:

### For CLI-only usage (no upload preview):

```sh
npm run buildcli
```

### For upload + preview support (with PowerShell):

```sh
npm run build
```

```sh
npm run start
```

## If you're not using PowerShell, use the appropriate command:

### Unix/macOS/Linux:

```sh
npm run buildcp
```

### Cross-platform (requires shx):

```sh
npm run buildshx
```

## 🚀 Generate HTML Files using CLI

### Generate from index.md

```sh
node dist/index.js --file=index.md --out=text-index.html
```

### Generate from other markdown files

```sh
node dist/index.js --file=sample.md
```

```sh
node dist/index.js --file=about.md
```

```sh
node dist/index.js --file=blog.md
```

```sh
node dist/index.js --file=contact.md
```

### 🐛 Debug Mode

```sh
node dist/index.js --file=sample.md --debug=true
```

### 🎛 CLI Overrides

```sh
node dist/index.js --file=blog.md --title="Custom Title" --author="GPT" --layout=blog --out=test-blog.html
```

```sh
node dist/index.js --file=test.md --title="CLI Override Title" --date="2025-04-01" --author="CLI Bot" --layout=test --description="This is a CLI test for the static site generator." --tags=typescript,test,cli --out=test-output.html
```

## 🌐 Preview the Output

```sh
npm run preview
```

## 📁 Project Structure

```
src/
├── content/ # Markdown files (.md)
├── templates/ # EJS layout files (.ejs)
├── types/ # Type definitions
├── utils/ # Helper functions
├── index.ts # Entry point
dist/ # Output folder (generated HTML)
```

### ✅ Features

- Supports front matter (YAML) parsing
- Custom CLI overrides (`title`, `author`, `layout`, etc.)
- Layout-specific rendering with fallback to `sample.ejs`
- Smart output filename based on the uploaded or specified file
- Tags, description, and formatted date support
- Dual usage modes:
  - 🖥️ **CLI-based generation**
  - 🌐 **Web UI upload + preview**
- Debug mode for inspecting processed content
- Cross-platform file cleanup via `rimraf`
- Lightweight live preview using `http-server`
