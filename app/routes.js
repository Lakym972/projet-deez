import homeController from "../src/controllers/HomeController.js";
import blindController from "../src/controllers/BlindController.js";
import registerController from "../src/controllers/RegisterController.js";
import loginController from "../src/controllers/LoginController.js";
import profilController from "../src/controllers/ProfilController.js";


export default (app) => {

    app.get('/', (req, res) => {
        homeController.index(req, res);
    });

    app.get('/search', (req, res) => {
        homeController.process(req, res);
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
}