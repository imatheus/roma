const markdownText = `
## 1. Filtros do cabeçalho
**1.1 — Comprador.** O requisito diz que filtra "a carteira de fornecedores ou segmentação de produtos atrelada ao usuário".
Filtrar por comprador traz os produtos cujo comprador cadastrado é ele, ou os produtos dos fornecedores da carteira dele? Qual é o vínculo oficial comprador → produto/fornecedor?

**1.2 — Fornecedor.** Um produto pode ter vários fornecedores (principal + alternativos).
O filtro considera só o fornecedor principal do produto ou qualquer fornecedor vinculado?

**1.3 — Filtros obrigatórios.** Hoje: os 4 filtros (Filiais, Comprador, Fornecedor, Dias de Estoque) são obrigatórios.
Comprador e Fornecedor devem mesmo ser obrigatórios, ou podem ser opcionais (cenário para todos)? Filial pode ser "todas"?

**1.4 — "Dias de Estoque" (duplo papel).** O PDF diz que esse campo "identifica o período a ser analisado E define os dias de cobertura desejada".
A média de vendas usada nos cálculos deve ser apurada sobre esses mesmos dias (ex.: 45) ou sobre uma janela maior e estável (ex.: 90/180 dias), usando os "Dias de Estoque" só como meta de cobertura?
É em dias corridos ou dias úteis?

## 2. Cards de indicadores (9 cards do topo)
**2.1 — Contagens (Produtos, Fornecedores, Marcas, Grupos).** O PDF diz "Produtos = total de itens cadastrados no sistema".
Esses 4 cards são totais do sistema (ignoram os filtros) ou refletem o cenário filtrado? Contam só produtos ativos? Incluem produtos sem estoque/sem venda?
"Fornecedores" = todos os ativos no cadastro, ou só os vinculados aos produtos do cenário?

**2.2 — Produtos em Excesso.** "Itens com estoque acima do necessário... capital parado."
O que define "acima do necessário": estoque acima do ideal? do máximo? da cobertura-alvo?
O "valor parado" (ex.: 1.622M) é (estoque excedente × custo) ou (estoque total × custo)? Qual custo (último, gerencial ou médio)?

**2.3 — Estoque Ideal.** "Produtos dentro do nível considerado saudável."
O que é "saudável"? Estoque entre o mínimo e o ideal? Entre ponto de pedido e máximo? Entre X e Y dias de cobertura? Usa os níveis de estoque cadastrados ou um cálculo por cobertura?

**2.4 — Ruptura.** "Itens sem estoque ou com risco iminente de acabar."
Ruptura é estoque zero? <= estoque de segurança? <= estoque mínimo?
"Risco iminente" entra no card? Se sim, como medir (ex.: cobertura menor que o lead time)? Tem valor financeiro? Qual?

**2.5 — Prematuros.** "Produtos comprados antes do momento ideal / ainda não precisavam ser repostos."
Como identificar? Houve compra recente (qual janela?) e o estoque já estava acima do ideal? Ou compra feita antes de o item atingir o ponto de pedido? É contagem de produtos ou de pedidos?

**2.6 — Ponto de Pedido.** "Itens que atingiram o nível que indica que é hora de comprar; baseado em giro, lead time e cobertura."
Qual a fórmula oficial? estoque <= mínimo? média diária × lead time? média diária × (lead time + cobertura)?
O "valor estimado de compra" (ex.: 422K) é (quantidade sugerida × custo) somado? Qual custo?
Importante: esse card deve usar a mesma regra da coluna "Sugestão de Compra" da grade? Hoje há risco de o card e a grade discordarem para o mesmo produto.

**2.7 — Os status se sobrepõem?** (Excesso / Estoque Ideal / Ruptura / Prematuros / Ponto de Pedido)
Um produto pode estar em mais de um card ao mesmo tempo, ou são mutuamente exclusivos? Se exclusivos, qual a ordem de prioridade?
Produtos sem níveis de estoque cadastrados entram em qual card (ou ficam de fora)?
O "%" de cada card é sobre qual total (produtos do cenário, produtos ativos, produtos com níveis)?

## 3. Grade de produtos (colunas)
**3.1 — Estoque atual.** "Quantidade disponível hoje." Disponível = saldo menos reservas/empenho ou saldo bruto? Considera locais de estoque indisponíveis? Soma as filiais selecionadas?

**3.2 — Compras.** "Quantidade comprada em aberto ou no período (pode incluir pedidos não recebidos)." É compras efetivadas no período, pedidos em aberto, ou a soma? Qual período?

**3.3 — Vendas.** "Quantidade vendida em um período (ex.: 30/60/90 dias)." Qual período? Conta só vendas (exclui transferência/devolução)? Bonificação/brinde conta?

**3.4 — Custo Últ. Compra.** "Valor pago na última compra." Última compra geral ou da(s) filial(is) filtrada(s)? Inclui frete/IPI ou só o preço do item?

**3.5 — Custo Gerencial.** "Custo ajustado para gestão (pode incluir impostos, frete, descontos)." Existe um custo gerencial oficial no cadastro para usar? Quais componentes inclui (IPI, ST, frete, desconto)?

**3.6 — Custo Médio.** "Média ponderada dos custos de compra ao longo do tempo." "Ao longo do tempo" = toda a vida do produto ou uma janela (12 meses)? Usa o custo médio do cadastro ou a média ponderada das compras?

**3.7 — Estoque Mínimo.** "Quantidade mínima para evitar ruptura, baseada em giro e lead time." Vem do cadastro de níveis de estoque (por filial) ou é calculado (ex.: média diária × lead time)?

**3.8 — Em Trânsito.** "Produtos já comprados, mas ainda não chegaram." É tudo que está em pedido de compra em aberto (ainda não recebido) ou apenas o que já foi faturado/despachado pelo fornecedor (fisicamente a caminho)? São coisas diferentes.

**3.9 — Lead Time.** "Tempo do pedido até a chegada." Usar o lead time cadastrado (do produto/fornecedor) ou calcular o real (média de dias entre o pedido e a entrada)? É por produto, por fornecedor, ou por produto+fornecedor?

**3.10 — Curva (ABC).** Hoje: usa a curva ABC cadastrada no produto.
Manter a curva cadastrada ou recalcular no período/cenário do portal? Se recalcular, com base em valor de venda, quantidade ou margem? Quais cortes (% A/B/C)?

**3.11 — Giro.** "Relação entre vendas e estoque (velocidade de saída)." Fórmula: vendas ÷ estoque médio? vendas ÷ saldo atual? É mensal, do período ou anualizado?

**3.12 — Custo Total.** "Valor total do estoque do produto." = estoque atual × qual custo (último/gerencial/médio)?

**3.13 — Projeção de Vendas.** "Estimativa de quanto vai vender." Qual o horizonte (próximos 30 dias? período de cobertura?) e a base (média diária × horizonte)? Considera sazonalidade/tendência ou é média simples?

**3.14 — Cobertura (dias).** "Quantos dias o estoque atual suporta com base na média de vendas." = saldo ÷ média diária. Média de qual janela? Considera o que está em trânsito (cobertura projetada)?
Quando não há venda (sem giro), exibir 0, em branco ou "sem consumo / infinito"?

**3.15 — Dias Ruptura.** "Dias previstos sem estoque, considerando consumo e reposição." Qual a fórmula? Considera as chegadas previstas (pedidos em aberto + lead time)?

**3.16 — Markup Médio.** "Percentual sobre o custo para definição do preço de venda." = (preço de venda ÷ custo − 1) × 100. Qual preço de venda (qual tabela de preços?) e qual custo?

**3.17 — Classificação.** "Classificação geral do produto (novo, bom giro, sem giro)." Quais são as faixas (Novos / Sem Giro / Baixo Giro / Giro Adequado) e seus limiares? Quantos dias define "Novo"? Qual giro separa "Baixo" de "Adequado"? "Sem Giro" = zero venda no período?
Essa classificação da linha é a mesma base do gráfico "Classificação de Estoque"?

**3.18 — Indicador de Preço.** "Mostra se o preço está acima, abaixo ou dentro do ideal." Compara o quê com o quê (custo da última compra vs custo médio? vs tabela? preço de venda vs mercado?) e quais as faixas de tolerância?

**3.19 — Valor Ideal.** O PDF descreve como "preço de venda recomendado". Hoje: está sendo calculado como valor financeiro do estoque ideal (estoque ideal × custo), que é diferente.
É preço de venda recomendado (precisa de fonte: markup-alvo × custo, ou tabela) ou na verdade é "valor de estoque ideal" (e deveríamos renomear a coluna)?

**3.20 — Sugestão de Compra.** "Quantidade sugerida para comprar."
Confirmar a fórmula: necessidade = máx(0, alvo − estoque − em trânsito), com alvo = máx(estoque mínimo, média diária × (cobertura + lead time)). Hoje: é isso (já descontando o em trânsito).
Deve considerar múltiplo de compra / lote mínimo do fornecedor? Deve arredondar para caixa/embalagem? A sugestão é por filial ou consolidada/rateada entre filiais?

**3.21 — Valor Item / Valor Pedido.** "Valor do item (qtd × custo)" e "valor total do pedido."
"Valor Item" usa a quantidade sugerida ou a digitada? Qual custo?
"Valor Pedido" é o total do item, do fornecedor ou o total geral do pedido que está sendo montado?

**3.22 — Peso e Cubagem.** São relevantes já nesta fase (decisão de compra) ou só na logística/geração do pedido? Para Cubagem: qual a fórmula de volume (altura × largura × comprimento? inclui profundidade?) e a unidade? O cadastro de dimensões é confiável?

**3.23 — Saving R$ / Saving %.** "Economia em reais na compra / economia frente a uma referência (ex.: custo anterior ou tabela)."
Qual é a referência (baseline) da economia: custo da compra anterior? custo de tabela? melhor preço entre fornecedores?
O Saving da grade (por produto) tem a mesma definição do gráfico de Saving do detalhe (por fornecedor)? Se forem diferentes, qual a regra de cada um?

## 4. Histórico de compras (grade à direita do produto)
**4.1 — Atualização.** Hoje: atualiza ao navegar/trocar a linha no grid de produtos. Está correto, ou só deve atualizar ao abrir o detalhe?
**4.2 — Escopo dos filtros.** O histórico do produto deve respeitar os filtros do cenário (filial, fornecedor, comprador) ou mostrar todo o histórico do item independentemente do filtro?
**4.3 — Conteúdo.** Mostra apenas entradas de compra efetivadas ou também pedidos ainda não recebidos?
**4.4 — Abrir a nota.** O requisito fala em "baixar a nota". Hoje: abre a DANFE. Deve ser DANFE/PDF, a tela de documentos, o XML da NF-e, ou outra visualização?

## 5. Detalhe do produto — cards de KPI
**5.0 — Escopo.** Os 10 KPIs respeitam os filtros do cenário (filial/fornecedor) ou são sempre do produto inteiro (todas as filiais)?
**5.1 — Lead Time Médio.** Lead time cadastrado ou média real (entre o pedido e a entrada)? Qual janela?
**5.2 — Pedidos em Aberto.** "Pedidos não faturados aguardando entrega." Conta pedidos (documentos), itens/quantidade ou valor? Só os que contêm o produto?
**5.3 — Aguardando Aprovação.** "Pedidos que precisam de liberação." Baseado em qual status/regra de aprovação? Conta pedidos ou itens?
**5.4 — Prazo Médio de Compra.** "Tempo médio em dias nas compras." É o lead real (entrada − pedido)? O intervalo entre compras? O prazo de pagamento? Qual janela?
**5.5 — Prazo Médio de Venda.** "Tempo médio em dias nas vendas." O que significa para um produto? Intervalo entre vendas? Dias de cobertura? Tempo entre entrada e venda?
**5.6 — Markup Geral.** Mesma dúvida do 3.16 (qual preço de venda e qual custo).
**5.7 — Total de Compras.** "Valor total das compras." Qual período (filtro? toda a vida?)? Inclui frete/impostos?
**5.8 — Pedidos (Período).** "Quantidade de pedidos no período." Conta pedidos de compra emitidos, recebidos, ou notas de entrada? Qual período?
**5.9 — Acumulado (Período) × Total de Compras.** Hoje: os dois dão o mesmo valor. Qual é a diferença pretendida entre os dois cards?
**5.10 — Média (Período).** "Valor médio de compras no período." É valor total ÷ nº de pedidos (ticket médio) ou ÷ nº de meses/dias (intensidade no tempo)?

## 6. Detalhe do produto — gráficos
**6.1 — Giro últimos 12 meses.** "Gráfico de barras do histórico do item no último ano, com botões Quantidade/Valor."
São 12 meses fechados ou 11 fechados + mês corrente (parcial)? Meses sem movimento aparecem como zero (eixo fixo de 12 pontos)? O gráfico mede vendas ou compras? Na opção "Valor", é faturamento de venda, custo de venda ou valor de compra?

**6.2 — Classificação de Estoque.** "Gráfico (pizza/rosca) com Giro adequado / Baixo giro / Sem giro / Novos."
A distribuição deve considerar quais produtos? (a) todos do cenário filtrado; (b) produtos do mesmo grupo/marca/fornecedor do item; (c) outra opção. Por ser uma visão de conjunto, faz sentido ficar dentro da janela de "Análise do Produto", ou seria melhor movê-lo para a tela principal?

**6.3 — Saving.** "Gráfico comparando economia por marca ou fornecedor."
É por marca, por fornecedor, ou os dois? Qual a referência da economia? Qual período? Saving negativo (perda) é comportamento normal a exibir, ou indica problema de dado?

## 7. Significado de "grupo" e escopo da análise
**7.1 — O que é "grupo".** O requisito fala em análise do "item ou grupo selecionado". "Grupo" significa: grupo do cadastro? o conjunto de produtos do filtro? marca? fornecedor?
**7.2 — Individual vs conjunto.** A análise detalhada é estritamente do produto selecionado, ou pode mostrar visões do conjunto para apoiar a decisão?

## 8. Comportamentos gerais
**8.1 — Multi-filial.** Ao selecionar várias filiais, os números são somados/consolidados ou exibidos por filial?
**8.2 — Produto consolidado x SKU.** A grade deve ser por produto ou por SKU?
**8.3 — Produtos elegíveis.** Deve incluir/excluir produtos sem estoque, sem venda no período ou descontinuados?
**8.4 — Devoluções / transferências / ajustes.** Devoluções de compra reduzem "Compras"? Devoluções de venda reduzem "Vendas"/"Giro"?
**8.5 — Cadastro incompleto.** Quando o produto não tem níveis de estoque, lead time ou custo recente cadastrados: qual valor substituto usar?

## 9. Interação e experiência da tela (UX)
**9.1 — Como abrir o detalhe.** A ação oficial deve ser: clique simples? duplo clique? painel lateral?
**9.2 — "Tempo real".** Atualizar ao trocar a linha do grid, apenas ao abrir o detalhe, ou só após um botão?
**9.3 — Botões do rodapé.** Nesta fase devem ser apenas estrutura visual ou já ter navegação mínima para as telas existentes?
**9.4 — Clique no gráfico.** Essa interação vale nesta fase ou é fase posterior?

## 10. Coerência com a rotina atual
**10.1 — Mesmo resultado.** O portal deve reproduzir o mesmo número da tela atual "Gerar Requisições Automáticas"?
**10.2 — Fonte da verdade.** Se o portal e a rotina atual divergirem, qual vale para o comprador?
**10.3 — Simplificação.** O portal pode simplificar conceitos da rotina atual para ganhar clareza?

## 11. Ações do rodapé
**11.1 — Gerar Pedido de Compra.** "Item válido" = marcado no checkbox e (sugestão > 0 ou quantidade digitada > 0)?
**11.2 — Ver Pedidos em Aberto / Aprovar.** Quais status entram em "aberto"?
**11.3 — Giro Mensal / Análise Detalhada / Verbas / Acordo de Verba.** Para qual tela cada um navega?

## 12. Quant. pedida — comportamento inicial
**12.1** A coluna "Quant. pedida" deve iniciar zerada ou pré-preenchida com a Sugestão de Compra?


`;


export { markdownText };
