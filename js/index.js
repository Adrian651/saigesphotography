var config = {
	apiKey: "AIzaSyAVwxF_7YzK9ufnrsCXm3yUv2GyH5jey3E",
	authDomain: "saige-photo-f8fa5.firebaseapp.com",
	databaseURL: "https://saige-photo-f8fa5.firebaseio.com",
	projectId: "saige-photo-f8fa5",
	storageBucket: "saige-photo-f8fa5.appspot.com",
	messagingSenderId: "897695085028"
};
firebase.initializeApp(config);
var db = firebase.database();
db.ref('data/').once("value").then(function(data) {
	var items = data.val().carousel;
	//Push items in temporary array
	var array = [];
	for (var i in items) {
		if (items[i] === 'nil') continue;
		else array.push(items[i].link);
	}
	//randomize
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	for (var i in array) {
		$('.imgs').append(`
      <img alt="" src="` + array[i] + `"
      data-image= "` + array[i] + `" 
      data-description="` + array[i] + `">
    `);
	}
	//   var portfolio = data.val().portfolio;
	//   for(var i in portfolio){
	//     if(portfolio[i] === 'nil') continue;
	//     else {
	//       $('.port').append(`
	//         <img alt="" src="`+ portfolio[i].link+`"
	//          data-image= "`+portfolio[i].link+`" 
	//          data-description="`+i+`">
	//       `);
	//       }
	// }
	$("#about-me-photo").attr('src');
	var prices = data.val().pricing;
	for (var i in prices) {
		if (prices[i] === 'nil') continue;
		else if (i == 'Wedding') {
			$('.Span_Prices').append('<div class="hvrbox">' + '<img class="hvrbox-layer_bottom" src=" ' + prices[i].img + '">' + ' <div class="hvrbox-layer_top" onclick="showDiv()">' + ' <div class="hvrbox-text">' + '<i>Please contact me for Wedding session pricing.</i>' + '</div> </div> </div>');
		} else {
			$('.Span_Prices').append('<div class="hvrbox">' + '<img class="hvrbox-layer_bottom" src=" ' + prices[i].img + '">' + ' <div class="hvrbox-layer_top" onclick="showDiv()">' + ' <div class="hvrbox-text">' + ' ' + i + ' sessions starting at <i>$' + prices[i].price + '</i>' + ' </div> </div> </div>');
		}
	}
	jQuery("#gallery").unitegallery({
		gallery_theme: "slider",
		slider_control_zoom: false,
		gallery_width: 1000,
		gallery_height: 600,
	});
	// $("#gallery-2").unitegallery({
	//   gallery_theme: "carousel",
	//   // gallery_images_preload_type:"all",	
	// });

});