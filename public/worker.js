/*
 *若之後index.html的js分開寫可試著把worker include進index分開後的那個js裡
 */
/*
 * move marker[index] to src facing dist with animation count number
 */
onmessage = function (e){
	var index = e.data[0];
	var frame = e.data[1];
	var src_lat = e.data[2];
	var src_lng = e.data[3];
	var src_alt = e.data[4];
	var src_rta = e.data[5];
	var dist_lat = e.data[6];
	var dist_lng = e.data[7];
	var dist_alt = e.data[8];
	var dist_rta = e.data[9];
	var user_type = e.data[10];
	var uid = e.data[11];
	var son = e.data[12];
	var title = e.data[13];
	var info = e.data[14];
	
	var delta_lat = (dist_lat - src_lat)/frame;
	var delta_lng = (dist_lng - src_lng)/frame;
	var delta_alt = (dist_alt - src_alt)/frame;
	var delta_dist = (delta_lat * delta_lat) + 
	(delta_lng * delta_lng) + (delta_alt * delta_alt);
	
	for(var j=1; j< frame && delta_dist!=0 ; j++){
		//console.log("要走囉"+index+" "+j);
		postMessage([j, index, src_lat+ j* delta_lat, src_lng+ j* delta_lng, 
			src_alt+ j* delta_alt, src_rta, dist_lat, dist_lng, dist_alt, 
			dist_rta, user_type, false]);
		var d = Date.now();
		while(true){//有停頓,不然跑太快
			if(Date.now()-d > 10){
				break;
			}
		}
	}
	console.log("要走囉"+index+" "+j);
	postMessage([frame, index, src_lat+ frame* delta_lat, src_lng+ frame* delta_lng, 
		src_alt+ frame* delta_alt, src_rta, dist_lat, dist_lng, dist_alt, 
		dist_rta, user_type, uid, son, title, info, true]);
}