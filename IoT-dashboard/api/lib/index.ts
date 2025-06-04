import App from "./app";
import DataController from "./controllers/data.controller";
import UserController from "./controllers/user.controller";
import DataService from "modules/services/data.service";
import Controller from "interfaces/controller.interface";
import UserService from "modules/services/user.service";
import PasswordService from "modules/services/password.service";
import TokenService from "modules/services/token.service";

const app: App = new App([])

function createControllers(): Controller[] {
    const dataService = new DataService();
    const userService = new UserService();
    const passwordService = new PasswordService();
    const tokenService = new TokenService();

 
    return [
         new UserController(userService, passwordService, tokenService),
         new DataController(dataService)
    ];
 }
 
 const controllers = createControllers();
 
 controllers.forEach((controller) => {
    app.app.use("/", controller.router);
 });
 
 
 app.listen()