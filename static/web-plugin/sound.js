const sound = {
	beep: null, // paddle
	peep: null, // score
	plop: null, // wall
	init: function(){
		this.beep = new Audio('sound/ping_pong_8bit_beeep.wav');
		this.peep = new Audio('sound/ping_pong_8bit_peeeeeep.wav');
		this.plop = new Audio('sound/ping_pong_8bit_plop.wav');
	}
}

sound.init();