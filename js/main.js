"use strict";
const root=document.documentElement;
const themeButton=document.querySelector('.theme-toggle');
function updateThemeLabel(){const dark=root.dataset.theme==='dark';themeButton.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);themeButton.setAttribute('aria-pressed',String(dark));}
updateThemeLabel();
let themeChanging=false;
themeButton.addEventListener('click',async()=>{
 if(themeChanging)return;
 const next=root.dataset.theme==='dark'?'light':'dark';
 const apply=()=>{root.dataset.theme=next;try{localStorage.setItem('admiro-theme',next)}catch(e){}updateThemeLabel();if(typeof syncCosmeticsTheme==='function')syncCosmeticsTheme()};
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){apply();return}
 const r=themeButton.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
 root.style.setProperty('--theme-x',x+'px');root.style.setProperty('--theme-y',y+'px');
 root.style.setProperty('--theme-radius',Math.ceil(Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y)))+240+'px');
 root.classList.toggle('theme-mobile-fade',matchMedia('(max-width:900px), (pointer:coarse)').matches);
 if(!document.startViewTransition){root.classList.add('theme-fallback');apply();setTimeout(()=>root.classList.remove('theme-fallback'),520);return}
 themeChanging=true;
 try{const transition=document.startViewTransition(apply);await transition.finished}catch(e){apply()}finally{themeChanging=false;root.classList.remove('theme-mobile-fade')}
});
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const process=[{label:'MOMENT DISCOVERED',title:'A slower start. A stronger connection.',copy:'A relaxed coffee scene opens up a natural conversation with food, drink and lifestyle brands.',tags:['Morning routine','Food & drink','Lifestyle']},{label:'CONTEXT MEETS BRAND',title:'The right idea, in the right setting.',copy:'Explore how an everyday ritual could connect with a relevant brand. Morrow is an illustrative brand created for this preview.',tags:['Morrow · concept brand','Contextual fit','Creative direction']},{label:'AN IDEA TAKES SHAPE',title:'Keep the story at the centre.',copy:'Bring the scene, brand and creative direction together into a placement concept for review.',tags:['Scene selected','Concept ready','Human review']}];
const tabs=[...document.querySelectorAll('.step')];
function selectStep(i){tabs.forEach((t,j)=>{t.classList.toggle('active',i===j);t.setAttribute('aria-selected',String(i===j));t.tabIndex=i===j?0:-1});document.querySelector('#process-panel').setAttribute('aria-labelledby',`step-${i}`);const d=process[i];document.querySelector('#process-label').textContent=d.label;document.querySelector('#process-title').textContent=d.title;document.querySelector('#process-copy').textContent=d.copy;const tags=document.querySelector('#process-tags');tags.replaceChildren(...d.tags.map(t=>{const span=document.createElement('span');span.textContent=t;return span}));document.querySelector('#process-count').textContent=`0${i+1} / 03`;document.querySelector('.scan-box span').textContent=['SCENE OPPORTUNITY','BRAND CONNECTION','PLACEMENT CONCEPT'][i]}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectStep(i));t.addEventListener('keydown',e=>{if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();let n=e.key==='Home'?0:e.key==='End'?2:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:2))%3;selectStep(n);tabs[n].focus()}})});selectStep(0);
const dialog=document.querySelector('#preview-dialog');
const previews=[['A daily ritual. A natural connection.','A coffee scene could offer creative possibilities for drinks, kitchen products or lifestyle brands. The goal: a connection that makes sense in the moment.'],['Where passion meets possibility.','A gaming setup could create space for technology, accessories or refreshment brands. This original illustration explores the idea without representing a real campaign.']];
document.querySelectorAll('[data-preview]').forEach(b=>b.addEventListener('click',()=>{const d=previews[Number(b.dataset.preview)];document.querySelector('#modal-title').textContent=d[0];document.querySelector('#modal-copy').textContent=d[1];dialog.showModal()}));document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());document.querySelector('#modal-contact').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target);const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`;window.location.href=`mailto:hello@admiro.io?subject=${encodeURIComponent('Admiro — Let’s explore an opportunity')}&body=${encodeURIComponent(body)}`;document.querySelector('#form-status').textContent='Your email draft is ready. Review it in your email app before sending.'});

// One video element prevents simultaneous downloads and audio playback.
const heroVideo=document.querySelector('#hero-video');
const videoTabs=[...document.querySelectorAll('[data-video]')];
const videoPlay=document.querySelector('#video-play');
let manuallyPaused=false;
let activeVideoIndex=0;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function syncPlayButton(){videoPlay.setAttribute('aria-label',heroVideo.paused?'Play hero video':'Pause hero video');videoPlay.innerHTML=heroVideo.paused?'<svg class="icon" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9 5 14 9-14 9V5Z"/></svg>':'<svg class="icon" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 5v18M18 5v18"/></svg>'}
function safePlay(){const promise=heroVideo.play();if(promise)promise.catch(syncPlayButton)}
function selectVideo(index){activeVideoIndex=index;const key=videoTabs[index].dataset.video;videoTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});document.querySelector('#hero-video-panel').setAttribute('aria-labelledby',videoTabs[index].id);heroVideo.poster=`images/${key}-poster.jpg`;heroVideo.src=`videos/${key}.mp4`;heroVideo.setAttribute('aria-label',index?'Admiro studio walkthrough supplied by the team':'Scene placement video supplied for Admiro');document.querySelector('#hero-video-title').textContent=index?'INSIDE THE STUDIO':'IN THE SCENE';document.querySelector('#hero-video-description').textContent=index?'A closer look at the creative workspace.':'See how a brand moment can live alongside the story.';heroVideo.load();if(!manuallyPaused&&!reducedMotion.matches)safePlay();syncPlayButton()}
videoTabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectVideo(i));tab.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const n=event.key==='Home'?0:event.key==='End'?1:1-i;selectVideo(n);videoTabs[n].focus()}})});
videoPlay.addEventListener('click',()=>{if(heroVideo.paused){manuallyPaused=false;safePlay()}else{manuallyPaused=true;heroVideo.pause()}});
heroVideo.addEventListener('play',syncPlayButton);heroVideo.addEventListener('pause',syncPlayButton);
if(reducedMotion.matches){heroVideo.autoplay=false;heroVideo.pause()}
new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)heroVideo.pause();else if(!manuallyPaused&&!reducedMotion.matches)safePlay()})},{threshold:.1}).observe(heroVideo);
document.addEventListener('visibilitychange',()=>{if(document.hidden)heroVideo.pause()});
syncPlayButton();

heroVideo.loop=false;
heroVideo.addEventListener('ended',()=>{if(!manuallyPaused&&!reducedMotion.matches)selectVideo((activeVideoIndex+1)%videoTabs.length)});
heroVideo.addEventListener('timeupdate',()=>{const progress=heroVideo.duration?heroVideo.currentTime/heroVideo.duration:0;videoTabs.forEach((tab,i)=>tab.style.setProperty('--video-progress',i===activeVideoIndex?progress:0))});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!manuallyPaused&&!reducedMotion.matches){const bounds=heroVideo.getBoundingClientRect();if(bounds.bottom>0&&bounds.top<innerHeight)safePlay()}});
// GSAP moves only transform/opacity layers; no canvas or WebGL rendering.
if(window.gsap){
 const motion=gsap.matchMedia();
 motion.add('(prefers-reduced-motion: no-preference)',()=>{
  gsap.to('.orb-blue',{x:()=>Math.min(innerWidth*.46,620),y:260,duration:11,ease:'sine.inOut',repeat:-1,yoyo:true});
  gsap.to('.orb-orange',{x:()=>-Math.min(innerWidth*.35,460),y:-230,scale:1.16,duration:14,ease:'sine.inOut',repeat:-1,yoyo:true});
  gsap.to('.orb-green',{x:()=>Math.min(innerWidth*.32,420),y:-340,duration:12,ease:'sine.inOut',repeat:-1,yoyo:true});
  gsap.to('.audience-blue',{x:()=>Math.min(innerWidth*.4,500),y:180,duration:11,ease:'sine.inOut',repeat:-1,yoyo:true});
  gsap.to('.audience-orange',{x:()=>-Math.min(innerWidth*.3,360),y:-170,scale:1.12,duration:14,ease:'sine.inOut',repeat:-1,yoyo:true});
  gsap.to('.audience-green',{x:()=>Math.min(innerWidth*.25,320),y:-230,duration:12,ease:'sine.inOut',repeat:-1,yoyo:true});
  document.querySelectorAll('.section-color-glows').forEach(layer=>{
   gsap.to(layer.querySelector('.section-orb-blue'),{x:()=>Math.min(innerWidth*.38,500),y:160,duration:11,ease:'sine.inOut',repeat:-1,yoyo:true});
   gsap.to(layer.querySelector('.section-orb-orange'),{x:()=>-Math.min(innerWidth*.3,380),y:-180,scale:1.12,duration:14,ease:'sine.inOut',repeat:-1,yoyo:true});
   gsap.to(layer.querySelector('.section-orb-green'),{x:()=>Math.min(innerWidth*.28,360),y:-200,duration:12,ease:'sine.inOut',repeat:-1,yoyo:true});
  });
  const cells=[...document.querySelectorAll('.brand-grid span')];
  const colors=['rgba(0,127,255,.24)','rgba(255,87,38,.22)','rgba(145,206,56,.21)','rgba(0,171,143,.22)'];
  [5,10,15,20,28,33,39,45,52,57,62,68].forEach((index,i)=>{
   gsap.timeline({repeat:-1,delay:i*.7,repeatDelay:3+i%3}).to(cells[index],{backgroundColor:colors[i%colors.length],duration:1.8,ease:'sine.inOut'}).to(cells[index],{backgroundColor:'rgba(0,0,0,0)',duration:2.6,ease:'sine.inOut'});
  });
 });
}

// Match the product colour to the selected site theme on load and toggle.
const cosmeticsAnimation=document.querySelector('#cosmetics-animation');
function syncCosmeticsTheme(){if(!cosmeticsAnimation)return;const source=root.dataset.theme==='light'?cosmeticsAnimation.dataset.lightSrc:cosmeticsAnimation.dataset.darkSrc;if(cosmeticsAnimation.getAttribute('src')!==source)cosmeticsAnimation.src=source;cosmeticsAnimation.alt=root.dataset.theme==='light'?'Black skincare products morphing in a continuous loop':'White skincare products morphing in a continuous loop'}
syncCosmeticsTheme();
new MutationObserver(syncCosmeticsTheme).observe(root,{attributes:true,attributeFilter:['data-theme']});

// Optional, on-demand Google Translate integration (all provider-supported languages).
const languageButton=document.querySelector('#language-button');
const languagePanel=document.querySelector('#language-panel');
const languageStatus=document.querySelector('#language-status');
let translatorLoading=false,translatorReady=false,pendingLanguage=null,translatorTimeout;
function closeLanguagePanel(){languagePanel.hidden=true;languageButton.setAttribute('aria-expanded','false')}
function applyTranslationLanguage(code){const select=document.querySelector('#google_translate_element select');if(!select){pendingLanguage=code;return}const option=[...select.options].find(option=>option.value===code);if(!option){languageStatus.textContent='Select your language from the full list below.';return}select.value=code;select.dispatchEvent(new Event('change',{bubbles:true}));pendingLanguage=null;languageStatus.textContent=code==='en'?'English selected.':'Automatic translation selected. Videos and image text stay in their original language.'}
window.admiroTranslateInit=function(){new google.translate.TranslateElement({pageLanguage:'en',autoDisplay:false,layout:google.translate.TranslateElement.InlineLayout.VERTICAL},'google_translate_element');let attempts=0;const timer=setInterval(()=>{const select=document.querySelector('#google_translate_element select');if(select){clearInterval(timer);clearTimeout(translatorTimeout);translatorReady=true;translatorLoading=false;select.setAttribute('aria-label','All supported translation languages');languageStatus.textContent='Translation powered by Google Translate.';if(pendingLanguage)applyTranslationLanguage(pendingLanguage)}else if(++attempts>50){clearInterval(timer);translationFailed()}},200)};
function translationFailed(){clearTimeout(translatorTimeout);translatorLoading=false;languageStatus.textContent='Translation could not load. Check your internet connection and open this page through a web server.';document.querySelector('#language-retry').hidden=false}
function loadTranslator(){if(translatorReady||translatorLoading)return;translatorLoading=true;languageStatus.textContent='Loading available languages…';document.querySelector('#language-retry').hidden=true;document.querySelector('#admiro-translate-script')?.remove();const script=document.createElement('script');script.id='admiro-translate-script';script.src='https://translate.google.com/translate_a/element.js?cb=admiroTranslateInit';script.async=true;script.onerror=translationFailed;document.head.append(script);translatorTimeout=setTimeout(translationFailed,15000)}
languageButton.addEventListener('click',()=>{const open=languagePanel.hidden;languagePanel.hidden=!open;languageButton.setAttribute('aria-expanded',String(open));if(open)loadTranslator()});
document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{pendingLanguage=button.dataset.language;if(translatorReady)applyTranslationLanguage(pendingLanguage);else loadTranslator()}));
document.querySelector('#language-retry').addEventListener('click',loadTranslator);
document.addEventListener('click',event=>{if(!event.target.closest('.language-control'))closeLanguagePanel()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!languagePanel.hidden){closeLanguagePanel();languageButton.focus()}});
