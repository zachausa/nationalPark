var parkDictionary = {};

function fetchData() {

	var rawTemplate = $('#thumbnail-template').html();

  $.get('https://nationalpark.firebaseio.com/parks/parks.json', function(parks) {
   parkDictionary = parks;
   // console.log(parks)

    for (var i = 0; i < parks.length; i++) {
    	var currentPark = parks[i];
    	var stampedTemplate = Mustache.render(rawTemplate, currentPark);
    	$('#cards-container').append(stampedTemplate);
    	// console.log(stampedTemplate);
    };

    buildDictionary(parks);
    bindEventListeners(); 
  });
}


// when card click occurs
function bindEventListeners() {
$('.card').click(function(e){
	var targetId= e.target.id;

	// console.log(targetWiki);

	var info = parkDictionary[targetId];

	// console.log(info);

	var rawTemplate = $('#lightbox-template').html();
	// console.log(rawTemplate);
	var stampedTemplate = Mustache.render(rawTemplate, info);	
	
	$('#lightbox-container').html(stampedTemplate);
	console.log(stampedTemplate);
	$('#lightbox-container').fadeIn();
	$('#mask').fadeIn();
});

	$('#mask').click(function(){
	  $('#lightbox-container').fadeOut();
	  $('#mask').fadeOut();
});
}	

function buildDictionary(parks) {
  for (var i = 0; i < parks.length; i++) {
    var currentPark = parks[i];
    console.log(currentPark);
    parkDictionary[currentPark.id] = currentPark;
    // console.log(currentPark);
  };
  
}

fetchData();
