/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO — CLÉMENT BONET
   Données, interactions, animations et logique du site.
   ─────────────────────────────────────────────────────────────
   ★ POUR PERSONNALISER LE CONTENU, MODIFIE LES OBJETS CI-DESSOUS :
     – PARCOURS_DATA   → parcours scolaire
     – SKILLS_DATA     → compétences
     – PROJECTS_DATA   → projets
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════
// 1. DONNÉES — PARCOURS SCOLAIRE
//    (modifier ici pour mettre à jour la timeline)
// ═══════════════════════════════════════════
const PARCOURS_DATA = [
    {
        years: "2024 – 2027",
        title: "BAC pro ciel",
        place: "Lycée Saint Aubin La Salle, Angers",
        desc: "Formation en bac pro cybersécurité, informatique et réseau électronique."
    },
    {
        years: "2020 – 2024",
        title: "Collège",
        place: "Collège St Joseph, Ligné",
        desc: "Début d'apprentissage."
    },
];
const PARCOURS_PRO = [
    {
        years: "2024",
        title: "Stage de 3ème",
        place: "Lycée Saint Aubin La Salle, Angers",
        desc: "Formation en bac pro cybersécurité, informatique et réseau électronique."
    },
    {
        years: "2020 – 2024",
        title: "Collège",
        place: "Collège St Joseph, Ligné",
        desc: "Début d'apprentissage."
    },
];

// ═══════════════════════════════════════════
// 2. DONNÉES — COMPÉTENCES
//    (modifier ici pour ajouter/retirer des compétences)
//    Toutes les compétences sont des badges textuels.
// ═══════════════════════════════════════════
const SKILLS_DATA = [
    {
        category: "Systèmes & Réseaux",
        icon: "🖥️",
        items: [
            "Windows Server",
            "Linux (Debian, Ubuntu)",
            "Active Directory",
            "DNS / DHCP",
            "TCP/IP",
            "VLAN / Routage",
            "Pare-feu (pfSense)",
        ]
    },
    {
        category: "Supervision & Monitoring",
        icon: "📊",
        items: [
            "Zabbix",
            "GLPI",
            "Grafana",
            "SNMP",
            "Nagios"
        ]
    },
    {
        category: "Outils & Environnement",
        icon: "🛠️",
        items: [
            "VS Code",
            "VirtualBox / VMware",
            "Apache / Nginx"
        ]
    },
    {
        category: "Langages & Scripting en apprentissage",
        icon: "⌨️",
        items: [
            "Python",
            "SQL",
            "HTML / CSS",
            "JavaScript",
            "PowerShell"
        ]
    },
    {
        category: "Soft Skills",
        icon: "💡",
        items: [
            "Curiosité technique",
            "Travail en équipe",
            "Autonomie",
            "Résolution de problèmes",
            "Communication",
            "Rigueur"
        ]
    }
];

// ═══════════════════════════════════════════
// 3. DONNÉES — PROJETS
//    (modifier ici pour ajouter/changer les projets)
//    ★ image : chemin vers une image, ou null pour un placeholder coloré
//    ★ code / demo : lien ou null si non applicable
// ═══════════════════════════════════════════
const PROJECTS_DATA = [
    {
        title: "Supervision réseau avec Zabbix",
        desc: "Mise en place d'une solution de supervision complète avec Zabbix : surveillance des serveurs, équipements réseau et services. Configuration des alertes, tableaux de bord et rapports.",
        techs: ["Zabbix", "Linux", "SNMP", "Réseau"],
        image: "Zabbix Dashboard.png",
        code: null,
        demo: null
    }
];

// ═══════════════════════════════════════════
// 4. GÉNÉRATION DU DOM
// ═══════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
    renderTimeline();
    renderSkills();
    renderProjects();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    setFooterYear();
});

// ─── Timeline ───
function renderTimeline() {
    const container = document.getElementById("timeline");
    container.innerHTML = PARCOURS_DATA.map((item, i) => `
        <div class="timeline-item anim-fade-up" style="transition-delay: ${i * .1}s">
            <div class="timeline-dot"></div>
            <span class="timeline-years">${item.years}</span>
            <h3 class="timeline-title">${item.title}</h3>
            <p class="timeline-place">${item.place}</p>
            <p class="timeline-desc">${item.desc}</p>
        </div>
    `).join("");
}
function renderTimeline() {
    const container = document.getElementById("timeline");
    container.innerHTML = PARCOURS_PRO.map((item, i) => `
        <div class="timeline-item anim-fade-up" style="transition-delay: ${i * .1}s">
            <div class="timeline-dot"></div>
            <span class="timeline-years">${item.years}</span>
            <h3 class="timeline-title">${item.title}</h3>
            <p class="timeline-place">${item.place}</p>
            <p class="timeline-desc">${item.desc}</p>
        </div>
    `).join("");
}

// ─── Compétences (badges textuels uniquement) ───
function renderSkills() {
    const container = document.getElementById("skills-grid");
    container.innerHTML = SKILLS_DATA.map((cat, ci) => `
        <div class="skill-category anim-fade-up" style="transition-delay: ${ci * .1}s">
            <h3 class="skill-category-title">
                <span class="skill-category-icon">${cat.icon}</span> ${cat.category}
            </h3>
            <div class="skill-badges">
                ${cat.items.map(s => `<span class="skill-badge">${s}</span>`).join("")}
            </div>
        </div>
    `).join("");
}

// ─── Projets ───
function renderProjects() {
    const filtersContainer = document.getElementById("project-filters");

    // Afficher les filtres seulement s'il y a plus d'un projet
    if (PROJECTS_DATA.length > 1) {
        const allTechs = [...new Set(PROJECTS_DATA.flatMap(p => p.techs))].sort();
        filtersContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">Tous</button>
            ${allTechs.map(t => `<button class="filter-btn" data-filter="${t}">${t}</button>`).join("")}
        `;
        filtersContainer.addEventListener("click", (e) => {
            if (!e.target.classList.contains("filter-btn")) return;
            filtersContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            const filter = e.target.dataset.filter;
            grid.querySelectorAll(".project-card").forEach(card => {
                const techs = JSON.parse(card.dataset.techs);
                card.classList.toggle("hidden", filter !== "all" && !techs.includes(filter));
            });
        });
    } else {
        filtersContainer.style.display = "none";
    }

    // Grille
    const grid = document.getElementById("projects-grid");
    const gradientClasses = [
        "img-gradient-1", "img-gradient-2", "img-gradient-3",
        "img-gradient-4", "img-gradient-5", "img-gradient-6"
    ];

    grid.innerHTML = PROJECTS_DATA.map((p, i) => {
        const imagePart = p.image
            ? `<img src="${p.image}" alt="${p.title}" class="project-image">`
            : `<div class="project-image-placeholder ${gradientClasses[i % gradientClasses.length]}">
                   <span>&lt;${p.techs[0]} /&gt;</span>
               </div>`;

        // Construire les liens seulement s'ils existent
        const codeLink = p.code ? `<a href="${p.code}" target="_blank" rel="noopener" class="btn btn--small btn--outline">Voir le code</a>` : "";
        const demoLink = p.demo && p.demo !== "#" ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn--small btn--primary">Démo</a>` : "";
        const linksHtml = (codeLink || demoLink) ? `<div class="project-links">${codeLink}${demoLink}</div>` : "";

        return `
            <div class="project-card anim-fade-up" data-techs='${JSON.stringify(p.techs)}' style="transition-delay: ${i * .08}s">
                ${imagePart}
                <div class="project-body">
                    <h3 class="project-title">${p.title}</h3>
                    <p class="project-desc">${p.desc}</p>
                    <div class="project-techs">
                        ${p.techs.map(t => `<span class="project-tech">${t}</span>`).join("")}
                    </div>
                    ${linksHtml}
                </div>
            </div>
        `;
    }).join("");
}

// ═══════════════════════════════════════════
// 5. NAVIGATION
// ═══════════════════════════════════════════
function initNavigation() {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");
    const links = document.querySelectorAll(".nav-link");

    // Scroll → ajouter classe "scrolled"
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Menu mobile
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("open");
        menu.classList.toggle("open");
    });

    // Fermer le menu après clic sur un lien
    links.forEach(link => {
        link.addEventListener("click", () => {
            toggle.classList.remove("open");
            menu.classList.remove("open");
        });
    });

    // Surlignage lien actif au scroll
    const sections = document.querySelectorAll("section[id]");
    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove("active"));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add("active");
            }
        });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(s => observerNav.observe(s));
}

// ═══════════════════════════════════════════
// 6. ANIMATIONS AU SCROLL (Intersection Observer)
// ═══════════════════════════════════════════
function initScrollAnimations() {
    const elements = document.querySelectorAll(".anim-fade-up");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                // Animer les barres de compétences quand elles sont visibles
                entry.target.querySelectorAll(".skill-fill").forEach(bar => {
                    bar.style.width = bar.dataset.percent + "%";
                });
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════
// 7. FORMULAIRE DE CONTACT (validation JS)
// ═══════════════════════════════════════════
function initContactForm() {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const msgInput = document.getElementById("form-message");
    const success = document.getElementById("form-success");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;

        // Nom
        if (nameInput.value.trim().length < 2) {
            showError("error-name", "Veuillez entrer votre nom.");
            nameInput.classList.add("error");
            valid = false;
        } else {
            clearError("error-name");
            nameInput.classList.remove("error");
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError("error-email", "Adresse email invalide.");
            emailInput.classList.add("error");
            valid = false;
        } else {
            clearError("error-email");
            emailInput.classList.remove("error");
        }

        // Message
        if (msgInput.value.trim().length < 10) {
            showError("error-message", "Le message doit faire au moins 10 caractères.");
            msgInput.classList.add("error");
            valid = false;
        } else {
            clearError("error-message");
            msgInput.classList.remove("error");
        }

        if (valid) {
            success.hidden = false;
            form.reset();
            setTimeout(() => { success.hidden = true; }, 4000);
        }
    });

    function showError(id, msg) { document.getElementById(id).textContent = msg; }
    function clearError(id) { document.getElementById(id).textContent = ""; }
}

// ═══════════════════════════════════════════
// 8. UTILITAIRES
// ═══════════════════════════════════════════
function setFooterYear() {
    document.getElementById("footer-year").textContent = new Date().getFullYear();
}
