const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads', 'products');
console.log('🧪 Ruta esperada:', uploadDir);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Carpeta creada automáticamente');
} else {
  console.log('📁 La carpeta ya existía');
}
