import {search} from '../services/MusicService.js';

class HomeController {

    index(req, res) {

        if(req.query.search != "" && req.query.search != undefined) {
            search(req.query.search).then(musics => {
            res.render('home/index', {search: req.query.search, musics})
            });
        } else {
            res.render('home/index') 
        }
    }
}

export default new HomeController();