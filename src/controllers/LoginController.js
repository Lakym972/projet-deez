

class LoginController {

    index(req, res) {
        res.render('login/index')
    }

}

export default new LoginController();