
// Criando o canvas - O canvas é como se fosse um quadro disponibilizado pelo HTML5. Ele permite manipulação de física e animações de uma maneira simples e diferente do css, além de ser uma opção mais eficiente ao uso do Flash.

// O canvas está sendo criado a partir de uma constante, pois ele NÃO deverá ser mudado.

// createElement permite a criação de um elemento qualquer.

const canvas = document.createElement('canvas');

// O canvas precisa de um contexto para criação da interface (getContext). Como o jogo é pixel art, ele terá o contexto de '2d'.

const ctx = canvas.getContext('2d');

canvas.width = 1136;
canvas.height = 640;

document.body.appendChild(canvas); // appendChild irá adicionar o elemento filho (o próprio canvas, que eu criei) ao body do documento.

// Imagem de fundo

let bgReady = false; // A propriedade responsável por identificar se o background está pronto. O let é usado ao invés de const, pois o valor de bgReady será alterado quando o background estiver pronto, para true.

const bgImage = new Image(); // Agora, tenho uma imagem atribuída à constante bgImage.

bgImage.onload = function(){ // Criando um evento na imagem

	bgReady = true;

};

bgImage.src = 'img/battle.png';

// Imagem do herói

let heroReady = false;

const heroImage = new Image();

heroImage.onload = function() {

	heroReady = true;

};

heroImage.src = 'img/Warrior-ff1.png';

// Imagem do monstro

let monsterReady = false;

const monsterImage = new Image();

monsterImage.onload = function() {

	monsterReady = true;

};

monsterImage.src = 'img/icegigas.png';

// Objetos

const hero = {

	speed: 256 // movimento em pixels por segundo

}

const monster = {};

let monsterCaught = 0;

// Controle do teclado

const keysDown = {};

window.addEventListener('keydown', function(e){ // keydown é quando eu pressiono a tecla.

	keysDown[e.keyCode] = true; // keyCode será o responsável por pegar o código da tecla digitada, o qual é associado com o pressionar dela.

}, false); // window é a última instância do DOM, ou seja, a última camada que encapsula todo o resto, agindo como o escopo global. E então, o evento adicionado ao window irá pegar todos os eventos que acontecerem na janela, no caso, o pressionar de uma tecla. Tal evento (representado por 'e') será capturado com uma função.

window.addEventListener('keyup', function(e){ // keyup é quando eu solto a tecla.

	delete keysDown[e.keyCode]; // irá deletar o valor de keysDown, junto com o valor da tecla que soltei.

}, false);

// Reseta o posicionamento, quando o jogador pegar o monstro.

const reset = function () {

	hero.x = canvas.width / 2; // O deslocamento horizontal inicial do herói, o qual irá centralizar na metade da largura.

	hero.y = canvas.height / 2; // A mesma coisa, somente que irá centralizar na metade da altura.

};

// Posiciona o monstro randomicamente na tela

	monster.x = 32 + (Math.random() * (canvas.width - 64)); // O Math.random irá gerar um número randômico de 0 a 1, sendo tal número quebrado. (canvas.width - 64) indica o maior e menor número que poderão ser gerados: canvas.width é o maior e 64 é o menor, e Math.random() irá gerar um número aleatório entre esses dois. O 64 é usado para que a borda não corte a figura do monstro.

	monster.x = 32 + (Math.random() * (canvas.height - 64));

	// Até agora, a posição do herói e do monstro foram definidos: o herói estará centralizado no meio da tela, e o monstro aparecerá em uma posição aleatória.

	// Atualiza os objetos presentes no jogo.

	const update = function (modifier) { // Responsável por atualizar o jogo em um período determinado.

		if (38 in keysDown) { // No caso, 38 é a keycode referente à tecla de seta para cima do teclado. Quando ela for pressionada, a ação será realizada.

			hero.y -= hero.speed * modifier; // O -= é o equivalente à hero.y = hero.y - (hero.speed * modifier). É usado para evitar repetição.

		}

		if (40 in keysDown) { // É o equivalente à tecla de seta para baixo.

			hero.y += hero.speed * modifier;

		}

		if(37 in keysDown) { // Pressionando a seta para esquerda.

			hero.x -= hero.speed * modifier;

		}

		if (39 in keysDown) { // Pressionando a seta para direita.

			hero.x += hero.speed * modifier;

		}

		// Colisão entre herói e monstro.

		if (

			hero.x <= (monster.x + 32) // Se o x do meu herói for menor ou igual ao x do meu monstro + 32. O 32 se refere ao tamanho dos dois objetos, herói e monstro. Colisão do herói com o monstro em seus eixos horizontais (x).

			&& monster.x <= (hero.x + 32) // Colisão do monstro com o herói no eixo x.

			&& hero.y <= (monster.y + 32) // Colisão do herói com o monstro no eixo y.

			&& monster.y <= (hero.y + 32) // Colisão do monstro com o herói no eixo y.

		)	{

			monsterCaught++; // Ao encostar o herói no monstro, o contador de monstros pegos irá receber um incremento de 1.

			reset(); // O jogo será executado continuamente.

		}

	};

	// Renderização

	const render = function () {

		if (bgReady) {

			ctx.drawImage(bgImage, 0, 0);

		}

		if (heroReady) {

			ctx.drawImage(heroImage, hero.x, hero.y);

		}

		if (monsterReady) {

			ctx.drawImage(monsterImage, monster.x, monster.y);

		}

		// Pontuação

		ctx.fillStyle = 'rgb(250, 250, 250)';

		ctx.font = '24px Roboto';

		ctx.textAlign = 'left';

		ctx.textBaseline = 'top'; // Alinhado ao topo, e à esquerda.

		ctx.fillText('Monstros pegos: ' + monsterCaught, 30, 50); // 32 e 32 se refere o posicionamento do texto em coordenadas, 32 à esquerda e 32 em cima.


	};

	// Controla o loop do jogo

	const main = function(){

		const now = Date.now(); // Pega a data. E aqui seja 32000

		const delta = now - then; // O valor dessa constante vai ser 2000, ou seja, o tempo que se passou em milissegundos, de now para o then.

		update(delta / 1000); // 2000 / 1000 = 2. Esse seria o modificador usado acima, para definir o movimento do herói ao pressionar alguma tecla.

		render();

		then = now; // 32000

		// Executa essse método o mais breve possível

		requestAnimationFrame(main); // o qual irá realizar o loop, com a função presente na constante main.

};

// Suporte cross-browser para requestAnimationFrame

const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Começa o jogo

let then = Date.now(); // Supondo que seja 30000

reset();

main();