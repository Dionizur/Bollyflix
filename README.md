# Bollyflix

Projeto estudantil de catálogo de cinema indiano. HTML, CSS, JavaScript e Bootstrap 5.3.3 local. Não exige npm, build, API, senha ou internet para uso básico.

## Abrir

Extraia a pasta completa e abra `index.html`. Para armazenamento consistente entre páginas em todos os navegadores, prefira servir a mesma pasta:

```sh
cd /workspace/Bollyflix
python3 -m http.server 8000 --bind 127.0.0.1
```

Abra o endereço do servidor no seu navegador local. O site é estático e pode ser hospedado no GitHub Pages. Não há dependências em CDN em tempo de execução. Links externos precisam de internet. Em `file://`, a persistência entre páginas depende do navegador.

## Recursos

12 páginas, 8 filmes, busca, gêneros, ordenação, favoritos, sinopses, planos simulados, perfil, contador, diário com exclusão, tema persistente, formulário de contato local e mídia original. Dados no localStorage usam prefixo `bollyflix.`. O perfil permite apagar apenas os dados deste projeto. Assinaturas não cobram nem desbloqueiam streaming. O formulário não envia mensagens.

## Entrega

- `doc/Documentacao-Bollyflix.docx`: documento Word a completar com nomes, divisão real das tarefas e evidências da dupla.
- `doc/REQUISITOS.md`: correspondência com os slides.
- `doc/telas/`: capturas de exemplo produzidas na validação.
- `img/`: capas SVG autorais, não cartazes oficiais.
- `audio/` e `video/`: mídia sintética original, não conteúdo dos filmes.
- `vendor/`: Bootstrap, com licença MIT incorporada no arquivo.

As informações dos filmes são uma seleção editorial; classificações são referenciais. Os slides não fornecem dados de filmes. As sinopses foram redigidas para o projeto.

A dupla deve revisar, compreender e adaptar o trabalho, informar o uso de ferramentas conforme as regras da instituição e publicar no GitHub. Este projeto não foi publicado automaticamente. A formatação do Word é uma base acadêmica, sujeita às normas da instituição.

## Validação

Com o servidor ativo, execute `node tests/browser.cjs` em uma máquina com Playwright e Chromium instalados. O teste usa somente dados fictícios e um contexto isolado. Os testes não são dependências do site.
