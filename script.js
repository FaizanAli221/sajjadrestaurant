/* =========================================================
   Sajjad Restaurant — site data + backend behavior
   ---------------------------------------------------------
   Backend Integration:
   - Configurable API_BASE_URL (defaults to http://localhost:5000/api or window.API_BASE_URL)
   - Automatically fetches menu items from backend GET /api/menu
   - Posts table reservations to backend POST /api/reservations & WhatsApp
   ========================================================= */

const API_BASE_URL  = window.API_BASE_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? "http://localhost:5000/api" : "/api");
const PHONE_DISPLAY = "0333 2228111";
const PHONE_INTL    = "923332228111";          // used for tel: and wa.me
const FALLBACK_IMG  = "assets/placeholder.svg";

/* ---- Big page images ---- */
const IMAGES = {
  hero:  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=70",
  about: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=70"
};

/* ---- Food photos reused across menu + signature ---- */
const FOOD = {
  malaiBoti:    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=70",
  charghaBites: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=70",
  prawns:       "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=600&q=70",
  salad:        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=70",
  seekh:        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=70",
  beefSeekh:    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=70",
  tikka:        "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=600&q=70",
  muttonChops:  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=70",
  shashlik:     "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=70",
  mixPlatter:   "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=70",
  whiteKarahi:  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=70",
  makhniKarahi: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=70",
  muttonKarahi: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=70",
  reshmiHandi:  "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=70",
  daalMakhni:   "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=70",
  butterNaan:   "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=70",
  soup:         "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=70",
  chinese:      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=70",
  chilliDry:    "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=70",
  beefPepper:   "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=70",
  chowMein:     "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=70",
  biryani:      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=70",
  muttonPulao:  "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=70",
  eggRice:      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=70",
  garlicRice:   "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=70",
  seaBass:      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=70",
  friedFish:    "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=70",
  prawnKarahi:  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=70",
  chilliPrawns: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=600&q=70",
  brownie:      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=70",
  gulabJamun:   "https://images.unsplash.com/photo-1605197586791-72993883a48e?auto=format&fit=crop&w=600&q=70",
  kheer:        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=70",
  freshLime:    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=70",
  mintMargarita:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=70",
  kashmiriChai: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=70",
  softDrink:    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=70"
};

/* ---- Default Menu (prices in PKR) ---- */
let MENU = [
  // Starters
  { cat:"Starters", name:"Chicken Malai Boti", desc:"Cream-marinated tender chicken cubes off the charcoal grill.", price:"1,150", img:FOOD.malaiBoti },
  { cat:"Starters", name:"Chicken Chargha Bites", desc:"Spiced crispy fried chicken, lemon and chaat masala.", price:"990",  img:FOOD.charghaBites },
  { cat:"Starters", name:"Butterfly Prawns", desc:"Golden crumb-fried jumbo prawns served with garlic dip.", price:"1,650", img:FOOD.prawns },
  { cat:"Starters", name:"Russian Salad", desc:"Cold potato and fresh fruit salad in house cream dressing.", price:"550",  img:FOOD.salad },

  // BBQ
  { cat:"BBQ", name:"Chicken Seekh Kebab", desc:"Hand-minced spiced chicken kebabs cooked over charcoal coals.", price:"1,100", img:FOOD.seekh },
  { cat:"BBQ", name:"Beef Seekh Kebab", desc:"Slow-charred seasoned beef seekh kebabs with mint raita.", price:"1,250", img:FOOD.beefSeekh },
  { cat:"BBQ", name:"Chicken Tikka (Leg)", desc:"Classic red masala marinated chicken leg, grilled to order.", price:"690",  img:FOOD.tikka },
  { cat:"BBQ", name:"Mutton Chops", desc:"Milk-tenderised juicy chops finished over hot coals.", price:"2,150", img:FOOD.muttonChops },
  { cat:"BBQ", name:"Chicken Shashlik Sticks", desc:"Marinated chicken, capsicum and onion skewers.", price:"1,190", img:FOOD.shashlik },
  { cat:"BBQ", name:"Mixed Grill Platter", desc:"Seekh kebabs, tikka, malai boti and mutton chops platter.", price:"3,450", img:FOOD.mixPlatter },

  // Karahi & Handi
  { cat:"Karahi", name:"Chicken White Karahi", desc:"Silky yoghurt, black pepper and green chilli karahi gravy.", price:"2,250", img:FOOD.whiteKarahi },
  { cat:"Karahi", name:"Chicken Makhni Karahi", desc:"Rich tomato and butter gravy finished with fenugreek.", price:"2,350", img:FOOD.makhniKarahi },
  { cat:"Karahi", name:"Mutton Karahi", desc:"Fresh bone-in mutton, ginger and traditional whole spices.", price:"3,950", img:FOOD.muttonKarahi },
  { cat:"Karahi", name:"Reshmi Paneer Handi", desc:"Cottage cheese cubes in a silky cashew and cream handi.", price:"1,890", img:FOOD.reshmiHandi },
  { cat:"Karahi", name:"Daal Makhni", desc:"Black lentils simmered overnight with butter and fresh cream.", price:"950",  img:FOOD.daalMakhni },
  { cat:"Karahi", name:"Butter Naan", desc:"Freshly baked tandoori naan brushed with pure butter.", price:"150",  img:FOOD.butterNaan },

  // Chinese
  { cat:"Chinese", name:"Hot & Sour Soup", desc:"Classic chicken, egg drop, shredded veg and white pepper soup.", price:"650",  img:FOOD.soup },
  { cat:"Chinese", name:"Chicken Manchurian", desc:"Crispy chicken cubes in tangy sweet-chilli garlic sauce.", price:"1,450", img:FOOD.chinese },
  { cat:"Chinese", name:"Chicken Chilli Dry", desc:"Sliced chicken wok-tossed with capsicum, green chilli and onion.", price:"1,490", img:FOOD.chilliDry },
  { cat:"Chinese", name:"Beef Black Pepper", desc:"Tender sliced beef tossed in rich peppercorn sauce.", price:"1,750", img:FOOD.beefPepper },
  { cat:"Chinese", name:"Chicken Chow Mein", desc:"Stir-fried egg noodles with julienne chicken & garden veggies.", price:"1,290", img:FOOD.chowMein },

  // Rice
  { cat:"Rice", name:"Chicken Biryani", desc:"Aromatic layered Sindhi-style chicken biryani served with raita.", price:"890",  img:FOOD.biryani },
  { cat:"Rice", name:"Mutton Pulao", desc:"Flavorful yakhni rice with tender mutton, fried onion & kachumber.", price:"1,190", img:FOOD.muttonPulao },
  { cat:"Rice", name:"Egg Fried Rice", desc:"Wok-tossed basmati rice with fluffy egg and spring onions.", price:"690",  img:FOOD.eggRice },
  { cat:"Rice", name:"Garlic Rice", desc:"Steamed basmati rice tossed in toasted garlic butter.", price:"650",  img:FOOD.garlicRice },

  // Seafood
  { cat:"Seafood", name:"Grilled Sea Bass", desc:"Whole sea bass grilled with lemon-butter sauce.", price:"2,950", img:FOOD.seaBass },
  { cat:"Seafood", name:"Fried Fish Fillet", desc:"Golden batter-fried fish fillets served with tamarind dip.", price:"1,850", img:FOOD.friedFish },
  { cat:"Seafood", name:"Prawn Karahi", desc:"Fresh Arabian sea prawns in tomato and green chilli masala.", price:"2,650", img:FOOD.prawnKarahi },
  { cat:"Seafood", name:"Chilli Garlic Prawns", desc:"Wok-tossed jumbo prawns with chilli, garlic and fresh cilantro.", price:"2,450", img:FOOD.chilliPrawns },

  // Desserts
  { cat:"Desserts", name:"Sizzling Brownie", desc:"Warm chocolate brownie with vanilla ice cream and hot fudge.", price:"890", img:FOOD.brownie },
  { cat:"Desserts", name:"Gulab Jamun", desc:"Traditional warm gulab jamun in cardamom syrup (2 pcs).", price:"390", img:FOOD.gulabJamun },
  { cat:"Desserts", name:"Kheer", desc:"Slow-cooked rice pudding enriched with pistachios and saffron.", price:"450", img:FOOD.kheer },

  // Drinks
  { cat:"Drinks", name:"Fresh Lime Soda", desc:"Refreshing lime soda, sweet or salted as preferred.", price:"350", img:FOOD.freshLime },
  { cat:"Drinks", name:"Mint Margarita", desc:"Blended fresh mint leaves, lemon juice and crushed ice.", price:"450", img:FOOD.mintMargarita },
  { cat:"Drinks", name:"Kashmiri Chai", desc:"Traditional pink tea with crushed almonds and pistachios.", price:"420", img:FOOD.kashmiriChai },
  { cat:"Drinks", name:"Soft Drink", desc:"Chilled regular 250ml bottle.", price:"180", img:FOOD.softDrink }
];

/* ---- Signature dishes ---- */
const SIGNATURE = ["Mixed Grill Platter","Reshmi Paneer Handi","Prawn Karahi","Sizzling Brownie"];

/* ---- Gallery ---- */
const GALLERY = [
  { src:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80", alt:"Open-air oceanfront dining deck over the Arabian Sea at Do Darya" },
  { src:FOOD.mixPlatter,   alt:"Charcoal BBQ platter with seekh kebabs, tikka and malai boti" },
  { src:FOOD.whiteKarahi,  alt:"Freshly cooked Chicken White Karahi in traditional metal wok" },
  { src:FOOD.prawns,       alt:"Golden crumb-fried butterfly prawns with garlic dip" },
  { src:FOOD.biryani,      alt:"Plate of authentic Sindhi chicken biryani with mint raita" },
  { src:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80", alt:"Sunset oceanfront seating at Sajjad Restaurant DHA Phase 8" },
  { src:FOOD.brownie,      alt:"Hot sizzling chocolate brownie with vanilla ice cream" },
  { src:FOOD.chinese,      alt:"Wok-tossed Chicken Manchurian in sweet-chilli garlic sauce" },
  { src:FOOD.seaBass,      alt:"Whole grilled sea bass with lemon butter glaze" },
  { src:FOOD.butterNaan,   alt:"Freshly baked tandoori butter naan basket" },
  { src:FOOD.mintMargarita,alt:"Chilled fresh mint margarita and lime soda drinks" },
  { src:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80", alt:"Warm illuminated evening ambiance at Sajjad Restaurant" }
];

/* ========================= render helpers ========================= */
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const guard = 'onerror="this.onerror=null;this.src=\'' + FALLBACK_IMG + '\'"';

/* page images */
$$("[data-img]").forEach(img => {
  img.src = IMAGES[img.dataset.img] || FALLBACK_IMG;
  img.onerror = () => { img.onerror = null; img.src = FALLBACK_IMG; };
});

function renderSignatures() {
  const sigContainer = $("#signatureGrid");
  if(!sigContainer) return;
  sigContainer.innerHTML = SIGNATURE
    .map(n => MENU.find(m => m.name === n))
    .filter(Boolean)
    .map(d => `
      <article class="dish reveal">
        <div class="dish-img"><img src="${d.img || FALLBACK_IMG}" alt="${d.name}" loading="lazy" ${guard}></div>
        <div class="dish-body">
          <h3>${d.name}</h3>
          <p>${d.desc}</p>
          <span class="price">Rs ${d.price}</span>
        </div>
      </article>`).join("");
}

function renderFiltersAndMenu() {
  const filters = $("#filters");
  const grid = $("#menuGrid");
  if(!filters || !grid) return;

  const CATS = ["All", ...new Set(MENU.map(m => m.cat))];
  const activeCat = $(".filter.active", filters)?.dataset.cat || "All";

  filters.innerHTML = CATS.map((c,i) =>
    `<button class="filter${c === activeCat || (i===0 && !activeCat) ? " active":""}" type="button" data-cat="${c}">${c}</button>`).join("");

  renderMenuGrid(activeCat, $("#menuSearch")?.value || "");
}

function renderMenuGrid(cat, query = "") {
  const grid = $("#menuGrid");
  if(!grid) return;
  let items = cat === "All" ? MENU : MENU.filter(m => m.cat === cat);
  if(query.trim()) {
    const q = query.toLowerCase().trim();
    items = items.filter(m => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q));
  }
  if(items.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--muted); padding:30px 0;">No dishes found matching "${query}". Try another search!</p>`;
    return;
  }
  grid.innerHTML = items.map(m => `
    <article class="menu-item">
      <img src="${m.img || FALLBACK_IMG}" alt="${m.name}" loading="lazy" ${guard}>
      <div>
        <div class="mi-head"><h3>${m.name}</h3><span class="mi-price">Rs ${m.price}</span></div>
        <p>${m.desc}</p>
      </div>
    </article>`).join("");
}

// Initial render
renderSignatures();
renderFiltersAndMenu();

// Filter click delegation
const filtersEl = $("#filters");
if(filtersEl) {
  filtersEl.addEventListener("click", e => {
    const btn = e.target.closest(".filter");
    if(!btn) return;
    $$(".filter", filtersEl).forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenuGrid(btn.dataset.cat, $("#menuSearch")?.value || "");
  });
}

// Live Menu Search listener
const searchInput = $("#menuSearch");
if(searchInput) {
  searchInput.addEventListener("input", e => {
    const activeCat = $(".filter.active", filtersEl)?.dataset.cat || "All";
    renderMenuGrid(activeCat, e.target.value);
  });
}

/* gallery */
const galGrid = $("#galleryGrid");
if(galGrid) {
  galGrid.innerHTML = GALLERY.map((g,i) =>
    `<button type="button" data-i="${i}" aria-label="Enlarge: ${g.alt}">
       <img src="${g.src}" alt="${g.alt}" loading="lazy" ${guard}>
     </button>`).join("");

  galGrid.addEventListener("click", e => {
    const b = e.target.closest("button[data-i]");
    if(b) openLb(+b.dataset.i);
  });
}

/* ========================= Backend Fetching ========================= */
async function syncBackendMenu() {
  try {
    const res = await fetch(`${API_BASE_URL}/menu`, { method: "GET" });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        MENU = data;
        renderSignatures();
        renderFiltersAndMenu();
        console.log("Sajjad Restaurant: Menu synced from backend API.");
      }
    }
  } catch (err) {
    console.warn("Backend API not reachable at", API_BASE_URL, "- Using fallback menu data.");
  }
}
syncBackendMenu();

/* ========================= Lightbox ========================= */
const lb = $("#lightbox"), lbImg = $("#lbImg");
let lbIndex = 0;

function openLb(i){
  if(!lb || !lbImg) return;
  lbIndex = (i + GALLERY.length) % GALLERY.length;
  lbImg.src = GALLERY[lbIndex].src;
  lbImg.alt = GALLERY[lbIndex].alt;
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lbClose")?.focus();
}
function closeLb(){ if(lb) { lb.hidden = true; document.body.style.overflow = ""; } }

$("#lbClose")?.addEventListener("click", closeLb);
$("#lbPrev")?.addEventListener("click", () => openLb(lbIndex - 1));
$("#lbNext")?.addEventListener("click", () => openLb(lbIndex + 1));
lb?.addEventListener("click", e => { if(e.target === lb) closeLb(); });
document.addEventListener("keydown", e => {
  if(!lb || lb.hidden) return;
  if(e.key === "Escape") closeLb();
  if(e.key === "ArrowLeft") openLb(lbIndex - 1);
  if(e.key === "ArrowRight") openLb(lbIndex + 1);
});

/* ========================= Navigation ========================= */
const header = $("#header"), nav = $("#nav"), burger = $("#burger");

if(burger && nav) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.addEventListener("click", e => {
    if(e.target.tagName === "A"){
      nav.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}
const onScroll = () => header && header.classList.toggle("solid", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive:true });

/* ========================= Reservation form ========================= */
const form = $("#reserveForm"), status = $("#formStatus");

if(form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    if(!d.name.trim() || !d.phone.trim() || !d.date || !d.time){
      if(status){
        status.textContent = "Please provide your name, phone, date and time for table reservation.";
        status.classList.add("error");
      }
      return;
    }
    if(status) status.classList.remove("error");

    // Submit to backend API asynchronously if available
    try {
      fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d)
      }).catch(err => console.log("Backend reservation submission skipped:", err));
    } catch(err) {
      console.log("Backend unavailable:", err);
    }

    const text =
      `Table Reservation Request — Sajjad Restaurant\n` +
      `Name: ${d.name}\nPhone: ${d.phone}\nDate: ${d.date}\nTime: ${d.time}\nGuests: ${d.guests}` +
      (d.message?.trim() ? `\nSpecial Request: ${d.message}` : "");

    window.open(`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(text)}`, "_blank", "noopener");

    if(status) {
      status.textContent = `Reservation initiated! WhatsApp opened with your request details. You can also call ${PHONE_DISPLAY}.`;
    }
  });
}

/* ========================= Event Inquiry form ========================= */
const eventForm = $("#eventForm"), eventStatus = $("#eventStatus");

if(eventForm) {
  eventForm.addEventListener("submit", e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(eventForm));
    if(!d.name.trim() || !d.phone.trim() || !d.date){
      if(eventStatus){
        eventStatus.textContent = "Please provide your name, phone and event date.";
        eventStatus.classList.add("error");
      }
      return;
    }
    if(eventStatus) eventStatus.classList.remove("error");

    const text =
      `🎉 Event & Celebration Inquiry — Sajjad Restaurant\n` +
      `Name: ${d.name}\nPhone: ${d.phone}\nEvent Type: ${d.eventType}\nDate: ${d.date}\nTime: ${d.time}\nGuests: ${d.guests}` +
      (d.message?.trim() ? `\nDecor & Food Notes: ${d.message}` : "");

    window.open(`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(text)}`, "_blank", "noopener");

    if(eventStatus) {
      eventStatus.textContent = `Event inquiry sent! Opening WhatsApp to talk to our Event Manager.`;
    }
  });
}

const eDateEl = $("#eDate");
if(eDateEl) eDateEl.min = new Date().toISOString().split("T")[0];
const yearEl = $("#year");
if(yearEl) yearEl.textContent = new Date().getFullYear();

const rDateEl = $("#rDate");
if(rDateEl) rDateEl.min = new Date().toISOString().split("T")[0];

if("IntersectionObserver" in window){
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold:.15 });
  $$(".reveal").forEach(el => io.observe(el));
}

