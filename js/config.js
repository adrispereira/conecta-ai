/* =====================================================================
   CONECTA AI — Configuração do Supabase
   =====================================================================
   Preencha as duas linhas abaixo depois de criar seu projeto em
   https://supabase.com (veja o arquivo CONFIGURACAO.md para o passo a
   passo completo, incluindo o login com Google).

   Enquanto SUPABASE_URL estiver como está (com "SUA-URL-AQUI"), o site
   roda automaticamente em MODO DEMONSTRAÇÃO: os dados ficam salvos só
   no navegador (localStorage), para você navegar e testar todas as
   telas sem precisar configurar nada ainda.
   ===================================================================== */

const SUPABASE_URL = "https://ipnbmziovsxkvtxoszou.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_c-pt8vphRiAL3s7iS9Uwhg_3wmt2RGf";

const DEMO_MODE = SUPABASE_URL.includes("SUA-URL-AQUI") || SUPABASE_ANON_KEY.includes("SUA-CHAVE-ANON-AQUI");
