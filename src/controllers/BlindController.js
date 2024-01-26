import PlayListRepository from "../repository/PlayListRepository.js";

class BlindController {

    index(req, res) {
        PlayListRepository.find({}, {_id:1, name:1, songs:1}).then((playlists) => {
            res.render('blind/index', {playlists});
        });
    }

    blindTest(req, res) {
        if(req.params.id != undefined) {
            PlayListRepository.findOne({ _id: req.params.id }).then((playlist) => {
                res.render('blind/test', { playlist })
            })
        } else {
            req.flash('error', 'Une erreur est survenue !')
            res.redirect('/blind')
        }
    }
}

export default new BlindController();