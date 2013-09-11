<!--
{
	"title": "Hello World!",
	"group": 1,
	"order": 6
}
-->

-----------------------

# Hello World!  #

-----------------------

	<!DOCTYPE html>
	<html lang="ko">
		<head>
			<meta charset="utf-8"/>
			<title>STEP 1</title>
			<link href="cornerstone-framework-0.9.1/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
			<link href="cornerstone-framework-0.9.1/lib/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet"/>
		</head>
		<body>
			<div class="container">Hello, World!</div>
			<script src="cornerstone-framework-0.9.1/launcher.js" data-target="app/main"></script>
		</body>
	</html>
***
	define( function() {
		return {
			launch: function() {
				alert( 'Hello, World!' );
			}	
		};
	} );
