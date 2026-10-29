const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base='http://127.0.0.1:8000/';
 const go=async p=>{await page.goto(base+p);await page.waitForSelector('footer .brand');};
 await go('catalogo.html');assert.equal(await page.locator('.card').count(),8);
 await page.locator('#search').fill('Dangal');assert.equal(await page.locator('.card').count(),1);
 await page.locator('[data-favorite=dangal]').click();await go('favoritos.html');assert.equal(await page.locator('.card').count(),1);await page.reload();assert.equal(await page.locator('.card').count(),1);
 await go('perfil.html');await page.locator('#name').fill('Pessoa Teste');await page.getByRole('button',{name:'Salvar nome',exact:true}).click();await page.reload();assert.match(await page.locator('#saudacao').innerText(),/Pessoa Teste/);assert.equal(await page.locator('#profile-form').isVisible(),false);
 await page.locator('#increment').click();await page.reload();assert.equal(await page.locator('#counter').innerText(),'1');await page.locator('#reset-counter').click();assert.equal(await page.locator('#counter').innerText(),'0');
 await page.locator('#theme').click();await page.reload();assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('light')),true);
 await go('notas.html');await page.locator('#note').fill('<script>alert(1)</script> Uma nota de teste');await page.getByRole('button',{name:'Salvar anotação'}).click();await page.reload();assert.equal(await page.locator('[data-delete]').count(),1);assert.match(await page.locator('.note-text').innerText(),/<script>/);await page.locator('[data-delete]').click();assert.equal(await page.locator('[data-delete]').count(),0);
 await go('planos.html');await page.locator('[data-plan=Cinéfilo]').click();await page.reload();assert.match(await page.locator('#plan-status').innerText(),/Cinéfilo/);await page.locator('#cancel-plan').click();assert.match(await page.locator('#plan-status').innerText(),/Nenhum/);
 await go('contato.html');await page.getByRole('button',{name:'Salvar mensagem localmente'}).click();assert.equal(await page.locator('form').evaluate(el=>el.checkValidity()),false);
 await page.locator('[name=name]').fill('Pessoa Teste');await page.locator('[name=email]').fill('teste@example.com');await page.locator('[name=subject]').selectOption({label:'Outro assunto'});await page.locator('[name=message]').fill('Mensagem fictícia de validação.');await page.getByRole('button',{name:'Salvar mensagem localmente'}).click();assert.match(await page.locator('#contact-status').innerText(),/Nenhum envio/);await page.reload();assert.match(await page.locator('#message-count').innerText(),/1 mensagem/);
 await go('filme.html?id=rrr');assert.equal(await page.locator('h1').innerText(),'RRR');await go('filme.html?id=inexistente');assert.match(await page.locator('h1').innerText(),/não encontrado/);
 await go('midia.html');for(const tag of ['video','audio']){await page.locator(tag).evaluate(async el=>{el.load();await new Promise((resolve,reject)=>{if(el.readyState>=1)return resolve();el.addEventListener('loadedmetadata',resolve,{once:true});el.addEventListener('error',()=>reject(new Error('Mídia inválida')),{once:true});});});assert.ok(await page.locator(tag).evaluate(el=>el.duration>=7));}
 fs.mkdirSync('doc/telas',{recursive:true});
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});
  for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.html'))){await go(file==='filme.html'?'filme.html?id=dangal':file);assert.equal(await page.locator('h1').count(),1,file);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${file} ${width}`);await page.screenshot({path:`doc/telas/${file.replace('.html','')}-${width}.png`,fullPage:true});}
 }
 await page.setViewportSize({width:1440,height:1000});await go('perfil.html');await page.evaluate(()=>localStorage.setItem('outro-projeto','preservar'));page.once('dialog',d=>d.accept());await page.locator('#clear').click();assert.equal(await page.evaluate(()=>localStorage.getItem('outro-projeto')),'preservar');assert.equal(await page.evaluate(()=>localStorage.getItem('bollyflix.profile')),null);
 const offline=await browser.newContext({offline:true});const fp=await offline.newPage();try { await fp.goto('file://'+process.cwd()+'/index.html');assert.equal(await fp.locator('.card').count(),4);await fp.getByRole('link',{name:'Explorar o catálogo'}).click();assert.equal(await fp.locator('.card').count(),8); } catch(error) { if(!error.message.includes('ERR_BLOCKED_BY_ADMINISTRATOR')) throw error; console.log('SKIP: file:// bloqueado pela política do Chromium gerenciado; navegação offline por arquivo requer validação no navegador da dupla.'); }
 assert.deepEqual(errors,[]);console.log('PASS: 12 páginas em 1440/390px; busca, favoritos, perfil, contador, tema, notas, planos, contato, mídia, limpeza isolada e limpeza de dados.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
