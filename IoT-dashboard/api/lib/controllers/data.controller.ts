import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
 
    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.get(`${this.path}/:id`, this.getNumberById);
        this.router.get(`${this.path}/:id/latest`, this.getLargestNumber);
        this.router.get(`${this.path}/:id/:num`, this.getLastElementsOfArray);
        this.router.post(`${this.path}/:id`, this.addData);
        this.router.delete(`${this.path}/all`, this.deleteAllElements)
        this.router.delete(`${this.path}/:id`, this.deleteElement)
    }
 
    private getLatestReadingsFromAllDevices = async (request: Request, response: Response) => {
        response.json(testArr);
    }

    private getNumberById = async (request: Request, response: Response) => {
        const { id } = request.params
        const index = Number(id)-1
        if(isNaN(index))
        {
            response.status(400).send("ID must be a number");
            return;
        }
        else if(index < 0)
        {
            response.status(400).send("ID must be larger than 1");
            return;
        }
        else if(index >= testArr.length)
        {
            response.status(400).send("ID is bigger than array length");
            return;
        }
        else
        {
            response.json(testArr[index]);
            return;
        }
    }

    private getLargestNumber = async (request: Request, response: Response) => {
        const sortedArray = [...testArr].sort((a, b) => a < b ? 1:-1)
        response.json(sortedArray[0])
    }

    private getLastElementsOfArray = async (request: Request, response: Response) => {
        const { id, num } = request.params;
        const count = Number(num);
        if (isNaN(count) || count <= 0) 
        {
            response.status(400).send("Invalid number of elements requested.");
            return;
        }
        if (count > testArr.length) 
        {
            response.status(400).send("Requested more elements than available.");
            return;
        }
        const result = testArr.slice(-count);
        response.json(result);
    }

    private addData = async (request: Request, response: Response) => {
        const { id } = request.params
        const { elem } = request.body
        if(isNaN(elem))
        {
            response.status(400).send("Must be a number")
        }
        else
        {
            testArr.push(elem)
            response.status(200).send("Added element")
        }
        
    }

    private deleteAllElements = async (request: Request, response: Response) => {
        testArr = []
        response.status(200).send("Deleted all elements")
    }

    private deleteElement = async (request: Request, response: Response) => {
        const { id } = request.params
        const index = Number(id)-1
        if(isNaN(index))
        {
            response.status(400).send("ID must be a number");
            return;
        }
        else if(index < 0)
        {
            response.status(400).send("ID must be larger than 1");
            return;
        }
        else if(index >= testArr.length)
        {
            response.status(400).send("ID is bigger than array length");
            return;
        }
        else
        {
            testArr.splice(index, 1);
            response.status(200).send("Deleted element successfully");
            return;
        }
    }
 }
 
 export default DataController;
 