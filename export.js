function exportarMarkdown() {
  fetch('/api/respostas')
    .then(res => res.json())
    .then(respostas => {
      const respMap = {};
      respostas.forEach(r => respMap[r.question_id] = r.resposta);

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
    })
    .catch(console.error);
}
