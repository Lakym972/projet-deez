document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#newPlaylist').addEventListener('keyup', choicePlaylist);
    document.querySelector('#newPlaylist').addEventListener('dblclick', choicePlaylist);
})

function choicePlaylist(e) {
    console.log(e)
    // si on est sur le select
    if(e.type == 'change') {
        if(e.currentTarget.value != 0) {
            document.querySelector('#newPlaylist').value = '';
            document.querySelector('#newPlaylist').disabled = true;
        }
    } 
    // sinon on est sur le champ newPlaylist
    else  {
        document.querySelector('#newPlaylist').disabled = false;
        document.querySelector('#choicePlaylist').value="";
        if(e.type == 'dblclick') { 
            document.querySelector('#newPlaylist').focus();
        }        
    }
}