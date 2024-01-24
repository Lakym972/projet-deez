import {search} from '../services/MusicService.js';
import MusicRepository from '../repository/MusicRepository.js';

class HomeController {

    index(req, res) {
        res.render('home/index')
    }

    process(req, res) {

        if(req.query.search != "" && req.query.search != undefined) {
            search(req.query.search).then(musics => {
            res.render('home/search', {search: req.query.search, musics})
            });
        } else {
            res.render('home/search')
        }
    }

    addMusic(req, res) {
        const newMusic = new MusicRepository();
        newMusic.id_rapi = req.body.id_rapi;
        newMusic.title = req.body.title;
        newMusic.cover = req.body.cover;
        newMusic.preview = req.body.preview;

        newMusic.save().then(() => {
            req.flash('notify', 'Musique ajoutée !');
            res.render('home/search', {search: req.query.search})

        }).catch((error) => {
            if(error.code == 11000 && error.keyPattern.id_rapi) {
                res.render('home/search', {error: 'Musique déja existante !'})
            } else {
                res.render('home/search', {error: 'Une erreur est survenue !'})
            }
        })

    }
}

export default new HomeController();