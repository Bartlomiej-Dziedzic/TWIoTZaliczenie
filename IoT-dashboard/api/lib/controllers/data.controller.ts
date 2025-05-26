import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from "express";
import { checkIdParam } from "../middlewares/deviceIdParam.middleware";
import DataService from "../modules/services/data.service";
import { config } from "../config";

class DataController implements Controller {
    public path = "/api/data";
    public router = Router();
    public dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id/latest`, checkIdParam, this.getLatestDeviceData);
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.get(`${this.path}/:id`, checkIdParam, this.getAllDeviceData);
        this.router.post(`${this.path}/:id`, checkIdParam, this.addData);
        this.router.delete(`${this.path}/:id`, checkIdParam, this.cleanDeviceData);
        this.router.delete(`${this.path}/all`, this.cleanAllDevices);
    }

    private getLatestDeviceData = async (request: Request, response: Response) => {
        const { id } = request.params;
        try {
            const data = await this.dataService.get(id);
            if (!data) {
                return response.status(404).json({ message: "No data from this device" });
            }
            response.status(200).json(data);
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }
    };

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response) => {
        try {
            const data = await this.dataService.getAllNewest();
            response.status(200).json(data);
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }
    };

    private getAllDeviceData = async (request: Request, response: Response) => {
        const { id } = request.params;
        const data = await this.dataService.query(id);
        response.status(200).json(data);
    };

    private addData = async (request: Request, response: Response) => {
        const { air } = request.body;
        const { id } = request.params;

        const data = {
            temperature: air[0].value,
            pressure: air[1].value,
            humidity: air[2].value,
            deviceId: Number(id),
            readingDate: new Date(),
        };

        try {
            await this.dataService.createData(data);
            response.status(200).json(data);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: "Invalid input data." });
        }
    };

    private cleanDeviceData = async (request: Request, response: Response) => {
        const { id } = request.params;
        try {
            const result = await this.dataService.deleteData(id);
            response.status(200).json({ message: "Device data deleted.", result });
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }
    };

    private cleanAllDevices = async (request: Request, response: Response) => {
        try {
            const results = await Promise.all(Array.from({ length: config.supportedDevicesNum }, (_, i) => this.dataService.deleteData(i.toString())));
            response.status(200).json({ message: "All device data deleted", results });
        } catch (error: any) {
            response.status(500).json({ error: error.message });
        }
    };
}

export default DataController;
