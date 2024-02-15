import { Request, Response } from 'express';
import objectsService from '../services/objects.service';
import { handleHttp } from "../utils/error.handle";
import { Object } from '../interfaces/objects.interface';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { table } from 'table';
import path from 'path';

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

const getObjectsWithFieldFalse = async (req: Request, res: Response) => {
  try {
      const objects = await objectsService.findObjectsWithFieldFalse();
      res.status(200).json(objects);
  } catch (error) {
      console.error('Error al obtener objetos con campo "activo" igual a false:', error);
      res.status(500).json({ error: 'Error al obtener objetos' });
  }
};

const generatePDF = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await objectsService.getObjectbyResponsable(id);

    const pdfDoc = new PDFDocument();
    const filePath = 'output.pdf'; // Ruta relativa
    pdfDoc.pipe(fs.createWriteStream(filePath));

    // Añadir el contenido al PDF
    pdfDoc.font('Helvetica-Bold').fontSize(14).text('Reporte de objetos', { align: 'center' });
    pdfDoc.moveDown(); // Bajar una línea
    data.forEach((object: any) => {
      pdfDoc.text(`Asignado: ${object.asignado}`);
      pdfDoc.text(`Cve Cabms: ${object.cve_cabms}`);
      pdfDoc.text(`Consecutivo: ${object.consecutivo}`);
      pdfDoc.text(`Descripción: ${object.descrip_bm}`);
      pdfDoc.text(`Costo: ${object.costo_bien}`);
      pdfDoc.text(`Marca: ${object.marca}`);
      pdfDoc.text(`Modelo: ${object.modelo}`);
      pdfDoc.text(`Serie: ${object.serie}`);
      pdfDoc.text(`Motor: ${object.motor || ''}`);
      pdfDoc.text(`Descripción: ${object.descripcion || ''}`);
      pdfDoc.text(`Recursos: ${object.recursos}`);
      pdfDoc.text(`Responsable: ${object.responsable}`);
      pdfDoc.moveDown(); // Bajar una línea
    });

    pdfDoc.end();

    // Obtener la ruta absoluta del archivo
    const absolutePath = path.resolve(filePath);

    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
    res.sendFile(absolutePath); // Enviar el archivo con la ruta absoluta
    console.log('PDF generado correctamente');
  } catch (error: any) {
    console.error('Error generating PDF:', error.message);
    handleHttp(res, 500, 'Error generating PDF');
  }
};





export default {
  getObjects,
  createObject,
  getObject,
  updateObject,
  deleteObject,
  getObjectbyResponsable,
  getObjectsWithFieldFalse,
  generatePDF,
};
