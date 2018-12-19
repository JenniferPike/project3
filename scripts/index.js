//user can click on type of animal photo
//user can
// ask person for gender/age/size/good with/care and behaviour/ coat length/ color 
//more details age/breed/ days on petfinder/ shelter or rescue/
// print out list of dog suggestions
// say you should meet petey!
function getpronoun(morf){
	if(morf === 'M'){
		return "his"
	}else{
		return "her"
	};
};


$(function(){
	const petApp = {
		apiKey:"d38b91fb79747c074263e655b794ca2a",
		apiSecret:"c5fb3a76d6c4da6c73315117ac46d76d"
	};

	petApp.getRandom = function(e){
		e.preventDefault();
		console.log(this.gender.value)
		$.ajax({
			url:'http://api.petfinder.com/pet.getRandom',
			method:'GET',
			dataType:'jsonp',
			data:{
				key:petApp.apiKey,
				format:'json',
				animal:this.animal.value,
				size:this.size.value,
				sex:this.gender.value,
				output:'basic'
			}
		}).done(function(response){
			const randomAnimal = response.petfinder.pet;
			const animal = randomAnimal.animal.$t;
			const sex = randomAnimal.sex.$t;
			const breed = randomAnimal.breeds.breed;
			const animalName = randomAnimal.name.$t;
			const animalDescription = randomAnimal.description.$t;
			const hasPhotos = randomAnimal.media.photos;
			

			$('h1.dogName').text(`${animalName}`);
			
			if(animalDescription){
				$('p.dogDescription').text(`${animalDescription}`).css("font-size","20px");
			}else{
				$('p.dogDescription').text(`This ${animal} has not wrote ${getpronoun(sex)} biography yet! 🐶`).css("font-size","20px");
			};

			if(Array.isArray(breed)){
				const mixedBreed = breed.map(function(breed){
					return breed.$t;
				});
				$('p.dogBreed').text(mixedBreed.join('/')).css("font-size","30px");
			}else{
				$('p.dogBreed').text(`${breed.$t}`).css("font-size","30px");
			};

			if(hasPhotos){
				const animalPhotos = randomAnimal.media.photos.photo;
				$('div.animalPhoto').html(`<img src="${animalPhotos[0].$t}" alt="${animalName}">`)
			};
			console.log(randomAnimal);
			
		});
	};

	$('form.buttons').on('submit', petApp.getRandom);

	
});




// $(function(){
// 		const petApp = {
// 			apiKey:"d38b91fb79747c074263e655b794ca2a",
// 			apiSecret:"c5fb3a76d6c4da6c73315117ac46d76d"
// 		};

// 	petApp.listBreeds = function(string){
// 		$.ajax({
// 		url:'http://api.petfinder.com/breed.list',
// 		method:'GET',
// 		dataType:'jsonp',
// 		data: {
// 			key:petApp.apiKey,
// 			format:'json',
// 			animal:'dog'
// 		}
// 		}).done(function(response){
			
// 			const breedArray = response.petfinder.breeds.breed;

// 			breedArray.forEach(function(breedObj){
// 				const breed = breedObj.$t
// 				const listBreedsHtml = $('ul.dogBreeds').append(`<li>${breed}</li>`);
// 			});
// 		});
// 	};
	
// 	petApp.listBreeds()
		
// 	});