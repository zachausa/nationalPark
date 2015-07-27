var parkDictionary = {};

function fetchData() {

	var rawTemplate = $('#thumbnail-template').html();

  $.get('https://nationalpark.firebaseio.com/parks.json', function(parks) {
   parkDictionary = parks;

    for (var i = 0; i < parks.length; i++) {
    	var currentPark = parks[i];
    	var stampedTemplate = Mustache.render(rawTemplate, currentPark);
    	$('#cards-container').append(stampedTemplate);
    };

    buildDictionary(parks);
    bindEventListeners(); 
  });
}


// when card click occurs
function bindEventListeners() {
$('.card').click(function(e){
	var targetWiki= e.target.wiki;
	var info = parkDictionary[targetWiki];
	// info.cast = info.cast.join(', ');
	// console.log(info);
	var rawTemplate = $('#lightbox-template').html();
	// console.log(rawTemplate);
	var stampedTemplate = Mustache.render(rawTemplate, info);	
	
	$('#lightbox-container').html(stampedTemplate);
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
    parkDictionary[currentPark.targetWiki] = currentPark;
  };
  
}

fetchData();
