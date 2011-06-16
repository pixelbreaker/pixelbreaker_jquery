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
	$.fn.takeoverloader = function( method )
	{
		var 
			query = 'img:not([src=""]):not(.noloader)',
			checkInterval; // pre-defined so closure compiler doesn't assume it's renameable in subclosures.
		
		var methods = {
			init: function( options )
			{
				var
					eligible = this.find( query ),
					total = eligible.length-1,
					loaded = 0,
					progress = options.progress || function(){},
					complete = options.complete || function(){};

				var stepProgress = function()
				{
					loaded++;
					progress( loaded/total );
					if(loaded>=total)
					{
						clearInterval( checkInterval );
						eligible.unbind( 'load.takeover' );
						complete();
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
						loaded = total_-1;
						stepProgress();
					}			
				}, 1E3 );

				eligible.each(function()
				{
					if( this.complete ) 
						stepProgress();
					else 
						$(this).bind( 'load.takeover', function(){ stepProgress(); } );
				});
				
				return this;
			},
			
			destroy: function()
			{
				this.find( query ).unbind( 'load.takeover' );
				clearInterval( checkInterval );
			}
		};
		
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
	}
})( jQuery );