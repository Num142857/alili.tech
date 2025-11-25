const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { identifyTopArticles } = require('./identify-top-articles');

// Translation function using OpenAI API
async function translateText(text, targetLanguage = 'en') {
  // Check if OpenAI API key is available
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OPENAI_API_KEY environment variable is not set');
    console.log('Please set your OpenAI API key: export OPENAI_API_KEY=your_key');
    console.log('Or use a different translation service');
    throw new Error('API key not found');
  }
  
  const OpenAI = require('openai');
  const openai = new OpenAI({ apiKey });
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the following Chinese technical blog content to English. 
          - Keep code blocks, technical terms (like framework names, library names), and URLs unchanged
          - Maintain the original markdown formatting
          - Translate naturally and accurately
          - Keep the same structure and formatting`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Translation error:', error.message);
    throw error;
  }
}

// Function to translate front matter
function translateFrontMatter(frontMatter) {
  const translated = { ...frontMatter };
  
  // Translate title
  if (translated.title) {
    // Title will be translated in the main translation
  }
  
  // Keep technical fields unchanged
  // slug, date, tags, categories can be translated but we'll keep them for now
  
  return translated;
}

// Function to translate an article
async function translateArticle(article) {
  console.log(`\nTranslating: ${article.title}`);
  console.log(`Path: ${article.relativePath}`);
  
  try {
    // Read original content
    const originalContent = fs.readFileSync(article.filePath, 'utf-8');
    const parsed = matter(originalContent);
    
    // Translate title
    let translatedTitle = parsed.data.title;
    try {
      translatedTitle = await translateText(parsed.data.title);
      console.log(`Title: ${parsed.data.title} -> ${translatedTitle}`);
    } catch (error) {
      console.warn('Failed to translate title, keeping original');
    }
    
    // Translate content
    let translatedContent = parsed.content;
    try {
      translatedContent = await translateText(parsed.content);
    } catch (error) {
      console.error('Failed to translate content:', error.message);
      throw error;
    }
    
    // Create translated front matter
    const translatedFrontMatter = {
      ...parsed.data,
      title: translatedTitle,
      // Keep slug, date, and other metadata
    };
    
    // Generate English slug if needed
    if (!translatedFrontMatter.slug) {
      // Use a simple slug generation (can be improved)
      translatedFrontMatter.slug = translatedTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    // Create translated file content
    const translatedFile = matter.stringify(translatedContent, translatedFrontMatter);
    
    // Determine output path
    const outputPath = path.join(
      __dirname,
      'content/en/archive',
      article.relativePath
    );
    
    // Ensure directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write translated file
    fs.writeFileSync(outputPath, translatedFile, 'utf-8');
    console.log(`✓ Translated article saved to: ${outputPath}`);
    
    return {
      original: article.filePath,
      translated: outputPath,
      title: translatedTitle
    };
  } catch (error) {
    console.error(`✗ Failed to translate ${article.title}:`, error.message);
    throw error;
  }
}

// Main function
async function translateTopArticles() {
  console.log('Starting translation process...\n');
  
  // Get top 20 articles
  const articles = identifyTopArticles();
  
  if (articles.length === 0) {
    console.error('No articles found to translate');
    process.exit(1);
  }
  
  console.log(`\nWill translate ${articles.length} articles\n`);
  
  const results = [];
  
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    console.log(`\n[${i + 1}/${articles.length}] Processing: ${article.title}`);
    
    try {
      const result = await translateArticle(article);
      results.push(result);
      
      // Add a small delay to avoid rate limiting
      if (i < articles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Failed to translate article ${i + 1}:`, error.message);
      // Continue with next article
    }
  }
  
  console.log(`\n\nTranslation complete!`);
  console.log(`Successfully translated ${results.length} articles`);
  
  // Save results
  const resultsPath = path.join(__dirname, 'translation-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Results saved to: ${resultsPath}`);
}

// Run if called directly
if (require.main === module) {
  translateTopArticles().catch(error => {
    console.error('Translation failed:', error);
    process.exit(1);
  });
}

module.exports = { translateArticle, translateText };

