<?php
ini_set('display_startup_errors', 1); // Report compiler (syntax) errors
ini_set('display_errors', 1); // Report run-time errors
error_reporting(E_ALL); // Do not hide any errors 


	processPageRequest();
	
	
	function authenticateUser($username, $password) {
		$file = fopen("./data/credentials.db","r");
		while(! feof($file)) {
			$check = explode(",", fgets($file));
			if ($check[0] == $username && $check[1] == $password) {
				session_start();
				$_SESSION["displayName"] = $check[2];
				$_SESSION["emailAddress"] = $check[3];
				header( "Location: ./index.php" ) ;
				exit();
			}
		}
		fclose($file);
		$message = "Invalid Username and/or Password";
		displayLoginForm($message);
	}
	function displayLoginForm($message="") {
		require_once './templates/logon_form.html';
	}
	function processPageRequest() {

		session_unset();
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			$name = $_POST['user'];
			$pass = $_POST['psw'];
			if (empty($name)||empty($pass)) {
				displayLoginForm();
			} else {
				authenticateUser($name, $pass);
			}
		} else {
			displayLoginForm();
		}
	}

	
	
	
?>
