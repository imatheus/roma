'use client';
import { useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Question, parseMarkdownToHtml } from '@/utils/markdownParser';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface QuestionCardProps {
  question: Question;
  initialValue: string;
  onSave: (id: string, value: string) => void;
}

export default function QuestionCard({ question, initialValue, onSave }: QuestionCardProps) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState({ msg: '', color: '' });

  const descHtml = useMemo(() => parseMarkdownToHtml(question.desc), [question.desc]);

  const handleChange = (val: string) => {
    setValue(val);
  };

  useEffect(() => {
    // Sync initial value dynamically if it changes from upper component
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (value === initialValue) return;
    const timeout = setTimeout(() => {
      setStatus({ msg: 'Salvando...', color: '#e67e22' });
      try {
        onSave(question.id, value);
        setStatus({ msg: '✓ Salvo localmente', color: '#27ae60' });
        setTimeout(() => setStatus({ msg: '', color: '' }), 3000);
      } catch (err) {
        setStatus({ msg: '✗ Erro ao salvar', color: '#c0392b' });
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [value, initialValue, question.id, onSave]);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      spellChecker: false,
      status: false,
      minHeight: '100px',
      toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "preview"] as any,
    };
  }, []);

  return (
    <div className="question-card" id={`card-${question.id}`}>
      <div className="question-header">{question.title}</div>
      <div className="question-desc" dangerouslySetInnerHTML={{ __html: descHtml }}></div>
      <SimpleMdeReact 
        value={value} 
        onChange={handleChange}
        options={autofocusNoSpellcheckerOptions}
      />
      <div className="status-msg" style={{ color: status.color }}>{status.msg}</div>
    </div>
  );
}
