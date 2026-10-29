# Rastreabilidade — DFEW.08 e DFEW.11

| Requisito | Implementação |
|---|---|
| 10 páginas | 12 HTML na raiz; filme.html recebe o identificador por query string |
| Organização | css, js, img, doc, audio, video, vendor, tests |
| HTML semântico | header, nav, main, section, article, aside, footer |
| Seletores TAG, CLASSE, ID | body, .grid, #saudacao no CSS externo |
| CSS em 3 escopos | css/style.css; style no head; style em elementos |
| Duas páginas sem framework | sobre.html e privacidade.html não carregam Bootstrap |
| Menu interno e externo, hover | cabeçalho e rodapé, link para arquivo de cinema indiano |
| Cabeçalho, container, rodapé | todas as páginas |
| Vídeo e áudio nativos | midia.html, arquivos locais, controls |
| Grid e Flexbox | .grid, .plans, .hero; nav, .actions, .film-info |
| Cards com título, imagem, texto e link | catálogo e início |
| Responsividade | breakpoints de 900 e 600 px |
| Tabela mínima 4 x 4 | planos.html: 4 colunas, cabeçalho + 4 linhas |
| Formulário e validação | contato.html: text, email, select, textarea, submit; required, minlength, pattern e placeholder |
| Estados de campos | :focus, :hover, :invalid em css/style.css |
| Bootstrap | CSS local: container, navbar, btn, card, alert, form-control, form-select |
| Eventos e DOM | click, input, submit; renderização, texto e atributos |
| Estruturas JS | sequência, if, map/filter/forEach, arrays/objetos |
| LocalStorage | perfil, favoritos, notas, tema, contador, assinatura e mensagens |
| GitHub público | pendente: publicação pela dupla |
| ZIP e Word | pacote de entrega e doc/Documentacao-Bollyflix.docx |
| Saudação persistente | perfil, ocultação do formulário ao salvar |
| Contador | perfil: adicionar e zerar |
| Tema persistente | botão ◐ no cabeçalho |
| Array JSON e notas | diário, tabela e exclusão individual |

A limpeza é limitada às chaves Bollyflix para preservar outros dados do navegador. O projeto não chama localStorage.clear() por esse motivo. Autenticação, pagamento real e streaming estão fora do escopo.
