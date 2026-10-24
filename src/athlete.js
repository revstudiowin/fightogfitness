export function initAthleteCarousel(){
  const root=document.querySelector('.athlete-carousel');if(!root)return;
  const slides=[...root.querySelectorAll('.athlete-slide')],dots=[...root.querySelectorAll('[data-athlete-dot]')],pause=root.querySelector('[data-athlete-pause]'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  let index=0,playing=!reduced.matches,inView=false,busy=false,ready=false;
  // Decode the complete sequence before fast autoplay to avoid blank frames on phones.
  Promise.all(slides.map(slide=>slide.querySelector('img').decode().catch(()=>{}))).then(()=>{ready=true});
  function playback(value){playing=value&&!reduced.matches;pause.textContent=playing?'Ⅱ':'▶';pause.setAttribute('aria-pressed',String(!playing));pause.setAttribute('aria-label',playing?'Sæt billedskift på pause':'Start billedskift')}
  async function show(next,manual=false){if(busy)return;if(manual)playback(false);next=(next+slides.length)%slides.length;busy=true;const image=slides[next].querySelector('img');try{await image.decode()}catch{busy=false;return}index=next;slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===index);slide.classList.toggle('is-before',i<index);slide.setAttribute('aria-hidden',String(i!==index))});dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===index)));busy=false}
  root.querySelector('[data-athlete-prev]').onclick=()=>show(index-1,true);root.querySelector('[data-athlete-next]').onclick=()=>show(index+1,true);dots.forEach((dot,i)=>dot.onclick=()=>show(i,true));pause.onclick=()=>playback(!playing);
  root.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();show(index+(event.key==='ArrowRight'?1:-1),true)});
  let touchStart=null;root.addEventListener('pointerdown',event=>{if(event.pointerType==='touch'&&!event.target.closest('button'))touchStart={x:event.clientX,y:event.clientY}});root.addEventListener('pointerup',event=>{if(!touchStart)return;const dx=event.clientX-touchStart.x,dy=event.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3)show(index+(dx<0?1:-1),true)});root.addEventListener('pointercancel',()=>touchStart=null);
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting},{threshold:.1}).observe(root);
  // Touch browsers can retain :hover after a tap; that must never freeze mobile autoplay.
  setInterval(()=>{if(ready&&playing&&inView&&!document.hidden&&!(finePointer.matches&&root.matches(':hover')))show(index+1)},1000);
  reduced.addEventListener('change',()=>playback(false));playback(playing);
}

