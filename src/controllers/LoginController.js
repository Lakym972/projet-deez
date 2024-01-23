import UserRepository from "../repository/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

class LoginController {

    index(req, res) {
        res.render('login/index', { user: {} });
    }

    async login(req, res) {
        let currentUser = null;
        currentUser = await UserRepository.findOne({ $or: [{ email: req.body.email}, {username: req.body.email}] });

        if (currentUser) {
            if (bcrypt.compareSync(req.body.password, currentUser.password)) {
                if (currentUser.enable_a2f && currentUser.enable_a2f == true) {
                    req.session.user = {
                        username: currentUser.username,
                        email: currentUser.email,
                        roles: currentUser.roles,
                        conected: false
                    }
                    res.redirect('/a2f');
                } else {
                    req.session.user = {
                        username: currentUser.username,
                        email: currentUser.email,
                        roles: currentUser.roles,
                        conected: true
                    };
                    const token = jwt.sign({ email: currentUser.email }, process.env.JWT_SECRET);
                    const cookies = new Cookies(req, res);
                    cookies.set('jwt', token, { httpOnly: true });

                    req.flash('notify', 'Connexion reussie !');
                    res.redirect('/');
                }
            } else {
                res.render('login/index', { error: `Identifiants incorrects`,user: {email: req.body.email} });
            }
        }
    }

    logout(req, res) {
        req.session.user = null;
        const cookies = new Cookies(req, res);
        cookies.set('jwt', '', { expires: 0 });
        req.flash('notify', 'Deconnexion reussie !');
        res.redirect('/');
    }

}

export default new LoginController();