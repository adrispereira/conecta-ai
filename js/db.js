/* =====================================================================
   CONECTA AI — Camada de dados (db.js)
   Fornece as mesmas funções tanto em MODO DEMO (localStorage) quanto
   conectado ao Supabase de verdade. O resto do site (app.js) chama
   sempre "DB.algumaCoisa()" sem se preocupar com qual dos dois está ativo.
   ===================================================================== */

const DB = (() => {
  let supabase = null;
  if (!DEMO_MODE && window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  // ---------------------------------------------------------------
  // Seed de demonstração (mesma estrutura das tabelas do schema.sql)
  // ---------------------------------------------------------------
  const SEED_COURSES = [
    {
      id: "curso-arduino", slug: "robotica-arduino",
      titulo: "Robótica com Arduino",
      subtitulo: "Eletrônica, programação e propósito de Deus para adolescentes",
      descricao: "Usar a robótica com Arduino como ponte de aproximação, discipulado e capacitação técnica para adolescentes, apresentando Jesus Cristo como Criador e Senhor.",
      faixa_etaria: "11 a 17 anos (pré-adolescentes e adolescentes)",
      carga_horaria: "10 aulas de 90 minutos (1h30) — frequência semanal",
      versiculo_base: "Atos 1:8",
      icone: "🔌",
      lessons: [
        ["No princípio, Deus criou: Conhecendo o Arduino", "Gênesis 1:1,31"],
        ["Vocês são a luz do mundo: Primeiro circuito com LED", "Mateus 5:14-16"],
        ["Buscai e batei: Botões e entradas digitais", "Mateus 7:7-8"],
        ["Andando em luz: Sensor de luminosidade (LDR)", "1 João 1:5-7"],
        ["A voz que chama: Som e buzzer", "1 Samuel 3:1-10"],
        ["Criados para boas obras: Motores e movimento", "Efésios 2:10"],
        ["O Senhor é meu Pastor: Sensor ultrassônico e desvio de obstáculos", "Salmo 23"],
        ["Caminho estreito, caminho largo: Lógica condicional", "Mateus 7:13-14"],
        ["Um corpo, muitos membros: Projeto integrador em equipe", "1 Coríntios 12:12-27"],
        ["Ide e fazei discípulos: Mostra final e envio", "Mateus 28:18-20; Atos 1:8"],
      ]
    },
    {
      id: "curso-lego", slug: "robotica-lego",
      titulo: "Robótica com LEGO",
      subtitulo: "Criatividade, brincadeira e o amor de Deus para crianças",
      descricao: "Apresentar noções básicas de robótica e mecânica por meio de brincadeiras com peças LEGO, introduzindo de forma lúdica o amor de Deus e Seu propósito para cada criança.",
      faixa_etaria: "A partir de 6 anos (crianças de 6 a 10 anos)",
      carga_horaria: "10 aulas de 60 minutos (1h) — frequência semanal",
      versiculo_base: "Atos 1:8",
      icone: "🧱",
      lessons: [
        ["Deus, o grande Criador: conhecendo as peças", "Gênesis 1:1,31"],
        ["Cada peça no seu lugar: montando com instruções", "1 Coríntios 12 (adaptado)"],
        ["Feitos para nos mover: engrenagens e movimento", "Efésios 2:10 (adaptado)"],
        ["Caminho com Jesus: rodas e carrinhos", "João 14:6"],
        ["O Espírito nos dá poder: motor e energia", "Atos 1:8"],
        ["Deus vê e cuida de mim: sensores simples", "Salmo 139:1-3"],
        ["Feitos à imagem de Deus: bichinhos articulados", "Gênesis 1:27"],
        ["Amando ao próximo: construção em equipe", "Marcos 12:31"],
        ["Meus dons, meu propósito: projeto livre", "Mateus 25:14-30 (adaptado)"],
        ["Ide e contai: mostra final e celebração", "Mateus 28:19-20; Atos 1:8"],
      ]
    }
  ];

  function seedIfEmpty() {
    if (localStorage.getItem("ca_seeded")) return;
    const courses = SEED_COURSES.map(c => ({
      id: c.id, slug: c.slug, titulo: c.titulo, subtitulo: c.subtitulo, descricao: c.descricao,
      faixa_etaria: c.faixa_etaria, carga_horaria: c.carga_horaria, versiculo_base: c.versiculo_base, icone: c.icone,
      total_aulas: c.lessons.length
    }));
    const lessons = [];
    SEED_COURSES.forEach(c => {
      c.lessons.forEach((l, i) => {
        lessons.push({
          id: `${c.id}-aula-${i+1}`, course_id: c.id, numero: i+1,
          titulo: l[0], versiculo_referencia: l[1],
          material_disponivel: true // todas as 10 aulas já têm material completo aprovado
        });
      });
    });
    localStorage.setItem("ca_courses", JSON.stringify(courses));
    localStorage.setItem("ca_lessons", JSON.stringify(lessons));
    localStorage.setItem("ca_enrollments", JSON.stringify([]));
    localStorage.setItem("ca_profiles", JSON.stringify({}));
    localStorage.setItem("ca_progress", JSON.stringify([]));
    localStorage.setItem("ca_seeded", "1");
  }
  function read(key) { return JSON.parse(localStorage.getItem(key) || "[]"); }
  function write(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function uid() { return "id-" + Math.random().toString(36).slice(2, 10); }

  // ---------------------------------------------------------------
  // AUTENTICAÇÃO
  // ---------------------------------------------------------------
  async function signInWithGoogle(intendedRole) {
    if (DEMO_MODE) {
      // Simula o retorno do login Google no modo demonstração
      const nome = prompt("MODO DEMONSTRAÇÃO — digite um nome para simular o login com Google:", "Visitante");
      if (!nome) return null;
      const email = nome.toLowerCase().replace(/\s+/g, ".") + "@gmail.com";
      const id = "demo-" + nome.toLowerCase().replace(/\s+/g, "-");
      const profiles = read("ca_profiles_obj") || {};
      let profile = getProfileSync(id);
      if (!profile) {
        profile = {
          id, email, nome_completo: nome, role: intendedRole || "aluno",
          perfil_completo: false, avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nome)}`
        };
        saveProfileSync(profile);
      }
      localStorage.setItem("ca_current_user", id);
      return profile;
    } else {
      const basePath = window.location.origin + window.location.pathname.replace(/[^/]*$/, "");
      return supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: basePath }
      });
    }
  }

  function getProfileSync(id) {
    const all = JSON.parse(localStorage.getItem("ca_profiles") || "{}");
    return all[id] || null;
  }
  function saveProfileSync(p) {
    const all = JSON.parse(localStorage.getItem("ca_profiles") || "{}");
    all[p.id] = p;
    localStorage.setItem("ca_profiles", JSON.stringify(all));
  }

  async function signOut() {
    if (DEMO_MODE) { localStorage.removeItem("ca_current_user"); return; }
    return supabase.auth.signOut();
  }

  async function getCurrentUser() {
    if (DEMO_MODE) {
      const id = localStorage.getItem("ca_current_user");
      return id ? getProfileSync(id) : null;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    return data;
  }

  async function updateProfile(id, fields) {
    if (DEMO_MODE) {
      const p = getProfileSync(id) || { id };
      Object.assign(p, fields, { perfil_completo: true });
      saveProfileSync(p);
      return p;
    }
    const { data } = await supabase.from("profiles").update({ ...fields, perfil_completo: true }).eq("id", id).select().single();
    return data;
  }

  // ---------------------------------------------------------------
  // CURSOS / AULAS
  // ---------------------------------------------------------------
  async function getCourses() {
    if (DEMO_MODE) { seedIfEmpty(); return read("ca_courses"); }
    const { data } = await supabase.from("courses").select("*").eq("ativo", true);
    return data || [];
  }
  async function getCourse(idOrSlug) {
    const courses = await getCourses();
    return courses.find(c => c.id === idOrSlug || c.slug === idOrSlug);
  }
  async function getLessons(courseId) {
    if (DEMO_MODE) { seedIfEmpty(); return read("ca_lessons").filter(l => l.course_id === courseId).sort((a,b)=>a.numero-b.numero); }
    const { data } = await supabase.from("lessons").select("*").eq("course_id", courseId).order("numero");
    return data || [];
  }
  async function getLesson(lessonId) {
    if (DEMO_MODE) { return read("ca_lessons").find(l => l.id === lessonId); }
    const { data } = await supabase.from("lessons").select("*").eq("id", lessonId).single();
    return data;
  }

  // ---------------------------------------------------------------
  // MATRÍCULAS
  // ---------------------------------------------------------------
  async function getMyEnrollment(alunoId, courseId) {
    if (DEMO_MODE) { seedIfEmpty(); return read("ca_enrollments").find(e => e.aluno_id === alunoId && e.course_id === courseId) || null; }
    const { data } = await supabase.from("enrollments").select("*").eq("aluno_id", alunoId).eq("course_id", courseId).maybeSingle();
    return data;
  }
  async function requestEnrollment(alunoId, courseId) {
    if (DEMO_MODE) {
      seedIfEmpty();
      const list = read("ca_enrollments");
      if (list.find(e => e.aluno_id === alunoId && e.course_id === courseId)) return;
      list.push({ id: uid(), aluno_id: alunoId, course_id: courseId, status: "pendente", solicitado_em: new Date().toISOString() });
      write("ca_enrollments", list);
      return;
    }
    return supabase.from("enrollments").insert({ aluno_id: alunoId, course_id: courseId });
  }
  async function listEnrollments(filter = {}) {
    if (DEMO_MODE) {
      seedIfEmpty();
      let list = read("ca_enrollments");
      if (filter.courseId) list = list.filter(e => e.course_id === filter.courseId);
      if (filter.status) list = list.filter(e => e.status === filter.status);
      return list;
    }
    let q = supabase.from("enrollments").select("*, profiles:aluno_id(nome_completo,email), courses:course_id(titulo)");
    if (filter.courseId) q = q.eq("course_id", filter.courseId);
    if (filter.status) q = q.eq("status", filter.status);
    const { data } = await q;
    return data || [];
  }
  async function updateEnrollmentStatus(enrollmentId, status) {
    if (DEMO_MODE) {
      const list = read("ca_enrollments");
      const e = list.find(x => x.id === enrollmentId);
      if (e) { e.status = status; e.respondido_em = new Date().toISOString(); }
      write("ca_enrollments", list);
      return;
    }
    return supabase.from("enrollments").update({ status, respondido_em: new Date().toISOString() }).eq("id", enrollmentId);
  }

  return {
    DEMO_MODE, supabase,
    signInWithGoogle, signOut, getCurrentUser, updateProfile, getProfileSync,
    getCourses, getCourse, getLessons, getLesson,
    getMyEnrollment, requestEnrollment, listEnrollments, updateEnrollmentStatus,
  };
})();
