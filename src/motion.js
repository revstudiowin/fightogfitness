/** Native, progressively enhanced motion. Nothing is hidden before initialization. */
export function initHomepageMotion(){
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const sections=[...document.querySelectorAll('main > section')];
  const animations=new Set(),active=new Set(),seen=new WeakSet();
  let observer,sectionObserver,frame=0,enabled=false,lastScroll=scrollY,smoothScroll=scrollY;
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  const variants=['hero','statement','stories','rhythm','steps','people','schedule','answers','closing'];
  sections.forEach((section,i)=>{section.dataset.motionChapter=variants[i];section.style.setProperty('--chapter-index',i)});

  // Wrap existing text nodes, keeping all original inline emphasis and line breaks.
  // Spaces stay outside spans so screen readers and copy/paste keep natural words.
  function splitHeading(heading){
    if(heading.dataset.motionSplit)return;
    const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    let index=0;
    nodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(text=>{if(!text)return;if(/^\s+$/.test(text)){fragment.append(document.createTextNode(text));return}const mask=document.createElement('span'),word=document.createElement('span');mask.className='motion-word-mask';word.className='motion-word';word.textContent=text;word.style.setProperty('--word-index',index++);mask.append(word);fragment.append(mask)});node.replaceWith(fragment)});
    heading.dataset.motionSplit='true';
  }

  function animate(element,keyframes,options){
    const animation=element.animate(keyframes,{duration:950,easing:'cubic-bezier(.16,1,.3,1)',fill:'none',...options});
    animations.add(animation);animation.finished.then(()=>animations.delete(animation)).catch(()=>animations.delete(animation));return animation;
  }
  function reveal(element){
    if(seen.has(element)||!enabled)return;seen.add(element);
    const words=element.querySelectorAll('.motion-word');
    if(words.length){words.forEach((word,i)=>animate(word,[{transform:'translate3d(0,115%,0) rotate(5deg)',opacity:0},{transform:'translate3d(0,0,0) rotate(0)',opacity:1}],{duration:1050,delay:Math.min(i*55,550)}));return}
    const kind=element.dataset.motionReveal,delay=Number(element.dataset.motionDelay||0);
    if(kind==='media')animate(element,[{clipPath:'inset(12% 8% 12% 8% round 40px)',opacity:.25,transform:'scale(.93)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',opacity:1,transform:'scale(1)'}],{duration:1200,delay});
    else if(kind==='card')animate(element,[{opacity:0,transform:'translate3d(0,85px,0) rotate(3deg) scale(.95)'},{opacity:1,transform:'translate3d(0,0,0) rotate(0deg) scale(1)'}],{duration:1000,delay});
    else if(kind==='left')animate(element,[{opacity:.1,transform:'translate3d(-60px,35px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:1100,delay});
    else animate(element,[{opacity:0,transform:'translate3d(0,45px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:850,delay});
  }

  const headings=[...document.querySelectorAll('main h1, main h2, .member-video-heading h3, .transformations > h3, .concept-panel h3')];headings.forEach(splitHeading);
  const targets=new Set(headings);
  const add=(selector,kind,stagger=0)=>document.querySelectorAll(selector).forEach((element,i)=>{element.dataset.motionReveal=kind;element.dataset.motionDelay=Math.min(i%5*stagger,360);targets.add(element)});
  add('.eyebrow, .opening-intro, .opening-offer-line, .review-intro, .video-intro','rise');
  add('.thought-card','card',140);add('.review-card','card',100);add('.member-video-card','media',110);
  add('.transformation-grid figure','card',110);add('.time-calculator','left');add('.training-rhythm','rise');
  add('.consultation-benefits li','card',100);add('.team-card','media',120);add('.location-panel','left');
  add('.faq-list details','rise',65);add('.review-cta, .home-offer-next, .opening-community-bottom, .closing .button, .footer-top > div','rise',100);

  // Separate transform properties keep scroll parallax independent of reveal animations.
  const heroPhoto=document.querySelector('.opening:not(.split-opening) .opening-community-photo > img');
  const heroTitle=document.querySelector('.opening:not(.split-opening) h1');
  const parallaxMedia=[...document.querySelectorAll('.member-video-card img,.team-card img')];
  parallaxMedia.forEach(image=>{image.dataset.motionParallax='';image.style.setProperty('--motion-media-y','0px')});
  const cards=[...document.querySelectorAll('.thought-card')];
  function tick(){
    frame=0;if(!enabled)return;
    const y=scrollY,delta=y-smoothScroll;smoothScroll=Math.abs(delta)<.15?y:smoothScroll+delta*.15;
    const height=innerHeight,small=innerWidth<768;
    progress.style.transform=`scaleX(${clamp(y/Math.max(1,document.documentElement.scrollHeight-height))})`;
    if(heroPhoto){const travel=clamp(smoothScroll,0,1100);heroPhoto.style.translate=`0 ${travel*(small?.08:.16)}px`;heroPhoto.style.scale=String(1.06+clamp(travel/1100)*.07)}
    if(heroTitle){const travel=clamp(smoothScroll,0,600);heroTitle.style.translate=`0 ${-travel*(small?.045:.1)}px`;heroTitle.style.opacity=String(1-clamp(travel/900)*.45)}
    active.forEach(section=>{
      const r=section.getBoundingClientRect(),p=clamp((height-r.top)/(height+r.height));
      section.style.setProperty('--section-scroll',p.toFixed(4));
      section.querySelectorAll('[data-motion-parallax]').forEach((image,i)=>{const ir=image.closest('.member-video-card,.team-card').getBoundingClientRect();const amount=clamp((height/2-ir.top-ir.height/2)/height,-1,1)*(small?20:42);image.style.translate=`0 ${amount.toFixed(2)}px`;image.style.scale='1.09'});
      if(section.id==='faellesskabet')cards.forEach((card,i)=>{card.style.translate=`0 ${((p-.5)*(i===1?-1:1)*(small?0:52)).toFixed(2)}px`});
      if(section.classList.contains('closing'))section.style.setProperty('--closing-round',`${(1-clamp((height-r.top)/height))*64}px`);
    });
    lastScroll=y;if(Math.abs(delta)>.15)frame=requestAnimationFrame(tick);
  }
  function schedule(){if(enabled&&!frame)frame=requestAnimationFrame(tick)}
  function start(){
    if(enabled||preference.matches)return;enabled=true;document.documentElement.classList.add('motion-enabled');
    observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){reveal(entry.target);observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
    targets.forEach(target=>{if(!seen.has(target))observer.observe(target)});
    sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>entry.isIntersecting?active.add(entry.target):active.delete(entry.target));schedule()},{rootMargin:'200px 0px'});sections.forEach(section=>sectionObserver.observe(section));
    smoothScroll=scrollY;schedule();
  }
  function stop(){
    enabled=false;document.documentElement.classList.remove('motion-enabled');observer?.disconnect();sectionObserver?.disconnect();cancelAnimationFrame(frame);frame=0;animations.forEach(animation=>animation.cancel());animations.clear();active.clear();
    [heroPhoto,heroTitle,...parallaxMedia,...cards].filter(Boolean).forEach(element=>{element.style.removeProperty('translate');element.style.removeProperty('scale');element.style.removeProperty('opacity')});progress.style.removeProperty('transform');
  }
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
  document.addEventListener('toggle',schedule,true);document.addEventListener('click',schedule,{passive:true});
  preference.addEventListener('change',()=>preference.matches?stop():start());
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else schedule()});
  start();
}

