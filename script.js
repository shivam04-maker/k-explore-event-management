const events = [
  {id:"soundwave",title:"Soundwave Festival",category:"Music",date:"2026-11-21",time:"5:00 PM – 10:00 PM",venue:"Ekamra Haat, Bhubaneswar",price:"₹499",description:"A night of electric performances, fresh sounds, and unforgettable energy. Discover emerging artists and dance with a community that loves live music.",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85",featured:true},
  {id:"futuretech",title:"FutureTech Summit",category:"Technology",date:"2026-11-28",time:"10:00 AM – 4:00 PM",venue:"KIIT Convention Centre, Bhubaneswar",price:"Free",description:"Explore the ideas shaping tomorrow. Meet builders, hear from innovators, and dive into conversations around AI, startups, and emerging technology.",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85"},
  {id:"artwalk",title:"The Art Walk",category:"Art",date:"2026-12-05",time:"11:00 AM – 7:00 PM",venue:"Gallery One, Bhubaneswar",price:"₹199",description:"A celebration of imagination featuring local artists, interactive installations, creative workshops, and stories told through art.",image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85"},
  {id:"mindful",title:"Mindful Mornings",category:"Wellness",date:"2026-12-12",time:"7:00 AM – 9:00 AM",venue:"Forest Park, Bhubaneswar",price:"₹149",description:"Slow down and reset with guided yoga, mindful breathing, and a refreshing morning surrounded by nature. All experience levels welcome.",image:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85"},
  {id:"indie",title:"Indie Unplugged",category:"Music",date:"2026-12-19",time:"6:00 PM – 9:00 PM",venue:"The Urban Foundry, Bhubaneswar",price:"₹299",description:"An intimate evening of acoustic sets and original music. Discover independent voices and enjoy a laid-back night with fellow music lovers.",image:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85"},
  {id:"designlab",title:"Design Lab: Create",category:"Art",date:"2027-01-09",time:"10:30 AM – 1:30 PM",venue:"Startup Odisha, Bhubaneswar",price:"₹249",description:"Get hands-on with design thinking. Experiment, sketch, collaborate, and turn a bold idea into something tangible in this creative workshop.",image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85"}
];

const grid = document.getElementById("eventsGrid");
const searchInput = document.getElementById("searchInput");
const filterList = document.getElementById("filterList");
const emptyState = document.getElementById("emptyState");
const eventSelect = document.getElementById("eventSelect");
const dialog = document.getElementById("eventDialog");
const dialogContent = document.getElementById("dialogContent");
let activeCategory = "All";

const dateParts = date => {
  const d = new Date(date + "T12:00:00");
  return {day:d.getDate(), month:d.toLocaleDateString("en-IN",{month:"short"}).toUpperCase(), full:d.toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})};
};
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

function renderEvents(){
  const query = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const matchesSearch = `${event.title} ${event.venue} ${event.description} ${event.category}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  grid.innerHTML = filtered.map(event => {
    const date = dateParts(event.date);
    return `<article class="event-card" tabindex="0" role="button" aria-label="View details for ${escapeHTML(event.title)}" data-event="${event.id}">
      <div class="event-image"><img src="${event.image}" alt="${escapeHTML(event.title)} event" loading="lazy"><span class="event-category">${escapeHTML(event.category.toUpperCase())}</span><div class="event-date"><strong>${date.day}</strong><span>${date.month}</span></div></div>
      <div class="event-info"><h3>${escapeHTML(event.title)}</h3><p>${escapeHTML(event.description.slice(0,105))}…</p><div class="event-meta"><span>⌖ ${escapeHTML(event.venue)}</span><b>↗</b></div></div>
    </article>`;
  }).join("");
  emptyState.hidden = filtered.length !== 0;
  grid.hidden = filtered.length === 0;
  document.getElementById("allCount").textContent = events.length;
}
function populateSelect(){
  eventSelect.innerHTML = '<option value="">Select an event</option>' + events.map(e=>`<option value="${e.id}">${escapeHTML(e.title)} — ${dateParts(e.date).full}</option>`).join("");
}
function openEvent(id){
  const event = events.find(e=>e.id===id);
  if(!event)return;
  const date = dateParts(event.date);
  dialogContent.innerHTML = `<img class="dialog-image" src="${event.image}" alt="${escapeHTML(event.title)}"><div class="dialog-body"><div class="eyebrow"><span class="eyebrow-line"></span>${escapeHTML(event.category.toUpperCase())} / K EXPLORE</div><h2 id="dialogTitle">${escapeHTML(event.title)}</h2><div class="dialog-details"><span>▦ ${date.full}</span><span>◷ ${escapeHTML(event.time)}</span><span>⌖ ${escapeHTML(event.venue)}</span><span>◈ ${escapeHTML(event.price)}</span></div><p>${escapeHTML(event.description)}</p><button class="btn btn-primary" id="dialogRegister">Register for this event <span>↗</span></button></div>`;
  dialog.showModal();
  document.getElementById("dialogRegister").addEventListener("click",()=>{
    eventSelect.value=event.id;dialog.close();document.getElementById("register").scrollIntoView({behavior:"smooth"});
  });
}
grid.addEventListener("click",e=>{const card=e.target.closest("[data-event]");if(card)openEvent(card.dataset.event);});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-event]")){e.preventDefault();openEvent(e.target.dataset.event);}});
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
searchInput.addEventListener("input",renderEvents);
filterList.addEventListener("click",e=>{
  const button=e.target.closest("[data-category]");if(!button)return;
  activeCategory=button.dataset.category;
  filterList.querySelectorAll(".filter-chip").forEach(chip=>chip.classList.toggle("selected",chip===button));
  renderEvents();
});
document.getElementById("clearFilters").addEventListener("click",()=>{
  searchInput.value="";activeCategory="All";
  filterList.querySelectorAll(".filter-chip").forEach(chip=>chip.classList.toggle("selected",chip.dataset.category==="All"));
  renderEvents();
});

const form=document.getElementById("registrationForm");
const fields={fullName:document.getElementById("fullName"),email:document.getElementById("email"),phone:document.getElementById("phone"),event: eventSelect,consent:document.getElementById("consent")};
const errorIds={fullName:"nameError",email:"emailError",phone:"phoneError",event:"eventError",consent:"consentError"};
function validateForm(){
  const errors={};
  const name=fields.fullName.value.trim();
  const email=fields.email.value.trim();
  const phone=fields.phone.value.replace(/\D/g,"");
  if(name.length<2)errors.fullName="Please enter your name (at least 2 characters).";
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))errors.email="Enter a valid email address.";
  if(!/^[6-9]\d{9}$/.test(phone))errors.phone="Enter a valid 10-digit Indian mobile number.";
  if(!fields.event.value)errors.event="Please select an event.";
  if(!fields.consent.checked)errors.consent="Please agree before registering.";
  Object.keys(errorIds).forEach(key=>{
    document.getElementById(errorIds[key]).textContent=errors[key]||"";
    if(fields[key] && fields[key].setAttribute)fields[key].setAttribute("aria-invalid",String(Boolean(errors[key])));
  });
  return Object.keys(errors).length===0;
}
form.addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("successMessage").hidden=true;
  if(!validateForm()){
    const firstInvalid=form.querySelector('[aria-invalid="true"]')||fields.consent;
    firstInvalid.focus();return;
  }
  const chosen=events.find(event=>event.id===fields.event.value);
  const registration={id:Date.now(),name:fields.fullName.value.trim(),email:fields.email.value.trim(),phone:fields.phone.value.replace(/\D/g,""),eventId:chosen.id,eventTitle:chosen.title,registeredAt:new Date().toISOString()};
  try{
    const saved=JSON.parse(localStorage.getItem("kExploreRegistrations")||"[]");
    saved.push(registration);localStorage.setItem("kExploreRegistrations",JSON.stringify(saved));
  }catch(error){console.warn("Local storage unavailable:",error);}
  document.getElementById("successText").textContent=`${registration.name}, your registration for ${chosen.title} has been saved in this browser.`;
  document.getElementById("successMessage").hidden=false;
  form.reset();
  Object.values(errorIds).forEach(id=>document.getElementById(id).textContent="");
});
Object.entries(fields).forEach(([key,field])=>{
  if(key==="consent")field.addEventListener("change",()=>{document.getElementById(errorIds[key]).textContent="";});
  else field.addEventListener("input",()=>{document.getElementById(errorIds[key]).textContent="";field.removeAttribute("aria-invalid");});
});
document.getElementById("dismissSuccess").addEventListener("click",()=>document.getElementById("successMessage").hidden=true);

const themeToggle=document.getElementById("themeToggle");
const savedTheme=localStorage.getItem("kExploreTheme");
if(savedTheme==="light"){document.body.classList.add("light");document.getElementById("themeIcon").textContent="☀";}
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  const light=document.body.classList.contains("light");
  document.getElementById("themeIcon").textContent=light?"☀":"☾";
  localStorage.setItem("kExploreTheme",light?"light":"dark");
});
const menuToggle=document.getElementById("menuToggle"),navLinks=document.getElementById("navLinks");
menuToggle.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));
});
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{navLinks.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));

// Countdown targets the next event whose date is still in the future.
function updateCountdown(){
  const now=new Date();
  const next=events.filter(e=>new Date(e.date+"T00:00:00")>now).sort((a,b)=>a.date.localeCompare(b.date))[0];
  if(!next)return;
  const diff=Math.max(0,new Date(next.date+"T00:00:00")-now);
  const values={days:Math.floor(diff/86400000),hours:Math.floor(diff%86400000/3600000),minutes:Math.floor(diff%3600000/60000),seconds:Math.floor(diff%60000/1000)};
  Object.entries(values).forEach(([id,value])=>document.getElementById(id).textContent=String(value).padStart(2,"0"));
  document.querySelector(".countdown-copy h2").setAttribute("aria-label",`Countdown to ${next.title}`);
}
populateSelect();renderEvents();updateCountdown();setInterval(updateCountdown,1000);
document.getElementById("year").textContent=new Date().getFullYear();
