let somwin;
let audioGameOver;
let som;
let personagem;
let blocos;
let portal;
let lava;
let porta;
let explosao;
let andarX = 64;
let andarY = 0;
let gameOver = false;
let win = false;
let paused = false;

 // musica de fundo do jogo
  let meuAudio = new Audio('8bit.mp3');
  
//audio quando ganha ou perde o jogo
  let audioWin = new Audio('win.wav');
  let somGameOver = new Audio('GameOver.mp3');



  // Função para verificar se o jogo acabou
function verificarFimDeJogo(resultado) {
    if (resultado === "win" || resultado === "game over") {
      
      }
}


// Coordenadas da lava
let lavaCoordenadas = [
  [128,128], [128,192], [128,256], [128,320], [128,384],
  [192,384], [256,384], [320,384], [384,384], [384,320],
  [384,192], [384,128], [320,128], [256,128], [192,128]
];

////executada apenas uma vez quando o programa é inicializado
function setup() {
  //mapa
  createCanvas(576, 576);
  
  //carregamento das imagens
  personagem = loadImage('player1.png');
  blocos = loadImage ('bricks.png');
  portal = loadImage('portal.png');
  explosao = loadImage('explosao.png');
  lava = loadImage('lava.gif');
  porta = loadImage('porta.png');
  
      meuAudio.loop = true;
      meuAudio.play();
  
}

// ficar executando até que o programa se encerre
function draw() {
  background(350);
  if (!paused) {
      meuAudio.loop = true
      meuAudio.play();
    }
  
  //plano de fundo
  for(let y = 0; y < 9; y++){
    for(let x = 0; x < 9; x++){
      image(blocos, x*64, y*64, 64, 64);
    }
  }

  //personagem
  image(personagem, andarX, andarY, 64, 64);
  
  // esquema de portais
  drawPortal(384, 256); 
    //posição do portal 1
  
  image(portal, 512, 512, 64, 64);
  //posição e tamanho do portal 2

  // posições da lava, apenas se o jogo não tiver acabado
  
    //condicional de negação para verificar se "game over" é falso.
  if (!gameOver) {
    
    //posicionamento dos obstáculos (loop)
    for (let i = 0; i < lavaCoordenadas.length; i++) {
      let x = lavaCoordenadas[i][0];
      let y = lavaCoordenadas[i][1];
      image(lava, x, y, 64, 64);
      
      // Verificação de colisão com a lava    
      if (andarX === x && andarY === y) {
        image(explosao, andarX, andarY, 64, 64);
        gameOver = true;
        break; // Para o loop assim que uma colisão for detectada
      }
    }
  }
  
  // porta
  image(porta, 192, 192, 64, 64);

  // Verificação de acesso ao portal
  if (andarX === 512 && andarY === 512) { 
    // direcionamento do personagem ao acessar portal "mover para outro local"
    andarY = 256;
    andarX = 320;
  }
  if (andarX === 384 && andarY === 256) { 
    // direcionamento do personagem ao acessar portal "mover para outro local"
    andarY = 512;
    andarX = 448;
  }
  
  // Verificação de acesso a porta
  if (andarX === 192 && andarY === 192) {
    win = true;
  }
  
  //configurando texto e cor da tela "WINNER"
  if (win) {
  audioWin.play();
  }
  if (win) {
    background(255); // Tela de fundo branco
    fill(255, 0, 0); // Texto vermelho
    textAlign(CENTER, CENTER);//alinhamento do texto
    textSize(100);//tamanho do texto
    text("WINNER", width/2, height/2); 
    meuAudio.pause();
    // Exibe a mensagem "WINNER"
    noLoop(); // parar loop após o jogo acabar
  }
  
  //configurando texto e cor da tela "GAME OVER"
     if (gameOver) {
    background(255); // Tela de fundo branco
    fill(255, 0, 0); // Texto vermelho
    textAlign(CENTER, CENTER);//alinhamento da fonte
    textSize(100);//tamanho da fonte
    text("GAME OVER", width/2, height/2); 
    // Exibe a mensagem "GAME OVER"
       somGameOver.play();
       meuAudio.pause();
    noLoop(); // Pare o loop de desenho após o jogo acabar
  }
  
  //configurando texto e cor da tela "PAUSE"
  if (paused) {
    background(255); // Tela de fundo branco
    fill(0); // Texto preto
    textAlign(CENTER, CENTER);
    textSize(100);
    text("PAUSE", width/2, height/2); 
    // Exibe a mensagem "PAUSE"
    noLoop(); // Pare o loop de desenho enquanto pausado
  }
}

// portao 
function drawPortal(x, y) {
  image(portal, x, y, 64, 64);
}

// é chamada uma vez sempre que uma tecla é pressionada.
function keyPressed(){
  if (!gameOver && !win) {
    if (keyCode === RIGHT_ARROW && andarX < 512) {
      //andar para direita
      andarX += 64;
    }
    if (keyCode === LEFT_ARROW && andarX > 0) {
      //andar para esquerda
      andarX -= 64;
    }
    if (keyCode === DOWN_ARROW && andarY < 512) {
      //andar para baixo
      andarY += 64;
    }
    if (keyCode === UP_ARROW && andarY > 0) {
      //andar para cima
      andarY -= 64;
    }
  }
  
  if (keyCode === 32) { // Tecla de espaço
    paused = !paused;// Alterna entre pausar e despausar o jogo
    meuAudio.loop = false
    meuAudio.pause();
    if (!paused) {
      loop(); // Retoma o loop de desenho
      meuAudio.loop = true
      meuAudio.play();
    }
  }
}

