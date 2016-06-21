
function showContent(data){
	//字串分割
	var contentSplit = data.split('\n');	
	$('#overlay').show();    //顯示overlay
	$('.frame').show();	     //顯示對話框
			
	//打字
	$('#typed').typed({
		strings : [contentSplit[0]],
		typeSpeed : 30,
		loop : false
	});	 
			
	//移掉以輸出的內容
	contentSplit.shift();

	//console.log(contentSplit);
	
	//其餘內容存進cookie
	if(contentSplit.length > 10){
		var content2 = new Array();
		for(i=10;i<contentSplit.length;i++){
			content2.push(contentSplit.shift());	
		}
		$.cookie('content', content2.join('\n'));
		$.cookie('content2', contentSplit.join('\n'));
	}
	else{
		$.cookie('content', contentSplit.join('\n'));
	}
	

	
};
//點擊NPC
$('.npc').click(function (){
	if($.cookie('story') != 1){
		var NPCID = $(this).attr('data-id');

		//story = true的狀況下 , 無法跳出其他對話框
		$.cookie('story', 1);
		$('#typed').typed('reset');
		$.ajax({
			data : {
				account : $.cookie('usrd'),
				id : NPCID
			},
			url : 'content',
			type : 'post',
			success : function(data){
				if(data != null){
					//cookie內存入故事進展階段
					$.cookie('storyStage', data.stage);
					
					//顯示出拿到的文字內容
					showContent(data.content);
				}
				else{console.log(data);}			
			},
			error : function(e){
				console.log('error : can not get story content');
				
			}
		});
	}			
});
//點擊overlay
$('#overlay').click(function(){	

	//cookie裡沒有文字內容就刪掉該cookie
	if($.cookie('content') == '' ){
		//刪除cookie
		$.cookie('content',  '', { expires: -1 });	 
		$.cookie('content2', '', {expires: -1});
		$.cookie('story', '', {expires: -1});         
		
		$('#overlay').hide();           //隱藏overlay
		$('.frame').hide();  		//隱藏對話框   
		$('#typed').typed('reset'); 
		
		specialStage = false;
		game();  //調用game()
	}
	//cookie裡有文字內容則顯示下一段內容
	else{
	    $('#typed').typed('reset');
		
		//取出cookie的內容並且分割
	    var contentSplit = $.cookie('content').toString().split('\n') ;
		if($.cookie('content2')){
			var content2 = $.cookie('content2').toString().split('\n');
			contentSplit.push(content2.shift());
			$.cookie('content2', content2.join('\n'));
			
		}
		
		//打字
		$('#typed').typed({
			strings : [contentSplit[0]],
			typeSpeed : 30,
			loop : false
		});		
		//console.log(contentSplit[0]);
		
		//移掉已輸出的內容
		contentSplit.shift();
		
		//存進cookie
		$.cookie('content', contentSplit.join('\n'));
		
	}
});
var specialStage = false;
//定位跳出對話框
setInterval(function(){
    if($.cookie('story') != 1){
		$.ajax({
			type : 'POST',
			url : '/triggerContent',
			data : {
				account : $.cookie('usrd'),
				id : 0,
				pos : specialStage
			},
			success : function(data){
				if(data != false){
					$.cookie('story', 1);
					//cookie內存入故事進展階段
					$.cookie('storyStage', data.stage);
					
					//顯示出拿到的文字內容
					showContent(data.content);	
				}
			},
			error : function(){
				console.log('error : can not get story content');
			}
		});
	}
},1000);

