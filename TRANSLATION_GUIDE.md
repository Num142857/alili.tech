# Translation Guide

## Overview

This guide explains how to translate the top 20 articles from Chinese to English.

## Prerequisites

1. OpenAI API Key (for AI translation)
   - Sign up at https://platform.openai.com/
   - Get your API key from https://platform.openai.com/api-keys
   - Set it as an environment variable:
     ```bash
     export OPENAI_API_KEY=your_api_key_here
     ```

## Translation Process

### Step 1: Identify Articles to Translate

The script `identify-top-articles.js` has already identified the top 20 articles. The list is saved in `top-20-articles.json`.

### Step 2: Run Translation Script

```bash
node translate-articles.js
```

This script will:
1. Read the top 20 articles from `top-20-articles.json`
2. Translate each article using OpenAI API
3. Save translated articles to `content/en/archive/` maintaining the same directory structure
4. Save translation results to `translation-results.json`

### Step 3: Review Translations

After translation, review the articles in `content/en/archive/` and make any necessary corrections.

## Manual Translation

If you prefer to translate manually or use a different translation service:

1. Read articles from `top-20-articles.json`
2. Translate the title and content
3. Create corresponding files in `content/en/archive/` maintaining the same directory structure
4. Keep the same front matter structure, but translate:
   - `title`: Article title
   - `content`: Article body
   - Keep `slug`, `date`, `tags`, `keywords` as needed

## Notes

- Code blocks and technical terms (framework names, library names) should remain unchanged
- URLs should remain unchanged
- Markdown formatting should be preserved
- The first article "Long Time No See" is already in English and has been copied to `content/en/archive/English/`

## Troubleshooting

If you encounter API rate limits:
- The script includes a 1-second delay between translations
- You may need to increase the delay or use a different API plan

If translation fails for an article:
- The script will continue with the next article
- Check `translation-results.json` for success/failure status
- You can manually translate failed articles

