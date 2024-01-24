import { search } from "../services/MusicService.js";

class AdminController {
    index(req, res) {
        res.render('admin/index');
    }
}

export default new AdminController();