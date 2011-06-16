$(document).ready( function() 
{
	// hide content div (UI being loaded)
	$('#content').hide();
	// takeover the loading.
	$(document).takeoverloader( {
		progress: function( progressAmount ) // called each time an item is loaded
			{
				// do something with progressAmout (normalised)
				$('.loadprogress').text( Math.round( progressAmount * 100 )+'%' );
			},
		complete: function() // called when loading is finished
			{
				$('.loadprogress').hide();
				$('#content').fadeIn();
				// etc
			}
		}
	);
		
	// To forcibly remove events, call 'destroy'
	$(document).takeoverloader( 'destroy' );
});