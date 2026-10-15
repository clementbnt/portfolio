/* ============================================================
   PORTFOLIO — CLÉMENT BONET
   main.js — Scripts principaux
   ============================================================ */

// Active les animations CSS seulement quand JS est chargé
// (évite le contenu invisible si JS est lent)
document.body.classList.add('js-ready');

// ============================================================
// 1. NAVIGATION — Scroll + burger menu
// ============================================================

const navbar     = document.getElementById('navbar');
const navBurger  = document.getElementById('navBurger');
const navLinks   = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTop');

// Effet de fond sur la navbar au défilement
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Bouton retour en haut
  if (scrollTopBtn) {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
});

// Menu burger (mobile)
if (navBurger && navLinks) {
  navBurger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navBurger.setAttribute('aria-expanded', isOpen.toString());

    // Animation des barres du burger
    const bars = navBurger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  });

  // Fermer le menu au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navBurger.setAttribute('aria-expanded', 'false');
      const bars = navBurger.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    });
  });
}

// Bouton retour en haut
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// 2. ANIMATIONS AU DÉFILEMENT (Intersection Observer)
//    — Les éléments avec .skill-card et .strength-item
//      apparaissent en fondu quand ils entrent dans la vue.
// ============================================================

const animatedElements = document.querySelectorAll('.skill-card, .strength-item');

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Délai progressif pour un effet cascade
      const delay = (entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      appearObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Applique des délais en cascade par groupe
animatedElements.forEach((el, index) => {
  el.dataset.delay = (index % 5) * 80; // décalage de 80ms par carte
  appearObserver.observe(el);
});

// ============================================================
// 3. FORMULAIRE DE CONTACT
//    — Validation simple côté client + affichage confirmation.
//    NOTE : Pour envoyer de vrais e-mails, connectez ce formulaire
//    à un service comme Formspree (https://formspree.io) ou EmailJS.
// ============================================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupération des champs
    const nom     = document.getElementById('nom');
    const email   = document.getElementById('email');
    const sujet   = document.getElementById('sujet');
    const message = document.getElementById('message');

    // Validation basique
    let valid = true;
    [nom, email, sujet, message].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#f87171';
        field.setAttribute('aria-invalid', 'true');
        valid = false;
      } else {
        field.style.borderColor = '';
        field.removeAttribute('aria-invalid');
      }
    });

    // Validation e-mail
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = '#f87171';
      valid = false;
    }

    if (!valid) return;

    // ---- Simulation d'envoi ----
    // Remplacez ce bloc par un vrai appel fetch() si vous utilisez Formspree :
    //
    // fetch('https://formspree.io/f/VOTREID', {
    //   method: 'POST',
    //   headers: { 'Accept': 'application/json' },
    //   body: new FormData(contactForm)
    // }).then(res => {
    //   if (res.ok) { showSuccess(); }
    // });

    // Pour l'instant, on affiche directement le message de succès
    showSuccess();
  });

  // Réinitialise la couleur de bordure en cours de saisie
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      field.removeAttribute('aria-invalid');
    });
  });
}

function showSuccess() {
  if (contactForm && formSuccess) {
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    formSuccess.focus();
    // Scroll jusqu'au message de succès
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ============================================================
// 4. ANNÉE DYNAMIQUE dans le footer (optionnel)
// ============================================================
// (Le footer utilise 2026 en dur, modifiez-le si nécessaire)
