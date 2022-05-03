if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    // Hide favorites list on load
    document.getElementsByClassName('fav-list')[0].style.display = 'none'
    //hide subs on load
    document.getElementsByClassName('subs-page')[0].style.display = 'none'

    // Show/hide favorites list
    var toggleFavsBtn = document.getElementsByClassName('fav-button')[0]
    toggleFavsBtn.addEventListener('click', function() {
        favorites = document.getElementsByClassName('fav-list')[0]
        if (favorites.style.display == 'none') {
            favorites.style.display = 'block'
        }
        else if (favorites.style.display == 'block') {
            favorites.style.display = 'none'
        }
    })

    // Show/hide home and subscriptions
    // Show products, hide cart.
    var showHomePageBtn = document.getElementsByClassName('home-button')[0]
    showHomePageBtn.addEventListener('click', function() {
        home = document.getElementsByClassName('home-page')[0]
        subs = document.getElementsByClassName('subs-page')[0]
        if (home.style.display != 'block') {
            home.style.display = 'block'
        }
        if (subs.style.display != 'none') {
            subs.style.display = 'none'
        }
    })
    var showSubsPageBtn = document.getElementsByClassName('subs-button')[0]
    showSubsPageBtn.addEventListener('click', function() {
        home = document.getElementsByClassName('home-page')[0]
        subs = document.getElementsByClassName('subs-page')[0]
        if (subs.style.display != 'block') {
            subs.style.display = 'block'
        }
        if (home.style.display != 'none') {
            home.style.display = 'none'
        }
    })

    //listener for filters
    var decadeFilter = document.getElementById('decade')
    decadeFilter.addEventListener("change", function() {
        filterDecade(decadeFilter.value)
    })
    var genreFilter = document.getElementById('genre')
    genreFilter.addEventListener("change", function() {
        filterGenre(genreFilter.value)
    })
    var occasionFilter = document.getElementById('occasion')
    occasionFilter.addEventListener("change", function() {
        filterOccasion(occasionFilter.value)
    })

    //play song
    var playSongButtons = document.getElementsByClassName('play-song')
    for (var i = 0; i < playSongButtons.length; i++) {
        var button = playSongButtons[i]
        button.addEventListener('click', playSongClicked)
    }
    var playSongFromFavsButtons = document.getElementsByClassName('play-song-favs')
    for (var i = 0; i < playSongFromFavsButtons.length; i++) {
        var button = playSongFromFavsButtons[i]
        button.addEventListener('click', playSongFromFavsClicked)
    }

    //add to favorites
    var addToFavoritesButtons = document.getElementsByClassName('add-item')
    for (var i = 0; i < addToFavoritesButtons.length; i++) {
        var button = addToFavoritesButtons[i]
        button.addEventListener('click', addToFavoritesClicked)
    }

    //remove from favorites
    var removeItemButtons = document.getElementsByClassName('remove-item')
    for (var i = 0; i < removeItemButtons.length; i++) {
        var button = removeItemButtons[i]
        button.addEventListener('click', removeItem)
    }
}

function addToFavoritesClicked(event) {
    var button = event.target
    var song = button.parentElement.parentElement.parentElement
    var title = song.getElementsByClassName('song-title')[0].innerText
    var artist = song.getElementsByClassName('song-artist')[0].innerText
    var albumCover = song.getElementsByClassName('album-cover')[0].src
    addToFavorites(title, artist, albumCover)
}

function addToFavorites(title, artist, albumCover) {
    var tbodyRef = document.getElementById('favorites-table').getElementsByTagName('tbody')[0] //gets table element
    
    var favSongs = document.getElementById('favorites-table');
    var favSongNames = favSongs.getElementsByClassName('song-title')
    for (var i = 0; i < favSongNames.length; i++) {
        if (favSongNames[i].innerText == title) {
            console.log("YEET")
            alert('This song is already added to favorites')
            return
        }
    }

    var favListRow = tbodyRef.insertRow();

    //var cartRow = document.createElement('tr')
    favListRow.classList.add('fav-song')

    var favListRowContents = `
        <tr class="fav-song">
            <td>
                <img src="${albumCover}" class="album-cover">
            </td>
            <td>
                <p class="song-title">${title}</p>
                <p class="song-artist">${artist}</p>
            </td>
            <td class="play-song-favs"><i class="fa-solid fa-circle-play"></i></td>
            <td class="remove-item"><i class="fa-solid fa-trash"></i></td>
        </tr>
        `

    favListRow.innerHTML = favListRowContents
    favListRow.getElementsByClassName('play-song-favs')[0].addEventListener('click', playSongFromFavsClicked)
    favListRow.getElementsByClassName('remove-item')[0].addEventListener('click', removeItem)
}

function playSongClicked(event) {
    var button = event.target
    var song = button.parentElement.parentElement.parentElement
    var title = song.getElementsByClassName('song-title')[0].innerText
    var artist = song.getElementsByClassName('song-artist')[0].innerText
    var albumCover = song.getElementsByClassName('album-cover')[0].src
    playSong(title, artist, albumCover)
}

function playSongFromFavsClicked(event) {
    var button = event.target
    var song = button.parentElement.parentElement
    var title = song.getElementsByClassName('song-title')[0].innerText
    var artist = song.getElementsByClassName('song-artist')[0].innerText
    var albumCover = song.getElementsByClassName('album-cover')[0].src
    playSong(title, artist, albumCover)
}

function playSong(title, artist, albumCover){
    console.log('playing music')

    //restart song
    var audio = document.getElementsByClassName('song-progress')[0]
    audio.currentTime = 0

    //put song info in player
    var currentsong = document.getElementsByClassName('current-song')[0] //where to instert new stuff
    var newPlayingContents = `
        <img src="${albumCover}" class="album-cover">
        <div class="song-info">
            <p class="song-title">${title}</p>
            <p class="song-artist">${artist}</p>
        </div>
        `
    
    currentsong.innerHTML = newPlayingContents
}

function removeItem(event) {
    var buttonClicked = event.target
    //console.log(buttonClicked.parentElement.parentElement)
    buttonClicked.parentElement.parentElement.remove()
    
}

function filterDecade(decade){
    console.log(decade)

    var filterModernMusic = document.getElementsByClassName('modern-music')
    var filter90sMusic = document.getElementsByClassName('90s-music')
    var filter80sMusic = document.getElementsByClassName('80s-music')
    var filter70sMusic = document.getElementsByClassName('70s-music')
    var filter60sMusic = document.getElementsByClassName('60s-music')

    if(decade == 'modern'){
        for(var i = 0; i < filterModernMusic.length; i++){
            filterModernMusic[i].style.display = "block"; 
        }
        for(var i = 0; i < filter90sMusic.length; i++){
            filter90sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter80sMusic.length; i++){
            filter80sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter70sMusic.length; i++){
            filter70sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter60sMusic.length; i++){
            filter60sMusic[i].style.display = "none"; 
        }
    }
    if(decade == '90s'){
        for(var i = 0; i < filter90sMusic.length; i++){
            filter90sMusic[i].style.display = "block"; 
        }
        for(var i = 0; i < filterModernMusic.length; i++){
            filterModernMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter80sMusic.length; i++){
            //filter80sMusic[i].style.visibility = "hidden"; // or
            filter80sMusic[i].style.display = "none"; // depending on what you're doing
        }
        for(var i = 0; i < filter70sMusic.length; i++){
            filter70sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter60sMusic.length; i++){
            filter60sMusic[i].style.display = "none"; 
        }
    }
    if(decade == '80s'){
        for(var i = 0; i < filter80sMusic.length; i++){
            filter80sMusic[i].style.display = "block"; 
        }
        for(var i = 0; i < filterModernMusic.length; i++){
            filterModernMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter90sMusic.length; i++){
            filter90sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter70sMusic.length; i++){
            filter70sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter60sMusic.length; i++){
            filter60sMusic[i].style.display = "none"; 
        }
    }
    if(decade == '70s'){
        for(var i = 0; i < filter70sMusic.length; i++){
            filter70sMusic[i].style.display = "block"; 
        }
        for(var i = 0; i < filterModernMusic.length; i++){
            filterModernMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter90sMusic.length; i++){
            filter90sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter80sMusic.length; i++){
            filter80sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter60sMusic.length; i++){
            filter60sMusic[i].style.display = "none"; 
        }
    }
    if(decade == '60s'){
        for(var i = 0; i < filter60sMusic.length; i++){
            filter60sMusic[i].style.display = "block"; 
        }
        for(var i = 0; i < filterModernMusic.length; i++){
            filterModernMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter90sMusic.length; i++){
            filter90sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter80sMusic.length; i++){
            filter80sMusic[i].style.display = "none"; 
        }
        for(var i = 0; i < filter70sMusic.length; i++){
            filter70sMusic[i].style.display = "none"; 
        }
    }
}

function filterGenre(genre){
    var filterSoul = document.getElementsByClassName('soul-music')
    var filterRock = document.getElementsByClassName('rock-music')
    var filterPop = document.getElementsByClassName('pop-music')

    if(genre == 'soul'){
        for(var i = 0; i < filterSoul.length; i++){
            filterSoul[i].style.display = "block"; 
        }
        for(var i = 0; i < filterRock.length; i++){
            filterRock[i].style.display = "none"; 
        }
        for(var i = 0; i < filterPop.length; i++){
            filterPop[i].style.display = "none"; 
        }
    }
    if(genre == 'rock'){
        for(var i = 0; i < filterRock.length; i++){
            filterRock[i].style.display = "block"; 
        }
        for(var i = 0; i < filterSoul.length; i++){
            filterSoul[i].style.display = "none"; 
        }
        for(var i = 0; i < filterPop.length; i++){
            filterPop[i].style.display = "none"; 
        }
    }
    if(genre == 'pop'){
        for(var i = 0; i < filterPop.length; i++){
            filterPop[i].style.display = "block"; 
        }
        for(var i = 0; i < filterRock.length; i++){
            filterRock[i].style.display = "none"; 
        }
        for(var i = 0; i < filterSoul.length; i++){
            filterSoul[i].style.display = "none"; 
        }
    }
}

function filterOccasion(occasion){
    var filterParty = document.getElementsByClassName('party-music')
    var filterFuneral = document.getElementsByClassName('funeral-music')
    var filterWorkout = document.getElementsByClassName('workout-music')
    var filterStudy = document.getElementsByClassName('study-music')

    if(occasion == 'party'){
        for(var i = 0; i < filterParty.length; i++){
            filterParty[i].style.display = "block"; 
        }
        for(var i = 0; i < filterFuneral.length; i++){
            filterFuneral[i].style.display = "none"; 
        }
        for(var i = 0; i < filterWorkout.length; i++){
            filterWorkout[i].style.display = "none"; 
        }
        for(var i = 0; i < filterStudy.length; i++){
            filterStudy[i].style.display = "none"; 
        }
    }
    if(occasion == 'funeral'){
        for(var i = 0; i < filterFuneral.length; i++){
            filterFuneral[i].style.display = "block"; 
        }
        for(var i = 0; i < filterParty.length; i++){
            filterParty[i].style.display = "none"; 
        }
        for(var i = 0; i < filterWorkout.length; i++){
            filterWorkout[i].style.display = "none"; 
        }
        for(var i = 0; i < filterStudy.length; i++){
            filterStudy[i].style.display = "none"; 
        }
    }
    if(occasion == 'workout'){
        for(var i = 0; i < filterWorkout.length; i++){
            filterWorkout[i].style.display = "block"; 
        }
        for(var i = 0; i < filterFuneral.length; i++){
            filterFuneral[i].style.display = "none"; 
        }
        for(var i = 0; i < filterParty.length; i++){
            filterParty[i].style.display = "none"; 
        }
        for(var i = 0; i < filterStudy.length; i++){
            filterStudy[i].style.display = "none"; 
        }
    }
    if(occasion == 'study'){
        for(var i = 0; i < filterStudy.length; i++){
            filterStudy[i].style.display = "block"; 
        }
        for(var i = 0; i < filterFuneral.length; i++){
            filterFuneral[i].style.display = "none"; 
        }
        for(var i = 0; i < filterParty.length; i++){
            filterParty[i].style.display = "none"; 
        }
        for(var i = 0; i < filterWorkout.length; i++){
            filterWorkout[i].style.display = "none"; 
        }
    }
}

 //------------------------SALE------------------------------------
 //this shit is a mess o_0
 (function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "09/30/",
        birthday = dayMonth + yyyy;
    
    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end



    getCountdown();

    setInterval(function () { getCountdown(); }, 1000);
    
    const countDown = new Date(birthday).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
  
          document.getElementById("days").innerText = days,
            document.getElementById("hours").innerText = hours,
            document.getElementById("minutes").innerText = minutes,
            document.getElementById("seconds").innerText = seconds;
          //seconds
        }, 0)
    }());

var target_date = new Date().getTime() + (1000*3600*48); // set the countdown date
var days, hours, minutes, seconds; // variables for time units

getCountdown();
//setInterval(function () { getCountdown(); }, 1000);

function getCountdown(){

	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;

	days = pad( parseInt(seconds_left / 86400) );
	seconds_left = seconds_left % 86400;
		 
	hours = pad( parseInt(seconds_left / 3600) );
	seconds_left = seconds_left % 3600;
		  
	minutes = pad( parseInt(seconds_left / 60) );
	seconds = pad( parseInt( seconds_left % 60 ) );

	// format countdown string + set tag value
}

function pad(n) {
	return (n < 10 ? '0' : '') + n;
}

function emailSubscription() {
    let text;
    let person = prompt("Before viewing the subsriptions, please enter your email for 10% off:", "");
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      text = "Thank you! You will be receiving 837283 emails per day at " + person;
    }
    alert(text)
}

window.onload = function() {
    var pageTitle = document.title;
    var attentionMessage = '🔥 There\'s Still More Music 🔥';
    var blinkEvent = null;

    document.addEventListener('visibilitychange', function(e) {
        var isPageActive = !document.hidden;

        if(!isPageActive){
        blink();
        }else {
        document.title = pageTitle;
        clearInterval(blinkEvent);
        }
    })

    function blink(){
        blinkEvent = setInterval(function() {
        if(document.title === attentionMessage){
            document.title = pageTitle;
        }else {
            document.title = attentionMessage;
        }
        }, 100)
    }
}