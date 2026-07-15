import { Question } from './markdownParser';

export function exportarMarkdown(questionsData: Question[], respMap: Record<string, string>) {
  let md = '# Respostas do Portal de Compras (MILLEN-80053)\n\n';
  
  questionsData.forEach(q => {
    const resposta = respMap[q.id];
    if (resposta && resposta.trim() !== '') {
      md += `### ${q.title}\n\n`;
      md += `${q.desc}\n\n`;
      md += `**Resposta:**\n\n${resposta}\n\n`;
      md += `---\n\n`;
    }
  });

  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'respostas_p1_portal_sugestao_compra.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  setTimeout(() => {
    const subject = encodeURIComponent('Respostas do Portal de Compras (MILLEN-80053)');
    const bodyText = 'Olá,\n\nPor favor, encontre em anexo o arquivo Markdown com as respostas da definição de regras do portal de compras.\n\nObrigado!';
    const body = encodeURIComponent(bodyText);
    window.location.href = `mailto:pedidos.millennium@linx.com.br?subject=${subject}&body=${body}`;
  }, 500);
}
