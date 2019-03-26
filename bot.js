var request = require('sync-request');

const token = "a2c162d32f76ee28e02eeefc6f5fafc78eab9940f60f646d478a43b522f92b3eb4dd1765249d28a03f6d0";
const domain = "4ch";


var messages = ['podpisivaites - https://vk.com/dota_webm', 'ofigennii pablik - https://vk.com/dota_webm', 'tut krutie vidosi - https://vk.com/dota_webm', 'zoxodi k nam - https://vk.com/dota_webm', 'pablik s ofigennimi vidosami - https://vk.com/dota_webm'];


var group_id = request('GET', 'https://api.vk.com/method/groups.getById?group_ids='+domain+'&access_token='+token+'&v=5.92');
group_id = JSON.parse(group_id.getBody('utf8'));
group_id="-"+group_id["response"][0]["id"];

var post_id = request('GET', 'https://api.vk.com/method/newsfeed.get?filters=post&source_ids='+group_id+'&count=1&access_token='+token+'&v=5.92');
post_id = JSON.parse(post_id.getBody('utf8'));
post_id = post_id["response"]["items"][0]["post_id"];

setInterval(function(){
	var new_post_id = request('GET', 'https://api.vk.com/method/newsfeed.get?filters=post&source_ids='+group_id+'&count=1&access_token='+token+'&v=5.92');
	new_post_id = JSON.parse(new_post_id.getBody('utf8'));
	new_post_id = new_post_id["response"]["items"][0]["post_id"];
	
	 if(post_id != new_post_id){
		var message = messages[Math.floor(Math.random() * messages.length)];
            console.log("NEW POST!");
            console.log("SENDING...");
            request('GET','https://api.vk.com/method/wall.createComment?owner_id='+group_id+'&post_id='+new_post_id+'&message='+message+'&access_token='+token+'&v=5.92');
            console.log("MESSAGE SENT!");
            post_id = new_post_id;
        }

},500)
   
