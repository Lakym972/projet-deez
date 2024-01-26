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
        PlayListRepository.findOne({ _id: req.params.id }).then(playlist => {
            res.render('admin/playlist_edit', { playlist })
        })
    }
    updatePlaylist(req, res) {
        PlayListRepository.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }).then(() => {
            req.flash('notify', 'Playlist mise à jour !');
            res.redirect('/admin/playlist_list')
        })
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