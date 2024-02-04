import { Request, Response } from 'express';
import objectsService from '../services/objects.service';
import { handleHttp } from "../utils/error.handle";

const getObjects = async (req: Request, res: Response) => {
  try {
    const objects = await objectsService.getObjects();
    res.status(200).json(objects);
  } catch (error: any) {
    handleHttp(res, error, "Error getting objects");
  }
};

const createObject = async (req: Request, res: Response) => {
  try {
    const object = req.body;
    const newObject = await objectsService.createObject(object);
    res.status(201).json(newObject);
  } catch (error: any) {
    handleHttp(res, error, "Error creating object");
  }
};

const getObject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const object = await objectsService.getObject(id);
    res.status(200).json(object);
  } catch (error: any) {
    handleHttp(res, error, "Error getting object");
  }
};

const updateObject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const object = req.body;
    const updatedObject = await objectsService.updateObject(id, object);
    res.status(200).json(updatedObject);
  } catch (error: any) {
    handleHttp(res, error, "Error updating object");
  }
};

const deleteObject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedObject = await objectsService.deleteObject(id);
    res.status(200).json(deletedObject);
  } catch (error: any) {
    handleHttp(res, error, "Error deleting object");
  }
};

const getObjectbyResponsable = async (req: Request, res: Response) => {
  try {
    const responsable = req.params.responsable;
    const objects = await objectsService.getObjectbyResponsable(responsable);
    res.status(200).json(objects);
  } catch (error: any) {
    handleHttp(res, error, "Error getting objects by responsable");
  }
};

const createPDF = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const objects = await objectsService.createPDF(id);
    res.status(200).json(objects);
  } catch (error: any) {
    handleHttp(res, error, "Error creating PDF");
  }
};

export default {
  getObjects,
  createObject,
  getObject,
  updateObject,
  deleteObject,
  getObjectbyResponsable,
  createPDF
};
