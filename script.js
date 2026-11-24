// Responsive menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('visible'));

// NEON GRAVE ticket checkout flow (front-end demo; payment verification requires a backend)
const modal = document.querySelector('.ticket-modal');
const closeButton = document.querySelector('.modal-close');
const form = document.querySelector('#ticket-form');
const paymentStage = document.querySelector('.payment-stage');
const ticketTotal = document.querySelector('#ticket-total');
const payTotal = document.querySelector('#pay-total');
const passInputs = [...document.querySelectorAll('.pass-row input')];
let lastFocused = null;
let orderTotal = 0;
const money = n => `₹${Number(n).toLocaleString('en-IN')}`;
function calculateTotal(){
  orderTotal = passInputs.reduce((sum, input) => sum + (Math.max(0, Math.min(10, Number(input.value)||0)) * Number(input.dataset.price)), 0);
  ticketTotal.textContent = money(orderTotal);
  payTotal.textContent = money(orderTotal);
}
passInputs.forEach(input => input.addEventListener('input', calculateTotal));
calculateTotal();
function openCheckout(){
  lastFocused=document.activeElement; modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden'; form.hidden=false; paymentStage.hidden=true;
  setTimeout(()=>form.querySelector('input')?.focus(),100);
}
function closeCheckout(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocused?.focus?.();}
document.querySelectorAll('.ticket-open, .nav-ticket').forEach(el=>el.addEventListener('click',e=>{
  if(el.classList.contains('nav-ticket')){e.preventDefault();openCheckout();} else openCheckout();
}));
closeButton?.addEventListener('click',closeCheckout);
modal?.addEventListener('click',e=>{if(e.target===modal)closeCheckout();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeCheckout();});
form?.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.reportValidity()) return;
  const qty=passInputs.reduce((sum,i)=>sum+(Number(i.value)||0),0);
  if(qty<1){alert('Please choose at least one pass.');return;}
  calculateTotal();
  form.hidden=true; paymentStage.hidden=false; paymentStage.scrollIntoView({behavior:'smooth',block:'start'});
});
document.querySelector('.back-checkout')?.addEventListener('click',()=>{paymentStage.hidden=true;form.hidden=false;form.scrollIntoView({behavior:'smooth',block:'start'});});
document.querySelector('.whatsapp-order')?.addEventListener('click',()=>{
  const data=new FormData(form);
  const passSummary=[['Male stag',data.get('male')],['Female stag',data.get('female')],['Couple pass',data.get('couple')]].filter(([name,qty])=>Number(qty)>0).map(([name,qty])=>`${name}: ${qty}`).join('\n');
  const msg=`NEON GRAVE — TICKET ORDER\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nWhatsApp: ${data.get('whatsapp')}\nPasses:\n${passSummary}\nPayment method: ${data.get('payment')}\nTotal: ${money(orderTotal)}\nI have completed payment. Please confirm and send my ticket(s).`;
  window.open(`https://wa.me/91935260443?text=${encodeURIComponent(msg)}`,'_blank','noopener');
});
