import { marked } from 'marked';

export interface Question {
  id: string;
  title: string;
  desc: string;
  section: string;
}

export function parseMarkdownToQuestions(md: string): Question[] {
  const lines = md.split('\n');
  const questions: Question[] = [];
  let currentSection = '';
  
  lines.forEach(line => {
    if (line.startsWith('## ')) {
      currentSection = line.replace('## ', '').trim();
    } else if (line.startsWith('**') && line.includes('**')) {
      const parts = line.split('**');
      if (parts.length >= 3) {
        const titleMatch = parts[1].trim(); 
        const descMatch = parts.slice(2).join('**').trim();
        
        questions.push({
          id: titleMatch.split('—')[0].trim().replace('.', '_'), 
          title: titleMatch,
          desc: descMatch,
          section: currentSection
        });
      }
    } else if (line.trim().length > 0 && questions.length > 0 && !line.startsWith('##')) {
       questions[questions.length - 1].desc += '\n\n' + line.trim();
    }
  });
  
  return questions;
}

export function parseMarkdownToHtml(md: string): string {
  return marked.parse(md) as string;
}
