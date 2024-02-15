import { Object } from "../interfaces/objects.interface";
import ObjectModel from "../models/object.model";
import fs from 'fs';
import PDFDocument from 'pdfkit';



const path = require('path');


const getObjects = async () => {
  const objects = await ObjectModel.find();
  return objects;
};
const createObject = async (object: Object) => {
  const objectData = await ObjectModel.create(object)
  return objectData;
}
const getObject = async (id: string) => {
  const object = await ObjectModel.findById(id);
    if (!object) {
        throw new Error('Object not found');
    }
    return object;
}
const updateObject = async (id: string, object: Object) => {
  const objectData = await ObjectModel.findByIdAndUpdate(id, object, { new: true });
    if (!objectData) {
        throw new Error('Object not found');
    }
    return objectData;
}

const deleteObject = async (id: string) => {
  const object = await ObjectModel.findByIdAndDelete(id);
    if (!object) {
        throw new Error('Object not found');
    }
    return object;
}
const getObjectbyResponsable = async (responsable: string) => {
    const decodedResponsable = decodeURIComponent(responsable);
    const regex = new RegExp(decodedResponsable, 'i'); // 'i' para hacer la búsqueda insensible a mayúsculas y minúsculas
    const objects = await ObjectModel.find({ responsable: { $regex: regex } });

    if (!objects || objects.length === 0) {
        throw new Error('Object not found');
    }

    return objects;
}


const createPDF = async (objects: any[]): Promise<string> => {
    const pdfDoc = new PDFDocument();
    const filePath = 'output.pdf';
    pdfDoc.pipe(fs.createWriteStream(filePath));
  
    // Añadir el contenido al PDF
    pdfDoc.font('Helvetica-Bold').fontSize(14).text('Reporte de objetos', { align: 'center' });
    pdfDoc.moveDown(); // Bajar una línea
    objects.forEach((object: any) => {
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
  
    return filePath;
  };

const findObjectsWithFieldFalse = async () => {
    try {
        const objects = await ObjectModel.find({ activo: true });
        return objects;
    } catch (error) {
        console.error('Error al buscar objetos:', error);
        throw error;
    }
};

export default { getObjects, createObject, getObject, updateObject, deleteObject, getObjectbyResponsable, findObjectsWithFieldFalse, createPDF};