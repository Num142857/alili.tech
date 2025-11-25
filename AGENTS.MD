# AGENTS.MD - Project Documentation

## Project Overview

**alili.tech** is a personal blog website built with Hugo static site generator. It's a front-end engineer's technical blog focusing on web development, featuring articles on micro-frontend, Taro, Node.js, Angular, React, and various front-end technologies.

- **Site URL**: https://alili.tech/
- **Repository**: https://github.com/Num142857/alili.tech
- **Author**: Fan (Front-end Engineer)
- **Location**: Hangzhou, China

## Technology Stack

### Core Technologies
- **Static Site Generator**: Hugo
- **Theme**: hugo-cactus-dark
- **Build Tool**: Gulp 3.9.1
- **Package Manager**: npm

### Key Dependencies
- **gulp**: Build automation
- **gulp-htmlmin**: HTML minification
- **gulp-shell**: Shell command execution
- **workbox-build**: Service Worker generation for PWA support
- **axios**: HTTP client for API requests
- **cos-nodejs-sdk-v5**: Tencent Cloud Object Storage SDK
- **xml2js**: XML parsing for sitemap processing

### Deployment Platforms
- **Tencent Cloud COS** (primary deployment via `upload.js`)
- **Aliyun OSS** (alternative deployment via `oss.js`)

## Project Structure

```
alili.tech/
├── archetypes/          # Hugo content templates
├── backup/              # Backup of old articles
│   ├── Reprint/        # Republished articles by date
│   ├── Trending/       # Trending articles collection
│   └── Weekly/         # Weekly articles
├── content/            # Blog content (source files)
│   ├── about/          # About page and resume
│   ├── archive/        # Article archives by category
│   ├── links/          # Links page
│   └── secret/         # Private content
├── layouts/            # Hugo layout templates
│   └── shortcodes/     # Custom shortcodes
├── static/             # Static assets (images, data, etc.)
├── themes/             # Hugo themes
│   └── hugo-cactus-dark/  # Current theme
├── config.yml          # Hugo configuration
├── gulpfile.js         # Build automation tasks
├── package.json        # Node.js dependencies and scripts
├── upload.js           # Tencent Cloud COS deployment script
├── oss.js              # Aliyun OSS deployment script (in static/)
└── random.js           # Utility script

```

## Build Process

The build process is automated through Gulp tasks defined in `gulpfile.js`. The default task executes the following steps in sequence:

### 1. **getTodayData** Task
- Fetches daily quote/thought from Shanbay API
- Saves data to `static/data/today.json`
- Displays the quote in console

### 2. **build** Task
- Runs `hugo --buildFuture` to generate static site
- Builds the site to `public/` directory

### 3. **baiduSeo** Task
- Reads generated `sitemap.xml`
- Submits URLs to multiple Baidu SEO platforms:
  - Real-time push (实时推送)
  - Batch push (历史推送)
  - Standard Baidu push
  - MIP push
  - AMP push
- Configurable URL count limit (default: 75)

### 4. **generate-service-worker** Task
- Generates Service Worker using Workbox
- Implements PWA caching strategies:
  - **JS files**: Network-first strategy
  - **CSS files**: Stale-while-revalidate strategy
  - **Images**: Cache-first strategy (max 50 entries)
  - **HTML files**: Network-first strategy
- Outputs `sw.js` in `public/` directory

### 5. **minify** Task
- Minifies all HTML files in `public/` directory
- Removes whitespace for optimization

### 6. **sendMessage** Task
- Sends deployment notification via Xizhi API
- Notifies blog owner when deployment completes

## Deployment

### Tencent Cloud COS Deployment

The `upload.js` script deploys the site to Tencent Cloud COS:

**Environment Variables Required:**
- `TENCENT_SECRET_ID`
- `TENCENT_SECRET_KEY`

**Configuration:**
- Bucket: `serverless-page-bucket-5z6gco4t-1257581837`
- Region: `ap-shanghai`
- Uploads entire `public/` directory recursively

**Usage:**
```bash
node upload.js
```

### Aliyun OSS Deployment

The `oss.js` script (located in `static/`) deploys to Aliyun OSS using `ali-oss-publish`:

**Features:**
- Excludes `.DS_Store` and `.git` files
- Sets appropriate MIME types
- Configures cache headers
- Special cache rules for `index.html` and `service-worker.js`

**Usage:**
```bash
cd static
node oss.js
```

## NPM Scripts

```json
{
  "start": "hugo server --buildFuture",  // Local development server
  "build": "gulp"                        // Full build process
}
```

## Configuration

### Hugo Configuration (`config.yml`)

**Key Settings:**
- **Base URL**: https://alili.tech/
- **Language**: Chinese (zh)
- **Theme**: hugo-cactus-dark
- **RSS**: Disabled
- **Comments**: Disqus (shortname: alili-tech)

**SEO Settings:**
- Sitemap: Weekly update frequency
- Priority: 0.5
- Keywords: Front-end development, Web development, JavaScript, etc.

**Social Links:**
- GitHub: http://github.com/Num142857

## Content Organization

### Article Categories

The blog content is organized into multiple categories:

- **AI**: Artificial Intelligence related
- **Algorithms**: Algorithm tutorials
- **Angular/Angularjs**: Angular framework articles
- **Block chain**: Blockchain development
- **CICD**: Continuous Integration/Deployment
- **Electron**: Desktop application development
- **Git**: Version control
- **Hugo**: Blog platform tutorials
- **Javascript**: JavaScript fundamentals
- **MicroFrontend**: Micro-frontend architecture
- **Nodejs**: Node.js development
- **React**: React framework
- **Taro**: Taro cross-platform framework
- **Math**: Mathematics notes
- **Pi**: Raspberry Pi projects
- And more...

## Features

### PWA Support
- Service Worker for offline functionality
- Caching strategies for optimal performance
- Progressive Web App capabilities

### SEO Optimization
- Automated sitemap generation
- Multiple Baidu SEO platform integration
- Meta tags configuration
- Open Graph support (configured but not fully utilized)

### Performance
- HTML minification
- Optimized asset caching
- Service Worker for resource caching

### Development Experience
- Hot reload with Hugo server
- Automated build pipeline
- Deployment notifications

## Custom Scripts

### random.js
Generates a random string using `Math.random().toString(36).substr(2)`. Purpose unclear from code alone.

## Backup System

The project maintains a comprehensive backup system in the `backup/` directory:
- **Reprint/**: Articles organized by date (2018-2019)
- **Trending/**: Monthly trending GitHub JavaScript projects (2017-2019)
- **Weekly/**: Weekly article collections

## Theme Customization

The site uses the `hugo-cactus-dark` theme located in `themes/hugo-cactus-dark/`. Customizations can be made through:
- Layout overrides in `layouts/` directory
- Custom shortcodes in `layouts/shortcodes/`
- Static assets in `static/` directory

## Security Considerations

1. **Environment Variables**: Ensure `TENCENT_SECRET_ID` and `TENCENT_SECRET_KEY` are stored securely and not committed to version control
2. **API Tokens**: Baidu SEO tokens and other API credentials should be managed securely
3. **Build Scripts**: Review third-party script execution in gulp tasks

## Maintenance Tasks

### Regular Maintenance
1. Update dependencies: `npm update`
2. Review and update articles in `content/archive/`
3. Monitor deployment success via notification system
4. Check Baidu SEO submission status
5. Update daily quote data (automated)

### Common Issues
- **Memory Issues**: If Hugo build fails with OOM, consider splitting large content directories
- **SEO Submission**: Verify Baidu API tokens are valid
- **Deployment**: Check cloud storage credentials and permissions

## Important Rules

**⚠️ NEVER create summary documentation files**
- Do NOT create any summary or test result documentation files (e.g., `TEST-RESULTS.md`, `UPGRADE-SUMMARY.md`, etc.)
- Focus on code modifications and fixes only
- Perform actions directly without generating documentation
- This rule applies permanently to this project

## Development Workflow

1. **Create New Article**: Add markdown file to appropriate category in `content/archive/`
2. **Local Testing**: Run `npm start` to preview locally
3. **Build**: Run `npm run build` to execute full build process
4. **Deploy**: Run deployment script (`upload.js` or `oss.js`)
5. **Verify**: Check deployment notification and visit site

## Contact Information

- **Email**: incomparable9527@foxmail.com
- **GitHub**: https://github.com/Num142857
- **Blog**: https://alili.tech
- **WeChat Public Account**: Alili丶前端大爆炸

---

**Last Updated**: Generated from project analysis
**Project Status**: Active development and maintenance


