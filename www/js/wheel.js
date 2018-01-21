// JavaScript Document
$(function(){
	
		window.WHEELOFFORTUNE = {

            cache: {},

            init: function () {
                //console.log('controller init...');

                var _this = this;
                this.cache.wheel = $('.rueda');
                this.cache.wheelMarker = $('.indicador');
                //this.cache.wheelSpinBtn = $('.rueda, .boton-ruleta'); //im using the wheel as the spin button but simply change this to a button if you want.
				this.cache.wheelSpinBtn = $('#juego .logo'); //im using the wheel as the spin button but simply change this to a button if you want.

                //mapping is backwards as wheel spins clockwise //1=win
                //this.cache.wheelMapping = [400, 120, 80, 750, 150, 300, 60, 175, 500, 125, 75, 1000, 120, 200, 90, 600, 100, 250].reverse();
				this.cache.wheelMapping = [1, 2, 3, 4, 5, 6, 7, 8].reverse();

				
                this.cache.wheelSpinBtn.on('click swipedown swiperight', function (e) {
                    e.preventDefault();
                    if (!$(this).hasClass('disabled')) _this.spin();
					$('.boton-ruleta').css('visibility','hidden');
                });
				

                //reset wheel
                this.resetSpin();

                //setup prize events
                //this.prizeEvents();
            },

            spin: function () {
                //console.log('spinning wheel');

                var _this = this;

                // reset wheel
                this.resetSpin();

                //disable spin button while in progress
                this.cache.wheelSpinBtn.addClass('disabled');

                /*
                    Wheel has 10 sections.
                    Each section is 360/10 = 36deg.
                */
                //var deg = 1500 + Math.round(Math.random() * 1500),
                //duration = 6000; //optimal 6 secs
				
				//var premios = {'jockey':45,'sigue':90,'parlante':135,'audifonos':180,'jockey':225,'sigue':270,'parlante':315,'audifonos':360};
				
				var premios = Array(45,90,135,180,225,270,315,360);
				var nombre_premios = Array('jockey','sigue disfrutando','parlante','audifonos','jockey','sigue disfrutando','parlante','audifonos');
				
				var random = Math.floor(Math.random()*premios.length);
				var premiado = premios[random]
				
				console.log('premiado:'+ premiado);
				
				var yapa = 20; //la yapa se usa para que quede marcado al medio
				var deg = 3600 + premiado + yapa,
                duration = 6000; //optimal 6 secs

                _this.cache.wheelPos = deg;

                //transition queuing
                //ff bug with easeOutBack
                this.cache.wheel.transition({
                    rotate: '0deg'
                }, 0)
                    .transition({
                    rotate: deg + 'deg'
                }, duration, 'easeOutCubic');

                //move marker
                _this.cache.wheelMarker.transition({
                    rotate: '-20deg'
                }, 0, 'snap');

                //just before wheel finish
                setTimeout(function () {
                    //reset marker
                    _this.cache.wheelMarker.transition({
                        rotate: '0deg'
                    }, 300, 'easeOutQuad');
                }, duration - 500);

                //wheel finish
                setTimeout(function () {
                    // did it win??!?!?!
                    var spin = _this.cache.wheelPos,
                        degrees = spin % 360,
                        percent = (degrees / 360) * 100,
                        segment = Math.ceil((percent / 9)),  
                        //win = _this.cache.wheelMapping[segment]; //zero based array
						win = 1,
						premio ="";

                   	console.log('spin = ' + spin);
                    console.log('degrees = ' + degrees);
                    console.log('percent = ' + percent);
                    console.log('segment = ' + segment);
                    
					//	
					premio = nombre_premios[random];
						
					
					console.log('win = ' + win);
					console.log('premio = ' + premio);
					
					//alert(premio);
					$('#juego .tu_premio .box_premio').text(premio);
					$('#juego .tu_premio').css({'display':'block'})
					
					//$('input[name=premio]').val(premio);
                   
					/*
					$.post("save.php", $('#form').serialize(), function( data ) {
						$('.boton-volver').fadeIn('slow');
					});	
					
					*/
                
				}, duration);

            },

            resetSpin: function () {
                this.cache.wheel.transition({
                    rotate: '0deg'
                }, 0);
                this.cache.wheelPos = 0;
            }

        }

        window.WHEELOFFORTUNE.init();
});