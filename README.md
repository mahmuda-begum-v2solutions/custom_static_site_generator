# ⚡ Custom Static Site Generator Demo

## 🛠 Installation

npm init -y
tsc --init
npm install marked ejs gray-matter
npm install -D typescript
npm install -D @types/node
npm i --save-dev @types/ejs
npm install --save-dev rimraf //support cross platform for removing files
npm install --save-dev http-server
npm install dayjs
npm install module-alias

## 🚧 Build the Project

npm run build

## 🚀 Generate HTML Files

### Generate from index.md

node dist/index.js --file=index.md --out=text-index.html

### Generate from other markdown files

node dist/index.js --file=sample.md
node dist/index.js --file=about.md
node dist/index.js --file=blog.md
node dist/index.js --file=contact.md

### 🐛 Debug Mode

node dist/index.js --file=sample.md --debug=true

### 🎛 CLI Overrides

node dist/index.js --file=blog.md --title="Custom Title" --author="GPT" --layout=blog --out=test-blog.html

node dist/index.js --file=test.md --title="CLI Override Title" --date="2025-04-01" --author="CLI Bot" --layout=test --description="This is a CLI test for the static site generator." --tags=typescript,test,cli --out=test-output.html

## 🌐 Preview the Output

npm run preview

## 📁 Project Structure

src/
├── content/ # Markdown files (.md)
├── templates/ # EJS layout files (.ejs)
├── types/ # Type definitions
├── utils/ # Helper functions
├── index.ts # Entry point
dist/ # Output folder (generated HTML)

### ✅ Features

Supports front matter (YAML) parsing

Custom CLI overrides (title, author, layout, etc.)

Layout-specific rendering with fallback handling

Tags, description, and formatted date support

Debug mode for inspection

Cross-platform file cleanup via rimraf

Lightweight dev preview with http-server
