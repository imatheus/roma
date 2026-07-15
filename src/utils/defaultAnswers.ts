export const defaultAnswersList = [
  {
    id: "1_1",
    title: "1.1 — Comprador.",
    resposta: "**O que o Millennium faz hoje:** o único vínculo de comprador que existe no sistema é no **cadastro do Produto**, que tem um campo 'Comprador' (funcionário cujo cargo está marcado como 'Comprador' no cadastro de Cargos). **Não existe no Millennium o conceito de 'carteira de fornecedores por comprador'** — o cadastro de Fornecedores não tem campo de comprador.\\n\\n**O que falta decidir:** nada estrutural — filtrar por comprador só pode significar 'produtos cujo comprador cadastrado é ele' (é o que o portal já faz). Se o cliente quiser carteira por fornecedor, seria um cadastro novo (fora do escopo desta fase)."
  },
  {
    id: "1_2",
    title: "1.2 — Fornecedor.",
    resposta: "**O que o Millennium faz hoje:** um produto tem um **fornecedor principal** (no cadastro do produto) e pode ter **fornecedores alternativos** (tela 'Fornecedores do Produto'). A tela nativa **Gerar Requisições Automáticas** filtra considerando **qualquer um dos dois** (principal ou alternativo). Porém, atenção: **o pedido de compra gerado sai sempre para o fornecedor principal**, mesmo que o filtro usado tenha sido um alternativo.\\n\\n**O que falta decidir:** confirmar se o portal segue o mesmo padrão (filtra por qualquer vínculo). O portal já faz assim hoje. Importante alinhar a expectativa: filtrar pelo fornecedor X pode exibir produtos cujo pedido sairá para o fornecedor Y (principal)."
  },
  {
    id: "1_4",
    title: "1.4 — \"Dias de Estoque\" (duplo papel).",
    resposta: "**O que o Millennium faz hoje:** na tela nativa Gerar Requisições Automáticas, o **período de análise das vendas** e a **cobertura desejada** são **dois parâmetros separados** (o usuário informa as datas do período e, à parte, a cobertura). Além disso, se o **Tipo do Produto** tiver uma cobertura cadastrada, **ela vale no lugar da cobertura informada na tela**.\\n\\n**O que falta decidir:** (a) se o portal mantém um campo único fazendo os dois papéis (simplificação) ou separa como no sistema; (b) se a cobertura cadastrada no Tipo do Produto deve continuar tendo prioridade sobre o que o comprador digitar no portal — hoje o portal segue o padrão do sistema (o cadastro vence), mas isso pode surpreender o usuário."
  },
  {
    id: "2_6",
    title: "2.6 — Ponto de Pedido.",
    resposta: "**O que o Millennium faz hoje:** **não existe 'ponto de pedido' como valor cadastrado**. O cadastro de Níveis de Estoque (por filial) guarda apenas: **estoque mínimo, máximo, ideal e de segurança**. O que existe é a **fórmula de sugestão de compra** da tela Gerar Requisições Automáticas, que combina: estoque mínimo cadastrado, média diária de venda do período, cobertura desejada, prazo de entrega do fornecedor, e desconta o estoque atual e o que já está pedido. Detalhe relevante: hoje a própria tela nativa tem **duas variações dessa fórmula** que podem dar números diferentes em um caso específico (produto com pedido de venda em aberto e estoque mínimo cadastrado) — ou seja, 'bater com o sistema' exige escolher qual das duas vale.\\n\\n**O que falta decidir:** confirmar que o card Ponto de Pedido usa a mesma fórmula da coluna 'Sugestão de Compra' (recomendamos que sim, para card e grade nunca discordarem) e qual custo valoriza o card."
  },
  {
    id: "2_3",
    title: "2.3 — Estoque Ideal.",
    resposta: "**O que o Millennium faz hoje:** o cadastro de Níveis de Estoque já tem os valores **ideal**, **segurança** e **máximo** por filial — ou seja, a 'matéria-prima' para os cards existe no sistema. O que o Millennium **não** tem é uma regra pronta dizendo o que é 'saudável' ou 'ruptura'.\\n\\n**O que falta decidir:** os limiares. Sugestão prática: usar os níveis já cadastrados (ex.: ideal = entre mínimo e ideal), pois é o que o cliente já mantém no sistema."
  },
  {
    id: "2_4",
    title: "2.4 — Ruptura.",
    resposta: "**O que o Millennium faz hoje:** o cadastro de Níveis de Estoque já tem os valores **ideal**, **segurança** e **máximo** por filial — ou seja, a 'matéria-prima' para os cards existe no sistema. O que o Millennium **não** tem é uma regra pronta dizendo o que é 'saudável' ou 'ruptura'.\\n\\n**O que falta decidir:** os limiares. Sugestão prática: usar os níveis já cadastrados (ex.: ruptura = abaixo da segurança), pois é o que o cliente já mantém no sistema."
  },
  {
    id: "3_1",
    title: "3.1 — Estoque atual.",
    resposta: "**O que o Millennium faz hoje:** o sistema separa **estoque disponível** (saldo) de **estoque reservado** (empenhado para pedidos); o físico é a soma dos dois. A tela nativa de requisições usa o **disponível** (sem as reservas) nos cálculos de sugestão. O saldo é sempre por filial.\\n\\n**O que falta decidir:** apenas confirmar que o portal usa o disponível somado das filiais selecionadas (é o padrão do sistema e o que está feito)."
  },
  {
    id: "3_3",
    title: "3.3 — Vendas.",
    resposta: "**O que o Millennium faz hoje:** em todas as análises de venda do sistema, contam apenas as saídas cujo **evento é do tipo Venda** e que não foram canceladas — **transferências entre filiais, devoluções e ajustes de inventário ficam de fora automaticamente**. Bonificação/brinde conta ou não dependendo de como o evento foi configurado pelo cliente (se o evento é do tipo Venda, conta).\\n\\n**O que falta decidir:** só o **período** (30/60/90 dias) — a composição já segue o padrão do sistema."
  },
  {
    id: "3_5",
    title: "3.5 — Custo Gerencial.",
    resposta: "**O que o Millennium faz hoje:** **não existe 'custo gerencial' no Millennium.** O cadastro do produto tem um campo de custo cuja definição oficial é '**preço médio de custo**' — é ele que o portal está exibindo provisoriamente na coluna Custo Gerencial.\\n\\n**O que falta decidir:** o que o cliente entende por 'custo gerencial'. Se for o custo médio do cadastro, basta **renomear a coluna**; se for um custo com impostos/frete, é um cálculo novo que precisa de definição."
  },
  {
    id: "3_6",
    title: "3.6 — Custo Médio.",
    resposta: "**O que o Millennium faz hoje:** o produto já tem um **custo médio oficial no cadastro** (o campo citado acima, 'preço médio de custo', que o sistema mantém). O portal hoje calcula uma média ponderada das compras dos últimos 12 meses, que pode dar número diferente do cadastro.\\n\\n**O que falta decidir:** usar o valor do cadastro (recomendado — é o que o resto do sistema enxerga) ou manter o cálculo por janela de 12 meses."
  },
  {
    id: "3_7",
    title: "3.7 — Estoque Mínimo.",
    resposta: "**O que o Millennium faz hoje:** vem do **cadastro de Níveis de Estoque**, por filial — não é calculado. É exatamente o que a tela nativa de requisições usa.\\n\\n**Respondida** — o portal já segue o cadastro; produto só precisa validar que é isso mesmo."
  },
  {
    id: "3_8",
    title: "3.8 — Em Trânsito.",
    resposta: "**O que o Millennium faz hoje:** no fluxo de compras do Millennium **não existe** a informação 'já faturado/despachado pelo fornecedor'. O que o sistema controla é o **saldo dos pedidos de compra em aberto** (quantidade pedida menos a já recebida) — e é isso que a tela nativa desconta da sugestão para não comprar duas vezes.\\n\\n**Respondida** — 'Em Trânsito' = saldo de pedidos de compra em aberto. Se o cliente precisar do conceito 'fisicamente a caminho', isso não existe no sistema hoje."
  },
  {
    id: "3_9",
    title: "3.9 — Lead Time.",
    resposta: "**O que o Millennium faz hoje:** existe cadastro em três lugares, e o sistema usa nesta ordem: 1º o **tempo de entrega do vínculo produto×fornecedor** (tela Fornecedores do Produto), 2º o **lead time do cadastro do produto**, 3º o **tempo de entrega do Tipo do Produto**. Atenção a um detalhe do sistema: quando o produto tem vários fornecedores cadastrados, vale o **maior** tempo de entrega entre todos eles — mesmo que o pedido vá sair para outro fornecedor.\\n\\n**O que falta decidir:** se o portal deve mostrar o cadastrado (padrão do sistema, já feito) ou calcular o prazo real médio (pedido → chegada). Obs.: o portal já mostra o prazo real em outro lugar (card 'Prazo Médio de Compra' do detalhe do produto) — os dois convivem bem."
  },
  {
    id: "3_10",
    title: "3.10 — Curva (ABC).",
    resposta: "**O que o Millennium faz hoje:** a curva é **cadastrada no produto** e é o que todo o sistema usa. Existe também uma **rotina nativa de reclassificação** (usada com a opção 'Utiliza Prioridade de Armazenamento' das configurações gerais): ela ordena os produtos pela **quantidade vendida** no período e filial escolhidos, e o usuário informa os **percentuais de corte A/B/C** na hora.\\n\\n**O que falta decidir:** manter a curva cadastrada no portal (recomendado; já feito) ou oferecer recálculo. Se recalcular, o critério nativo do sistema é por quantidade vendida com cortes definidos pelo usuário — não por valor nem por margem."
  },
  {
    id: "3_16",
    title: "3.16 — Markup Médio.",
    resposta: "**O que o Millennium faz hoje:** o sistema já tem estrutura oficial de markup: as **fichas de custo** guardam as taxas de lucratividade, e existe a **composição de preço**, que relaciona uma tabela de venda com uma tabela de custo e registra o markup resultante por produto. Ou seja, a mecânica 'preço de venda ÷ custo' já existe — o que o sistema precisa saber é **quais tabelas comparar**.\\n\\n**O que falta decidir:** apenas **qual tabela de venda** (e qual custo) usar como referência no portal. Com essa resposta, a coluna sai rápido."
  },
  {
    id: "5_6",
    title: "5.6 — Markup Geral.",
    resposta: "**O que o Millennium faz hoje:** o sistema já tem estrutura oficial de markup: as **fichas de custo** guardam as taxas de lucratividade, e existe a **composição de preço**, que relaciona uma tabela de venda com uma tabela de custo e registra o markup resultante por produto. Ou seja, a mecânica 'preço de venda ÷ custo' já existe — o que o sistema precisa saber é **quais tabelas comparar**.\\n\\n**O que falta decidir:** apenas **qual tabela de venda** (e qual custo) usar como referência no portal. Com essa resposta, a coluna sai rápido."
  },
  {
    id: "3_20",
    title: "3.20 — Sugestão de Compra.",
    resposta: "**O que o Millennium faz hoje:** a tela Fornecedores do Produto tem os campos **quantidade mínima** e **quantidade múltipla**. A **quantidade mínima só é validada** se a configuração geral específica ('validar quantidade mínima do fornecedor nas requisições') estiver ligada — e, nesse caso, o sistema **bloqueia** a geração se ficar abaixo. A **quantidade múltipla não é usada em nenhum ponto** do fluxo de compra hoje (o sistema não arredonda para caixa/embalagem).\\n\\n**O que falta decidir:** se o portal deve passar a arredondar pelo múltiplo (seria comportamento novo, que nem a tela nativa tem) e como tratar o bloqueio de quantidade mínima quando a configuração estiver ligada."
  },
  {
    id: "4_4",
    title: "4.4 — Abrir a nota.",
    resposta: "**O que o Millennium faz hoje:** o padrão do sistema para visualizar a nota de uma entrada é abrir a **DANFE** pela tela de documentos — é o que o portal já faz no duplo clique.\\n\\n**Respondida** — a menos que o cliente queira o XML ou outra visualização, o padrão está atendido."
  },
  {
    id: "5_3",
    title: "5.3 — Aguardando Aprovação.",
    resposta: "**O que o Millennium faz hoje:** o pedido de compra tem status oficial de aprovação: **Apenas Cadastrado → Em Análise → Aprovado / Reprovado**, controlado pelo sistema de aprovação de pedidos. Todo pedido gerado pela rotina automática **nasce pendente de aprovação**.\\n\\n**Respondida** — 'Aguardando aprovação' = pedidos nos status Apenas Cadastrado e Em Análise (é o que o portal já conta, e é o mesmo critério da tela de aprovação do sistema)."
  },
  {
    id: "10_1",
    title: "10.1 — Mesmo resultado.",
    resposta: "**O que o Millennium faz hoje:** o botão **Giro Mensal** do portal usa **a própria consulta da tela nativa** — ali o número é, por construção, o mesmo do sistema. A grade principal do portal usa uma fórmula equivalente à da consulta nativa. Ponto importante descoberto na análise: **a própria tela nativa tem duas variações da fórmula** (a do grid da tela e a da consulta) que divergem em um caso específico — então 'reproduzir o mesmo número' exige antes escolher **qual das duas** é a oficial.\\n\\n**O que falta decidir:** qual variação é a fonte da verdade. Recomendamos a da consulta (é a que o Giro Mensal do portal já usa, mantendo o portal internamente consistente)."
  },
  {
    id: "10_2",
    title: "10.2 — Fonte da verdade.",
    resposta: "**O que o Millennium faz hoje:** (Idem ao 10.1) A própria tela nativa tem duas variações da fórmula.\\n\\n**O que falta decidir:** qual variação é a fonte da verdade. Recomendamos a da consulta (é a que o Giro Mensal do portal já usa, mantendo o portal internamente consistente)."
  },
  {
    id: "11_1",
    title: "11.1 — Gerar Pedido de Compra.",
    resposta: "**O que o Millennium faz hoje:** a rotina nativa gera **um pedido por fornecedor**, sempre para o **fornecedor principal** do produto; o **tipo de pedido vem sempre do cadastro do Fornecedor** (não é escolhido na tela); o pedido **nasce pendente de aprovação**. A tabela de custo e a condição de pagamento também têm origem no cadastro do Fornecedor. Produto sem fornecedor principal **não gera pedido** (o sistema bloqueia). Dois comportamentos automáticos afetam o portal: 1. Fornecedor com integração 'Just-in-Time' ligada gera pedido extra; 2. Configuração de quantidade mínima ligada pode bloquear a geração inteira.\\n\\n**O que falta decidir:** só as perguntas de negócio (considerar verba/campanha; o que é 'item válido') — a mecânica de agrupamento e defaults já é a do sistema."
  },
  {
    id: "11_2",
    title: "11.2 — Ver Pedidos em Aberto / Aprovar.",
    resposta: "**O que o Millennium faz hoje:** 'em aberto' no sistema significa **pedido ainda não concluído** (não efetivado) — cobre pendente e parcialmente recebido. A aprovação usa o **sistema de aprovação nativo**, respeitando as regras já configuradas.\\n\\n**Respondida** — o portal já usa os dois padrões."
  },
  {
    id: "3_11",
    title: "3.11 — Giro.",
    resposta: "**Giro** = vendas do período ÷ estoque médio do período; (Conforme planilha de referência: Portal de compras.xlsx, aba Análise detalhada)."
  },
  {
    id: "3_14",
    title: "3.14 — Cobertura (dias).",
    resposta: "**Cobertura em dias** = estoque médio × dias do período ÷ vendas.\\n**Estoque médio** = (saldo do início do período + saldo de hoje) ÷ 2;\\n(Conforme planilha de referência: Portal de compras.xlsx, aba Análise detalhada)."
  },
  {
    id: "3_17",
    title: "3.17 — Classificação.",
    resposta: "**Conflito para a reunião:** na aba Análise Detalhada da planilha, a classificação usa as categorias **'Problema'** e **'Saldão'**, que não constam no requisito; e produtos **com** venda no período aparecem como 'Sem Giro' quando estão há mais de ~45 dias sem vender. Ou seja, o critério da planilha parece ser **'dias sem venda'**, enquanto o requisito sugere 'sem venda no período'. Precisamos saber qual dos dois vale (e se 'Problema'/'Saldão' entram no portal)."
  }
];
export const defaultAnswers = defaultAnswersList.reduce((acc: Record<string, string>, curr) => { acc[curr.id] = curr.resposta; return acc; }, {});