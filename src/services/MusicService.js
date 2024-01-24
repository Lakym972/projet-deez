import fetch from "node-fetch";
import MusicRepository from "../repository/MusicRepository.js";

export function search(keyword) {

    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${keyword}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'e31231a806msh9df1a41cf9862d0p15ee48jsn09fca084335e',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };
    
    return fetch(url, options)
    .then(res => res.json())
    .then(json => 
       json.data.map(async (music) => {
        return {
          id_rapi : music.id, 
          title: music.title, 
          cover: music.album.cover_medium, 
          preview: music.preview,
          exist: (await MusicRepository.findOne({ id_rapi: music.id }) ? true : false)
        }
      })
    )
    .catch(err => console.error('error:' + err));
}
