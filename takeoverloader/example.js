$(document).ready( function() 
{
	// hide content div (UI being loaded)
	$('#content').hide();
	// takeover the loading.
	$(document).takeoverloader( 
		function( progressAmout ) // called each time an item is loaded
		{
			// do something with progressAmout (normalised)
			$('.loadprogress').text( Math.round( progressAmout * 100 )+'%' );
		},
		function() // called when loading is finished
		{
			$('.loadprogress').hide();
			$('#content').fadeIn();
			// etc
		}
	);
});