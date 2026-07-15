'use client';
import { useEffect, useState, useMemo } from 'react';
import QuestionCard from '@/components/QuestionCard';
import { markdownText } from '@/utils/constants';
import { parseMarkdownToQuestions } from '@/utils/markdownParser';
import { exportarMarkdown } from '@/utils/exportMarkdown';

export default function Home() {
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const itemsPerPage = 10;
  
  const questionsData = useMemo(() => parseMarkdownToQuestions(markdownText), []);
  const totalPages = Math.ceil(questionsData.length / itemsPerPage);
  
  useEffect(() => {
    try {
      const data = localStorage.getItem('respostas_portal');
      if (data) {
        setRespostas(JSON.parse(data));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  const handleSave = (id: string, value: string) => {
    const newRespostas = { ...respostas, [id]: value };
    setRespostas(newRespostas);
    localStorage.setItem('respostas_portal', JSON.stringify(newRespostas));
  };

  const handleExport = () => {
    exportarMarkdown(questionsData, respostas);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const pageItems = questionsData.slice(startIdx, startIdx + itemsPerPage);

  const itemsWithSections: { section: string; items: typeof questionsData }[] = [];
  let currentSec = '';
  let currentItems: typeof questionsData = [];
  
  pageItems.forEach(q => {
    if (q.section !== currentSec) {
      if (currentSec !== '') {
        itemsWithSections.push({ section: currentSec, items: currentItems });
      }
      currentSec = q.section;
      currentItems = [];
    }
    currentItems.push(q);
  });
  if (currentSec !== '') {
    itemsWithSections.push({ section: currentSec, items: currentItems });
  }

  if (!isLoaded) return null; // Avoid hydration mismatch

  return (
    <div className="container">
      <h1>Portal de Compras (MILLEN-80053) — Parte 1</h1>
      <p className="subtitle">Dúvidas de Produto e Regras de Negócio da Parte 1 (Auto-save Ativado)</p>
      
      <div id="form-container">
        {itemsWithSections.map(secGroup => (
          <div key={secGroup.section}>
            <h2 className="section-title">{secGroup.section}</h2>
            {secGroup.items.map(q => (
              <QuestionCard 
                key={q.id} 
                question={q} 
                initialValue={respostas[q.id] || ''} 
                onSave={handleSave} 
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="bottom-panel">
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
              key={page}
              className={`page-btn ${page === currentPage ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="btn-export" onClick={handleExport}>
          Exportar Respostas
        </button>
      </div>
    </div>
  );
}
