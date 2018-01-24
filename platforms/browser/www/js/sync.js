function abre_base() {
	
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(consulta_registros, errorCB);
}

function consulta_registros(tx) {
	tx.executeSql('SELECT * FROM registros', [], lista_datos, errorCB);
}

function lista_datos(tx, results) {
	var len = results.rows.length;
	console.log(results.rows);
	alert('No apague el equipo mientras sincronizamos los datos ('+len+')');
	
	
	var exito=0;
	var i = 0;
	var debug = "";
	for (i; i < len; i++) {
		
		var obj = {
            firstName 		: results.rows.item(i).firstName,
            lastName 		: results.rows.item(i).lastName,
            hash 			: '123456',
            email 			: results.rows.item(i).email,
            birthday 		: results.rows.item(i).birthday,
            identifyNumber 	: results.rows.item(i).rut,
			countryCode		: "cl",
        }
		
		var str = JSON.stringify(obj);
		str = JSON.stringify(obj, null, 4); // (Optional) beautiful indented output.
		//$('body').append(str); // Displays output using window.alert()
		
	
		
		$.ajax({
		  method: "GET",
		  url: "http://simple2.cl/simple/save.php",
		  data: { firstName: results.rows.item(i).firstName, lastName: results.rows.item(i).lastName, email: results.rows.item(i).email, birthday: results.rows.item(i).birthday,identifyNumber: results.rows.item(i).rut}
		})
		.done(function( msg ) {
			console.log( "Data Saved: " + msg );
		});
        	
        console.log(obj);
        $.ajax({
            type: "POST",
            url: "https://api.pernod-ricard.io/pr-latam/v1/consumers/",
            //url : 'http://horus.dev.konabackend.com/',
			data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
       			'X-TOUCHPOINT-TOKEN': token,
	   			'api_key': 'q9qsv2ebnkrxky46p8wck33f'
   			},
            success: function(data){
                //alert('Success');
				console.log("Gracias por registrarte, ya puedes ingresar a Ballantine's Records");
				exito++;  
			},
			failure: function(errMsg) {
				console.log(errMsg);	
				
				if(errMsg.responseText=="{\"message\":\"hash invalid, the minimum length is 6\"}"){
					mensaje = "La contraseña debe tener al menos 6 caracteres.";
				}else if("{\"message\":\"The consumer already exists in Touchpoint\",\"code\":26}"){
					mensaje = "Este correo ya se encuentra registrado.";
				}else{ 
					mensaje = "Ha ocurrido un error, por favor vuelve a intentarlo";
				}
					console.log(mensaje);
					//alert(mensaje);
			},
            error: function(errMsg) { 		
	            if(errMsg.responseText=="{\"message\":\"hash invalid, the minimum length is 6\"}"){
		            mensaje = "La contraseÃ±a debe tener al menos 6 caracteres.";
	            }else if("{\"message\":\"The consumer already exists in Touchpoint\",\"code\":26}"){
		            mensaje = "Este correo ya se encuentra registrado.";
	            }else{
		            mensaje = "Ha ocurrido un error, por favor vuelve a intentarlo";
	            }
				console.log(mensaje);
				//alert(mensaje);
	            console.log(JSON.stringify(errMsg.responseText));
				
            }
		}); 
		console.log(i);
	   
	}
	
	//fin sync
	$('.sync .loading').hide();
	//$('.sync').html('<p>Se sincronizaron <b>'+exito+'</b> registros al servidor</p>');
	$('.sync').html('<p>Se sincronizaron los registros con el servidor</p>');
	
}


$(document).ready(function() {
  
	$('.sync a.btn_subir').on('click', function(Event){
    	// validation code here
		$(this).fadeOut('slow');
		abre_base();
		$('.sync .loading').fadeIn('slow');
  	});
});
