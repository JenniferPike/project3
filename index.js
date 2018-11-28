// ask person for gender/age/size/good with/care and behaviour/ coat length/ color 
//more details age/breed/ days on petfinder/ shelter or rescue/
// print out list of dog suggestions
// say you should meet petey!

$(function(){
		const petApp = {
			apiKey:"d38b91fb79747c074263e655b794ca2a",
			apiSecret:"c5fb3a76d6c4da6c73315117ac46d76d"
		};

	petApp.listBreeds = function(string){
		$.ajax({
		url:'http://api.petfinder.com/breed.list',
		method:'GET',
		dataType:'jsonp',
		data: {
			key:petApp.apiKey,
			format:'json',
			animal:'dog'
		}
		}).done(function(response){
			
			const breedArray = response.petfinder.breeds.breed;

			breedArray.forEach(function(breedObj){
				const breed = breedObj.$t
			const listBreedsHtml = $('ul.dogBreeds').append(`<li>${breed}</li>`);
			});
		});
	};
	
	petApp.listBreeds()
		
	});