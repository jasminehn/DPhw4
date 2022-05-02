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
    //updateCartTotal()
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
            <td class="play-song"><i class="fa-solid fa-circle-play"></i></td>
            <td class="remove-item"><i class="fa-solid fa-trash"></i></td>
        </tr>
        `

    favListRow.innerHTML = favListRowContents
    //favListRow.getElementsByClassName('play-song')[0].addEventListener('click', playSong)
    favListRow.getElementsByClassName('remove-item')[0].addEventListener('click', removeItem)
}

function removeItem(event) {
    var buttonClicked = event.target
    console.log(buttonClicked.parentElement.parentElement)
    buttonClicked.parentElement.parentElement.remove()
}