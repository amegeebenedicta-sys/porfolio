import "./style.css";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

const projects: Project[] = [
  {
    title: "Projet exemple",
    description:
      "Remplacez ce bloc par une vraie description : problème résolu, votre rôle, et le résultat.",
    tags: ["TypeScript", "API"],
    href: "#projets",
  },
  {
    title: "Second projet",
    description:
      "Ajoutez un lien vers la démo ou le dépôt GitHub. Les visiteurs aiment voir du code ou une capture.",
    tags: ["React", "Design"],
    href: "#projets",
  },
];

const skills = [
  "HTML / CSS",
  "JavaScript / TypeScript",
  "Accessibilité",
  "Git",
  "À compléter",
];

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderProjects(): string {
  return projects
    .map(
      (p) => `
    <a class="project-card" href="${escapeHtml(p.href)}" ${p.href.startsWith("http") ? 'rel="noopener noreferrer"' : ""}>
      <div class="project-tags">${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.description)}</p>
      <span class="project-link">Voir le projet →</span>
    </a>`
    )
    .join("");
}

function renderSkills(): string {
  return skills.map((s) => `<span class="skill-pill">${escapeHtml(s)}</span>`).join("");
}

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("#app introuvable");

app.innerHTML = `
  <header class="site-header">
    <a class="logo" href="#">Portfolio<span>.</span></a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Ouvrir le menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
    <nav class="nav" id="site-nav" aria-label="Principal">
      <a href="#a-propos">À propos</a>
      <a href="#projets">Projets</a>
      <a href="#competences">Compétences</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="contenu">
    <section class="hero" aria-labelledby="hero-title">
      <span class="hero-badge">Disponible / en veille — à adapter</span>
      <h1 id="hero-title">Bonjour, je suis <span style="color:var(--accent)">Votre nom</span></h1>
      <p class="hero-lead">
        Développeur·se / designer / autre — une phrase qui résume ce que vous faites et ce qui vous motive.
        Modifiez ce texte dans <code style="font-size:0.9em;opacity:0.85">src/main.ts</code>.
      </p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#contact">Me contacter</a>
        <a class="btn btn-ghost" href="#projets">Voir les projets</a>
      </div>
    </section>

    <section id="a-propos" aria-labelledby="about-title">
      <h2 class="section-title" id="about-title">À propos</h2>
      <p class="section-intro">
        Quelques paragraphes sur votre parcours, ce que vous cherchez (CDI, freelance, stage), et ce qui vous intéresse techniquement.
      </p>
      <div class="about-grid">
        <div class="about-card">
          <h3>Parcours</h3>
          <p>Formation, expériences clés, domaines où vous excellez.</p>
        </div>
        <div class="about-card">
          <h3>Ce que j’aime faire</h3>
          <p>Ex. produits soignés, perf web, data viz, open source — ce qui vous différencie.</p>
        </div>
      </div>
    </section>

    <section id="projets" aria-labelledby="projects-title">
      <h2 class="section-title" id="projects-title">Projets</h2>
      <p class="section-intro">Sélection de réalisations. Remplacez les exemples par vos vrais projets et liens.</p>
      <div class="projects">${renderProjects()}</div>
    </section>

    <section id="competences" aria-labelledby="skills-title">
      <h2 class="section-title" id="skills-title">Compétences</h2>
      <p class="section-intro">Stack, outils et sujets sur lesquels vous intervenez.</p>
      <div class="skills-list">${renderSkills()}</div>
    </section>

    <section id="contact" aria-labelledby="contact-title">
      <h2 class="section-title" id="contact-title">Contact</h2>
      <p class="section-intro">Liens vers LinkedIn, GitHub, e-mail, ou un formulaire.</p>
      <div class="contact-box">
        <p>Échangeons sur votre prochain projet ou une opportunité.</p>
        <div class="contact-links">
          <a class="btn btn-primary" href="mailto:vous@exemple.com">E-mail</a>
          <a class="btn btn-ghost" href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a class="btn btn-ghost" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>© ${new Date().getFullYear()} — Fait avec Vite. Personnalisez ce pied de page.</p>
  </footer>
`;

const nav = app.querySelector<HTMLElement>("#site-nav");
const navToggle = app.querySelector<HTMLButtonElement>(".nav-toggle");

function setNavOpen(open: boolean): void {
  nav?.classList.toggle("is-open", open);
  navToggle?.setAttribute("aria-expanded", open ? "true" : "false");
  navToggle?.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}

navToggle?.addEventListener("click", () => {
  const open = !nav?.classList.contains("is-open");
  setNavOpen(open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 767px)").matches) setNavOpen(false);
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setNavOpen(false);
});
