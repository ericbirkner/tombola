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
            document.getElementById("tblDiv").innerHTML =tblText;
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
