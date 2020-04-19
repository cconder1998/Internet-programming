<?php
	session_start(); // Connect to the existing session
	require_once '/home/common/mail.php'; // Add email functionality to program
	processPageRequest(); // Call the processPageRequest() function

	function addMovieToCart($movieID) {
		$array = readMovieData();
		$array[count($array)] = $movieID;
		writeMovieData($array);
		displayCart();
	}
	function checkout($name, $address) {
		$films = readMovieData();
		$items = count($films);
		$message = "<h2>myMovies Xpress!</h2><p>This is your reciept for ".$items." movies you purchased from myMovies Xpress!</p>";
		if ($items > 0) {
			$message = $message."<table><tr><th>Poster</th><th>Title (Year)</th></tr></table>";
			for($i = 0; $i < $items; $i++) {	
				$id = explode("\n", $films[$i]);
				$movie = file_get_contents('http://www.omdbapi.com/?apikey=1d10174d&i='.$id[0].'&type=movie&r=json');
				$array = json_decode($movie, true);
				$message = $message.'<tr>
					<td><img src=' .$array[Poster].' height="100"></td>
					<td><a href="https://www.imdb.com/title/'.$id[0].'" target="_blank">'.$array[Title].' ('.$array[Year].')</a></td>
				</tr>';
			}
			$message = $message."</table>";
		}
		
		
		$result = sendMail("750270466", $address, $name, "Your Receipt from myMovies!", $message);
		if ($result == 0) {
			echo "<script type='text/javascript'>alert('A reciept was sent to ".$_SESSION["emailAddress"]."');</script>";
			header( "Location: ./logon.php" ) ;
		} else if ($result < 0) {
			echo "<script type='text/javascript'>alert('An error occured and no email was sent');</script>";
		} else if ($result > 0) {
			echo "<script type='text/javascript'>alert('A timeout occured. Try again in ".$result." seconds');</script>";
		}	

	}
	function displayCart() {
		$films = readMovieData();
		require_once './templates/cart_form.html';
	}
	function processPageRequest() {
		if (empty($_GET['action'])) {
			displayCart();
		} else if ($_GET['action'] == "add") {
			addMovieToCart($_GET['movie_id']);
		} else if ($_GET['action'] == "checkout") {
			checkout($_SESSION["displayName"], $_SESSION["emailAddress"]);
		} else if ($_GET['action'] == "remove") {
			removeMovieFromCart($_GET['movie_id']);
		}
	}
	function readMovieData() {
		$file = fopen("./data/cart.db","r");
		$movies = array();;
		$i = 0;
		while(! feof($file)) {
			$line = fgets($file);
			if ($line != "" && $line != "\n" && $line != " ") {
				$movies[$i] = $line;
				$i++;
			}
		}
		fclose($file);
		return $movies;
	}
	function removeMovieFromCart($movieID) {
		$movies = readMovieData();
		$length = count($movies);
		$i = 0;
		$id = explode("\n", $movies[$i]);
		while($i < $length && $id[0] != $movieID) {
			$i++;
			$id = explode("\n", $movies[$i]);
		}
		if ($i < $length) { 
			for ($x = $i; $x < $length-1; $x++) {
				$movies[$x] = $movies[$x+1];
			}
			unset($movies[$length-1]); 
		}
		writeMovieData($movies);
		displayCart();
	}
	function writeMovieData($array) {
		$file = fopen("./data/cart.db", "w");
		for ($i = 0; $i < count($array); $i++) {
			$id = explode("\n", $array[$i]);
			fwrite($file, $id[0]);
			fwrite($file, "\n");
		}
		fclose($file);
	}

?>
