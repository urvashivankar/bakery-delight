const fs = require('fs');
const path = require('path');

const root = __dirname;
const frontend = path.join(root, 'frontend');
const backend = path.join(root, 'backend');

// Ensure frontend and backend exist
if (!fs.existsSync(frontend)) fs.mkdirSync(frontend);
if (!fs.existsSync(backend)) fs.mkdirSync(backend);

const exclude = ['frontend', 'backend', '.git', '.gemini', 'move.js'];

fs.readdirSync(root).forEach(file => {
  if (!exclude.includes(file)) {
    const oldPath = path.join(root, file);
    const newPath = path.join(frontend, file);
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`Moved ${file} to frontend/`);
    } catch (e) {
      console.error(`Failed to move ${file}:`, e.message);
    }
  }
});
