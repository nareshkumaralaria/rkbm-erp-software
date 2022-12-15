
(function($) {
	"use strict"

	var direction =  getUrlParams('dir');
	if(direction != 'rtl')
	{direction = 'ltr'; }
	
	new dezSettings({
		typography: "roboto",
		version: "light",
		layout: "vertical",
		headerBg: "color_1",
		navheaderBg: "color_3",
		sidebarBg: "color_1",
		sidebarStyle: "mini",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "wide",
		direction: direction
	}); 

})(jQuery);	
	
	
	
	
	
	
	
	