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
		init: function () {
			console.log("test");
		},
	},
});

swiper.on("transitionEnd", function () {
	console.log("*** mySwiper.realIndex", swiper.realIndex);
});

// const songs = document.getElementById("data-songs").dataset.songs;
const thumbnail = document.getElementById("thumbnail");
function playMusicFromSwiper(song) {
	// console.log("all songs " + JSON.stringify(songs));
	console.log("song : " + song);

	const audio = document.getElementById("audio");
	document
		.querySelector("audio > source")
		.setAttribute("src", "uploads/audio/" + song.audio);
	document.getElementById("artist-name").innerText = song.singerName;
	document.getElementById("music-name").innerText = song.musicTitle;

	thumbnail.src = "uploads/covers/" + song.cover;

	console.log(
		document.querySelector("audio > source").getAttribute("src")
	);

	audio.load();
	audio.play();
	document
		.getElementById("play")
		.classList.remove("play-btn", "fa", "fa-solid", "fa-play");
	document
		.getElementById("play")
		.classList.add("pause-btn", "fa", "fa-pause");
	thumbnail.classList.add("active");
}
///////////////////////////
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

//music timer
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

//favorit events

// const favoriteBtn = document.getElementById("favoriteIcon");
// favoriteBtn.addEventListener("click", function () {
// 	if (favoriteBtn.style.color === "white") {
// 		favoriteBtn.style.color = "#8f4da9";
// 	} else {
// 		favoriteBtn.style.color = "white";
// 	}
// });
