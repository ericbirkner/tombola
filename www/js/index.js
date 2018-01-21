//var db_name="../../../../mnt/sdcard/Download/handycam";
var db_name="tombola";
// Wait for Cordova to load
        //
document.addEventListener("deviceready", onDeviceReady, false);

var currentRow;
// Populate the database
//
function populateDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS premios (id INTEGER PRIMARY KEY AUTOINCREMENT, name,number)');
	
}

function creaTablaRegistros(tx) {
	
	tx.executeSql('CREATE TABLE IF NOT EXISTS registros (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName,lastName,rut,email,birthday, recibe_info)');
}

// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM premios', [], querySuccess, errorCB);
}

function searchQueryDB(tx) {
	tx.executeSql("SELECT * FROM premios where name like ('%"+ document.getElementById("txtName").value + "%')",
			[], querySuccess, errorCB);
}
// Query the success callback
//
function querySuccess(tx, results) {
	var tblText='<table id="t01"><tr><th>ID</th> <th>Premio</th> <th>cantidad</th></tr>';
	var len = results.rows.length;
	for (var i = 0; i < len; i++) {
		var tmpArgs=results.rows.item(i).id + ",'" + results.rows.item(i).name
				+ "','" + results.rows.item(i).number+"'";
		tblText +='<tr onclick="goPopup('+ tmpArgs + ');"><td>' + results.rows.item(i).id +'</td><td>'
				+ results.rows.item(i).name +'</td><td>' + results.rows.item(i).number +'</td></tr>';
	}
	tblText +="</table>";
	//document.getElementById("").innerHTML =tblText;
	$('#tblDiv').html(tblText);
}

//Delete query
function deleteRow(tx) {
  tx.executeSql('DELETE FROM premios WHERE id = ' + currentRow, [], queryDB, errorCB);
}

// Transaction error callback
//
function errorCB(err) {
	alert("Error processing SQL: "+err.code);
}

// Transaction success callback
//
function successCB() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(queryDB, errorCB);
}

 // Cordova is ready
//
function onDeviceReady() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(populateDB, errorCB, successCB);
	db.transaction(creaTablaRegistros, errorCB);
}

//Insert query
//
function insertDB(tx) {
	var sql = 'INSERT INTO premios (name,number) VALUES ("' +document.getElementById("txtName").value
			+'","'+document.getElementById("txtNumber").value+'")';
	console.log(sql);
	document.getElementById('form').reset();
	tx.executeSql(sql);
}

function goInsert() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(insertDB, errorCB, successCB);
}

function goSearch() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(searchQueryDB, errorCB);
}

function goDelete() {
	 var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	 db.transaction(deleteRow, errorCB);
	 document.getElementById('qrpopup').style.display='none';
}

//Show the popup after tapping a row in table
//
function goPopup(row,rowname,rownum) {
	currentRow=row;
	document.getElementById("qrpopup").style.display="block";
	document.getElementById("editNameBox").value = rowname;
	document.getElementById("editNumberBox").value = rownum;
}

function editRow(tx) {
	tx.executeSql('UPDATE premios SET name ="'+document.getElementById("editNameBox").value+
			'", number= "'+document.getElementById("editNumberBox").value+ '" WHERE id = '
			+ currentRow, [], queryDB, errorCB);
}
function goEdit() {
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(editRow, errorCB);
	document.getElementById('qrpopup').style.display='none';
}



function goRegistro() {
	
	var db = window.openDatabase(db_name, "1.0", "Birkner Media", 200000);
	db.transaction(function(tx){
		var firstName 	= $( "#firstName" ).val();
	var lastName 	= $( "#lastName" ).val();
	var recibe_info	= $( "#recibe_info" ).val();
	var lastName 	= $( "#lastName" ).val();
	var email 		= $( "#email" ).val();
	var birthday 	= $( "#birthday" ).val();
	var rut 		= $( "#rut" ).val();
	//var sql = 'INSERT INTO premios (firstName, lastName,rut,email,birthday, recibe_info) VALUES ("' +firstName+'","'+lastName+'","'+rut+'","'+email+'","'+birthday+'","'+recibe_info+'")';
	var sql = 'INSERT INTO registros (firstName, lastName,rut,email,birthday, recibe_info) VALUES ("eric","birkner","111111111","ericbirkner@facebook.com","12121212","si");';
	console.log(sql);
		
	window.location= 'juego.html';
	
	tx.executeSql(sql);
	}, errorCB);
	
	
}

//funcion random array
(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };
})(jQuery);



//validacion de formulario

$(document).ready(function() {
  
	$('form').on('submit', function(Event){
    	// validation code here
		Event.preventDefault();
		var rut = $('#rut').val();
		// retorna true si es válido
		if($.validateRut(rut)) {
			
			goRegistro();
			
		}else{
			alert('El rut no es válido');
		}
		
		
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
