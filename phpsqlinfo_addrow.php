<?php
//require("phpsqlinfo_dbinfo.php");

$servername =  "localhost";
$username = "username";
$password = "password";
$database="fires";


// Gets data from URL parameters.
$Location = $_GET['Location'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$type = $_GET['type'];

// Opens a connection to a MySQL server.
$connection= new mysqli($servername, $username, $password, $database);
if (!$connection) {
  die('Not connected : ' . mysql_error());
}

// Sets the active MySQL database.
$db_selected = mysql_select_db($Report, $connection);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysql_error());
}

// Inserts new row with place data.
$query = sprintf("INSERT INTO Report " .
         " (id, location, lat, lng, type ) " .
         " VALUES (NULL, '%s', '%s', '%s', '%s');",
         mysql_real_escape_string($location),
         mysql_real_escape_string($lat),
         mysql_real_escape_string($lng),
         mysql_real_escape_string($type));

$result = mysql_query($query);

if (!$result) {
  die('Invalid query: ' . mysql_error());
}

?>
