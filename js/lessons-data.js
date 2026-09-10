/* Gerado automaticamente a partir do conteúdo aprovado das aulas. */
const LESSON_DETAILS = {
  "curso-arduino": [
  {
    "numero": 1,
    "titulo": "No princípio, Deus criou: Conhecendo o Arduino",
    "verse_ref": "Gênesis 1:1 e 1:31",
    "verse_text": "\"No princípio, criou Deus os céus e a terra.\" (...) \"E viu Deus tudo quanto tinha feito, e eis que era muito bom.\" (Gênesis 1:1,31)",
    "reflexao": "Deus é o primeiro grande Criador e Engenheiro do universo: Ele projetou, planejou e executou cada detalhe da criação com propósito, e viu que tudo \"era muito bom\". Nenhum projeto de robótica começa do nada — ele começa com uma ideia e um propósito antes de qualquer peça ser encaixada. Da mesma forma, cada aluno nesta sala foi pensado e criado por Deus com um propósito, antes mesmo de nascer.",
    "objetivo": "Apresentar o curso, o kit Arduino e o Arduino IDE, realizando o primeiro upload de um programa (piscar o LED embutido), enquanto se introduz o tema da criação com propósito.",
    "tecnico": [
      "O que é o Arduino e para que serve; breve história do movimento maker.",
      "Conhecendo os componentes do kit (placa, protoboard, jumpers, LEDs, resistores).",
      "Regras básicas de segurança elétrica e cuidado com o material.",
      "Instalação e reconhecimento do Arduino IDE.",
      "Primeiro programa: o exemplo \"Blink\" (piscar o LED embutido na placa)."
    ],
    "exercicio": "Preencha a ficha \"Meu propósito neste curso\": o que você espera aprender e por quê?",
    "pdf_professor": "materiais/arduino-aula01-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula01-apostila-aluno.pdf"
  },
  {
    "numero": 2,
    "titulo": "Vocês são a luz do mundo: Primeiro circuito com LED",
    "verse_ref": "Mateus 5:14-16",
    "verse_text": "\"Vós sois a luz do mundo (...) assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai, que está nos céus.\" (Mateus 5:14,16)",
    "reflexao": "Um LED só acende quando está corretamente ligado ao circuito: precisa de energia e de uma conexão certa com o polo positivo e negativo. Jesus disse que somos \"a luz do mundo\" — mas essa luz só brilha de verdade quando estamos conectados a Ele, a fonte da luz. Um LED desconectado não acende, por mais bonito que seja; da mesma forma, de nada adianta parecermos bons por fora se não estivermos ligados a Cristo por dentro. Hoje, ao montarmos nosso primeiro circuito, vamos lembrar que Deus quer que brilhemos no nosso bairro, na escola e em casa — e essa luz vem d'Ele.",
    "objetivo": "Montar o primeiro circuito eletrônico em protoboard com LED e resistor, controlando-o via código Arduino.",
    "tecnico": [
      "Funcionamento da protoboard (trilhas e conexões).",
      "Polaridade do LED (anodo/catodo) e função do resistor (proteção do LED).",
      "Noção simples de tensão, corrente e Lei de Ohm.",
      "Comandos pinMode(), digitalWrite() e delay() no Arduino IDE.",
      "Programando o LED para piscar em diferentes intervalos."
    ],
    "exercicio": "Desenhe ou escreva: uma atitude prática de \"ser luz\" que você quer ter esta semana.",
    "pdf_professor": "materiais/arduino-aula02-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula02-apostila-aluno.pdf"
  },
  {
    "numero": 3,
    "titulo": "Buscai e batei: Botões e entradas digitais",
    "verse_ref": "Mateus 7:7-8",
    "verse_text": "\"Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á. Porque todo o que pede, recebe; e o que busca, encontra; e ao que bate, abrir-se-lhe-á.\" (Mateus 7:7-8)",
    "reflexao": "Um botão é uma entrada: quando o apertamos, enviamos uma informação ao Arduino, que responde de alguma forma — acendendo um LED, por exemplo. É uma conversa de mão dupla: eu ajo, e o circuito responde. Jesus nos ensina que a oração funciona de um jeito parecido: quando pedimos, buscamos e batemos, Deus ouve e responde. Ele não ignora quem O busca de coração. Hoje, cada vez que apertarmos o botão do nosso circuito e virmos o LED responder, vamos lembrar que Deus também nos ouve sinceramente.",
    "objetivo": "Compreender o conceito de entrada digital utilizando um botão para controlar um LED, introduzindo a estrutura condicional if.",
    "tecnico": [
      "O que é uma entrada digital (input) e uma saída digital (output).",
      "Montagem de circuito com botão (push-button) e resistor.",
      "Comando digitalRead() e leitura do estado do botão.",
      "Estrutura condicional if/else no código.",
      "Desafio: usar uma variável contadora para registrar quantas vezes o botão foi apertado."
    ],
    "exercicio": "Escreva um pedido de oração pessoal em um cartão.",
    "pdf_professor": "materiais/arduino-aula03-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula03-apostila-aluno.pdf"
  },
  {
    "numero": 4,
    "titulo": "Andando em luz: Sensor de luminosidade (LDR)",
    "verse_ref": "1 João 1:5-7",
    "verse_text": "\"Deus é luz, e não há nele treva nenhuma. (...) se andarmos na luz, como ele na luz está, temos comunhão uns com os outros.\" (1 João 1:5,7)",
    "reflexao": "O sensor LDR percebe a quantidade de luz do ambiente e reage de forma automática, acendendo uma lâmpada quando escurece. A Bíblia diz que Deus é luz e nos convida a \"andar na luz\", isto é, viver de forma transparente diante Dele e das pessoas, sem esconder nada nas trevas. Um sensor bem calibrado sabe diferenciar claridade de escuridão; da mesma forma, precisamos aprender a discernir entre o que agrada a Deus e o que não agrada, escolhendo caminhar na luz mesmo quando ninguém está vendo.",
    "objetivo": "Utilizar o sensor LDR para leitura analógica de luminosidade e programar um sistema de luz automática.",
    "tecnico": [
      "Funcionamento do LDR (resistor dependente de luz) e divisor de tensão.",
      "Leitura analógica com analogRead() e a diferença entre entradas digitais e analógicas.",
      "Uso do Serial Monitor para observar os valores lidos.",
      "Definindo um valor de referência (threshold) para acionar o LED.",
      "Projeto: \"luz automática\" que acende sozinha quando o ambiente escurece."
    ],
    "exercicio": "Escreva: uma área da minha vida em que quero \"andar mais na luz\".",
    "pdf_professor": "materiais/arduino-aula04-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula04-apostila-aluno.pdf"
  },
  {
    "numero": 5,
    "titulo": "A voz que chama: Som e buzzer",
    "verse_ref": "1 Samuel 3:1-10",
    "verse_text": "\"Então, chamou o Senhor a Samuel (...) e disse Samuel: Fala, Senhor, porque o teu servo ouve.\" (1 Samuel 3:4,10)",
    "reflexao": "Samuel ouviu um chamado, mas precisou da ajuda do sacerdote Eli para reconhecer que era a voz de Deus. Hoje trabalhamos com som: o buzzer emite um sinal sonoro que pode servir de alerta ou de chamado. Assim como Samuel aprendeu a reconhecer a voz de Deus com a ajuda de um mentor, nós também precisamos da Palavra de Deus e de pessoas que nos ajudem a reconhecer quando Ele está falando conosco — seja através da Bíblia, de um conselho sábio ou de uma circunstância da vida.",
    "objetivo": "Explorar o componente buzzer, criando sinais sonoros e um pequeno alarme combinado com outro sensor.",
    "tecnico": [
      "Diferença entre buzzer ativo e passivo.",
      "Função tone() e noTone() para gerar sons e melodias simples.",
      "Combinando o buzzer com um sensor já estudado (LDR ou botão) para criar um alarme.",
      "Ajustando frequência e duração do som."
    ],
    "exercicio": "Escreva: um momento em que senti que Deus \"falou\" comigo.",
    "pdf_professor": "materiais/arduino-aula05-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula05-apostila-aluno.pdf"
  },
  {
    "numero": 6,
    "titulo": "Criados para boas obras: Motores e movimento",
    "verse_ref": "Efésios 2:10",
    "verse_text": "\"Porque somos feitura dele, criados em Cristo Jesus para boas obras, as quais Deus preparou para que andássemos nelas.\" (Efésios 2:10)",
    "reflexao": "Um motor transforma energia elétrica em movimento: ele foi projetado para uma função específica e só cumpre seu propósito quando ligado corretamente. Deus nos formou com dons, capacidades e uma história única, para realizarmos \"boas obras\" que Ele já preparou de antemão para nós. Hoje aprendemos a dar movimento aos nossos projetos — e isso pode ser um lembrete de que Deus quer nos colocar em movimento, usando nossos talentos para servir e abençoar outras pessoas.",
    "objetivo": "Controlar um motor DC utilizando ponte H, variando velocidade e sentido de rotação com PWM.",
    "tecnico": [
      "Funcionamento básico de um motor DC.",
      "Necessidade de uma ponte H (ex.: módulo L298N) para controlar motores a partir do Arduino.",
      "Controle de velocidade por PWM com analogWrite().",
      "Controlando o sentido de rotação do motor (horário/anti-horário)."
    ],
    "exercicio": "Escreva: um talento ou dom pessoal que posso usar para servir a Deus e ao próximo.",
    "pdf_professor": "materiais/arduino-aula06-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula06-apostila-aluno.pdf"
  },
  {
    "numero": 7,
    "titulo": "O Senhor é meu Pastor: Sensor ultrassônico e desvio de obstáculos",
    "verse_ref": "Salmo 23",
    "verse_text": "\"O Senhor é o meu pastor, nada me faltará. (...) Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.\" (Salmo 23:1,4)",
    "reflexao": "O sensor ultrassônico \"enxerga\" obstáculos à frente e permite que o robô desvie do perigo antes de bater. Deus, como nosso Pastor, também enxerga os perigos do nosso caminho — mesmo quando não os vemos — e nos guia para longe deles. Podemos confiar Nele mesmo em meio aos riscos do nosso dia a dia, inclusive os riscos que existem ao nosso redor, no bairro e nas más influências que nos cercam.",
    "objetivo": "Utilizar o sensor ultrassônico HC-SR04 para medir distância e programar um sistema simples de desvio de obstáculos.",
    "tecnico": [
      "Funcionamento do sensor ultrassônico HC-SR04 (emissão e eco de ultrassom).",
      "Cálculo de distância a partir do tempo de resposta do sensor.",
      "Lógica condicional para parar ou desviar o motor ao detectar um obstáculo próximo.",
      "Introdução ao conceito de carrinho/robô autônomo simples."
    ],
    "exercicio": "Escreva: uma situação de risco da qual sinto que Deus me livrou, ou pode livrar.",
    "pdf_professor": "materiais/arduino-aula07-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula07-apostila-aluno.pdf"
  },
  {
    "numero": 8,
    "titulo": "Caminho estreito, caminho largo: Lógica condicional e decisões no código",
    "verse_ref": "Mateus 7:13-14",
    "verse_text": "\"Entrai pela porta estreita (...) porque estreita é a porta, e apertado, o caminho que conduz à vida, e poucos há que a encontrem.\" (Mateus 7:13-14)",
    "reflexao": "No código, o if/else representa uma escolha: se uma condição é verdadeira, o programa segue por um caminho; se não, segue por outro. A vida também é feita de escolhas, e Jesus fala de dois caminhos possíveis: um largo e fácil, mas que leva à perdição, e outro estreito e mais difícil, mas que leva à vida. Hoje aprofundamos as decisões lógicas no Arduino e refletimos sobre as decisões reais que temos tomado — e sobre qual caminho estamos escolhendo seguir.",
    "objetivo": "Aprofundar o uso de estruturas condicionais e operadores lógicos, combinando múltiplos sensores em um mesmo programa.",
    "tecnico": [
      "Operadores lógicos (&&, ||, !) e comparações.",
      "Condicionais aninhadas e o comando else if.",
      "Introdução ao switch/case como alternativa a múltiplos if/else.",
      "Combinando dois ou mais sensores estudados (LDR, botão, ultrassônico) em uma mesma lógica."
    ],
    "exercicio": "Escreva, se quiser: uma decisão importante que estou enfrentando, para orar a respeito.",
    "pdf_professor": "materiais/arduino-aula08-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula08-apostila-aluno.pdf"
  },
  {
    "numero": 9,
    "titulo": "Um corpo, muitos membros: Projeto integrador em equipe",
    "verse_ref": "1 Coríntios 12:12-27",
    "verse_text": "\"Porque, assim como o corpo é um, e tem muitos membros, e todos os membros, sendo muitos, formam um só corpo, assim é Cristo também. (...) precisa o corpo de muitos membros, e todos são necessários.\" (1 Coríntios 12:12, adaptado)",
    "reflexao": "Assim como o corpo humano tem muitos membros com funções diferentes, mas todos necessários, um robô completo só funciona quando os sensores, o motor e o código trabalham em conjunto. Nesta aula, cada aluno vai assumir uma função dentro da equipe, entendendo que o corpo de Cristo — a igreja — funciona da mesma maneira: cada pessoa tem um papel importante, e nenhum papel é menos valioso que o outro.",
    "objetivo": "Integrar sensores, motor e lógica de programação na montagem colaborativa de um robô/carrinho autônomo completo.",
    "tecnico": [
      "Revisão geral dos conceitos: sensores, motor, lógica condicional.",
      "Divisão de tarefas em equipe: montagem mecânica, montagem eletrônica e programação.",
      "Integração de todos os componentes em um único robô/carrinho autônomo.",
      "Testes e ajustes finais de funcionamento."
    ],
    "exercicio": "Escreva: qual é o meu papel na minha equipe, família ou igreja?",
    "pdf_professor": "materiais/arduino-aula09-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula09-apostila-aluno.pdf"
  },
  {
    "numero": 10,
    "titulo": "Ide e fazei discípulos: Mostra final e envio",
    "verse_ref": "Mateus 28:18-20 e Atos 1:8",
    "verse_text": "\"Portanto, ide, fazei discípulos de todas as nações (...) e eis que eu estou convosco todos os dias, até a consumação dos séculos.\" (Mateus 28:19-20)",
    "reflexao": "Assim como Jesus enviou seus discípulos para testemunhar por toda parte, hoje encerramos esta etapa sendo \"enviados\" a compartilhar o que aprendemos — tanto de robótica quanto de fé — com nossa família e comunidade. O curso técnico termina, mas a missão de sermos testemunhas de Cristo, como fala Atos 1:8, continua todos os dias da nossa vida.",
    "objetivo": "Finalizar e apresentar os projetos de robótica à comunidade, celebrando a conclusão do curso na fase de \"Enviar\" do Conecta AI.",
    "tecnico": [
      "Ajustes finais dos projetos em equipe.",
      "Ensaio da apresentação técnica (explicar sensores, motor e lógica usados).",
      "Preparação de cartazes ou explicação visual do funcionamento do robô.",
      "Organização do espaço de mostra para as famílias e a comunidade."
    ],
    "exercicio": "Escreva: o que quero contar para minha família sobre o que aprendi neste curso.",
    "pdf_professor": "materiais/arduino-aula10-professor.pdf",
    "pdf_aluno": "materiais/arduino-aula10-apostila-aluno.pdf"
  }
],
  "curso-lego": [
  {
    "numero": 1,
    "titulo": "Deus, o grande Criador: conhecendo as peças",
    "verse_ref": "Gênesis 1:1 e 1:31",
    "verse_text": "\"No princípio, Deus fez o céu e a terra... e Deus viu tudo o que tinha feito, e era muito, muito bom!\" (Gênesis 1:1,31 — linguagem infantil)",
    "reflexao": "Contado de forma animada: Deus criou o mundo — a luz, o céu, o mar, os animais, as plantas e, por último, as pessoas — e Ele disse que tudo ficou \"muito bom\"! Hoje nós também vamos criar coisas com nossas peças, imitando um pouquinho o nosso Criador, que fez tudo com capricho e amor.",
    "objetivo": "Acolher as crianças, apresentar as regras da turma e as peças LEGO, iniciando com a história da criação do mundo contada de forma lúdica.",
    "tecnico": [
      "Apresentação das peças LEGO: tamanhos, cores e formas de encaixe.",
      "Combinado de regras da turma (cuidar do material, respeitar os amigos, guardar as peças).",
      "Brincadeira livre de montagem para as crianças conhecerem as peças."
    ],
    "exercicio": "Desenhe algo que você criou hoje com as peças LEGO e conte para o grupo o que é!",
    "pdf_professor": "materiais/lego-aula01-professor.pdf",
    "pdf_aluno": "materiais/lego-aula01-apostila-aluno.pdf"
  },
  {
    "numero": 2,
    "titulo": "Cada peça no seu lugar: montando com instruções",
    "verse_ref": "1 Coríntios 12 (adaptado)",
    "verse_text": "\"Nós somos como um corpo com muitas partes: a mão, o pé, o olho... cada parte é importante e tem o seu lugar!\" (1 Coríntios 12, adaptado para crianças)",
    "reflexao": "Cada peça do LEGO tem um formato e um lugar certo para encaixar. Se colocarmos ela no lugar errado, a construção não fica firme. Deus fez cada criança de um jeitinho especial e diferente, e cada uma tem um lugar importante na família de Deus — ninguém é mais importante que o outro, assim como cada peça do LEGO é necessária para a construção ficar bonita e firme.",
    "objetivo": "Seguir um passo a passo simples de montagem, compreendendo que cada peça tem um encaixe certo.",
    "tecnico": [
      "Observação de um passo a passo ilustrado simples.",
      "Noção de sequência: primeiro, depois, por último.",
      "Construção de uma torre ou casinha seguindo o modelo proposto."
    ],
    "exercicio": "Desenhe a construção que você fez hoje!",
    "pdf_professor": "materiais/lego-aula02-professor.pdf",
    "pdf_aluno": "materiais/lego-aula02-apostila-aluno.pdf"
  },
  {
    "numero": 3,
    "titulo": "Feitos para nos mover: engrenagens e movimento",
    "verse_ref": "Efésios 2:10 (adaptado)",
    "verse_text": "\"Nós somos a obra de Deus, feitos para fazer coisas boas, que Ele já preparou para nós.\" (Efésios 2:10, adaptado)",
    "reflexao": "As engrenagens são peças especiais: quando uma gira, ela faz a outra girar também! Deus nos fez para \"nos mexermos\" e fazer coisas boas para os outros — como ajudar um amigo, ser gentil, dar um abraço ou compartilhar um brinquedo. Assim como uma engrenagem faz a outra se mover, uma boa ação nossa pode fazer outras pessoas quererem fazer o bem também.",
    "objetivo": "Explorar o funcionamento simples de engrenagens, observando como uma peça move a outra.",
    "tecnico": [
      "Apresentação de engrenagens grandes e pequenas.",
      "Demonstração de como uma engrenagem gira a outra.",
      "Montagem de um mecanismo simples de engrenagens."
    ],
    "exercicio": "Minha boa ação para essa semana é:",
    "pdf_professor": "materiais/lego-aula03-professor.pdf",
    "pdf_aluno": "materiais/lego-aula03-apostila-aluno.pdf"
  },
  {
    "numero": 4,
    "titulo": "Caminho com Jesus: rodas e carrinhos",
    "verse_ref": "João 14:6",
    "verse_text": "\"Jesus disse: Eu sou o caminho, a verdade e a vida.\" (João 14:6)",
    "reflexao": "Um carrinho precisa de rodas para andar por um caminho. Jesus disse que Ele é o caminho — quando seguimos Jesus, sabemos para onde estamos indo e não precisamos ter medo de nos perder. Assim como escolhemos a direção certa para o nosso carrinho andar, podemos escolher seguir Jesus todos os dias.",
    "objetivo": "Montar um carrinho simples com rodas e eixos, testando seu deslocamento em uma pista.",
    "tecnico": [
      "Apresentação de eixos e rodas.",
      "Montagem de um chassi simples de carrinho com peças LEGO.",
      "Teste do carrinho empurrando-o em uma pequena pista."
    ],
    "exercicio": "Desenhe o seu carrinho decorado!",
    "pdf_professor": "materiais/lego-aula04-professor.pdf",
    "pdf_aluno": "materiais/lego-aula04-apostila-aluno.pdf"
  },
  {
    "numero": 5,
    "titulo": "O Espírito nos dá poder: motor e energia",
    "verse_ref": "Atos 1:8",
    "verse_text": "\"Vocês receberão poder quando o Espírito Santo descer sobre vocês.\" (Atos 1:8, versículo-base do Conecta AI)",
    "reflexao": "Até agora, nossos carrinhos só andavam quando empurrávamos com a mão. Hoje vamos usar um motor, que dá \"força\" para o carrinho andar sozinho! Isso nos lembra que o Espírito Santo dá força para nós vivermos como Deus quer, fazendo coisas que sozinhos não conseguiríamos fazer.",
    "objetivo": "Conectar um motor simples ao carrinho montado, observando-o se mover sozinho pela primeira vez.",
    "tecnico": [
      "Apresentação simples do motor/hub (quando disponível no kit).",
      "Conexão do motor ao carrinho montado na aula anterior.",
      "Teste do carrinho se movendo com o motor ligado."
    ],
    "exercicio": "Como foi ver meu carrinho andar sozinho pela primeira vez?",
    "pdf_professor": "materiais/lego-aula05-professor.pdf",
    "pdf_aluno": "materiais/lego-aula05-apostila-aluno.pdf"
  },
  {
    "numero": 6,
    "titulo": "Deus vê e cuida de mim: sensores simples",
    "verse_ref": "Salmo 139:1-3",
    "verse_text": "\"Senhor, tu me sondas e me conheces! Sabes quando me sento e quando me levanto...\" (Salmo 139:1-2)",
    "reflexao": "Alguns robozinhos têm sensores que \"percebem\" o que está ao redor, quase como se pudessem ver ou sentir. Deus nos conhece muito mais profundamente do que qualquer sensor: Ele sabe tudo sobre nós, vê cada detalhe da nossa vida e cuida de nós com muito amor, mesmo quando ninguém mais está olhando.",
    "objetivo": "Explorar um sensor simples (toque, movimento ou inclinação), associando-o à ideia de que Deus nos conhece e cuida de nós.",
    "tecnico": [
      "Apresentação de um sensor simples do kit (toque, movimento ou inclinação).",
      "Conexão do sensor ao motor ou a uma luz.",
      "Teste do sensor reagindo a estímulos (tocar, tampar, inclinar)."
    ],
    "exercicio": "Desenhe um jeito que você sente o cuidado de Deus na sua vida.",
    "pdf_professor": "materiais/lego-aula06-professor.pdf",
    "pdf_aluno": "materiais/lego-aula06-apostila-aluno.pdf"
  },
  {
    "numero": 7,
    "titulo": "Feitos à imagem de Deus: bichinhos articulados",
    "verse_ref": "Gênesis 1:27",
    "verse_text": "\"Deus criou o ser humano à sua imagem... Deus os criou.\" (Gênesis 1:27)",
    "reflexao": "Deus nos fez à Sua imagem, cada um único e especial! Hoje vamos montar um bichinho de LEGO que se mexe, com partes móveis — e assim como esse bichinho tem um jeitinho só dele, cada criança aqui também é única e foi feita com muito carinho por Deus, que não erra e não faz ninguém \"sem querer\".",
    "objetivo": "Construir um pequeno animal ou personagem com partes móveis, valorizando a individualidade de cada criança.",
    "tecnico": [
      "Construção de um animal ou personagem simples com partes articuladas (dobradiças, eixos).",
      "Teste dos movimentos do bichinho montado."
    ],
    "exercicio": "O nome do meu bichinho é:",
    "pdf_professor": "materiais/lego-aula07-professor.pdf",
    "pdf_aluno": "materiais/lego-aula07-apostila-aluno.pdf"
  },
  {
    "numero": 8,
    "titulo": "Amando ao próximo: construção em equipe",
    "verse_ref": "Marcos 12:31",
    "verse_text": "\"Amarás o teu próximo como a ti mesmo.\" (Marcos 12:31)",
    "reflexao": "Hoje vamos construir juntos, em duplas ou trios, uma \"vila\" de LEGO com casas e ruas. Isso só vai dar certo se soubermos dividir as peças, esperar a nossa vez e ajudar o amigo — assim como Jesus pede que amemos uns aos outros, cuidando também da vontade e da vez do coleguinha, e não só da nossa.",
    "objetivo": "Construir coletivamente uma pequena vila ou cidade de LEGO, praticando partilha e cooperação.",
    "tecnico": [
      "Construção coletiva de uma maquete/vila com casas, ruas e outros elementos.",
      "Combinação de peças de vários alunos em uma única construção."
    ],
    "exercicio": "Escreva o nome de um amigo do meu grupo que eu quero agradecer.",
    "pdf_professor": "materiais/lego-aula08-professor.pdf",
    "pdf_aluno": "materiais/lego-aula08-apostila-aluno.pdf"
  },
  {
    "numero": 9,
    "titulo": "Meus dons, meu propósito: projeto livre",
    "verse_ref": "Mateus 25:14-30 (adaptado)",
    "verse_text": "\"Jesus contou uma história sobre um homem que deu talentos (dinheiro) para seus servos usarem bem enquanto ele viajava.\" (Mateus 25:14-30, adaptado para crianças)",
    "reflexao": "Deus deu para cada um de nós dons e talentos diferentes, para usarmos bem, e não escondermos. Hoje cada criança vai criar, sozinha ou em dupla, um projeto livre com o LEGO, usando sua criatividade — que é um talento dado por Deus — para fazer algo especial e único.",
    "objetivo": "Criar um projeto livre com as peças LEGO, aplicando o que foi aprendido nas aulas anteriores.",
    "tecnico": [
      "Projeto livre de criação, utilizando todas as peças disponíveis.",
      "Aplicação do que foi aprendido (rodas, engrenagens, movimento).",
      "Preparação inicial para a apresentação da próxima aula."
    ],
    "exercicio": "Meu projeto se chama _______ e o motivo de eu ter criado ele é:",
    "pdf_professor": "materiais/lego-aula09-professor.pdf",
    "pdf_aluno": "materiais/lego-aula09-apostila-aluno.pdf"
  },
  {
    "numero": 10,
    "titulo": "Ide e contai: mostra final e celebração",
    "verse_ref": "Mateus 28:19-20 e Atos 1:8",
    "verse_text": "\"Jesus disse: Vão e contem a todos sobre mim... e eu estarei sempre com vocês!\" (Mateus 28:19-20, adaptado para crianças)",
    "reflexao": "Assim como Jesus pediu para seus amigos contarem a boa notícia para todo mundo, hoje vamos contar para nossos pais e amigos o que aprendemos aqui — sobre robótica e, principalmente, sobre o amor de Deus por cada um de nós.",
    "objetivo": "Apresentar os projetos construídos para as famílias, celebrando o encerramento do curso.",
    "tecnico": [
      "Finalização dos projetos das crianças.",
      "Organização do espaço de exposição para a mostra.",
      "Ensaio simples da apresentação de cada criança."
    ],
    "exercicio": "O que eu quero contar para minha família sobre o que aprendi neste curso:",
    "pdf_professor": "materiais/lego-aula10-professor.pdf",
    "pdf_aluno": "materiais/lego-aula10-apostila-aluno.pdf"
  }
]
};
