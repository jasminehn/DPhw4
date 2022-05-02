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