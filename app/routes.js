import homeController from "../src/controllers/HomeController.js";


export default (app) => {

    app.get('/', (req, res) => {
        homeController.index(req, res);
    });
}