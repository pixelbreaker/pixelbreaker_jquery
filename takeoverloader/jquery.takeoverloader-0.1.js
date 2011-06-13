/*
 * jQuery Image Take Over loader v0.1
 * http://blog.pixelbreaker.com/javascript/takeover-loader
 *
 * Copyright (c) 2011 Gabriel Bucknall
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2011-06-11
 */

(function( $ )
{
	$.fn.takeoverloader = function( progress, complete )
	{
		var
			eligible = this.find('img:not([src=""]):not(.noloader)'),
			total_ = eligible.length-1,
			loaded_ = 0,
			progress_ = progress || function(){},
			complete_ = complete || function(){},
			checkInterval; // pre-defined so closure compiler doesn't assume it's renameable in subclosures.
			
		var stepProgress = function()
		{
			loaded_++;
			progress_( loaded_/total_ );
			if(loaded_>=total_)
			{
				clearInterval( checkInterval );
				eligible.unbind( 'load' );
				complete_();
			}
		};
		
		// fall back interval.
		checkInterval = setInterval( function()
		{
			var allLoaded = true;
			eligible.each( function()
			{ 
				if( !this.complete )
				{ 
					allLoaded = false;
					return false;
				}
				return true;
			});
			
			if( allLoaded )
			{
				loaded_ = total_-1;
				stepProgress();
			}			
		}, 1E3 );
		
		eligible.each(function()
		{
			if( this.complete ) 
				stepProgress();
			else 
				$(this).load( function(){ stepProgress(); } );
		});
	}
})( jQuery );