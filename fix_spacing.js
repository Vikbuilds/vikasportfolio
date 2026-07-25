const fs = require('fs');
const path = 'src/data/blogs.ts';
let content = fs.readFileSync(path, 'utf-8');

const restApiStart = content.indexOf('slug: "rest-api"');
if (restApiStart !== -1) {
  const contentPropStart = content.indexOf('content: `', restApiStart) + 'content: `'.length;
  const contentPropEnd = content.indexOf('`,', contentPropStart);
  
  let restApiContent = content.substring(contentPropStart, contentPropEnd);
  
  // We need to make sure that there are double newlines everywhere there is currently a single newline
  // EXCEPT inside code blocks (```...```) or frontmatter (if any).
  
  let blocks = restApiContent.split(/(```[\s\S]*?```)/g);
  
  for (let i = 0; i < blocks.length; i++) {
    // Only process text outside of code blocks (even indices in split)
    if (i % 2 === 0) {
      // Split by double newline first to preserve existing paragraphs/blocks
      let paragraphs = blocks[i].split(/\n\n+/g);
      
      // Inside each paragraph, replace single newlines with double newlines
      for (let p = 0; p < paragraphs.length; p++) {
        // Also split sentences that are separated by just ". " on the same line
        // but avoid breaking things like e.g., i.e.
        // We'll replace ". [A-Z]" with ".\n\n[A-Z]" safely
        let pText = paragraphs[p];
        
        // Convert single newlines to double newlines (except directly after or before a bullet)
        let lines = pText.split('\n');
        let newLines = [];
        for (let l = 0; l < lines.length; l++) {
           let line = lines[l].trim();
           if (!line) continue;
           newLines.push(line);
        }
        
        // Join with \n\n to make each line a distinct paragraph
        paragraphs[p] = newLines.join('\n\n');
      }
      
      blocks[i] = paragraphs.join('\n\n');
    }
  }
  
  let newRestApiContent = blocks.join('');
  
  // Custom split for the specific example the user gave:
  // "In a REST API, each" -> "In a REST API, \n\neach"
  newRestApiContent = newRestApiContent.replace(/In a REST API,\s*each/gi, "In a REST API, \n\neach");

  content = content.substring(0, contentPropStart) + newRestApiContent + content.substring(contentPropEnd);
}

fs.writeFileSync(path, content);
console.log('Fixed spacing for rest-api blog!');
