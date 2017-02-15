'use strict';

// Criação do canvas

var canvas = document.createElement('canvas');

var ctx = canvas.getContext('2d');

// Usar futuramente para adaptar à janela do usuário

canvas.width = 1040;

canvas.height = 620;

// criar uma função (if the window height or width changes, the value of innerHeight or innerWidth will get updated, and it will adapt to the new size.)

document.body.appendChild(canvas);

// Imagem do fundo

var bgReady = false;
var bgImage = new Image();

bgImage.onload = function () {

	bgReady = true;

};

bgImage.src = 'img/battle.png';

// Herói

var heroReady = false;
var heroImage = new Image();

heroImage.onload = function() {

	heroReady = true;

};

heroImage.src = 'img/warrior.png';

// Monstro

var monsterReady = false;
var monsterImage = new Image();

monsterImage.onload = function() {

	monsterReady = true;

}

monsterImage.src = 'img/icegigas.png';

// Objetos

var hero = {

	speed: 300

};

var monster = {};

var monstersCaught = 0;

// Controles

var keysDown = {};

window.addEventListener('keydown', function(e){

	keysDown[e.keyCode] = true;

}, false);

window.addEventListener('keyup', function(e){

	delete keysDown[e.keyCode];

}, false);

// Reseta ao pegar o monstro

var reset = function reset(){

	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Posicionamento randômico do monstro

	monster.x = 32 + Math.random() * (canvas.width - 64);

	monster.y = 32 + Math.random() * (canvas.height - 64);

};

// Atualiza os objetos

var update = function update(modifier) {

	if (38 in keysDown) {

		// Seta para cima
		hero.y -= hero.speed * modifier;

	}

	if (40 in keysDown) {
		
		// Seta para baixo
		hero.y += hero.speed * modifier;

	}

	if (37 in keysDown) {

		// Seta para esquerda
		hero.x -= hero.speed * modifier;

	}

	if (39 in keysDown) {
		
		// Seta para direita
		hero.x += hero.speed * modifier;

	}

	// Checa se os personagens se encostaram
	if (hero.x <= monster.x + 64 && monster.x <= hero.x + 32 && hero.y <= monster.y + 94 && monster.y <= hero.y + 48) {

		++monstersCaught;
		reset();

	}

	// Mostra no console a posição do herói (x, y) - pode ser usado para ajudar na delimitação do mesmo na tela
	console.log("Position("+hero.x.toFixed(1)+", "+hero.y.toFixed(1)+")");

};

// Renderização

var render = function render(){

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

	ctx.fillStyle = 'rgb(250,250,250)';
	ctx.font = '32px Roboto';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillText('Monstros derrotados: ' + monstersCaught, 32, 45);

};

// Controlador de loop

var main = function main(){

	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Execução mais rápida possível

	requestAnimationFrame(main);

};

// Suporte cross-browser para requestAnimationFrame

var w = window;

var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Iniciando

var then = Date.now();

reset();
main();