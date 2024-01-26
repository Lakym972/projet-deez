import { search } from "../services/MusicService.js";
import userRepository from "../repository/UserRepository.js";
import musicRepository from "../repository/MusicRepository.js";
import PlayListRepository from "../repository/PlayListRepository.js";

class AdminController {
    index(req, res) {
        res.render('admin/index');
    }

    userList(req, res) {
        userRepository.find({}).then(users => {
            res.render('admin/user_list', { users })
        })
    }

    musicList(req, res) {
        musicRepository.find({}).then(musics => {
            res.render('admin/music_list', { musics })
        })
    }

    playList(req, res) {
        PlayListRepository.find({}).then(playLists => {
            res.render('admin/playlist_list', { playLists })
        })
    }

    deletePlaylist(req, res) {
        PlayListRepository.findOneAndDelete({ _id: req.params.id }).then(() => {
            req.flash('notify', 'Playlist supprimee !')
            res.redirect('/admin/playlist_list')
        })
    }

    editPlaylist(req, res) {
        musicRepository.find({}).then(musics => {
            PlayListRepository.findOne({ _id: req.params.id }).then(playlist => {
                res.render('admin/playlist_edit', { playlist, musics })
            })
        })
    }
    async updatePlaylist(req, res) {
        if(req.body.songs && req.body.songs.length > 0) {
            let songs = [];
            let song;
            for(song of req.body.songs) {
                await musicRepository.findOne({ _id: song }).then((music) => {       
                    songs.push(music)         
                });
            }
            PlayListRepository.findOneAndUpdate({ _id: req.params.id }, { $set: { songs } }).then(() => {
                req.flash( 'notify', `La musique a bien été ajouté à la playlist !`);
                //res.redirect('/admin/playlist')
                res.redirect('/admin/playlist_list')
            })
        } else {
            req.flash( 'error', `Une erreur inconnue est survenu !`);
            //res.redirect('/admin/playlist')
            res.redirect('/admin/playlist/edit/'+req.params.id)
        }
    }

    newPlaylist(req, res) {
        res.render('admin/playlist_add')
    }

    addPlaylist(req, res) {
        PlayListRepository.create({ name: req.body.name, user: req.session.user.username}).then(() => {
            req.flash('notify', 'Playlist ajoutée !');
            res.redirect('/admin/playlist_list')
        })
    }
}

export default new AdminController();