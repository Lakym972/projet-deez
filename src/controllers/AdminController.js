import { search } from "../services/MusicService.js";
import userRepository from "../repository/UserRepository.js";
import musicRepository from "../repository/MusicRepository.js";

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
}

export default new AdminController();