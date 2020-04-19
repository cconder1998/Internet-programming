<?php
	
	session_start();
	processPageRequest();
	
	function displaySearchForm() {
		require_once './templates/search_form.html';
	}
	function displaySearchResults($searchString) {
		$results = file_get_contents('http://www.omdbapi.com/?apikey=1d10174d&s='.urlencode($searchString).'&type=movie&r=json');
		$array = json_decode($results, true)["Search"];
		require_once './templates/results_form.html';
	}
	function processPageRequest() {
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			if (empty($_POST['search'])) {
				displaySearchForm();
			} else {
				displaySearchResults($_POST['search']);
			}
		} else {
			displaySearchForm();
		}
	}
	
?>
