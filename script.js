const translations = {
  en: {
    homePageTitle: "Latam 3000",
    bookingPageTitle: "Latam 3000 | Booking",
    resourcesPageTitle: "Latam 3000 | Resources",
    navHome: "Home",
    navBooking: "Booking",
    navResources: "Resources",
    homeBannerAriaLabel: "Latam 3000 image banner",
    homeDetailsAriaLabel: "Project details",
    bookingSectionAriaLabel: "Booking information",
    resourcesSectionAriaLabel: "Booking resources",
    bannerOverlay: "live_signal // latin_rhythms // cyber_club_archive",
    homeEyebrow: "Home / Broadcast",
    homeIntro: "DJ project focused on Latin rhythms, early internet energy, and futuristic club sounds.",
    systemNoteLabel: "System Note",
    systemNoteText: "Underground club identity with low-fi web textures, sharp interfaces, and a direct signal from Latin American nightlife.",
    genresLabel: "Genres",
    genreLatincore: "latincore",
    genreLatinclub: "latinclub",
    genreNeoperreo: "neoperreo",
    genreNeocumbia: "neocumbia",
    genreDeconstructedClub: "deconstructed club",
    statusLabel: "Status",
    statusText: "Available for clubs, bars, independent parties, art spaces, and hybrid live/DJ formats.",
    visualArchiveEyebrow: "Visual Archive",
    visualArchiveTitle: "Vertical Feed",
    frame01Label: "Frame_01",
    frame02Label: "Frame_02",
    frame03Label: "Frame_03",
    frame04Label: "Frame_04",
    frame05Label: "Frame_05",
    bookingEyebrow: "Booking / Contact",
    bookingTitle: "Booking",
    bookingIntro: "For club nights, private events, cultural spaces, and independent parties.",
    ratesLabel: "Rates",
    rateDjSet: "DJ set",
    rateDjSetEquipment: "DJ set with my own Pioneer XDJ-RR equipment",
    linksLabel: "Links",
    contactEmail: "Email",
    contactInstagram: "Instagram",
    contactBandcamp: "Bandcamp",
    contactSoundCloud: "SoundCloud",
    contactYoutube: "YouTube",
    notAvailable: "not available",
    resourcesEyebrow: "Resources / Press Kit",
    resourcesTitle: "Resources",
    resourcesIntro: "Selected promo assets for flyers, booking decks, and event announcements.",
    resourceLogoLabel: "Logo",
    resourceVerticalLabel: "Vertical Photo",
    resourceHorizontalLabel: "Horizontal Photo",
    resourceOriginalLabel: "Original",
    resourceInvertedLabel: "Inverted",
    openFullSize: "Open full size"
  },
  es: {
    homePageTitle: "Latam 3000 | Inicio",
    bookingPageTitle: "Latam 3000 | Booking",
    resourcesPageTitle: "Latam 3000 | Recursos",
    navHome: "Inicio",
    navBooking: "Booking",
    navResources: "Recursos",
    homeBannerAriaLabel: "Banner de imagenes de Latam 3000",
    homeDetailsAriaLabel: "Detalles del proyecto",
    bookingSectionAriaLabel: "Informacion de booking",
    resourcesSectionAriaLabel: "Recursos de booking",
    bannerOverlay: "live_signal // ritmos_latinos // archivo_cyber_club",
    homeEyebrow: "Inicio / Transmision",
    homeIntro: "Proyecto de DJ enfocado en ritmos latinos, energia de internet temprana y sonidos futuristas de club.",
    systemNoteLabel: "Nota Del Sistema",
    systemNoteText: "Identidad underground de club con texturas low-fi web, interfaces filosas y una senal directa de la noche latinoamericana.",
    genresLabel: "Generos",
    genreLatincore: "latincore",
    genreLatinclub: "latinclub",
    genreNeoperreo: "neoperreo",
    genreNeocumbia: "neocumbia",
    genreDeconstructedClub: "deconstructed club",
    statusLabel: "Estado",
    statusText: "Disponible para clubs, bares, fiestas independientes, espacios de arte y formatos hibridos live/DJ.",
    visualArchiveEyebrow: "Archivo Visual",
    visualArchiveTitle: "Feed Vertical",
    frame01Label: "Frame_01",
    frame02Label: "Frame_02",
    frame03Label: "Frame_03",
    frame04Label: "Frame_04",
    frame05Label: "Frame_05",
    bookingEyebrow: "Booking / Contacto",
    bookingTitle: "Booking",
    bookingIntro: "Para noches de club, eventos privados, espacios culturales y fiestas independientes.",
    ratesLabel: "Tarifas",
    rateDjSet: "DJ set",
    rateDjSetEquipment: "DJ set con mi propio equipo Pioneer XDJ-RR",
    linksLabel: "Links",
    contactEmail: "Mail",
    contactInstagram: "Instagram",
    contactBandcamp: "Bandcamp",
    contactSoundCloud: "SoundCloud",
    contactYoutube: "YouTube",
    notAvailable: "no disponible",
    resourcesEyebrow: "Recursos / Press Kit",
    resourcesTitle: "Recursos",
    resourcesIntro: "Assets promocionales seleccionados para flyers, decks de booking y anuncios de eventos.",
    resourceLogoLabel: "Logo",
    resourceVerticalLabel: "Foto Vertical",
    resourceHorizontalLabel: "Foto Horizontal",
    resourceOriginalLabel: "Original",
    resourceInvertedLabel: "Invertido",
    openFullSize: "Abrir tamano completo"
  }
};

const storageKey = "latam3000-language";
const defaultLanguage = "en";

/** Every JPEG in Pictures/Horizontal (static site: list must match files on disk). */
const bannerHorizontalFilenames = [
  "DSC09372-Enhanced-NR_inverted.jpg",
  "DSC09372k-Enhanced-NR.jpg",
  "DSC09374_inverted.jpg",
  "DSC09374k.jpg",
  "DSC09375_inverted.jpg",
  "DSC09375k.jpg",
  "DSC09433_inverted.jpg",
  "DSC09433k.jpg",
  "DSC09477_inverted.jpg",
  "DSC09477k.jpg",
  "DSC09480k.jpg",
  "DSC09480k_inverted.jpg",
  "DSC09486_inverted.jpg",
  "DSC09486k.jpg",
  "DSC09491.jpg",
  "DSC09491k_inverted.jpg",
  "DSC09493.jpg",
  "DSC09493k_inverted.jpg"
];

const bannerSecondsPerSlide = 2;

/** Same cluster = same shot (original, inverted, k variant, etc.); cannot repeat within this many *following* slides on the loop. */
const bannerClusterCooldownTurns = 4;

function shuffleInPlace(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function bannerClusterId(filename) {
  const match = filename.match(/^DSC\d+/);
  return match ? match[0] : filename;
}

function bannerCircleRespectsClusterCooldown(filenames, cooldownTurns) {
  const clusters = filenames.map(bannerClusterId);
  const n = clusters.length;
  if (n <= 1) {
    return true;
  }
  for (let i = 0; i < n; i += 1) {
    const id = clusters[i];
    for (let k = 1; k <= cooldownTurns; k += 1) {
      if (clusters[(i + k) % n] === id) {
        return false;
      }
    }
  }
  return true;
}

function buildBannerOrderWithClusterCooldown(filenames, cooldownTurns) {
  const maxAttempts = 25000;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = shuffleInPlace([...filenames]);
    if (bannerCircleRespectsClusterCooldown(candidate, cooldownTurns)) {
      return candidate;
    }
  }
  return [...filenames];
}

function ensureBannerCycleKeyframesStyle(slideCount) {
  const pct = 100 / slideCount;
  const visibleEnd = Math.max(pct - 0.02, 0.01);
  const hiddenStart = Math.min(pct + 0.01, 99.99);
  const css = `@keyframes banner-cycle-dynamic {
  0%,
  ${visibleEnd}% {
    opacity: 1;
  }

  ${hiddenStart}%,
  100% {
    opacity: 0;
  }
}`;
  let styleEl = document.getElementById("banner-cycle-keyframes");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "banner-cycle-keyframes";
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
}

function initializeHomeBanner() {
  const frame = document.querySelector("[data-banner-frame]");
  if (!frame) {
    return;
  }

  const names = buildBannerOrderWithClusterCooldown(bannerHorizontalFilenames, bannerClusterCooldownTurns);
  const n = names.length;
  if (n === 0) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  frame.replaceChildren();

  if (reduceMotion) {
    const filename = names[0];
    const figure = document.createElement("figure");
    figure.className = "banner-slide is-static-hero";
    const img = document.createElement("img");
    img.src = `Pictures/Horizontal/${filename}`;
    img.alt = `Latam 3000 banner — ${filename}`;
    img.loading = "eager";
    img.fetchPriority = "high";
    figure.appendChild(img);
    frame.appendChild(figure);
    return;
  }

  ensureBannerCycleKeyframesStyle(n);
  const totalDuration = n * bannerSecondsPerSlide;

  names.forEach((filename, index) => {
    const figure = document.createElement("figure");
    figure.className = "banner-slide";
    figure.style.animationName = "banner-cycle-dynamic";
    figure.style.animationDuration = `${totalDuration}s`;
    figure.style.animationTimingFunction = "steps(1, end)";
    figure.style.animationIterationCount = "infinite";
    figure.style.animationDelay = `${index * bannerSecondsPerSlide}s`;

    const img = document.createElement("img");
    img.src = `Pictures/Horizontal/${filename}`;
    img.alt = `Latam 3000 banner — ${filename}`;
    img.loading = "eager";
    if (index === 0) {
      img.fetchPriority = "high";
    }

    figure.appendChild(img);
    frame.appendChild(figure);
  });
}

function datasetKeyToAttributeName(datasetKey) {
  const keyBody = datasetKey.slice(4);
  return keyBody.charAt(0).toLowerCase() + keyBody.slice(1).replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function getStoredLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem(storageKey);
    return translations[savedLanguage] ? savedLanguage : defaultLanguage;
  } catch {
    return defaultLanguage;
  }
}

function setStoredLanguage(language) {
  try {
    window.localStorage.setItem(storageKey, language);
  } catch {
    // Ignore storage failures and keep the current session language only.
  }
}

function applyTranslations(language) {
  const copy = translations[language] || translations[defaultLanguage];

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translationKey = element.dataset.i18n;
    if (copy[translationKey]) {
      element.textContent = copy[translationKey];
    }
  });

  document.querySelectorAll("*").forEach((element) => {
    Object.entries(element.dataset).forEach(([datasetKey, translationKey]) => {
      if (!datasetKey.startsWith("i18n") || datasetKey === "i18n") {
        return;
      }

      const translatedValue = copy[translationKey];
      if (!translatedValue) {
        return;
      }

      element.setAttribute(datasetKeyToAttributeName(datasetKey), translatedValue);
    });
  });

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    const isActive = button.dataset.langSwitch === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function initializeLanguageSwitch() {
  const initialLanguage = getStoredLanguage();
  applyTranslations(initialLanguage);

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = button.dataset.langSwitch;
      if (!translations[nextLanguage]) {
        return;
      }

      applyTranslations(nextLanguage);
      setStoredLanguage(nextLanguage);
    });
  });
}

initializeLanguageSwitch();
initializeHomeBanner();
