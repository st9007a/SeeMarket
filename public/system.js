$(document).ready(function(){
	$.ajax({
		type : 'post',
		url : 'getWifiGPS',
		success : function(arr){
			if(window.android){
				window.android.saveGPSData(JSON.stringify({data : arr}));	
			}
			else{
				console.log("you open this web page with computer, please use apk");
			} 
		},
		error : function(e){ 
			console.log(e);
		}
	});	
});
var fix = 3;
var locationId = -1;
setInterval(function(){
	$.ajax({
		type:'post',
		url:'range',
		success:function(data){
			fix = data.range;
		},
		error:function(e){console.log(e);}
	});
	if(window.android){
		locationId = window.android.threePointFix(fix);
		//alert(locationId);
	}
	
}, 1000);