//toggle the menu burger in the navbar (_nav.html.twig ->the navbar menu)
const toggleMenu = () => document.body.classList.toggle("open");

//get data songs from twig home.twig.html in JSON format
var arraySongs = document.getElementById("arraySongs");
var songs = arraySongs.dataset.songs;

//We use JSON.parse() to convert songs Array of JSON OBJECTS to a JavaScript array
if (typeof songs === "string") {
	songs = JSON.parse(songs);
}

//retrieve Categories from songs array
var songsByCategory = [];
songs.forEach((song) => {
	console.log(song.category);
	if (songsByCategory[song.category]) {
		songsByCategory[song.category].push(song);
	} else {
		songsByCategory[song.category] = [song];
	}
});

// Manage the selected category from the radio button in nav bar dropdown menu
var radioButtonSection = document.getElementsByName("category");
var selectedCategory = "All";
for (var i = 0; i < radioButtonSection.length; i++) {
	radioButtonSection[i].onclick = function () {
		console.log("selected category : " + this.value);

		if (selectedCategory != this.value) {
			selectedCategory = this.value;
			updateSwipper(selectedCategory);
		}
	};
}

//display swiper slide with update data from songs array (for each selected category)
const swiperSlideTemplate = document.querySelector(
	"[ data-swiperslide-template]"
);
const swiperWrapper = document.querySelector("[data-swiper-wrapper]");
const slideMusic = document.querySelector("[data-slide-music]");
const singePhoto = document.querySelector("[data-singer-image]");
const singerNom = document.querySelector("[data-singer-name]");
const musicTitle = document.querySelector("[data-music-title]");

//displayed all the songs in the slider by default
updateSwipper("all");

//function that update the displayed slider from the choosen catagory
function updateSwipper(category) {
	let songsToDisplay;
	if (category === "all") {
		songsToDisplay = this.songs;
	} else {
		songsToDisplay = this.songsByCategory[category];
	}
	swiperWrapper.innerHTML = "";
	songsToDisplay.forEach((song) => {
		const swiperSlide = swiperSlideTemplate.content
			.cloneNode(true)
			.querySelector("div");
		swiperSlide
			.querySelector("img")
			.setAttribute("src", "uploads/covers/" + song.cover);
		swiperSlide.querySelector("div.songDetails > h4").innerText =
			song.singerName;
		swiperSlide.querySelector("div.songDetails > p").innerText =
			song.musicTitle;

		//add a listener to call the playMusicFromSwiper function when the button -play- is clicked
		let playBtn = swiperSlide.querySelector(
			".buttonPlayContainer > button"
		);
		playBtn.addEventListener("click", () => {
			playMusicFromSwiper(song);
		});

		// handle the display of the favorite icon "heart" on each music card
		let favoriteHeart = swiperSlide.querySelector(
			".favoriteIconContainer > a"
		);
		if (favoriteHeart != undefined) {
			if (song.favorite) {
				favoriteHeart.setAttribute(
					"href",
					"/favorites/remove/" + song.id
				);
				favoriteHeart
					.querySelector("#favoriteIconHeart")
					.classList.add("fas");
			} else {
				favoriteHeart.setAttribute(
					"href",
					"/favorites/add/" + song.id
				);
				favoriteHeart
					.querySelector("#favoriteIconHeart")
					.classList.add("far");
			}
		}
		//add the music card in the swiper
		swiperWrapper.append(swiperSlide);
	});
}

//Add the Swiper JS Object
var swiper = new Swiper(".mySwiper", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true,
		loop: true,
	},
	pagination: {
		el: ".swiper-pagination",
	},
	on: {
		init: function () {},
	},
});

//test to retreive the data from each selected slider
swiper.on("transitionEnd", function () {
	console.log("*** mySwiper.realIndex", swiper.realIndex);
});

//The music Player
const thumbnail = document.getElementById("thumbnail");

//function that allows playing music while click in a play button
function playMusicFromSwiper(song) {
	const audio = document.getElementById("audio");
	document
		.querySelector("audio > source")
		.setAttribute("src", "uploads/audio/" + song.audio);
	document.getElementById("artist-name").innerText = song.singerName;
	document.getElementById("music-name").innerText = song.musicTitle;
	thumbnail.src = "uploads/covers/" + song.cover;

	//function for play and pause the audio player
	audio.load();
	audio.play();
	//change the pause play icon in the player -pause/play- button
	document
		.getElementById("play")
		.classList.remove("play-btn", "fa", "fa-solid", "fa-play");
	document
		.getElementById("play")
		.classList.add("pause-btn", "fa", "fa-pause");
	thumbnail.classList.add("active");
}
//add a eventListner to play-Pause button in order to change the icons and the cover rotation in every PLAY or PAUSE action
const audio = document.querySelector("#audio");
const playPauseButton = document.querySelector("#play");

playPauseButton.addEventListener("click", () => {
	if (audio.paused) {
		audio.play();
		document
			.getElementById("play")
			.classList.remove("play-btn", "fa", "fa-solid", "fa-play");
		document
			.getElementById("play")
			.classList.add("pause-btn", "fa", "fa-pause");
		thumbnail.classList.add("active");
	} else {
		audio.pause();
		document
			.getElementById("play")
			.classList.remove("pause-btn", "fa", "fa-pause");
		document
			.getElementById("play")
			.classList.add("play-btn", "fa", "fa-solid", "fa-play");
		thumbnail.classList.remove("active");
	}
});

//Add the music timer
var music = document.getElementById("audio");
var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");
var playhead = document.getElementById("elapsed");
var timeline = document.getElementById("slider");
var timer = document.getElementById("timer");
var duration;
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

music.addEventListener("timeupdate", timeUpdate, false);
music.addEventListener(
	"canplaythrough",
	function () {
		duration = music.duration;
	},
	false
);

//function that update the audio progress while the music is playing
function timeUpdate() {
	var playPercent = timelineWidth * (music.currentTime / duration);
	playhead.style.width = playPercent + "px";
	var totalsecondsIn = Math.floor(music.currentTime);
	var min = Math.floor(music.currentTime / 60);
	var secondsIn = Math.floor(totalsecondsIn - min * 60);

	console.log(min + " : " + secondsIn);

	if (min <= 9) {
		timer.innerHTML = "0" + min;
	} else {
		timer.innerHTML = min;
	}

	if (secondsIn <= 9) {
		timer.innerHTML += ":0" + secondsIn;
	} else {
		timer.innerHTML += ":" + secondsIn;
	}
}
