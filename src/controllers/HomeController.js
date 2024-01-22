import {search} from '../services/MusicService.js';

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
}

export default new HomeController();