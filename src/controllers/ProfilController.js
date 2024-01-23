import UserRepository from "../repository/UserRepository.js";
import qrcode from "qrcode";
import { authenticator } from "otplib";

class ProfilController {
    async index(req, res) {
        if(! req.session.user) {
            req.flash('info', 'Vous devez vous connecter !')
            res.redirect('/login')
            return;
        }
        let currentUser = await UserRepository.findOne({ email: req.session.user.email });
        if(currentUser) {
            if(currentUser.enable_a2f != true) {
                if(currentUser.a2f == undefined || currentUser.a2f == '') {
                    currentUser.a2f = authenticator.generateSecret();
                    await UserRepository.findOneAndUpdate({ email: req.session.user.email }, { a2f: currentUser.a2f });
                }
                qrcode.toDataURL(authenticator.keyuri(currentUser.email, 'top_music', currentUser.a2f), (err, url) => {
                    if(err) res.redirect('/');

                    res.render('profil/index', {
                        qrcode: url,
                        account: 'top_music',
                        key: currentUser.a2f,
                        user : {
                            username: currentUser.username,
                            email: currentUser.email,
                            firstname: currentUser.firstname,
                            lastname: currentUser.lastname,
                            roles: currentUser.roles
                        }
                    })
                })
            } else {
                res.render('profil/index', {
                    user : {
                        username: currentUser.username,
                        firstname: currentUser.firstname,
                        lastname: currentUser.lastname,
                        email: currentUser.email,
                        roles: currentUser.roles
                    }
                })
            }
        } else {
            res.render('login/index', { error: `Identifiants incorrects`,user: {email: req.body.email} });
        }
    }

    async process(req, res) {
        if(! req.session.user) {
            req.flash('info', 'Vous devez vous connecter !')
            res.redirect('/login')
            return;
        }
        let currentUser = await UserRepository.findOne({ email: req.session.user.email });
        if(currentUser) {
            const userData = {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
            req.flash('notify', 'Vos informations ont bien été mises à jour !');

            if(req.body.a2f && currentUser.enable_a2f != true) {
                console.log(currentUser.enable_a2f);
                if(authenticator.check(req.body.number_2fa, currentUser.a2f)) {
                    UserRepository.findOneAndUpdate({ email: req.session.user.email }, { enable_a2f: true });
                    currentUser.enable_a2f = true;
                    req.flash('notify', 'La double authentification a bien été active !');
                } else {
                    req.flash('error', 'La double authentification a échoué !');
                }
            }
            await UserRepository.findOneAndUpdate({ email: req.session.user.email }, userData);
            res.redirect('/profil');
        } else {
            res.render('login/index', { error: `Identifiants incorrects`,user: {email: req.body.email} });
        }
    }
}

export default new ProfilController();