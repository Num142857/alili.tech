const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to get all markdown files recursively
function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to parse front matter and get article info
function getArticleInfo(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(content);
    
    // Skip if hidden
    if (parsed.data.hidden === true) {
      return null;
    }
    
    // Skip about page
    const relativePath = path.relative(path.join(__dirname, 'content/archive'), filePath);
    if (relativePath.includes('about') || relativePath.includes('_index')) {
      return null;
    }
    
    // Get date, default to file creation time if not specified
    let date = parsed.data.date;
    if (date) {
      date = new Date(date);
    } else {
      const stats = fs.statSync(filePath);
      date = stats.birthtime;
    }
    
    return {
      filePath,
      relativePath,
      title: parsed.data.title || path.basename(filePath, '.md'),
      date: date,
      slug: parsed.data.slug || path.basename(filePath, '.md'),
      category: path.dirname(relativePath),
      content: parsed.content,
      frontMatter: parsed.data
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

// Main function
function identifyTopArticles() {
  const archiveDir = path.join(__dirname, 'content/archive');
  
  if (!fs.existsSync(archiveDir)) {
    console.error('Archive directory not found:', archiveDir);
    process.exit(1);
  }
  
  console.log('Scanning articles...');
  const allFiles = getAllMarkdownFiles(archiveDir);
  console.log(`Found ${allFiles.length} markdown files`);
  
  const articles = allFiles
    .map(getArticleInfo)
    .filter(article => article !== null)
    .sort((a, b) => b.date - a.date); // Sort by date, newest first
  
  console.log(`Found ${articles.length} valid articles (excluding hidden and about pages)`);
  
  const top20 = articles.slice(0, 20);
  
  console.log('\nTop 20 articles (newest first):');
  top20.forEach((article, index) => {
    console.log(`${index + 1}. ${article.title} (${article.date.toISOString().split('T')[0]}) - ${article.relativePath}`);
  });
  
  // Save to JSON file for translation script
  const outputPath = path.join(__dirname, 'top-20-articles.json');
  fs.writeFileSync(outputPath, JSON.stringify(top20, null, 2), 'utf-8');
  console.log(`\nArticle list saved to: ${outputPath}`);
  
  return top20;
}

// Run if called directly
if (require.main === module) {
  identifyTopArticles();
}

module.exports = { identifyTopArticles, getArticleInfo };

