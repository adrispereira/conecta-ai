/* =====================================================================
   CONECTA AI — Aplicação (roteamento e telas)
   ===================================================================== */

const root = document.getElementById("app");
let currentUser = null;

// ---------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------
function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
function toast(msg) {
  const t = el(`<div class="toast">${msg}</div>`);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}
function esc(s){ return (s||"").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function navigate(hash){ location.hash = hash; }
function roleLabel(r){ return {administrador:"Administrador",professor:"Professor",aluno:"Aluno"}[r] || "Aluno"; }

// ---------------------------------------------------------------
// Layout fixo: topbar
// ---------------------------------------------------------------
function renderTopbar() {
  const bar = document.getElementById("topbar-slot");
  bar.innerHTML = `
    <div class="ticker-bar">
      <div class="ticker-track">
        <span>✨ Em breve — Robótica com Propósito</span>
        <span><img src="assets/logo.jpg" alt="" class="ticker-logo"> Turmas de <b>Arduino</b> e <b>LEGO</b> — 10 aulas cada</span>
        <span>✨ Novo projeto em breve: <b>Esporte para Todos</b></span>
        <span>✨ Em breve — Robótica com Propósito</span>
        <span><img src="assets/logo.jpg" alt="" class="ticker-logo"> Turmas de <b>Arduino</b> e <b>LEGO</b> — 10 aulas cada</span>
        <span>✨ Novo projeto em breve: <b>Esporte para Todos</b></span>
      </div>
    </div>
    <div class="navbar-main">
      <nav class="nav-left" id="mainNav">
        <div class="nav-dropdown">
          <span class="dd-trigger">Projetos <span class="car">▾</span></span>
          <div class="dropdown-menu">
            <div class="dropdown-links">
              <a href="#/projetos">Todos os projetos</a>
              <a href="#/robotica">Robótica com Propósito</a>
              <a href="#/curso/robotica-arduino">Robótica com Arduino</a>
              <a href="#/curso/robotica-lego">Robótica com LEGO</a>
              <a href="#/projetos" class="soon">Esporte para Todos (em breve)</a>
            </div>
            <div class="dropdown-cards">
              <a href="#/robotica"><span class="dc-ico">🤖</span><span class="dc-tag">Em breve</span><span class="dc-title">Robótica com Propósito</span></a>
              <a href="#/projetos"><span class="dc-ico">⚽</span><span class="dc-tag">Em breve</span><span class="dc-title">Esporte para Todos</span></a>
            </div>
          </div>
        </div>
        <a href="#/historia">Nossa História</a>
        <a href="#/sobre">Sobre nós</a>
      </nav>
      <a href="#/robotica" class="btn-cta-pill">Solicitar Matrícula</a>
      <a href="#/" class="brand-center">
        <img src="assets/logo.jpg" alt="Logo Conecta AI">
        <span class="word">CONECTA<b>AI</b></span>
      </a>
      <div class="nav-right">
        <form class="search-box" id="siteSearchForm">
          <input type="text" placeholder="Pesquisar" id="siteSearchInput">
          <button type="submit" aria-label="Pesquisar">🔍</button>
        </form>
        <div id="accessSlot"></div>
      </div>
    </div>
  `;
  renderAccessSlot();
  highlightNav();
  document.getElementById("siteSearchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("siteSearchInput").value.trim().toLowerCase();
    if (!q) return;
    if (q.includes("lego")) navigate("#/curso/robotica-lego");
    else if (q.includes("arduino")) navigate("#/curso/robotica-arduino");
    else if (q.includes("esporte")) navigate("#/projetos");
    else if (q.includes("hist")) navigate("#/historia");
    else navigate("#/robotica");
  });
}

function highlightNav(){
  let rawPath = location.hash.split("/")[1] || "";
  let path = rawPath;
  if (path === "robotica" || path === "curso" || path === "aula" || path === "projetos") path = "projetos";
  document.querySelectorAll("#mainNav > a").forEach(a=>{
    const target = a.getAttribute("href").replace("#/","");
    a.classList.toggle("active", target === path);
  });
  const brand = document.querySelector(".brand-center");
  if (brand) brand.style.display = rawPath === "" ? "none" : "flex";
}

function renderAccessSlot() {
  const slot = document.getElementById("accessSlot");
  slot.innerHTML = "";
  if (currentUser) {
    const chip = el(`
      <div class="access-wrap">
        <button class="user-chip" id="userChipBtn">
          <img src="${currentUser.avatar_url || 'https://api.dicebear.com/7.x/initials/svg?seed='+encodeURIComponent(currentUser.nome_completo||currentUser.email)}" alt="">
          <span>${esc((currentUser.nome_completo||currentUser.email||"").split(" ")[0])}</span>
          <span class="role-tag">${roleLabel(currentUser.role)}</span>
        </button>
        <div class="access-menu" id="userMenu" hidden>
          <p>Minha conta</p>
          <button class="access-option" data-go="#/painel"><span class="ico">📊</span> Meu painel</button>
          <button class="access-option" data-go="#/projetos"><span class="ico">🤖</span> Nossos Projetos</button>
          <button class="access-option" id="logoutBtn"><span class="ico">🚪</span> Sair</button>
        </div>
      </div>
    `);
    slot.appendChild(chip);
    document.getElementById("userChipBtn").onclick = () => document.getElementById("userMenu").toggleAttribute("hidden");
    chip.querySelectorAll("[data-go]").forEach(b => b.onclick = () => navigate(b.dataset.go));
    document.getElementById("logoutBtn").onclick = async () => { await DB.signOut(); currentUser = null; navigate("#/"); location.reload(); };
  } else {
    const wrap = el(`
      <div class="access-wrap">
        <button class="btn-access" id="accessBtn"><span class="ava">👤</span></button>
        <div class="access-menu" id="accessMenu" hidden>
          <p>Entrar como</p>
          <button class="access-option" data-role="administrador"><span class="ico">🛡️</span> Administrador</button>
          <button class="access-option" data-role="professor"><span class="ico">🎓</span> Professor</button>
          <button class="access-option" data-role="aluno"><span class="ico">🧑‍💻</span> Aluno</button>
        </div>
      </div>
    `);
    slot.appendChild(wrap);
    document.getElementById("accessBtn").onclick = () => document.getElementById("accessMenu").toggleAttribute("hidden");
    wrap.querySelectorAll("[data-role]").forEach(b => b.onclick = () => startLogin(b.dataset.role));
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".access-wrap")) {
    document.getElementById("accessMenu")?.setAttribute("hidden", "");
    document.getElementById("userMenu")?.setAttribute("hidden", "");
  }
});

async function startLogin(role) {
  const profile = await DB.signInWithGoogle(role);
  if (!profile) return;
  currentUser = profile;
  renderAccessSlot();
  if (!profile.perfil_completo) {
    navigate("#/primeiro-acesso");
  } else {
    toast(`Bem-vindo(a), ${profile.nome_completo || profile.email}!`);
    navigate("#/painel");
  }
}

// ---------------------------------------------------------------
// TELA: Home
// ---------------------------------------------------------------
function viewHome() {
  return `
    <section class="hero">
      <div class="hero-banner-wrap">
        <img src="assets/banners/banner-home-web.jpg" alt="Equipe Conecta AI — estamos trabalhando nas nuvens com Cristo" class="hero-banner">
      </div>
      <div class="container">
        <span class="eyebrow">⚡ "Mas recebereis poder ao descer sobre vós o Espírito Santo, e ser-me-eis testemunhas, tanto em Jerusalém como em toda a Judeia e Samaria, e até aos confins da terra." — Atos 1:8</span>
        <h1>Conectando jovens a Cristo<br>e ao mundo digital</h1>
        <p class="lead">O Conecta AI é uma ação missionária que une evangelização, discipulado e capacitação
        digital para alcançar adolescentes e jovens em situação de vulnerabilidade social e espiritual —
        usando a Bíblia, o computador, a internet e a inteligência artificial.</p>
        <div class="flow">
          <span>Alcançar</span><span class="arrow">→</span><span>Conquistar</span><span class="arrow">→</span>
          <span>Discipular</span><span class="arrow">→</span><span>Treinar</span><span class="arrow">→</span><span>Enviar</span>
        </div>
        <div class="cta-row">
          <a href="#/projetos" class="btn btn-primary">Conheça nossos projetos</a>
          <a href="#/historia" class="btn btn-ghost">Nossa história</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="tag">Missão</span>
          <h2>Alcançar, conquistar, discipular e treinar jovens para Cristo</h2>
          <p>Usando a Bíblia, o computador, a internet e a inteligência artificial como ferramentas de
          evangelização, formação e envio missionário.</p>
        </div>
        <div class="grid grid-3">
          <div class="card"><div class="icon-tile">📖</div><h3>Bíblia</h3><p>Fundamento da fé e do discipulado em cada encontro.</p></div>
          <div class="card"><div class="icon-tile">💻</div><h3>Computador</h3><p>Instrumento de capacitação e inclusão digital dos jovens.</p></div>
          <div class="card"><div class="icon-tile">🌐</div><h3>Internet</h3><p>Meio de comunicação, ensino e alcance missionário.</p></div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="story-section">
          <div class="story-text">
            <span class="tag">Nossa trajetória</span>
            <h2 style="margin-top:8px">Tecnologia a serviço do Evangelho, há muito tempo</h2>
            <p>Antes do Conecta AI, já usávamos computadores, telessalas e até uma rádio comunitária para
            aproximar jovens da Palavra de Deus e do conhecimento. O Conecta AI nasce dessa experiência,
            organizada agora em projetos com propósito claro.</p>
            <a href="#/historia" class="btn btn-ghost">Conheça nossa história →</a>
          </div>
          <div class="photo-mosaic">
            <figure class="tall"><img src="assets/historia/historia-02-laboratorio-web.jpg" alt="Aula de informática em telecentro comunitário"><figcaption>Aula de informática comunitária</figcaption></figure>
            <figure><img src="assets/historia/historia-01-teleaula-web.jpg" alt="Tele-aula por videochamada"><figcaption>Tele-aula à distância</figcaption></figure>
            <figure><img src="assets/historia/historia-04-radio-web.jpg" alt="Locução em rádio comunitária com a Bíblia aberta"><figcaption>Rádio comunitária</figcaption></figure>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head">
          <span class="tag">O que fazemos</span>
          <h2>Nossos projetos</h2>
          <p>Cada projeto é uma porta de entrada diferente para alcançar jovens e crianças da comunidade.</p>
        </div>
        <div class="grid grid-2">
          <div class="card project-card">
            <span class="status-tag soon">Em breve</span>
            <div class="project-cover"><img src="assets/banners/robotica-badge-web.jpg" alt="Banner Robótica AI Conecta"></div>
            <h3>Robótica com Propósito</h3>
            <p>Duas turmas — Arduino e LEGO — com 10 aulas cada, sempre começando com um pequeno estudo da
            Palavra antes da parte técnica.</p>
            <a href="#/robotica" class="btn btn-primary" style="width:100%;text-align:center;display:block;margin-top:10px">Ver o projeto →</a>
          </div>
          <div class="card project-card soon">
            <span class="status-tag soon">Em breve</span>
            <div class="project-cover"><img src="assets/banners/esporte-badge-web.jpg" alt="Banner Esportes AI Conecta"></div>
            <h3>Esporte para Todos</h3>
            <p>Um novo projeto do Conecta AI, usando o esporte como ponte de relacionamento, disciplina e
            testemunho cristão entre crianças e adolescentes da comunidade.</p>
            <a class="btn btn-ghost" style="width:100%;text-align:center;display:block;margin-top:10px;opacity:.6;cursor:not-allowed">Em preparação</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ---------------------------------------------------------------
// TELA: Nossa História
// ---------------------------------------------------------------
function viewHistoria() {
  return `
    <section class="section" style="padding-top:70px">
      <div class="container" style="max-width:840px">
        <span class="tag">Nossa história</span>
        <h1>De onde viemos até o Conecta AI</h1>
        <p class="lead" style="text-align:left;max-width:100%">Muito antes do nome "Conecta AI" existir, a mesma
        convicção já guiava o trabalho: usar as ferramentas do nosso tempo para aproximar jovens da Palavra de
        Deus. Ao longo dos anos, essa missão passou por telecentros comunitários, telessalas por videochamada
        e até uma rádio — cada uma delas uma forma diferente de "ir e fazer discípulos" com o que tínhamos em
        mãos.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container" style="max-width:840px">
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-dot">💻</div>
            <div>
              <h4>Telecentros e aulas de informática</h4>
              <p>Turmas de crianças e adolescentes se reuniam em salas de informática comunitárias para
              aprender a usar o computador — muitas vezes o primeiro contato delas com a tecnologia — sempre
              com acompanhamento próximo de um educador.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot">📡</div>
            <div>
              <h4>Tele-aulas a distância</h4>
              <p>Videochamadas conectaram cidades diferentes para levar treinamento e ensino a quem estava
              longe, mostrando que a distância física não precisa ser barreira para o discipulado e o
              aprendizado.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot">📻</div>
            <div>
              <h4>Rádio comunitária</h4>
              <p>Com a Bíblia aberta ao lado do microfone, a rádio se tornou mais um canal para levar
              mensagens de fé, estudo da Palavra e boa companhia a quem estava do outro lado do rádio.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot">✨</div>
            <div>
              <h4>Hoje: o Conecta AI</h4>
              <p>Toda essa caminhada amadureceu na proposta atual do Conecta AI: unir Bíblia, computador,
              internet e inteligência artificial em projetos organizados — o primeiro deles, a Robótica com
              Propósito — para alcançar, conquistar, discipular, treinar e enviar jovens para Cristo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head">
          <span class="tag">Registros</span>
          <h2>Alguns momentos dessa caminhada</h2>
        </div>
        <div class="grid grid-3">
          <div class="card" style="padding:0;overflow:hidden">
            <img src="assets/historia/historia-02-laboratorio-web.jpg" alt="Sala de informática com alunos e educador" style="border-radius:0">
            <div style="padding:18px"><strong>Sala de informática comunitária</strong><p style="margin:6px 0 0">Turma acompanhada por um educador durante a aula.</p></div>
          </div>
          <div class="card" style="padding:0;overflow:hidden">
            <img src="assets/historia/historia-03-turma-web.jpg" alt="Grupo de adolescentes reunidos com computador e TV" style="border-radius:0">
            <div style="padding:18px"><strong>Turma reunida</strong><p style="margin:6px 0 0">Momento de estudo em grupo com apoio de tecnologia.</p></div>
          </div>
          <div class="card" style="padding:0;overflow:hidden">
            <img src="assets/historia/historia-04-radio-web.jpg" alt="Jovem locutora com a Bíblia aberta ao lado do microfone" style="border-radius:0">
            <div style="padding:18px"><strong>Estúdio de rádio</strong><p style="margin:6px 0 0">A Palavra também alcançando ouvidos pelas ondas do rádio.</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="card" style="display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between">
          <div>
            <h2 style="margin-top:0">Quer conhecer nossos projetos atuais?</h2>
            <p style="max-width:480px">A Robótica com Propósito é o projeto em andamento hoje — e outros, como
            o Esporte para Todos, já estão a caminho.</p>
          </div>
          <a href="#/projetos" class="btn btn-primary">Ver projetos →</a>
        </div>
      </div>
    </section>
  `;
}

// ---------------------------------------------------------------
// TELA: Projetos (hub)
// ---------------------------------------------------------------
function viewProjetos() {
  return `
    <section class="section" style="padding-top:70px">
      <div class="container">
        <div class="section-head">
          <span class="tag">O que fazemos</span>
          <h1>Nossos Projetos</h1>
          <p>A Robótica com Propósito é uma das portas de entrada do Conecta AI — usamos a tecnologia para
          criar relacionamento e, a partir dele, apresentar o Evangelho. Outros projetos estão a caminho,
          sempre com o mesmo propósito: alcançar, conquistar, discipular, treinar e enviar jovens para Cristo.</p>
        </div>
        <div class="grid grid-2">
          <div class="card project-card">
            <span class="status-tag soon">Em breve</span>
            <div class="project-cover"><img src="assets/banners/robotica-badge-web.jpg" alt="Banner Robótica AI Conecta"></div>
            <h3>Robótica com Propósito</h3>
            <p>Duas turmas — Robótica com Arduino e Robótica com LEGO — com 10 aulas cada. Toda aula começa
            com um pequeno estudo bíblico antes da parte técnica de eletrônica, programação ou mecânica.</p>
            <div class="meta-row">
              <span class="meta-pill">👥 A partir de 6 anos</span>
              <span class="meta-pill">📖 Estudo bíblico em toda aula</span>
            </div>
            <a href="#/robotica" class="btn btn-primary" style="width:100%;text-align:center;display:block;margin-top:10px">Ver o projeto →</a>
          </div>
          <div class="card project-card soon">
            <span class="status-tag soon">Em breve</span>
            <div class="project-cover"><img src="assets/banners/esporte-badge-web.jpg" alt="Banner Esportes AI Conecta"></div>
            <h3>Esporte para Todos</h3>
            <p>Novo projeto do Conecta AI: usar o esporte como ponte de relacionamento, disciplina e
            testemunho cristão entre crianças e adolescentes da comunidade. Detalhes em breve.</p>
            <div class="meta-row"><span class="meta-pill">🚧 Em preparação</span></div>
            <a class="btn btn-ghost" style="width:100%;text-align:center;display:block;margin-top:10px;opacity:.6;cursor:not-allowed">Em preparação</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function viewSobre() {
  return `
    <section class="section" style="padding-top:70px">
      <div class="container" style="max-width:800px">
        <span class="tag">Sobre</span>
        <h1>O Projeto Conecta AI</h1>
        <p>O Projeto Conecta AI é uma ação missionária voltada para alcançar jovens em situação de
        vulnerabilidade social e espiritual, especialmente aqueles expostos às influências do mundo,
        próximos ao tráfico de drogas e sem uma direção segura para o futuro.</p>
        <p>A proposta é criar uma base presencial simples, acolhedora e segura, em um bairro com
        aproximadamente 3 mil pessoas, onde adolescentes e jovens possam ser recebidos, ouvidos,
        evangelizados, discipulados e capacitados para o uso responsável da tecnologia.</p>
        <div class="verse-box" style="font-size:1rem;margin:26px 0">
          "Mas recebereis poder ao descer sobre vós o Espírito Santo, e ser-me-eis testemunhas, tanto em
          Jerusalém como em toda a Judeia e Samaria, e até aos confins da terra." — Atos 1:8
        </div>
        <h3>Estratégia</h3>
        <p>A estratégia começa com o contato presencial, criando um ambiente de confiança, amizade e
        acolhimento — as aulas de Robótica com Propósito são uma das portas de entrada. Depois da base
        presencial consolidada, o projeto avança para o ambiente virtual com discipulado, mentoria e
        evangelização digital.</p>
        <h3>Fluxo de ação</h3>
        <div class="flow" style="justify-content:flex-start">
          <span>Alcançar</span><span class="arrow">→</span><span>Conquistar</span><span class="arrow">→</span>
          <span>Discipular</span><span class="arrow">→</span><span>Treinar</span><span class="arrow">→</span><span>Enviar</span>
        </div>
      </div>
    </section>
  `;
}

// ---------------------------------------------------------------
// TELA: Robótica com Propósito (lista de cursos)
// ---------------------------------------------------------------
async function viewRobotica() {
  const courses = await DB.getCourses();
  const cards = courses.map(c => `
    <div class="card course-card">
      <span class="badge">10 aulas</span>
      <div class="course-cover">${c.icone || "🤖"}</div>
      <h3>${esc(c.titulo)}</h3>
      <p>${esc(c.subtitulo)}</p>
      <div class="meta-row">
        <span class="meta-pill">👥 ${esc(c.faixa_etaria)}</span>
        <span class="meta-pill">⏱️ ${esc(c.carga_horaria)}</span>
      </div>
      <div class="verse-box">Versículo-base: ${esc(c.versiculo_base)}</div>
      <a class="btn btn-primary" style="width:100%;text-align:center;display:block;margin-top:8px" href="#/curso/${c.slug}">Ver curso</a>
    </div>
  `).join("");

  return `
    <section class="section" style="padding-top:70px">
      <div class="container">
        <a href="#/projetos" style="color:var(--cyan-300);font-size:.85rem">← Voltar para Projetos</a>
        <div class="section-head" style="margin-top:18px">
          <img src="assets/banners/robotica-badge-web.jpg" alt="Banner Robótica AI Conecta" class="cover-banner">
          <span class="tag">Um dos projetos do Conecta AI</span>
          <h1>Robótica com Propósito</h1>
          <p>Por meio de aulas práticas de robótica, criamos um ambiente de confiança e relacionamento com
          crianças e adolescentes da comunidade, para que a partir desse vínculo sejam apresentados à
          mensagem do Evangelho. Cada aula começa com um pequeno estudo da Palavra antes da parte técnica.</p>
        </div>
        <div class="grid grid-2">${cards}</div>
      </div>
    </section>
  `;
}

// ---------------------------------------------------------------
// TELA: Detalhe do curso + matrícula + lista de aulas
// ---------------------------------------------------------------
async function viewCurso(slug) {
  const course = await DB.getCourse(slug);
  if (!course) return `<div class="container section"><p>Curso não encontrado.</p></div>`;
  const lessons = await DB.getLessons(course.id);

  let enrollment = null;
  if (currentUser) enrollment = await DB.getMyEnrollment(currentUser.id, course.id);
  const aprovado = enrollment && enrollment.status === "aprovada";

  const lessonRows = lessons.map(l => {
    const unlocked = aprovado && (l.material_disponivel || l.numero === 1) ;
    return `
      <div class="lesson-row ${unlocked ? "unlocked" : "locked"}">
        <div class="lesson-num">${l.numero}</div>
        <div class="info">
          <strong>${esc(l.titulo)}</strong><br>
          <small>📖 ${esc(l.versiculo_referencia || "")}</small>
        </div>
        <div class="lock-badge">${unlocked ? "🔓 Liberada" : (aprovado ? "🔒 Em preparação" : "🔒 Matricule-se")}</div>
        <button class="go" ${unlocked ? "" : "disabled"} data-lesson="${l.id}">Acessar</button>
      </div>`;
  }).join("");

  let enrollBox = "";
  if (!currentUser) {
    enrollBox = `<div class="card"><h3>Quer participar?</h3><p>Faça login como aluno para solicitar matrícula neste curso.</p><button class="btn btn-primary" id="loginToEnroll">Entrar como Aluno</button></div>`;
  } else if (currentUser.role !== "aluno") {
    enrollBox = `<div class="card"><p>Você está logado como <strong>${roleLabel(currentUser.role)}</strong>. A matrícula é feita pelo perfil de aluno.</p></div>`;
  } else if (!enrollment) {
    enrollBox = `<div class="card"><h3>Solicitar matrícula</h3><p>O material das aulas só fica disponível depois que sua matrícula for aprovada por um professor ou administrador.</p><button class="btn btn-primary" id="requestEnroll">📝 Solicitar matrícula</button></div>`;
  } else {
    const statusMsgs = {
      pendente: "⏳ Sua matrícula está <strong>pendente</strong> de aprovação.",
      aprovada: "✅ Matrícula <strong>aprovada</strong>! As aulas liberadas já podem ser acessadas.",
      recusada: "❌ Sua matrícula foi <strong>recusada</strong>. Fale com a coordenação para mais informações.",
      concluida: "🎓 Curso <strong>concluído</strong>. Parabéns!",
    };
    enrollBox = `<div class="card"><h3>Status da matrícula</h3><p>${statusMsgs[enrollment.status] || enrollment.status}</p></div>`;
  }

  root.querySelectorAll; // no-op to keep linter calm
  setTimeout(() => {
    document.getElementById("loginToEnroll")?.addEventListener("click", () => startLogin("aluno"));
    document.getElementById("requestEnroll")?.addEventListener("click", async () => {
      await DB.requestEnrollment(currentUser.id, course.id);
      toast("Solicitação de matrícula enviada!");
      renderRoute();
    });
    document.querySelectorAll("[data-lesson]").forEach(b => {
      b.addEventListener("click", () => { if (!b.disabled) navigate(`#/aula/${b.dataset.lesson}`); });
    });
  });

  return `
    <section class="section" style="padding-top:70px">
      <div class="container">
        <a href="#/robotica" style="color:var(--cyan-300);font-size:.85rem">← Voltar para Robótica com Propósito</a>
        <div class="lesson-header" style="margin-top:18px">
          <span class="tag" style="color:var(--gold-500)">Robótica com Propósito</span>
          <h1>${esc(course.titulo)}</h1>
          <p>${esc(course.descricao)}</p>
          <div class="meta-row">
            <span class="meta-pill">👥 ${esc(course.faixa_etaria)}</span>
            <span class="meta-pill">⏱️ ${esc(course.carga_horaria)}</span>
            <span class="meta-pill">📖 ${esc(course.versiculo_base)}</span>
          </div>
        </div>
        <div class="grid" style="grid-template-columns:2fr 1fr;gap:26px;align-items:start">
          <div>
            <h3>Roteiro das 10 aulas</h3>
            <div class="lesson-list">${lessonRows}</div>
          </div>
          <div>${enrollBox}</div>
        </div>
      </div>
    </section>
  `;
}

// ---------------------------------------------------------------
// TELA: Visualizador de aula (gated)
// ---------------------------------------------------------------
async function viewAula(lessonId) {
  const lesson = await DB.getLesson(lessonId);
  if (!lesson) return `<div class="container section"><p>Aula não encontrada.</p></div>`;
  const course = await DB.getCourse(lesson.course_id);

  if (!currentUser) return `<div class="container section"><p>Faça login para acessar esta aula.</p></div>`;
  if (currentUser.role === "aluno") {
    const enrollment = await DB.getMyEnrollment(currentUser.id, course.id);
    if (!enrollment || enrollment.status !== "aprovada") {
      return `<div class="container section"><div class="card"><h3>Acesso bloqueado</h3><p>Você precisa estar com a matrícula aprovada em <strong>${esc(course.titulo)}</strong> para acessar esta aula.</p><a class="btn btn-primary" href="#/curso/${course.slug}">Ver status da matrícula</a></div></div>`;
    }
  }

  return `
    <section class="section" style="padding-top:70px">
      <div class="container" style="max-width:820px">
        <a href="#/curso/${course.slug}" style="color:var(--cyan-300);font-size:.85rem">← Voltar para ${esc(course.titulo)}</a>
        <div class="lesson-header" style="margin-top:18px">
          <span class="tag" style="color:var(--gold-500)">Aula ${lesson.numero} de 10 — ${esc(course.titulo)}</span>
          <h1>${esc(lesson.titulo)}</h1>
        </div>

        ${renderLessonContent(course.id, lesson.numero)}

        <div class="step-nav">
          <a class="btn btn-ghost" href="#/curso/${course.slug}">← Voltar ao roteiro do curso</a>
        </div>
      </div>
    </section>
  `;
}

function renderLessonContent(courseId, numero) {
  const details = (LESSON_DETAILS[courseId] || []).find(l => l.numero === numero);
  if (!details) {
    return `
      <div class="lesson-block">
        <h3>🚧 Material em preparação</h3>
        <p>O material completo desta aula está sendo produzido e será publicado em breve pela equipe
        pedagógica do Conecta AI.</p>
      </div>`;
  }
  return `
    <div class="lesson-block">
      <h3>📖 Estudo bíblico</h3>
      <div class="verse-box" style="font-size:1rem">${esc(details.verse_ref)}<br>${esc(details.verse_text)}</div>
      <p>${esc(details.reflexao)}</p>
    </div>

    <div class="lesson-block">
      <h3>🎯 Objetivo da aula</h3>
      <p>${esc(details.objetivo)}</p>
    </div>

    <div class="lesson-block">
      <h3>🔧 Conteúdo técnico</h3>
      <ul>${details.tecnico.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    </div>

    <div class="lesson-block">
      <h3>✏️ Exercício da aula</h3>
      <p>${esc(details.exercicio)}</p>
      <div class="field"><textarea placeholder="Escreva sua resposta aqui..."></textarea></div>
      <button class="btn btn-primary">Salvar resposta</button>
    </div>

    <div class="lesson-block">
      <h3>📎 Materiais para download</h3>
      <p>Roteiro completo da aula, com atividades do professor e do aluno, imagens e exercícios.</p>
      <div class="cta-row" style="justify-content:flex-start">
        <a class="btn btn-primary" href="${details.pdf_professor}" target="_blank">📘 Material do professor (PDF)</a>
        <a class="btn btn-ghost" href="${details.pdf_aluno}" target="_blank">📗 Apostila do aluno (PDF)</a>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------
// TELA: Primeiro acesso (completar cadastro)
// ---------------------------------------------------------------
function viewPrimeiroAcesso() {
  if (!currentUser) { navigate("#/"); return ""; }
  setTimeout(() => {
    document.getElementById("firstAccessForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const fields = Object.fromEntries(fd.entries());
      currentUser = await DB.updateProfile(currentUser.id, fields);
      renderAccessSlot();
      toast("Cadastro concluído! Bem-vindo(a) ao Conecta AI.");
      navigate("#/painel");
    });
  });
  const minor = `
    <div class="field"><label>Nome do responsável (se menor de idade)</label><input name="responsavel_nome" placeholder="Nome do pai/mãe/responsável"></div>
    <div class="field"><label>Telefone do responsável</label><input name="responsavel_telefone" placeholder="(00) 00000-0000"></div>
  `;
  return `
    <section class="section" style="padding-top:70px">
      <div class="container" style="max-width:560px">
        <div class="section-head" style="text-align:left;margin-bottom:24px">
          <span class="tag">Primeiro acesso</span>
          <h1>Complete seu cadastro</h1>
          <p>Como é seu primeiro acesso pelo Google, precisamos de alguns dados principais para registro no curso.</p>
        </div>
        <form id="firstAccessForm" class="card">
          <div class="field"><label>Nome completo</label><input required name="nome_completo" value="${esc(currentUser.nome_completo||"")}"></div>
          <div class="field"><label>Telefone / WhatsApp</label><input required name="telefone" placeholder="(00) 00000-0000"></div>
          <div class="field"><label>Data de nascimento</label><input required type="date" name="data_nascimento"></div>
          <div class="field"><label>Bairro</label><input required name="endereco_bairro" placeholder="Bairro onde mora"></div>
          ${currentUser.role === "aluno" ? minor : ""}
          <button class="btn btn-primary" style="width:100%" type="submit">Concluir cadastro</button>
        </form>
      </div>
    </section>
  `;
}

// ---------------------------------------------------------------
// TELA: Painel (dashboard por perfil)
// ---------------------------------------------------------------
async function viewPainel() {
  if (!currentUser) { navigate("#/"); return ""; }
  if (!currentUser.perfil_completo) { navigate("#/primeiro-acesso"); return ""; }
  if (currentUser.role === "administrador") return dashAdmin();
  if (currentUser.role === "professor") return dashProfessor();
  return dashAluno();
}

async function dashAluno() {
  const courses = await DB.getCourses();
  const rows = [];
  for (const c of courses) {
    const e = await DB.getMyEnrollment(currentUser.id, c.id);
    rows.push({ course: c, enrollment: e });
  }
  const cards = rows.map(({course:c, enrollment:e}) => `
    <div class="card">
      <h3>${e ? `<span class="status-pill status-${e.status}">${e.status}</span>` : ""} ${esc(c.titulo)}</h3>
      <p>${esc(c.subtitulo)}</p>
      <a class="btn btn-ghost" href="#/curso/${c.slug}">${e ? "Ver curso" : "Solicitar matrícula"}</a>
    </div>
  `).join("");
  return `
    <section class="section" style="padding-top:70px">
      <div class="container">
        <div class="section-head" style="text-align:left;margin-bottom:24px">
          <span class="tag">Painel do aluno</span>
          <h1>Olá, ${esc(currentUser.nome_completo || "")}!</h1>
        </div>
        <div class="grid grid-2">${cards}</div>
      </div>
    </section>
  `;
}

async function dashProfessor() {
  const courses = await DB.getCourses();
  let pendingRows = "";
  for (const c of courses) {
    const list = await DB.listEnrollments({ courseId: c.id, status: "pendente" });
    list.forEach(e => {
      const nome = e.profiles?.nome_completo || DB.getProfileSync(e.aluno_id)?.nome_completo || e.aluno_id;
      pendingRows += `<tr>
        <td>${esc(nome)}</td><td>${esc(c.titulo)}</td><td>${new Date(e.solicitado_em).toLocaleDateString("pt-BR")}</td>
        <td><button class="btn btn-primary" style="padding:6px 12px;font-size:.78rem" data-approve="${e.id}">Aprovar</button>
        <button class="btn btn-ghost" style="padding:6px 12px;font-size:.78rem" data-reject="${e.id}">Recusar</button></td>
      </tr>`;
    });
  }
  setTimeout(() => {
    document.querySelectorAll("[data-approve]").forEach(b => b.onclick = async () => { await DB.updateEnrollmentStatus(b.dataset.approve, "aprovada"); toast("Matrícula aprovada!"); renderRoute(); });
    document.querySelectorAll("[data-reject]").forEach(b => b.onclick = async () => { await DB.updateEnrollmentStatus(b.dataset.reject, "recusada"); toast("Matrícula recusada."); renderRoute(); });
  });
  return `
    <section class="section" style="padding-top:70px">
      <div class="container">
        <div class="section-head" style="text-align:left;margin-bottom:24px">
          <span class="tag">Painel do professor</span>
          <h1>Solicitações de matrícula</h1>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Aluno</th><th>Curso</th><th>Solicitado em</th><th>Ação</th></tr></thead>
            <tbody>${pendingRows || `<tr><td colspan="4">Nenhuma solicitação pendente.</td></tr>`}</tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

async function dashAdmin() {
  const courses = await DB.getCourses();
  let totalPend = 0, totalAprov = 0;
  for (const c of courses) {
    totalPend += (await DB.listEnrollments({ courseId: c.id, status: "pendente" })).length;
    totalAprov += (await DB.listEnrollments({ courseId: c.id, status: "aprovada" })).length;
  }
  const profBody = await dashProfessor();
  return `
    <section class="section" style="padding-top:70px">
      <div class="container">
        <div class="section-head" style="text-align:left;margin-bottom:24px">
          <span class="tag">Painel do administrador</span>
          <h1>Visão geral do Conecta AI</h1>
        </div>
        <div class="stat-row">
          <div class="stat"><div class="num">${courses.length}</div><div class="label">Cursos ativos</div></div>
          <div class="stat"><div class="num">${totalPend}</div><div class="label">Matrículas pendentes</div></div>
          <div class="stat"><div class="num">${totalAprov}</div><div class="label">Matrículas aprovadas</div></div>
          <div class="stat"><div class="num">20</div><div class="label">Aulas no catálogo</div></div>
        </div>
      </div>
    </section>
    ${profBody}
  `;
}

// ---------------------------------------------------------------
// ROTEAMENTO
// ---------------------------------------------------------------
async function renderRoute() {
  const hash = location.hash || "#/";
  const parts = hash.replace("#/", "").split("/");
  const [route, param] = parts;
  let html = "";
  if (!route || route === "") html = viewHome();
  else if (route === "sobre") html = viewSobre();
  else if (route === "historia") html = viewHistoria();
  else if (route === "projetos") html = viewProjetos();
  else if (route === "robotica") html = await viewRobotica();
  else if (route === "curso") html = await viewCurso(param);
  else if (route === "aula") html = await viewAula(param);
  else if (route === "primeiro-acesso") html = viewPrimeiroAcesso();
  else if (route === "painel") html = await viewPainel();
  else html = `<div class="container section"><p>Página não encontrada.</p></div>`;

  root.innerHTML = html + `
    <footer><div class="container">
      Projeto Conecta AI — Evangelização · Discipulado · Tecnologia · Atos 1:8<br>
      ${DB.DEMO_MODE ? "⚠️ Site em modo demonstração (dados salvos apenas neste navegador)." : ""}
    </div></footer>`;
  highlightNav();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", renderRoute);

// ---------------------------------------------------------------
// INICIALIZAÇÃO
// ---------------------------------------------------------------
(async function init() {
  document.getElementById("appRoot-circuit")?.remove();
  document.body.insertAdjacentHTML("afterbegin", `<div class="circuit-bg"></div>`);
  currentUser = await DB.getCurrentUser();
  renderTopbar();
  await renderRoute();
})();
