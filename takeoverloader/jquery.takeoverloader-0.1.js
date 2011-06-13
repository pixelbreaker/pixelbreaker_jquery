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
			complete_ = complete || function(){};
			
		eligible.each(function()
		{
			if( this.complete ) 
				stepProgress();
			else 
				$(this).load( function(){stepProgress();} );
		});

		var stepProgress = function()
		{
			loaded_++;
			progress_( loaded_/total_ );
			if(loaded_>=total_)
			{
				eligible.unbind( 'load' );
				complete_();
			}
		};
	}
})( jQuery );