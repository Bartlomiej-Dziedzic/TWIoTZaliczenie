import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { admin } from "../middlewares/admin.middleware";
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";

class UserController implements Controller {
    public path = "/api/user";
    public router = Router();
    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`, auth, this.removeHashSession);
        this.router.patch(`${this.path}/reset`, auth, this.resetPassword);
        this.router.get(`${this.path}/admin`, admin, this.isAdmin);
        this.router.delete(`${this.path}/removeTokens`, admin, this.removeTokens);
    }

    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const { login, password } = request.body;

        try {
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                response.status(401).json({ error: "Unauthorized" });
            }
            await this.passwordService.authorize(user.id, password);
            const token = await this.tokenService.create(user);
            response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({ error: "Unauthorized" });
        }
    };

    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password);
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword,
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: "Bad request", value: error.message });
        }
    };

    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.params;

        try {
            const result = await this.tokenService.remove(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({ error: "Unauthorized" });
        }
    };

    private resetPassword = async (request: Request, response: Response, next: NextFunction) => {
        const { email } = request.body;

        try {
            const user = await this.userService.getByEmailOrName(email);

            if (!user) {
                return response.status(404).json({ error: "User not found" });
            }

            const newPassword = "newpassword";
            const hashedPassword = await this.passwordService.hashPassword(newPassword);

            await this.passwordService.createOrUpdate({
                userId: user._id,
                password: hashedPassword,
            });

            response.status(200).json({ message: "Password reset", newPassword });
        } catch (error) {
            console.error(`Reset Password Error: ${error.message}`);
            response.status(500).json({ error: "Internal server error" });
        }
    };

    private isAdmin = async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json({ message: "You are an admin!" });
    };

    //w celach testu jest jako endpoint
    private removeTokens = async (request: Request, response: Response, next: NextFunction) => {
        try {
            await this.tokenService.removeExpiredTokens();
            return response.status(200).send("Expired tokens cleaned.");
        } catch (error) {
            return response.status(500).send("Failed to clean expired tokens.");
        }
    };
}

export default UserController;
