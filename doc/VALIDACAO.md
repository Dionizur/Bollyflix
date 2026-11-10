# Validação executada

29 de outubro de 2026. Playwright com Chromium instalado no ambiente.

- Aprovado: 12 páginas em 1440 × 1000 e 390 × 1000, sem transbordamento horizontal.
- Aprovado: busca, favoritos e persistência após recarregar.
- Aprovado: perfil e ocultação do formulário, contador e reset, tema persistente.
- Aprovado: salvar/excluir notas e exibição segura de texto contendo tags.
- Aprovado: seleção persistente e cancelamento de planos fictícios.
- Aprovado: formulário inválido bloqueado e mensagem válida salva localmente.
- Aprovado: detalhes válidos e identificador de filme inexistente.
- Aprovado: metadados e duração dos arquivos de áudio/vídeo locais.
- Aprovado: limpeza preserva chave de outro projeto.
- Aprovado: nenhum erro JavaScript durante os testes; recursos estáticos referenciados existentes.
- Não executado: abertura direta file://, bloqueada por ERR_BLOCKED_BY_ADMINISTRATOR no navegador gerenciado. Requer conferência manual pela dupla. Não há dependências remotas em tempo de execução.
- Pendente: revisão humana, dados pessoais da dupla, publicação pública no GitHub e defesa individual.

Capturas reais das 12 páginas em ambas as larguras estão em telas/. Dados de teste usam contexto isolado de navegador e não são distribuídos como dados cadastrados.

## Revisão de 10 de novembro de 2026

- Aprovado: 12 páginas em 1440 e 390 px, com um h1, cabeçalho, conteúdo principal e rodapé, sem transbordamento horizontal.
- Aprovado: duas páginas sem Bootstrap, operações de favoritos, perfil, contador, tema, diário, planos e formulário de contato.
- Aprovado: metadados de mídia nativa local e limpeza seletiva do armazenamento.
- Aprovado: rejeição de link fora do YouTube, normalização de URL curta, persistência e remoção de prévia. O iframe foi validado com resposta simulada, sem afirmar reprodução real.
- Bloqueado: busca real de trailers no YouTube, HTTP 403 do proxy de rede. Foram salvos somente atalhos de busca por filme; nenhum vídeo específico foi verificado ou baixado.
- Não executado: file://, bloqueado pela política do navegador gerenciado.
- Capturas em telas/ atualizadas para o visual simplificado. A documentação Word foi revisada para acompanhar a implementação.
