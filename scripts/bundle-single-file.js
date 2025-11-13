const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const OUT_DIR = path.join(__dirname, '..', 'out');
const OUTPUT_FILE = path.join(__dirname, '..', 'index-single.html');

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.warn(`Could not read file: ${filePath}`);
    return '';
  }
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch (e) {
    return 0;
  }
}

function imageToBase64(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.avif': 'image/avif',
    };
    const mimeType = mimeTypes[ext] || 'image/png';
    const data = fs.readFileSync(filePath);
    return `data:${mimeType};base64,${data.toString('base64')}`;
  } catch (e) {
    console.warn(`Could not convert image: ${filePath}`);
    return '';
  }
}

function downloadExternalCSS(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Failed to download CSS: ${res.statusCode}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function processCSS(cssContent, cssFilePath) {
  // Handle @import statements
  const importRegex = /@import\s+(?:url\()?["']?([^"')]+)["']?\)?[^;]*;/g;
  let match;
  const imports = [];
  
  while ((match = importRegex.exec(cssContent)) !== null) {
    imports.push(match[1]);
  }
  
  // Process each import
  for (const importUrl of imports) {
    if (importUrl.startsWith('http://') || importUrl.startsWith('https://')) {
      try {
        console.log(`Downloading external CSS: ${importUrl}`);
        const externalCSS = await downloadExternalCSS(importUrl);
        // Replace the import with the actual CSS content
        cssContent = cssContent.replace(
          new RegExp(`@import\\s+(?:url\\()?["']?${importUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?\\)?[^;]*;`, 'g'),
          externalCSS
        );
        console.log(`✓ Inlined external CSS: ${importUrl}`);
      } catch (err) {
        console.warn(`⚠ Could not download external CSS: ${importUrl}`, err.message);
        // Keep the original import if download fails
      }
    } else {
      // Handle relative imports
      const cssDir = cssFilePath ? path.dirname(cssFilePath) : OUT_DIR;
      let importPath = importUrl;
      
      // Remove query strings and fragments
      importPath = importPath.split('?')[0].split('#')[0];
      
      if (importPath.startsWith('/')) {
        importPath = path.join(OUT_DIR, importPath.substring(1));
      } else {
        importPath = path.join(cssDir, importPath);
      }
      
      if (fs.existsSync(importPath)) {
        const importedCSS = readFile(importPath);
        cssContent = cssContent.replace(
          new RegExp(`@import\\s+(?:url\\()?["']?${importUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?\\)?[^;]*;`, 'g'),
          importedCSS
        );
        console.log(`✓ Inlined local CSS import: ${importUrl}`);
      } else {
        console.warn(`⚠ Could not find CSS import: ${importPath}`);
      }
    }
  }
  
  return cssContent;
}

function resolvePath(filePath, baseDir) {
  if (filePath.startsWith('/')) {
    return path.join(OUT_DIR, filePath.substring(1));
  } else if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return null; // External URL
  } else {
    return path.join(baseDir, filePath);
  }
}

async function bundleSingleFile() {
  console.log('Bundling single HTML file...');
  
  // Find the main HTML file
  const htmlFile = path.join(OUT_DIR, 'index.html');
  if (!fs.existsSync(htmlFile)) {
    console.error('index.html not found in out directory. Run "npm run build" first.');
    process.exit(1);
  }

  let html = readFile(htmlFile);
  
  // Process CSS files - handle both link tags and style tags
  // Match CSS files with or without query parameters
  const cssLinkRegex = /<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]*>/g;
  let match;
  const processedCSS = new Set();
  
  while ((match = cssLinkRegex.exec(html)) !== null) {
    let cssPath = match[1];
    const originalPath = cssPath;
    
    // Remove query parameters and fragments for file lookup
    cssPath = cssPath.split('?')[0].split('#')[0];
    
    // Skip external URLs for now (we'll handle them in CSS processing)
    if (cssPath.startsWith('http://') || cssPath.startsWith('https://')) {
      console.log(`⚠ External CSS link found: ${cssPath} - will be handled if imported`);
      continue;
    }
    
    const fullPath = resolvePath(cssPath, OUT_DIR);
    
    if (fullPath && fs.existsSync(fullPath) && !processedCSS.has(cssPath)) {
      let cssContent = readFile(fullPath);
      
      // Process CSS imports (including external ones)
      cssContent = await processCSS(cssContent, fullPath);
      
      // Wrap in style tag
      const styleTag = `<style>${cssContent}</style>`;
      // Replace using the original match (with query params if any)
      html = html.replace(match[0], styleTag);
      console.log(`✓ Inlined CSS: ${cssPath}`);
      processedCSS.add(cssPath);
    } else if (!fullPath) {
      console.warn(`⚠ External CSS URL: ${cssPath}`);
    } else {
      // Try to find the file without query params
      console.warn(`⚠ CSS file not found: ${fullPath}, trying alternative paths...`);
      
      // Try common Next.js CSS paths
      const alternativePaths = [
        path.join(OUT_DIR, '_next', 'static', 'css', path.basename(cssPath)),
        path.join(OUT_DIR, path.basename(cssPath)),
      ];
      
      let found = false;
      for (const altPath of alternativePaths) {
        if (fs.existsSync(altPath)) {
          let cssContent = readFile(altPath);
          cssContent = await processCSS(cssContent, altPath);
          const styleTag = `<style>${cssContent}</style>`;
          html = html.replace(match[0], styleTag);
          console.log(`✓ Inlined CSS (found at alternative path): ${altPath}`);
          processedCSS.add(cssPath);
          found = true;
          break;
        }
      }
      
      if (!found) {
        console.warn(`⚠ Could not find CSS file: ${cssPath}`);
      }
    }
  }
  
  // Process inline style tags for @import statements
  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  while ((match = styleTagRegex.exec(html)) !== null) {
    const styleContent = match[1];
    const processedContent = await processCSS(styleContent);
    if (processedContent !== styleContent) {
      html = html.replace(match[0], `<style>${processedContent}</style>`);
      console.log(`✓ Processed @import in inline style tag`);
    }
  }
  
  // Inline JS files
  const jsRegex = /<script[^>]+src=["']([^"']+\.js[^"']*)["'][^>]*><\/script>/g;
  const processedJS = new Set();
  
  while ((match = jsRegex.exec(html)) !== null) {
    const jsPath = match[1];
    
    if (jsPath.startsWith('http://') || jsPath.startsWith('https://')) {
      console.warn(`⚠ External JS URL: ${jsPath} - skipping`);
      continue;
    }
    
    const fullPath = resolvePath(jsPath, OUT_DIR);
    
    if (fullPath && fs.existsSync(fullPath) && !processedJS.has(jsPath)) {
      const jsContent = readFile(fullPath);
      const scriptTag = `<script>${jsContent}</script>`;
      html = html.replace(match[0], scriptTag);
      console.log(`✓ Inlined JS: ${jsPath}`);
      processedJS.add(jsPath);
    } else {
      console.warn(`⚠ JS file not found: ${fullPath || jsPath}`);
    }
  }
  
  // Convert images to base64 (for small images only, < 500KB)
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  const processedImages = new Set();
  
  while ((match = imgRegex.exec(html)) !== null) {
    const imgPath = match[1];
    
    // Skip data URIs and external URLs
    if (imgPath.startsWith('data:') || imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      continue;
    }
    
    const fullPath = resolvePath(imgPath, OUT_DIR);
    
    if (fullPath && fs.existsSync(fullPath) && !processedImages.has(imgPath)) {
      const fileSize = getFileSize(fullPath);
      // Only inline images smaller than 500KB
      if (fileSize > 0 && fileSize < 500 * 1024) {
        const base64 = imageToBase64(fullPath);
        if (base64) {
          html = html.replace(new RegExp(`src=["']${imgPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g'), `src="${base64}"`);
          console.log(`✓ Inlined image: ${imgPath}`);
          processedImages.add(imgPath);
        }
      } else {
        console.log(`⊘ Skipped large image (${(fileSize / 1024).toFixed(2)}KB): ${imgPath}`);
      }
    }
  }
  
  // Handle background images in CSS (both inline styles and style tags)
  const bgImgRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/g;
  while ((match = bgImgRegex.exec(html)) !== null) {
    const imgPath = match[1];
    
    if (imgPath.startsWith('data:') || imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      continue;
    }
    
    const fullPath = resolvePath(imgPath, OUT_DIR);
    
    if (fullPath && fs.existsSync(fullPath) && !processedImages.has(imgPath)) {
      const fileSize = getFileSize(fullPath);
      if (fileSize > 0 && fileSize < 500 * 1024) {
        const base64 = imageToBase64(fullPath);
        if (base64) {
          html = html.replace(match[0], `background-image: url(${base64})`);
          console.log(`✓ Inlined background image: ${imgPath}`);
          processedImages.add(imgPath);
        }
      }
    }
  }
  
  // Write the bundled file
  fs.writeFileSync(OUTPUT_FILE, html, 'utf8');
  console.log(`\n✅ Single file created: ${OUTPUT_FILE}`);
  console.log(`File size: ${(getFileSize(OUTPUT_FILE) / 1024 / 1024).toFixed(2)} MB`);
}

bundleSingleFile().catch((err) => {
  console.error('Error bundling file:', err);
  process.exit(1);
});
