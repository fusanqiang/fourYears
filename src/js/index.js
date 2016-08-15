var $ = require('jquery');
require('./polyfill.js');
require('./jquery-ui.min.js');
var fullPage = require('./fullPage.js');
var superSide = require('./jquery.SuperSlide.2.1.1.js');
var pop =require('../components/pop-pic/pop-pic.js');
require('../scss/_reset.scss');
require('../scss/fullPage.css');
require('../scss/fySpec.scss');

// fullPage
$(document).ready(function() {
	$('.tvBox').hide();
	$('#pageWrap').fullpage({
		'verticalCentered': false,
		'anchors': ['page1', 'page2', 'page3', 'page4', 'page5'],
		'navigation': true,
		 afterLoad: function(anchorLink, index){
			 if(index == '2'){
				  $('.tvBox').fadeIn();
        }
		 },
			onLeave: function(index, direction) {
			 if(index == '2'){
				  $('.tvBox').fadeOut();
        }
		 }
	});
});
// 点击图片弹出大图
$('#activePic').on('click','li a',function(){
	var self =$(this);
	var $img = self.children('img');
	var src =$img.attr('src');
	pop.popPic(src);
});

// 视频滚动

jQuery(".slider-tv").slide({
    titCell:".sliderPic li",
    mainCell:".tv-show ul",
    effect:"fold",
    delayTime:200,
    trigger: "click"
});
// 小图左滚动切换
jQuery(".slider-tv .sliderPic").slide({
    mainCell:"ul",
    delayTime:100,
    vis:3,
    effect:"top",
    autoPage:true,
    prevCell:".sPrev",
    nextCell:".sNext",
    trigger: "click"
});
