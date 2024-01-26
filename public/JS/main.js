document.addEventListener('DOMContentLoaded', () => {    
    // Pour ne pas avoir l'écoute si l'utilisateur tape un espace dans la recherche
    document.querySelector("#keyword").addEventListener('keydown', (e) => e.stopPropagation())
    document.querySelector("#keyword").addEventListener('keyup', (e) => e.stopPropagation())

    // Ecouteur le champ name playlist
    document.querySelector('#newPlaylist').addEventListener('keyup', choicePlaylist);

    document.querySelectorAll('[data-music]').forEach((element) => {
        element.addEventListener('click', (event) => {        
            const current = event.currentTarget
  
            document.querySelector('.amazingaudioplayer-cover').src=current.dataset.cover;
            document.querySelector('.amazingaudioplayer-title').textContent=current.dataset.title;
            document.querySelector('.amazingaudioplayer-info').textContent=current.dataset.artist;
            document.querySelector('#waitSong').classList.remove('hide')

            document.querySelector("#id_rapid_api_deezer").value=current.dataset.id;
            document.querySelector("#title").value=current.dataset.title;
            document.querySelector("#artist_name").value=current.dataset.artist;
            document.querySelector("#cover").value=current.dataset.cover;
            document.querySelector("#preview").value=current.dataset.music;
 
            if(current.dataset.exists=='true') {
                document.querySelector('#not-exists').classList.add('hide')
                document.querySelector('#exists').classList.remove('hide')
                document.querySelector('.btn-action-favorite').classList.remove('hide')
            } else {
                document.querySelector('#exists').classList.add('hide')
                document.querySelector('#not-exists').classList.remove('hide')
                document.querySelector('.btn-action-favorite').classList.add('hide')
            }
            // Le son 
            const audioElement = document.getElementById('listenTopMusic');
            audioElement.src = current.dataset.music;
            audioElement.play();
        })
    });
    document.querySelector('#not-exists').addEventListener('click', saveSong);

    document.querySelector('#savingPlaylist').addEventListener('click', savingPlaylist);

    // Liste de playlist à l'ouverture de la Modal
    document.querySelector('#addFavorite').addEventListener('shown.bs.modal', () => {
        fetch('/admin/playlist/list').then(response => response.json()).then(response => {
            if(response.status=='ok') {                
                // On crée le select avec les playlist
                if (response.playlists && response.playlists.length > 0) {
                    let options = `<option value="">Sélectionnez une Playlist existante</option>`;
                    response.playlists.forEach(playlist => {
                        options += `<option value="${playlist.name}">${playlist.name}</option>`;
                    })
                    document.querySelector('#playlists').innerHTML =  `<hr><select class="form-control" id="choicePlaylist" placeholder="Nom de la playlist">${options}</select>`;
                    // Ecouteur d'évenement sur le select
                    document.querySelector('#choicePlaylist').addEventListener('change', choicePlaylist);
                }
            } else if(response.status=='ko') { 
                document.querySelector('#message').innerHTML = `<div class="alert alert-danger mt-2">${response.msg}</div>`;
                window.setTimeout(() => {  document.querySelector('#message').innerHTML =''; }, 3000)
            }
        });
    })
    
})

function savingPlaylist() {
    const formData = new FormData();
    formData.append('id_rapid_api_deezer', document.querySelector("#id_rapid_api_deezer").value);
    /* Il faut soit une option du select soit un contenu dans le champs newPlaylist */
    if(document.querySelector('#newPlaylist') && document.querySelector('#newPlaylist').value.trim() != "") {
        formData.append('playlist', document.querySelector('#newPlaylist').value.trim());
    } else if (document.querySelector('#choicePlaylist') && document.querySelector('#choicePlaylist').value != "") {
        formData.append('playlist', document.querySelector('#choicePlaylist').value.trim());
    }
    formData.append('is_ajax', "1");
    // On ferme la popup
    document.querySelector('#closeAddFavorite').click();

    fetch('/admin/playlist/add', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams([...formData.entries()])
        }
    ).then(response => response.json()).then(response => {
        if(response.status=='ok') {                
            document.querySelector('#message').innerHTML = `<div class="alert alert-success mt-2">${response.msg}</div>`;
            window.setTimeout(() => {  document.querySelector('#message').innerHTML =''; }, 3000)
        } else if(response.status=='ko') { 
            document.querySelector('#message').innerHTML = `<div class="alert alert-danger mt-2">${response.msg}</div>`;
            window.setTimeout(() => {  document.querySelector('#message').innerHTML =''; }, 3000)
        }
    });
}

function saveSong() {
    const formData = new FormData();
    formData.append('id_rapid_api_deezer', document.querySelector("#id_rapid_api_deezer").value);
    formData.append('title', document.querySelector("#title").value);
    formData.append('artist_name', document.querySelector("#artist_name").value);
    formData.append('cover', document.querySelector("#cover").value);
    formData.append('preview', document.querySelector("#preview").value);
    
    fetch('/admin/search', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams([...formData.entries()])
        }
    ).then(response => response.json()).then(response => {
        if(response.status=='ok') {
            document.querySelector(`[data-id="${response.id_rapid_api_deezer}"]`).dataset.exists = "true";
            document.querySelector('#not-exists').classList.add('hide')
            document.querySelector('#exists').classList.remove('hide')
            document.querySelector('.btn-action-favorite').classList.remove('hide')
            document.querySelector('#message').innerHTML = `<div class="alert alert-success mt-2">${response.msg}</div>`;
            window.setTimeout(() => {  document.querySelector('#message').innerHTML =''; }, 3000)
        }
    });
}

function choicePlaylist(e) {
    // si on est sur le select
    if(e.type == 'change') {
        if(e.currentTarget.value != 0) {
            document.querySelector('#newPlaylist').value = '';
            document.querySelector('#newPlaylist').readonly = "readonly";
            document.querySelector('#newPlaylist').classList.add('disabled');
        }
    } 
    // sinon on est sur le champ newPlaylist
    else  {
        document.querySelector('#newPlaylist').readonly = false;
        
        document.querySelector('#newPlaylist').classList.remove('disabled');
        document.querySelector('#choicePlaylist').value="";
        if(e.type == 'dblclick') { 
            document.querySelector('#newPlaylist').focus();
        }        
    }
}