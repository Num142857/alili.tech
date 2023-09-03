const fs = require('fs');
const path = require('path');
const axios = require('axios');

const OPENAI_API_KEY = 'sk-';

async function translate(text) {
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: `Translate the following Chinese text to English: "${text}"`,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error translating:", error);
        return text; // Return original text if translation fails
    }
}

async function translateMarkdownContent(content) {
    console.log('Started translating markdown content...');
    let lines = content.split('\n');
    let inRawBlock = false;
    let inHeader = false;
    let translatedLines = [];

    for (let line of lines) {
        line = line.trim();

        // Check for markdown header
        if (line.startsWith('---')) {
            if (inHeader) {
                translatedLines.push('---');
            }
            inHeader = !inHeader;
            continue;
        }

        // Check for raw blocks
        if (line.includes('{{< raw >}}') || line.includes('{{< /raw >}}')) {
            inRawBlock = !inRawBlock;
            translatedLines.push(line);
            continue;
        }

        if (inRawBlock) {
            translatedLines.push(line);
            continue;
        }

        if (inHeader && line.startsWith('title: ')) {
            const translatedTitle = await translate(line.replace('title: ', ''));
            translatedLines.push(`title: ${translatedTitle}`);
            continue;
        }

        if (inHeader) {
            translatedLines.push(line);
            continue;
        }

        // Preserve markdown special characters
        const mdMatch = line.match(/^(\s*[\-#\*>]+)(.+)/);

        if (mdMatch) {
            const prefix = mdMatch[1];
            const textToTranslate = mdMatch[2].trim();
            const translatedText = await translate(textToTranslate);
            translatedLines.push(`${prefix} ${translatedText}`);
        } else {
            translatedLines.push(await translate(line));
        }
    }

    console.log('Completed translating markdown content...');
    return translatedLines.join('\n');
}

async function translateFile(filePath) {
    const fileBasename = path.basename(filePath, '.md');
    const outputPath = path.join(path.dirname(filePath), `${fileBasename}.en.md`);
    
    if (fs.existsSync(outputPath)) {
        console.log(`Translation already exists for ${fileBasename}. Skipping...`);
        return;
    }

    console.log(`Translating file: ${fileBasename}...`);
    const mdContent = fs.readFileSync(filePath, 'utf-8');
    const translatedMd = await translateMarkdownContent(mdContent);
    fs.writeFileSync(outputPath, translatedMd, 'utf-8');

    console.log(`Translation completed for ${fileBasename}! Translated file saved as ${fileBasename}.en.md`);
}

async function processBlogFiles(directory, fileName) {
    console.log('Initiating blog translation process...');

    if (fileName) {
        await translateFile(path.join(directory, fileName));
    } else {
        const files = fs.readdirSync(directory);
        for (const file of files) {
            if (file.endsWith('.md') && !file.endsWith('.en.md')) {
                await translateFile(path.join(directory, file));
            }
        }
    }
    console.log("Translation process completed!");
}

const specifiedDirectory = process.argv[2] || process.cwd();
const specifiedFileName = process.argv[3];

processBlogFiles(specifiedDirectory, specifiedFileName);