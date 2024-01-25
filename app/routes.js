import homeController from "../src/controllers/HomeController.js";
import blindController from "../src/controllers/BlindController.js";
import registerController from "../src/controllers/RegisterController.js";
import loginController from "../src/controllers/LoginController.js";
import profilController from "../src/controllers/ProfilController.js";
import adminController from "../src/controllers/AdminController.js";
import playListController from "../src/controllers/PlayListController.js";


export default (app) => {

    app.get('/', (req, res) => {
        homeController.index(req, res);
    });

    app.get('/search', (req, res) => {
        homeController.process(req, res);
    });

    app.post('/search', (req, res) => {
        homeController.addMusic(req, res);
    });

    app.get('/blind', (req, res) => {
        blindController.index(req, res);
    });

    app.get('/register', (req, res) => {
        registerController.index(req, res);
    });

    app.post('/register', (req, res) => {
        registerController.register(req, res);
    });

    app.get('/login', (req, res) => {
        loginController.index(req, res);
    });

    app.post('/login', (req, res) => {
        loginController.login(req, res);
    });

    app.get('/login/a2f', (req, res) => {
        loginController.a2f(req, res);
    });

    app.post('/login/a2f', (req, res) => {
        loginController.a2fProcess(req, res);
    });

    app.get('/logout', (req, res) => {
        loginController.logout(req, res);
    });

    app.get('/profil', (req, res) => {
        profilController.index(req, res);
    });

    app.post('/profil', (req, res) => {
        profilController.process(req, res);
    });

    app.get('/admin', (req, res) => {
        adminController.index(req, res);
    });

    app.get('/admin/user_list', (req, res) => {
        adminController.userList(req, res);
    });

    app.get('/admin/music_list', (req, res) => {
        adminController.musicList(req, res);
    });

    app.get('/playlist/:id([0-9]+)', (req, res) => {
        playListController.index(req, res);
    });

    app.post('/playlist/:id([0-9]+)', (req, res) => {
        playListController.addPlaylist(req, res);
    });
}