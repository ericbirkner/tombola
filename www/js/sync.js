function abre_base() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(queryDB, errorCB);
}

function consulta_registros(tx) {
	tx.executeSql('SELECT * FROM registros', [], lista_datos, errorCB);
}

function lista_datos(tx, results) {
	var len = results.rows.length;
	console.log(results.rows);
	/*
	for (var i = 0; i < len; i++) {
		var tmpArgs=results.rows.item(i).id + ",'" + results.rows.item(i).name
				+ "','" + results.rows.item(i).number+"'";
		tblText +='<tr onclick="goPopup('+ tmpArgs + ');"><td>' + results.rows.item(i).id +'</td><td>'
				+ results.rows.item(i).name +'</td><td>' + results.rows.item(i).number +'</td><td align="center"><img src="img/edit.png"></td></tr>';
	}
	*/
}


$(document).ready(function() {
  
	$('.sync a.btn_subir').on('click', function(Event){
    	// validation code here
		$(this).fadeOut('slow');
		abre_base();
		$('.sync .loading').fadeIn('slow');
  	});
});
/*
$('#signupForm')
    .formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            rut: {
                validators: {
                    id: {
                        country: 'CL',
                        message: 'Rut Invalido'
                    }
                }
            }
        }
    })
    .on('err.field.fv', function(e, data) {
            data.element
                .data('fv.messages')
                .find('.help-block[data-fv-for="' + data.field + '"]').hide();
    })
    .on('success.form.fv', function(e) {
	    e.preventDefault();
	    $("#confirmsignup").html('<i class="fa fa fa-spinner fa-spin"></i>');
	    
	    var obj = {
            firstName 		: $( "#firstName" ).val(),
            lastName 		: $( "#lastName" ).val(),
            hash 			: $( "#hash" ).val(),
            lastName 		: $( "#lastName" ).val(),
            email 			: $( "#email" ).val(),
            birthday 		: $( "#birthday" ).val(),
            gender 			: $( "#gender" ).val(),
            identifyNumber 	: $( "#rut" ).val()
        }
        	
        console.log(obj);
        $.ajax({
            type: "POST",
            url: "https://api.pernod-ricard.io/pr-latam/v1/consumers/",
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
       			'X-TOUCHPOINT-TOKEN': $('#touchpointToken').val(),
	   			'api_key': '2cefyzjgdjtmnexgwmr84e7a'
   			},
            success: function(data){
                //alert('Success');
				$("#confirmsignup").html('Registrarse');
				$('#signupForm')[0].reset();
				
					swal("Gracias por registrarte, ya puedes ingresar a Ballantine's Records");
          // tag Cadreon 
          totaltag(' http://ballantinesrecords.cl/exito'); //url virtual proporcionada por Cadreon		
					 $('#modalLogin .nav-tabs li:eq(0) a').tab('show');
      },
            failure: function(errMsg) {
                console.log(errMsg);	
	            if(errMsg.responseText=="{\"message\":\"hash invalid, the minimum length is 6\"}"){
		            mensaje = "La contraseÃ±a debe tener al menos 6 caracteres.";
	            }else if("{\"message\":\"The consumer already exists in Touchpoint\",\"code\":26}"){
		            mensaje = "Este correo ya se encuentra registrado.";
		       	}else{ 
		            mensaje = "Ha ocurrido un error, por favor vuelve a intentarlo";
	            }
					swal(mensaje);
				$("#confirmsignup").html('Registrarse');
            },
            error: function(errMsg) { 		
	            if(errMsg.responseText=="{\"message\":\"hash invalid, the minimum length is 6\"}"){
		            mensaje = "La contraseÃ±a debe tener al menos 6 caracteres.";
	            }else if("{\"message\":\"The consumer already exists in Touchpoint\",\"code\":26}"){
		            mensaje = "Este correo ya se encuentra registrado.";
	            }else{
		            mensaje = "Ha ocurrido un error, por favor vuelve a intentarlo";
	            }
					swal(mensaje);
	            console.log(JSON.stringify(errMsg.responseText));
				$("#confirmsignup").html('Registrarse');
            }
		}); 
	    
	    
	    
    })
    .find('[name="rut"]').mask('99999999-A');
*/
