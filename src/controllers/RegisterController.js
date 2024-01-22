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
        }).catch((error) => {
            if(error.code == 11000 && error.keyPattern.email) {
                res.render('register/index', {user : newUser, error : `L'email ${error.keyValue.email} est déjà utilisé !`});
            } else if(error.code == 11000 && error.keyPattern.username) {
                res.render('register/index', {user : newUser, error : `Le nom d'utilisateur ${error.keyValue.username} est déjà utilisé !`});
            } else {
                res.render('register/index', {user : newUser, error : 'Une erreur est survenue !'});
            }
        })
    }
}

export default new RegisterController();