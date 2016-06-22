jQuery(document).ready(function()
{
    //按鈕變化
//    $("#hintBtn").mouseenter(function(){
//        $("#hintBtn").css("opacity","1");
//     })
//    $("#hintBtn").mouseleave(function(){
//        $("#hintBtn").css("opacity","0.5");
//     })
//    
//    $("#prizeBtn").mouseenter(function(){
//        $("#prizeBtn").css("opacity","1");
//     })
//    $("#prizeBtn").mouseleave(function(){
//        $("#prizeBtn").css("opacity","0.5");
//     })
//    
//    $("#settingBtn").mouseenter(function(){
//        $("#settingBtn").css("opacity","1");
//     })
//    $("#settingBtn").mouseleave(function(){
//        $("#settingBtn").css("opacity","0.5");
//     })

	//create the slider
	$('.cd-testimonials-wrapper').flexslider({
		selector: ".cd-testimonials > li",
		animation: "slide",
		controlNav: false,
		slideshow: false,
		smoothHeight: true,
		start: function(){
			$('.cd-testimonials').children('li').css({
				'opacity': 1,
				'position': 'relative'
			});
		}
	});
    
//    //開啟介紹頁面
//    $("#projects").click(function(){
//        $("body").createElement("iframe");
//         $("iframe").css({'src':'https://luffy.ee.ncku.edu.tw:8011/about', 'width':'100vw','height':'100vh' ,'frameborder':'0','scrolling':'no'});
//      });
    
    //關閉介紹頁面
    
	
    //開啟獎牌頁面
	$(".bigbag").hide("100");
	$("#prizeBtn").click(function()
	{
		$(".bigbag").slideDown("slow");
    });


    //關閉獎牌頁面
	$('.close-btn').on('click', function(){
		$(".bigbag").slideUp("slow");
	});

	//提示按鈕
	$("#readme").click(function()
	{

		$("#readmeWord").html("從佳佳西旅店前那西市場的大門開始，走進西市場，SeeMarket!");


		$('.note').fadeIn(500);
	});

	$(".note").click(function()
	{
		$("#readmeWord").html("");
		$('.note').fadeOut(500);
	});


    
}); //end of jQuery