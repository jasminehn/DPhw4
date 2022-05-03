if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    // Hide favorites list on load
    document.getElementsByClassName('fav-list')[0].style.display = 'none'
    //document.getElementById().style.display = 'none'

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