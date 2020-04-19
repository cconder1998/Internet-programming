<?php 

    // Update the following variables with your information
    $OMDB_API_KEY = "a1b2c3d4"; // API Key obtained from the
                                // Open Movie Database website
                                // (refer to the Important Notes
                                // section of the Project 5
                                // assignment for details)

    session_start();
    processPageRequest();

    function displaySearchForm() 
	{
		require_once './templates/search_form.html';
    }

    function displaySearchResults($searchString) 
	{
        $results = file_get_contents('http://www.omdbapi.com/?apikey='.$GLOBALS['OMDB_API_KEY'].'&s='.urlencode($searchString).'&type=movie&r=json');
        $movies = json_decode($results, true)["Search"];
        
		require_once './templates/results_form.html';
    }

    function processPageRequest() 
	{
		if($_SERVER['REQUEST_METHOD'] === 'POST') 
		{
			if(isset($_POST['keyword']))
			{
				displaySearchResults($_POST['keyword']);
			}
        }
		else 
		{
			displaySearchForm();
		}           
    }
?>

