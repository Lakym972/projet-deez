import homeController from "../src/controllers/HomeController.js";
import blindController from "../src/controllers/BlindController.js";


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
}