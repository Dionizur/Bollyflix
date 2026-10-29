const PAGE = location.pathname.split('/').pop() || 'index.html';
const main = document.getElementById('principal');
const KEYS = ['profile','favorites','notes','theme','subscription','counter','messages'];
let storageAvailable = true;
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function read(key, fallback) {
    try {
        const value = localStorage.getItem('bollyflix.' + key);
        return value === null ? fallback : JSON.parse(value);
    } catch (error) {
        storageAvailable = false;
        return fallback;
    }
}
function write(key, value) {
    try {
        localStorage.setItem('bollyflix.' + key, JSON.stringify(value));
        return true;
    } catch (error) {
        storageAvailable = false;
        notify('Não foi possível salvar. Verifique o armazenamento do navegador.');
        return false;
    }
}
function list(key) {
    const value = read(key, []);
    return Array.isArray(value) ? value : [];
}
function notify(message) {
    const box = document.getElementById('aviso');
    box.textContent = message;
    box.classList.add('visible');
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => box.classList.remove('visible'), 4500);
}
function heading(kicker, title, subtitle = '') {
    return `<section class="page-title"><div class="page-kicker">${kicker}</div><h1>${title}</h1><p>${subtitle}</p></section>`;
}
function cards(films) {
    const favorites = list('favorites');
    return films.map(f => `<article class="card"><a class="poster" href="filme.html?id=${f.id}" aria-label="Conhecer ${f.title}"><img src="img/${f.id}.svg" alt="Capa ilustrada de ${f.title}" loading="lazy"><span class="badge-genre">${f.genre}</span></a><div class="film-info"><div><h3><a href="filme.html?id=${f.id}">${f.title}</a></h3><div class="meta">${f.year} · ${f.duration} min · ${f.rating} anos</div></div><button class="heart" data-favorite="${f.id}" aria-label="${favorites.includes(f.id) ? 'Remover' : 'Adicionar'} ${f.title} ${favorites.includes(f.id) ? 'da' : 'à'} minha lista" aria-pressed="${favorites.includes(f.id)}">${favorites.includes(f.id) ? '♥' : '+'}</button></div><p class="description">${f.description}</p></article>`).join('');
}
function shell() {
    document.body.classList.toggle('light', read('theme', 'dark') === 'light');
    document.getElementById('cabecalho').innerHTML = `<div class="container navbar"><a class="brand" href="index.html">bolly<span>flix</span><span style="font-size:18px"> ✳</span></a><nav aria-label="Navegação principal">${[['index.html','Início'],['catalogo.html','Explorar filmes'],['favoritos.html','Minha lista'],['planos.html','Planos'],['midia.html','Sala de mídia']].map(([url,name]) => `<a href="${url}" ${PAGE === url ? 'aria-current="page"' : ''}>${name}</a>`).join('')}</nav><div class="nav-tools"><button class="theme" id="theme" aria-label="Alternar modo claro e escuro" title="Alternar modo">◐</button><a class="btn small" href="perfil.html">Meu perfil ›</a></div></div>`;
    document.getElementById('rodape').innerHTML = `<div class="container"><div class="footer-top"><div><a class="brand" href="index.html">bolly<span>flix</span></a><p class="muted">Grandes histórias. Novos olhares.</p></div><nav class="footer-links" aria-label="Links do rodapé"><a href="sobre.html">Sobre</a><a href="notas.html">Diário de cinema</a><a href="contato.html">Contato</a><a href="ajuda.html">Ajuda</a><a href="privacidade.html">Privacidade</a><a href="https://www.nfai.gov.in/" target="_blank" rel="noopener noreferrer">Arquivo de cinema indiano ›</a></nav></div><div class="fine">© 2026 Bollyflix · Projeto acadêmico independente. Assinaturas simuladas, sem cobrança ou exibição dos filmes. Capas ilustradas autorais.</div></div>`;
    document.getElementById('theme').addEventListener('click', () => {
        const theme = document.body.classList.contains('light') ? 'dark' : 'light';
        if (write('theme', theme)) document.body.classList.toggle('light', theme === 'light');
    });
}
function home() {
    main.innerHTML = `<section class="hero"><div><div class="page-kicker">MUITO ALÉM DE UMA HISTÓRIA</div><h1>Um novo olhar.<br>Mil formas de<br><em>sentir cinema.</em></h1><p>Descubra a força, a cor e a emoção do cinema indiano. Encontre sua próxima grande história no Bollyflix.</p><div class="actions"><a class="btn" href="catalogo.html">Explorar o catálogo ›</a><a class="btn secondary" href="planos.html">Conhecer os planos</a></div><div class="stats"><div><strong>8</strong>histórias selecionadas</div><div><strong>5</strong>gêneros para explorar</div><div><strong>100%</strong>paixão por cinema</div></div></div><div class="hero-art"><img src="img/dangal.svg" alt="Capa ilustrada do filme Dangal"><img src="img/queen.svg" alt="Capa ilustrada do filme Queen"><span class="hero-caption">HISTÓRIAS QUE FICAM COM VOCÊ</span></div></section><section><div class="section-head"><div><div class="page-kicker">SUA PRÓXIMA DESCOBERTA</div><h2>Uma seleção para se apaixonar</h2></div><a href="catalogo.html">Ver todos ›</a></div><div class="grid">${cards(FILMS.slice(0,4))}</div></section><section class="band"><div><div class="page-kicker">SEU CINEMA, DO SEU JEITO</div><h2>Colecione histórias. Compartilhe emoções.</h2><p>Salve seus favoritos e registre cada descoberta no seu diário.</p></div><a class="btn" href="notas.html">Abrir meu diário ›</a></section>`;
}
function catalog() {
    main.innerHTML = heading('ENCONTRE SUA HISTÓRIA','Explore o cinema indiano','Das grandes aventuras aos pequenos encontros. Escolha por onde começar.') + `<form class="filters" id="filters"><label>Buscar filme<input type="search" id="search" placeholder="Título ou descrição"></label><label>Gênero<select id="genre"><option value="">Todos os gêneros</option>${[...new Set(FILMS.map(f=>f.genre))].map(g=>`<option>${g}</option>`).join('')}</select></label><label>Ordenar por<select id="sort"><option value="selection">Nossa seleção</option><option value="title">Título A–Z</option><option value="year">Mais recentes</option></select></label></form><p id="result-count" class="muted" aria-live="polite"></p><div class="grid" id="results"></div>`;
    const update = () => {
        const term = document.getElementById('search').value.toLocaleLowerCase('pt-BR');
        const genre = document.getElementById('genre').value;
        let films = FILMS.filter(f => (!genre || f.genre === genre) && (f.title+' '+f.description).toLocaleLowerCase('pt-BR').includes(term));
        const sort = document.getElementById('sort').value;
        if (sort === 'title') films.sort((a,b)=>a.title.localeCompare(b.title));
        if (sort === 'year') films.sort((a,b)=>b.year-a.year);
        document.getElementById('result-count').textContent = `${films.length} filme(s) encontrado(s)`;
        document.getElementById('results').innerHTML = films.length ? cards(films) : '<p class="empty">Nenhum filme encontrado. Experimente outra busca.</p>';
    };
    document.getElementById('filters').addEventListener('submit', e=>e.preventDefault());
    document.getElementById('filters').addEventListener('input', update);
    update();
}
function detail() {
    const film = FILMS.find(f=>f.id === new URLSearchParams(location.search).get('id'));
    if (!film) {
        main.innerHTML = heading('CATÁLOGO','Filme não encontrado','Escolha uma história do nosso catálogo.') + '<a class="btn" href="catalogo.html">Explorar filmes</a>';
        return;
    }
    document.title = film.title + ' · Bollyflix';
    main.innerHTML = `<div class="detail"><img src="img/${film.id}.svg" alt="Capa ilustrada de ${film.title}"><section><div class="page-kicker">CURADORIA BOLLYFLIX</div><h1>${film.title}</h1><div class="chips"><span>${film.year}</span><span>${film.genre}</span><span>${film.duration} minutos</span><span>Indicação: ${film.rating} anos</span></div><h2>Uma história para descobrir</h2><p>${film.description}</p><p class="muted">As indicações etárias são referenciais para este catálogo estudantil. Confira a classificação oficial antes de assistir.</p><div class="actions"><button class="btn" data-favorite="${film.id}">${list('favorites').includes(film.id) ? 'Remover da minha lista' : 'Adicionar à minha lista'}</button><a class="btn secondary" href="notas.html?filme=${film.id}">Escrever no diário</a></div><div class="alert" style="margin-top:28px">Este projeto apresenta capas e sinopses. A assinatura é uma simulação e não dá acesso à reprodução deste filme.</div></section></div><div class="section-head"><h2>Continue descobrindo</h2><a href="catalogo.html">Catálogo completo ›</a></div><div class="grid">${cards(FILMS.filter(f=>f.id!==film.id).slice(0,4))}</div>`;
}
function favorites() {
    const films = FILMS.filter(f=>list('favorites').includes(f.id));
    main.innerHTML = heading('UM LUGAR PARA SUAS DESCOBERTAS','Minha lista','Seus filmes favoritos ficam guardados neste navegador.') + (films.length ? `<div class="grid">${cards(films)}</div>` : '<div class="empty"><h2>Sua próxima história está esperando.</h2><p>Toque no + de um filme para guardá-lo aqui.</p><a class="btn" href="catalogo.html">Explorar filmes</a></div>');
}
const PLANS = [{name:'Essencial',price:'9,90',features:['Lista pessoal de filmes','Diário de descobertas','Curadoria mensal simulada']},{name:'Cinéfilo',price:'19,90',features:['Tudo do Essencial','Coleções temáticas simuladas','Destaques da curadoria']},{name:'Clube',price:'29,90',features:['Tudo do Cinéfilo','Clube de discussão simulado','Seleções especiais simuladas']}];
function plans() {
    const subscription = read('subscription', null);
    main.innerHTML = heading('MAIS PERTO DO CINEMA','Um plano para cada olhar','Escolha uma experiência de demonstração. Todos os recursos locais estão disponíveis gratuitamente neste projeto.') + `<div class="alert">Simulação acadêmica: não há pagamento, contratação real, envio de dados ou acesso a streaming.</div><p class="status" id="plan-status" role="status">${subscription && PLANS.some(p=>p.name===subscription.plan) ? 'Plano simulado atual: '+esc(subscription.plan) : 'Nenhum plano simulado selecionado.'}</p><div class="plans">${PLANS.map((p,i)=>`<article class="plan ${i===1?'featured':''}"><div class="page-kicker">${i===1?'NOSSA ESCOLHA':'BOLLYFLIX'}</div><h2>${p.name}</h2><div class="price">R$ ${p.price}<small> / mês fictício</small></div><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><button class="btn" data-plan="${p.name}">Simular ${p.name}</button></article>`).join('')}</div><div class="section-head"><h2>Compare as experiências</h2></div><div class="table-wrap"><table><caption>Comparação dos três planos fictícios</caption><thead><tr><th scope="col">Recurso</th>${PLANS.map(p=>`<th scope="col">${p.name}</th>`).join('')}</tr></thead><tbody><tr><th scope="row">Preço mensal fictício</th>${PLANS.map(p=>`<td>R$ ${p.price}</td>`).join('')}</tr><tr><th scope="row">Lista e diário locais</th><td>Sim</td><td>Sim</td><td>Sim</td></tr><tr><th scope="row">Coleções simuladas</th><td>Não</td><td>Sim</td><td>Sim</td></tr><tr><th scope="row">Clube simulado</th><td>Não</td><td>Não</td><td>Sim</td></tr></tbody></table></div><button class="btn secondary" id="cancel-plan">Cancelar simulação</button>`;
    main.querySelectorAll('[data-plan]').forEach(button=>button.addEventListener('click',()=>{
        if(write('subscription',{plan:button.dataset.plan,date:new Date().toISOString()})) { plans(); notify('Assinatura simulada salva. Nenhuma cobrança será feita.'); }
    }));
    document.getElementById('cancel-plan').addEventListener('click',()=>{ if(write('subscription',null)) {plans();notify('Simulação cancelada.');} });
}
function profile() {
    const profile = read('profile', null);
    const name = profile && typeof profile.name === 'string' ? profile.name : '';
    main.innerHTML = heading('SEU ESPAÇO','Meu perfil','Seu nome e suas preferências são salvos apenas neste navegador. Não é necessário cadastrar senha.') + `<div class="two-col"><section class="panel"><h2>Como podemos chamar você?</h2><p id="saudacao">${name ? 'Bem-vindo de volta, '+esc(name)+'!' : 'Vamos começar uma nova história?'}</p><form id="profile-form" ${name?'hidden':''}><label for="name">Seu nome</label><input id="name" name="name" type="text" required minlength="2" maxlength="60" pattern=".*\\S.*" placeholder="Digite seu nome"><button class="btn" type="submit" style="margin-top:20px">Salvar nome</button></form>${name?'<button class="btn secondary" id="edit-profile">Alterar nome</button>':''}</section><section class="panel"><h2>Seu contador de descobertas</h2><p>Um exercício de persistência: registre quantas descobertas você fez.</p><p id="counter" style="font-size:42px" aria-live="polite">${Number(read('counter',0))||0}</p><div class="actions"><button class="btn" id="increment">Adicionar 1 descoberta</button><button class="btn secondary" id="reset-counter">Zerar contador</button></div></section></div><section class="panel"><h2>Controle dos dados</h2><p>Apaga perfil, favoritos, notas, contatos, tema, contador e assinatura simulada do Bollyflix neste navegador. Dados de outros sites são preservados.</p><button class="btn secondary" id="clear">Limpar dados do Bollyflix</button></section>`;
    document.getElementById('profile-form').addEventListener('submit', e=>{
        e.preventDefault();const name = document.getElementById('name').value.trim();
        if(name.length<2) return notify('Digite um nome com pelo menos 2 caracteres.');
        if(write('profile',{name})) {profilePage();notify('Nome salvo com sucesso.');}
    });
    const edit=document.getElementById('edit-profile');
    if(edit) edit.addEventListener('click',()=>{document.getElementById('profile-form').hidden=false;document.getElementById('name').value=name;document.getElementById('name').focus();edit.hidden=true;});
    document.getElementById('increment').addEventListener('click',()=>{if(write('counter',(Number(read('counter',0))||0)+1)) profilePage();});
    document.getElementById('reset-counter').addEventListener('click',()=>{if(write('counter',0))profilePage();});
    document.getElementById('clear').addEventListener('click',()=>{
        if(!confirm('Apagar todos os dados locais do Bollyflix? Esta ação não pode ser desfeita.')) return;
        try {KEYS.forEach(key=>localStorage.removeItem('bollyflix.'+key));shell();profilePage();notify('Dados do Bollyflix apagados.');} catch(error) {notify('Não foi possível limpar os dados.');}
    });
}
function profilePage(){profile();}
function notes() {
    const entries = list('notes').filter(n=>n && typeof n.text==='string');
    const selected = new URLSearchParams(location.search).get('filme');
    main.innerHTML = heading('MEMÓRIAS DA SESSÃO','Meu diário de cinema','Ideias, cenas e histórias que merecem ficar. Suas notas continuam aqui depois de recarregar a página.') + `<form id="note-form" class="panel narrow"><label>Sobre qual filme?<select id="note-film"><option value="">Uma descoberta livre</option>${FILMS.map(f=>`<option value="${f.id}" ${selected===f.id?'selected':''}>${f.title}</option>`).join('')}</select></label><label>Sua anotação<textarea id="note" required minlength="3" maxlength="2000" rows="4" placeholder="O que essa história despertou em você?"></textarea></label><button type="submit" class="btn">Salvar anotação</button></form><h2>Notas salvas (${entries.length})</h2>${entries.length?`<div class="table-wrap"><table><thead><tr><th scope="col">Anotação</th><th scope="col">Ação</th></tr></thead><tbody>${entries.map(n=>`<tr><td><strong>${esc(FILMS.find(f=>f.id===n.film)?.title || 'Descoberta livre')}</strong><div class="note-text">${esc(n.text)}</div></td><td><button class="btn secondary small" data-delete="${esc(n.id)}" aria-label="Excluir anotação">Excluir</button></td></tr>`).join('')}</tbody></table></div>`:'<p class="empty">Seu diário está em branco. Escreva sua primeira descoberta.</p>'}`;
    document.getElementById('note-form').addEventListener('submit',e=>{
        e.preventDefault();const text=document.getElementById('note').value.trim();
        if(text.length<3)return notify('Escreva pelo menos 3 caracteres.');
        const next=[...entries,{id:Date.now().toString(36)+Math.random().toString(36).slice(2),film:document.getElementById('note-film').value,text}];
        if(write('notes',next)){notes();notify('Anotação salva.');}
    });
    main.querySelectorAll('[data-delete]').forEach(button=>button.addEventListener('click',()=>{if(write('notes',entries.filter(n=>n.id!==button.dataset.delete))){notes();notify('Anotação excluída.');}}));
}
function contact() {
    main.innerHTML=heading('VAMOS CONVERSAR','Contato','Compartilhe uma ideia, dúvida ou sugestão. Este formulário é uma demonstração local e não envia mensagens para uma equipe.')+`<div class="two-col"><form id="contact-form" class="panel"><label>Nome<input class="form-control" type="text" name="name" required minlength="2" maxlength="80" pattern=".*\\S.*" placeholder="Seu nome"></label><label>E-mail<input class="form-control" type="email" name="email" required maxlength="120" placeholder="voce@exemplo.com"></label><label>Assunto<select class="form-select" name="subject" required><option value="">Selecione um assunto</option><option>Sugestão de filme</option><option>Dúvida sobre planos</option><option>Acessibilidade</option><option>Outro assunto</option></select></label><label>Mensagem<textarea class="form-control" name="message" required minlength="10" maxlength="2000" rows="5" placeholder="Conte sua ideia em pelo menos 10 caracteres"></textarea></label><button type="submit" class="btn btn-primary">Salvar mensagem localmente</button><p class="status" id="contact-status" role="status"></p></form><aside class="panel"><h2>Uma conversa sobre cinema</h2><p>Queremos tornar a descoberta de filmes simples e acolhedora.</p><p class="muted">Não informe senhas, dados de cartão ou informações sensíveis. A mensagem ficará no armazenamento deste navegador.</p><a href="ajuda.html">Consulte as perguntas frequentes ›</a><h3 style="margin-top:30px">Seus registros locais</h3><p id="message-count"></p></aside></div>`;
    const count=()=>{document.getElementById('message-count').textContent=`${list('messages').length} mensagem(ns) salva(s) neste navegador.`;};count();
    document.getElementById('contact-form').addEventListener('submit',e=>{
        e.preventDefault();const data=Object.fromEntries(new FormData(e.target));
        if(data.name.trim().length<2||data.message.trim().length<10)return notify('Preencha nome e mensagem com conteúdo válido.');
        if(write('messages',[...list('messages'),{...data,date:new Date().toISOString()}])){e.target.reset();count();document.getElementById('contact-status').textContent='Mensagem salva neste navegador. Nenhum envio foi realizado.';}
    });
}
function media() {
    main.innerHTML=heading('PAUSA PARA SENTIR','Sala de mídia','Uma vinheta visual e um ambiente sonoro originais, produzidos para esta demonstração. Não são trailers nem trilhas dos filmes.')+`<div class="two-col"><section class="panel"><h2>Um convite à descoberta</h2><video controls preload="metadata" poster="img/rrr.svg" aria-label="Vinheta visual Bollyflix"><source src="video/vinheta.mp4" type="video/mp4">Seu navegador não suporta vídeo. <a href="video/vinheta.mp4">Baixar vinheta</a>.</video><p class="muted">Vinheta abstrata de 8 segundos, sem fala. A tela apresenta cores em movimento e o convite “Bollyflix — descubra novas histórias”.</p></section><section class="panel"><div class="page-kicker">DÊ PLAY NA ATMOSFERA</div><h2>Intervalo para imaginar</h2><p>Uma sequência instrumental de tons suaves para acompanhar sua próxima descoberta.</p><audio controls preload="metadata" aria-label="Áudio instrumental original"><source src="audio/intervalo.wav" type="audio/wav">Seu navegador não suporta áudio.</audio><p class="muted">Áudio sintetizado original de 8 segundos, sem voz. Nenhuma transcrição verbal é necessária.</p><a class="btn secondary" href="catalogo.html">Voltar às histórias</a></section></div>`;
}
function about() {
    main.innerHTML=heading('UM PROJETO, MUITOS OLHARES','O cinema aproxima.','O Bollyflix é um catálogo estudantil dedicado à descoberta do cinema indiano, desenvolvido para a disciplina de Desenvolvimento Front-End para Web.')+`<div class="two-col"><section class="panel"><h2>Por que Bollyflix?</h2><p>Drama, romance, comédia e aventura podem apresentar outras culturas e despertar novas perguntas. Nosso objetivo é ajudar você a encontrar sua próxima história.</p><p>O nome faz referência a Bollywood, mas a seleção também inclui cinema indiano produzido em outras línguas, como RRR, originalmente em télugo.</p><a class="button" href="catalogo.html">Conheça a seleção ›</a></section><section class="panel"><h2>Feito para aprender</h2><p>HTML semântico, CSS Grid, Flexbox e JavaScript constroem uma experiência responsiva que funciona sem conexão.</p><p>Esta página e a página de privacidade usam apenas HTML, CSS e JavaScript puros. As demais também utilizam o CSS local do Bootstrap.</p><a href="doc/Documentacao-Bollyflix.docx">Baixar documentação acadêmica em Word ›</a></section></div><section class="band"><div><h2>Curadoria com transparência</h2><p>Os filmes são reais; as sinopses são resumos autorais e as capas são ilustrações abstratas do projeto. Não temos vínculo com estúdios ou distribuidores.</p></div></section>`;
}
function privacy() {
    main.innerHTML=heading('TRANSPARÊNCIA EM PRIMEIRO LUGAR','Seus dados ficam com você.','Uma explicação simples sobre o armazenamento desta demonstração.')+`<article class="panel narrow"><h2>O que é salvo?</h2><p>Nome de perfil, favoritos, tema, contador, notas, mensagens do formulário e plano fictício são armazenados no localStorage do navegador usando chaves com o prefixo bollyflix.</p><h2>Por quanto tempo?</h2><p>Até você apagar os dados do site ou limpar o navegador. Não existe sincronização entre dispositivos. Em navegação privada, as informações podem ser removidas ao fechar a sessão.</p><h2>Quais são os limites?</h2><p>Esta aplicação não oferece autenticação, proteção de conta nem pagamento. Não cadastre informações confidenciais. Quem usa o mesmo perfil do navegador pode acessar os registros.</p><h2>Como apagar?</h2><p>Use “Limpar dados do Bollyflix” no perfil. Essa ação remove apenas as chaves do projeto e preserva outros dados da mesma origem.</p><h2>Funcionamento offline</h2><p>Recursos visuais, Bootstrap e mídia são locais. Links externos exigem internet. O comportamento de localStorage em arquivos file:// varia por navegador; para persistência consistente entre páginas, utilize o servidor local descrito no README.</p><a class="button" href="perfil.html">Gerenciar meus dados</a></article>`;
}
function help() {
    const faqs=[['Como salvo um filme?','No catálogo, use o botão + ao lado do título. O coração indica que o filme já está na sua lista. Clique novamente para removê-lo.'],['A assinatura tem cobrança?','Não. Os planos são uma demonstração acadêmica sem transação financeira, streaming ou vantagens reais.'],['Posso assistir aos filmes aqui?','Não. Este projeto disponibiliza capas e descrições. A sala de mídia contém apenas materiais originais de demonstração.'],['Por que meus dados não aparecem em outro dispositivo?','Os dados ficam no localStorage do navegador atual. Não há servidor de contas ou sincronização.'],['Funciona sem internet?','Sim. Abra index.html após extrair a pasta inteira. Para persistência entre páginas consistente, recomenda-se um servidor HTTP local. Links externos precisam de conexão.'],['Como apago minhas informações?','Acesse Meu perfil e escolha Limpar dados do Bollyflix. Você também pode excluir notas individualmente no diário.']];
    main.innerHTML=heading('PODEMOS AJUDAR?','Perguntas frequentes','Tudo o que você precisa para explorar o projeto.')+`<section class="narrow">${faqs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</section><div class="band"><div><h2>Ficou com uma ideia?</h2><p>Registre sua sugestão no formulário de demonstração.</p></div><a class="btn" href="contato.html">Abrir contato</a></div>`;
}
shell();
const routes={'index.html':home,'catalogo.html':catalog,'filme.html':detail,'favoritos.html':favorites,'planos.html':plans,'perfil.html':profile,'notas.html':notes,'contato.html':contact,'midia.html':media,'sobre.html':about,'privacidade.html':privacy,'ajuda.html':help};
(routes[PAGE] || home)();
main.addEventListener('click', event=>{
    const button=event.target.closest('[data-favorite]');
    if(!button)return;
    const id=button.dataset.favorite;
    if(!FILMS.some(f=>f.id===id))return;
    const saved=list('favorites');
    const exists=saved.includes(id);
    if(write('favorites',exists?saved.filter(item=>item!==id):[...saved,id])){
        if(PAGE==='favoritos.html')favorites();
        else if(PAGE==='filme.html')detail();
        else {button.setAttribute('aria-pressed',String(!exists));button.textContent=exists?'+':'♥';button.setAttribute('aria-label',`${exists?'Adicionar':'Remover'} ${FILMS.find(f=>f.id===id).title} ${exists?'à':'da'} minha lista`);}
        notify(exists?'Filme removido da sua lista.':'Filme salvo na sua lista.');
    }
});
if(!storageAvailable)notify('Armazenamento indisponível ou inválido. Seus dados podem não persistir.');
