import UserRepository from "../repository/UserRepository.js";
import bcrypt from "bcrypt";

class RegisterController {
    index(req, res) {
        res.render('register/index', {user : {}});
    }
    
    register(req, res) {
        const newUser = new UserRepository();
        newUser.username = req.body.username;
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.email = req.body.email;
        newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        newUser.save().then(() => {
            req.flash('notify', 'Votre compte a bien été crée !');
            res.redirect('/');
        })
    }
}

export default new RegisterController();