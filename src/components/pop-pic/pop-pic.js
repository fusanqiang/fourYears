var $=require('jquery');
// var template = require('./pop-pic.html');
require('./pop-pic.scss');
var template = '<div id="popWrap"><p class="inner"><img src="" alt=""><a href="javascript:;" class="close">X</a></p><div class="mask"></div></div>';

exports.popPic = function(src){
	var popHtml = $(template);
	// alert(src);
	popHtml.appendTo('body');

	popHtml.find('img').attr('src', src);

	var $btn = popHtml.find('.close');
	$btn.on('click',function(){
		$(this).parents('#popWrap').remove();
	});
}