/*
 * jQuery Image Take Over loader v0.1
 * http://blog.pixelbreaker.com/javascript/takeover-loader
 *
 * Copyright (c) 2009-2010 Gabriel Bucknall
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
			el = this,
			images_ = new Array(),
			numImages_,
			progress_ = progress || function(){},
			complete_ = complete || function(){};
			
		var getAllImages = function()
		{
			el.find('img:not([src=""]):not(.noloader)').each(function( i, el )
			{
				images_.push( {uri: $(el).attr('src'), el:el} );
			});
			numImages_ = images_.length;
		};

		var addListeners = function()
		{
			$.each( images_, function( k, v )
			{
				var imgObj = $(v.el);
				if( v.el.complete )
					addLoaded();
				else
					$(v.el).load(function()
					{
						addLoaded();
					});
			});
		};

		var addLoaded = function()
		{
			numImages_--;
			progress_( 1-(numImages_/images_.length) );
			if(numImages_==0)
			{
				$.each( images_, function( k, v ){ $(v.el).unbind( 'load' ); });

				complete_();
			}
		};

		getAllImages();
		addListeners();
	}
})( jQuery );