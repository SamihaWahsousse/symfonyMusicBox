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
///////////////////////////:
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

/*Exemple2

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const progressBar = document.querySelector(".progress");

playBtn.addEventListener("click", () => {
	audio.play();
});

pauseBtn.addEventListener("click", () => {
	audio.pause();
});

audio.addEventListener("timeupdate", () => {
	const currentTime = audio.currentTime;
	const duration = audio.duration;
	progressBar.style.width = `${(currentTime / duration) * 100}%`;/*
});

// /* Music  player js
// ======================================*/

// var playlist = [
// 	{
// 		song: "House of the Rising Sun",
// 		album: "The Animals",
// 		artist: "The Animals",
// 		artwork:
// 			"http://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Rising_sun_animals_US.jpg/220px-Rising_sun_animals_US.jpg",
// 		mp3: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3",
// 	},
// 	{
// 		song: "Superstition",
// 		album: "Talking Book",
// 		artist: "Stevie Wonder",
// 		artwork: "https://i.imgur.com/Py4XcBT.png",
// 		mp3: "http://vocaroo.com/media_command.php?media=s1WYNvqulYH9&command=download_mp3",
// 	},
// 	{
// 		song: "I Need You Back",
// 		album: "Premiere",
// 		artist: "The Noisy Freaks",
// 		artwork:
// 			"http://i1285.photobucket.com/albums/a583/TheGreatOzz1/Hosted-Images/Noisy-Freeks-Image_zps4kilrxml.png",
// 		mp3: "http://kirkbyo.net/Assets/The-Noisy-Freaks.mp3",
// 	},
// ];

// /* General Load / Variables
// ======================================*/
// var rot = 0;
// var duration;
// var playPercent;
// var rotate_timer;
// var armrot = -45;
// var bufferPercent;
// var currentSong = 0;
// var arm_rotate_timer;
// var arm = document.getElementById("arm");
// var next = document.getElementById("next");
// var song = document.getElementById("song");
// var timer = document.getElementById("timer");
// var music = document.getElementById("music");
// var album = document.getElementById("album");
// var artist = document.getElementById("artist");
// var volume = document.getElementById("volume");
// var playButton = document.getElementById("play");
// var timeline = document.getElementById("slider");
// var playhead = document.getElementById("elapsed");
// var previous = document.getElementById("previous");
// var pauseButton = document.getElementById("pause");
// var bufferhead = document.getElementById("buffered");
// var artwork = document.getElementsByClassName("artwork")[0];
// var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
// var visablevolume = document.getElementsByClassName("volume")[0];

// music.addEventListener("ended", _next, false);
// music.addEventListener("timeupdate", timeUpdate, false);
// music.addEventListener("progress", bufferUpdate, false);
// load();

// /* Functions
// ======================================*/
// function load() {
// 	pauseButton.style.visibility = "hidden";
// 	// song.innerHTML = playlist[currentSong]["song"];
// 	// song.title = playlist[currentSong]["song"];
// 	// album.innerHTML = playlist[currentSong]["album"];
// 	// album.title = playlist[currentSong]["album"];
// 	// artist.innerHTML = playlist[currentSong]["artist"];
// 	// artist.title = playlist[currentSong]["artist"];
// 	artwork.setAttribute(
// 		"style",
// 		"background:url(../img/vinyle.png), url('" +
// 			playlist[currentSong]["artwork"] +
// 			"') center no-repeat;"
// 	);
// 	music.setAttribute('type="audio/mp3"');
// 	// '<source src="' +
// 	// playlist[currentSong]["mp3"] +
// 	// '" type="audio/mp3">';
// 	music.load();
// }
// function reset() {
// 	rotate_reset = setInterval(function () {
// 		Rotate();
// 		if (rot == 0) {
// 			clearTimeout(rotate_reset);
// 		}
// 	}, 1);
// 	fireEvent(pauseButton, "click");
// 	armrot = -45;
// 	playhead.style.width = "0px";
// 	bufferhead.style.width = "0px";
// 	timer.innerHTML = "0:00";
// 	music.innerHTML = "";
// 	//pour tester depuis twig avec des valeurs dynamique
// 	// currentSong = 0; // set to first song, to stay on last song: currentSong = playlist.length - 1;
// 	// song.innerHTML = playlist[currentSong]["song"];
// 	// song.title = playlist[currentSong]["song"];
// 	// album.innerHTML = playlist[currentSong]["album"];
// 	// album.title = playlist[currentSong]["album"];
// 	// artist.innerHTML = playlist[currentSong]["artist"];
// 	// artist.title = playlist[currentSong]["artist"];
// 	// artwork.setAttribute(
// 	// 	// "style",
// 	// 	// "background:url(../img/vinyle.png), url('" +
// 	// 	// 	playlist[currentSong]["artwork"] +
// 	// 	// 	"') center no-repeat;"
// 	// );
// 	// music.innerHTML =
// 	// 	'<source src="' +
// 	// 	playlist[currentSong]["mp3"] +
// 	// 	'" type="audio/mp3">';
// 	music.load();
// }

// function formatSecondsAsTime(secs, format) {
// 	var hr = Math.floor(secs / 3600);
// 	var min = Math.floor((secs - hr * 3600) / 60);
// 	var sec = Math.floor(secs - hr * 3600 - min * 60);
// 	if (sec < 10) {
// 		sec = "0" + sec;
// 	}
// 	return min + ":" + sec;
// }
// function timeUpdate() {
// 	bufferUpdate();
// 	playPercent = timelineWidth * (music.currentTime / duration);
// 	playhead.style.width = playPercent + "px";
// 	timer.innerHTML = formatSecondsAsTime(music.currentTime.toString());
// }
// function bufferUpdate() {
// 	bufferPercent = timelineWidth * (music.buffered.end(0) / duration);
// 	bufferhead.style.width = bufferPercent + "px";
// }
// function Rotate() {
// 	if (rot == 361) {
// 		artwork.style.transform = "rotate(0deg)";
// 		rot = 0;
// 	} else {
// 		artwork.style.transform = "rotate(" + rot + "deg)";
// 		rot++;
// 	}
// }
// function RotateArm() {
// 	if (armrot > -12) {
// 		arm.style.transform = "rotate(-38deg)";
// 		armrot = -45;
// 	} else {
// 		arm.style.transform = "rotate(" + armrot + "deg)";
// 		armrot = armrot + 26 / duration;
// 	}
// }
// function fireEvent(el, etype) {
// 	if (el.fireEvent) {
// 		el.fireEvent("on" + etype);
// 	} else {
// 		// var evObj = document.createEvent("Events");
// 		var evObj = new Event(etype, {
// 			bubbles: true,
// 			cancelable: false,
// 		});
// 		// evObj.initEvent(etype, true, false);
// 		el.dispatchEvent(evObj);
// 	}
// 	// // create a look event that bubbles up and cannot be canceled
// 	// var evt = new Event("look", {"bubbles":true, "cancelable":false});
// 	// document.dispatchEvent(evt);

// 	// // event can be dispatched from any element, not only the document
// 	// myDiv.dispatchEvent(evt);
// }
// function _next() {
// 	if (currentSong == playlist.length - 1) {
// 		reset();
// 	} else {
// 		fireEvent(next, "click");
// 	}
// }
// playButton.onclick = function () {
// 	music.play();
// };
// pauseButton.onclick = function () {
// 	music.pause();
// };
// music.addEventListener(
// 	"play",
// 	function () {
// 		playButton.style.visibility = "hidden";
// 		pause.style.visibility = "visible";
// 		rotate_timer = setInterval(function () {
// 			if (!music.paused && !music.ended && 0 < music.currentTime) {
// 				Rotate();
// 			}
// 		}, 10);
// 		if (armrot != -45) {
// 			arm.setAttribute("style", "transition: transform 800ms;");
// 			arm.style.transform = "rotate(" + armrot + "deg)";
// 		}
// 		arm_rotate_timer = setInterval(function () {
// 			if (!music.paused && !music.ended && 0 < music.currentTime) {
// 				if (armrot == -45) {
// 					arm.setAttribute("style", "transition: transform 800ms;");
// 					arm.style.transform = "rotate(-38deg)";
// 					armrot = -38;
// 				}
// 				if (arm.style.transition != "") {
// 					setTimeout(function () {
// 						arm.style.transition = "";
// 					}, 1000);
// 				}
// 				RotateArm();
// 			}
// 		}, 1000);
// 	},
// 	false
// );
// music.addEventListener(
// 	"pause",
// 	function () {
// 		arm.setAttribute("style", "transition: transform 800ms;");
// 		arm.style.transform = "rotate(-45deg)";
// 		playButton.style.visibility = "visible";
// 		pause.style.visibility = "hidden";
// 		clearTimeout(rotate_timer);
// 		clearTimeout(arm_rotate_timer);
// 	},
// 	false
// );
// next.onclick = function () {
// 	arm.setAttribute("style", "transition: transform 800ms;");
// 	arm.style.transform = "rotate(-45deg)";
// 	clearTimeout(rotate_timer);
// 	clearTimeout(arm_rotate_timer);
// 	playhead.style.width = "0px";
// 	bufferhead.style.width = "0px";
// 	timer.innerHTML = "0:00";
// 	music.innerHTML = "";
// 	arm.style.transform = "rotate(-45deg)";
// 	armrot = -45;
// 	if (currentSong + 1 == playlist.length) {
// 		currentSong = 0;
// 		music.innerHTML =
// 			'<source src="' +
// 			playlist[currentSong]["mp3"] +
// 			'" type="audio/mp3">';
// 	} else {
// 		currentSong++;
// 		music.innerHTML =
// 			'<source src="' +
// 			playlist[currentSong]["mp3"] +
// 			'" type="audio/mp3">';
// 	}
// 	song.innerHTML = playlist[currentSong]["song"];
// 	song.title = playlist[currentSong]["song"];
// 	album.innerHTML = playlist[currentSong]["album"];
// 	album.title = playlist[currentSong]["album"];
// 	artist.innerHTML = playlist[currentSong]["artist"];
// 	artist.title = playlist[currentSong]["artist"];
// 	artwork.setAttribute(
// 		"style",
// 		"transform: rotate(" +
// 			rot +
// 			"deg); background:url(../img/vinyle.png), url('" +
// 			playlist[currentSong]["artwork"] +
// 			"') center no-repeat;"
// 	);
// 	music.load();
// 	duration = music.duration;
// 	music.play();
// };
// previous.onclick = function () {
// 	arm.setAttribute("style", "transition: transform 800ms;");
// 	arm.style.transform = "rotate(-45deg)";
// 	clearTimeout(rotate_timer);
// 	clearTimeout(arm_rotate_timer);
// 	playhead.style.width = "0px";
// 	bufferhead.style.width = "0px";
// 	timer.innerHTML = "0:00";
// 	music.innerHTML = "";
// 	arm.style.transform = "rotate(-45deg)";
// 	armrot = -45;
// 	if (currentSong - 1 == -1) {
// 		currentSong = playlist.length - 1;
// 		music.innerHTML =
// 			'<source src="' +
// 			playlist[currentSong]["mp3"] +
// 			'" type="audio/mp3">';
// 	} else {
// 		currentSong--;
// 		music.innerHTML =
// 			'<source src="' +
// 			playlist[currentSong]["mp3"] +
// 			'" type="audio/mp3">';
// 	}
// 	song.innerHTML = playlist[currentSong]["song"];
// 	song.title = playlist[currentSong]["song"];
// 	album.innerHTML = playlist[currentSong]["album"];
// 	album.title = playlist[currentSong]["album"];
// 	artist.innerHTML = playlist[currentSong]["artist"];
// 	artist.title = playlist[currentSong]["artist"];
// 	artwork.setAttribute(
// 		"style",
// 		"transform: rotate(" +
// 			rot +
// 			"deg); background:url('/../img/vinyle.png/'), url('" +
// 			playlist[currentSong]["artwork"] +
// 			"') center ;"
// 	);
// 	music.load();
// 	duration = music.duration;
// 	music.play();
// };
// volume.oninput = function () {
// 	music.volume = volume.value;
// 	visablevolume.style.width = (80 - 11) * volume.value + "px";
// };
// music.addEventListener(
// 	"canplay",
// 	function () {
// 		duration = music.duration;
// 	},
// 	false
// );
