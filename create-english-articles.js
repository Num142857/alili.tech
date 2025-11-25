const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Article mapping: Chinese title -> file path
const articles = [
  { title: 'Long Time No See', file: 'English/Long Time No See.md', date: '2024-06-19' },
  { title: 'Mac 最小化所有应用快捷键', file: 'macOS/Mac 最小化所有应用快捷键.md', date: '2021-03-31' },
  { title: '使用Taro开发各端的顺序建议', file: 'Taro/8.使用Taro开发各端的顺序建议.md', date: '2020-12-16' },
  { title: '使用Taro开发的快应用如何优化体积', file: 'Taro/7.使用Taro开发的快应用如何优化体积.md', date: '2020-12-15' },
  { title: 'TensorFlow中的Tensor是什么?', file: 'AI/1.TensorFlow中的Tensor是什么.md', date: '2020-09-18' },
  { title: 'Mac系统开启Chrome 跟 Edge的网页强制暗黑模式', file: 'macOS/Mac系统开启Chrome丶Edge暗黑模式.md', date: '2020-09-17' },
  { title: 'Mac系统如何关掉Chrome的跨域限制', file: 'macOS/Mac系统如何关掉Chrome的跨域限制.md', date: '2020-09-16' },
  { title: '数学篇 - 数据结构丶编程语句丶基础算法与数学的关系(笔记)', file: 'Math/15.数学篇 - 数据结构丶编程语句丶基础算法与数学.md', date: '2020-09-15' },
  { title: '数学篇 - 朴素贝叶斯(Naive Bayes)分类算法(笔记)', file: 'Math/14.数学篇 - 朴素贝叶斯分类算法.md', date: '2020-09-14' },
  { title: '数学篇 - 概率之联合概率、条件概率、边缘概率和贝叶斯法则(笔记)', file: 'Math/13.数学篇 - 数学篇 - 概率之联合概率、条件概率、边缘概率和贝叶斯法则.md', date: '2020-09-13' },
  { title: '数学篇 - 概率之随机变量与分布(笔记)', file: 'Math/12.数学篇 - 概率之随机变量与分布.md', date: '2020-09-12' },
  { title: '数学篇 - 树的深度优先搜索与广度优先搜索(笔记)', file: 'Math/11.数学篇 - 树的深度优先搜索与广度优先搜索.md', date: '2020-09-11' },
  { title: '数学篇 - 树的概念(笔记)', file: 'Math/10.数学篇 - 树的概念.md', date: '2020-09-10' },
  { title: '数学篇 - 动态规划,编辑距离的计算(笔记)', file: 'Math/9.数学篇 - 动态规划,编辑距离的计算.md', date: '2020-09-09' },
  { title: '数学篇 - 组合,解决赛程规划与自然语言处理(笔记)', file: 'Math/8.数学篇 - 组合,解决赛程规划与抽奖.md', date: '2020-09-08' },
  { title: '数学篇 - 排列,解决田忌赛马与密码爆破问题(笔记)', file: 'Math/7.数学篇 - 排列,田忌赛马与密码爆破.md', date: '2020-09-07' },
  { title: '数学篇 - 递归,分而治之，从归并排序到MapReduce(笔记)', file: 'Math/6.数学篇 - 递归,分而治之，从归并排序到MapReduce.md', date: '2020-09-06' },
  { title: '数学篇 - 递归,复杂问题分解(笔记)', file: 'Math/5.数学篇 - 递归,复杂问题分解.md', date: '2020-09-05' },
  { title: '数学篇 - 数学归纳法,给计算机注入灵魂(笔记)', file: 'Math/4.数学篇 - 数学归纳法,给计算机注入灵魂.md', date: '2020-09-04' },
  { title: '数学篇 - 迭代法,让每次计算都更接近真像(笔记)', file: 'Math/3.数学篇 - 迭代法,让每次计算都更接近真像.md', date: '2020-09-03' },
  { title: '数学篇 - 余数与哈希函数(笔记)', file: 'Math/2.数学篇 - 余数与哈希函数.md', date: '2020-09-02' },
  { title: '数学篇 - 计算机的源头二进制(笔记)', file: 'Math/1.数学篇-计算机的源头二进制.md', date: '2020-09-01' },
  { title: 'Puppeteer在工作中是如何伪装自己的(爬虫与反爬虫)', file: 'Nodejs/Puppeteer在工作中是如何伪装自己的(爬虫与反爬虫).md', date: '2020-08-29' },
  { title: 'Taro跨端开发之让Taro UI支持React Native', file: 'Taro/6.Taro跨端开发之让Taro UI支持React Native.md', date: '2020-08-27' },
  { title: 'Taro跨端开发之多业务模块管理 React Native篇(终篇)', file: 'Taro/5.Taro跨端开发之多业务模块管理React Native篇(终篇).md', date: '2020-08-25' },
  { title: 'Taro跨端开发之多业务模块管理 React Native篇(中)', file: 'Taro/4.Taro跨端开发之多业务模块管理React Native篇(中).md', date: '2020-08-23' },
  { title: 'Taro跨端开发之多业务模块管理 React Native篇(上)', file: 'Taro/3.Taro跨端开发之多业务模块管理React Native篇(上).md', date: '2020-08-21' },
  { title: 'Taro跨端开发之依赖管理问题', file: 'Taro/2.Taro跨端开发之依赖管理问题.md', date: '2020-08-20' },
  { title: 'Taro跨端开发之跨端开发新时代的思考与举措', file: 'Taro/1.Taro跨端开发之跨端开发新时代的思考与举措.md', date: '2020-06-16' },
  { title: 'Switch XCI转NSP工具 - 4NXCI下载', file: 'Game/Switch XCI转NSP工具下载.md', date: '2020-02-02' },
];

// Translation function placeholder - will use OpenAI API
async function translateText(text, targetLanguage = 'en') {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OPENAI_API_KEY environment variable is not set');
    console.log('Please set your OpenAI API key: export OPENAI_API_KEY=your_key');
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
          - Keep the same structure and formatting
          - For technical terms, use common English translations (e.g., 快应用 -> Quick App, 小程序 -> Mini Program)`
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

// Function to create English version of an article
async function createEnglishArticle(article) {
  const chinesePath = path.join(__dirname, 'content/archive', article.file);
  const englishPath = path.join(__dirname, 'content/en/archive', article.file);
  
  if (!fs.existsSync(chinesePath)) {
    console.warn(`⚠️  Chinese file not found: ${chinesePath}`);
    return null;
  }
  
  console.log(`\n📄 Processing: ${article.title}`);
  console.log(`   From: ${chinesePath}`);
  console.log(`   To: ${englishPath}`);
  
  try {
    // Read Chinese article
    const chineseContent = fs.readFileSync(chinesePath, 'utf-8');
    const parsed = matter(chineseContent);
    
    // Translate title
    let englishTitle = parsed.data.title;
    if (englishTitle !== 'Long Time No See') {
      try {
        englishTitle = await translateText(parsed.data.title);
        console.log(`   Title: ${parsed.data.title} -> ${englishTitle}`);
      } catch (error) {
        console.warn(`   Failed to translate title, keeping original`);
      }
    }
    
    // Translate content
    let englishContent = parsed.content;
    try {
      englishContent = await translateText(parsed.content);
    } catch (error) {
      console.error(`   ✗ Failed to translate content:`, error.message);
      throw error;
    }
    
    // Create English front matter
    const englishFrontMatter = {
      ...parsed.data,
      title: englishTitle,
      // Keep slug, date, and other metadata
    };
    
    // Generate English filename
    const englishFilename = englishTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') + '.md';
    
    // Create translated file content
    const englishFile = matter.stringify(englishContent, englishFrontMatter);
    
    // Ensure directory exists
    const englishDir = path.dirname(englishPath);
    if (!fs.existsSync(englishDir)) {
      fs.mkdirSync(englishDir, { recursive: true });
    }
    
    // Write English file
    fs.writeFileSync(englishPath, englishFile, 'utf-8');
    console.log(`   ✓ Created English version`);
    
    return {
      original: chinesePath,
      translated: englishPath,
      title: englishTitle
    };
  } catch (error) {
    console.error(`   ✗ Failed: ${error.message}`);
    return null;
  }
}

// Main function
async function createAllEnglishArticles() {
  console.log('🚀 Starting to create English versions of articles...\n');
  console.log(`Total articles to process: ${articles.length}\n`);
  
  const results = [];
  
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    console.log(`[${i + 1}/${articles.length}]`);
    
    try {
      const result = await createEnglishArticle(article);
      if (result) {
        results.push(result);
      }
      
      // Add delay to avoid rate limiting
      if (i < articles.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      }
    } catch (error) {
      console.error(`Failed to process article ${i + 1}:`, error.message);
    }
  }
  
  console.log(`\n\n✅ Complete!`);
  console.log(`Successfully created ${results.length} English articles`);
  
  // Save results
  const resultsPath = path.join(__dirname, 'english-articles-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Results saved to: ${resultsPath}`);
}

// Run if called directly
if (require.main === module) {
  createAllEnglishArticles().catch(error => {
    console.error('Failed:', error);
    process.exit(1);
  });
}

module.exports = { createEnglishArticle, translateText };

