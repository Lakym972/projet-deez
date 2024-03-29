import playlistRepo from "../repository/PlayListRepository.js";
import musicRepository from "../repository/MusicRepository.js";

class PlayListController {

    index(req, res) {
        if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
            musicRepository.findOne({id_rapi: req.params.id}).then((music) => {
                playlistRepo.find({}, {_id:0, name:1}).then((playlists) => {
                    res.render('playlist/index', {music, playlists})
                }).catch(() => {
                    res.render('playlist/index', {error: 'Une erreur est survenue !'})
                })
            })
        }
    }

    addPlaylist = async (req, res) => {
        let namePlaylist;
        if(req.body.name != undefined && req.body.name != '') {
            namePlaylist = req.body.name;
        } else if(req.body.name2 != undefined && req.body.name2 != '') {
            namePlaylist = req.body.name2;
        }
        if(namePlaylist && namePlaylist != '') {
            await playlistRepo.findOne({ name: namePlaylist }).then(async (result) => {
                // On crée la playlist si elle n'existe pas déjà
                if(result == null) {
                    const playlist = new playlistRepo();
                    playlist.name = namePlaylist;
                    playlist.songs = [];
                    playlist.user = req.session.user.username;
                    await playlist.save();
                }
            })
            musicRepository.findOne({id_rapi: req.params.id}).then((music) => {
                if(namePlaylist && music) {
                    playlistRepo.findOneAndUpdate({ name: namePlaylist }, {$addToSet: {songs: music}}).then(() => {
                        req.flash('notify', 'Musique ajoutée à votre playlist !');
                        res.redirect('/search');
                    }).catch(() => {
                        res.render('playlist/index', {error: 'Une erreur est survenue !'})
                    })
                } else {
                    res.render('playlist/index', {error: 'Cette musique n\'existe pas !'})
                }
            }).catch(() => {
                res.render('playlist/index', {error: 'Une erreur est survenue !'})
            })
        } else {
            res.render('playlist/index', {error: 'Veuillez entrer un nom de playlist !'})
        }
    }

}

export default new PlayListController();