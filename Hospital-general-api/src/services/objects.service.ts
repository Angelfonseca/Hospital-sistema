import { get } from "http";
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
  try {
    const decodedResponsable = decodeURIComponent(responsable);
    const regex = new RegExp(decodedResponsable, 'i');
    const objects = await ObjectModel.find({ responsable: { $regex: regex } });

    if (!objects || objects.length === 0) {
      throw new Error('Objects not found for the specified responsible');
    }

    return objects;
  } catch (error) {
    throw new Error('Error retrieving objects by responsible');
  }
};



const generatePDF = async (id: string): Promise<Buffer> => {
  try {
    const data = await getObjectbyResponsable(id);

    // Crear el PDF en memoria
    const pdfBuffer = await createPDF(data);

    return pdfBuffer;
  } catch (error: any) {
    console.error('Error al generar el PDF:', error.message);
    throw new Error('Error al generar el PDF');
  }
};

const createPDF = async (objects: any[]): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const pdfDoc = new PDFDocument();
    const buffers: Buffer[] = [];

    pdfDoc.on('data', (chunk: any) => {
      buffers.push(chunk);
    });

    pdfDoc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

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
  });
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
const getObjectbyCode = async (code: string) => {
  try {
    if (!code) {
      throw new Error('Code parameter is required');
    }
    const div1 = code.split('-')[1];
    const div2 = code.split('-')[2];
    const objects = await ObjectModel.find({ cve_cabms: div1, consecutivo: div2 });
    return objects;
  } catch (error) {
    console.error('Error searching for objects:', error);
    throw new Error('Error searching for objects');
  }
}

const getObjectsByCode = async (codes: string[]) => {
  try {
    if (!codes || codes.length === 0) {
      throw new Error('Codes parameter is required');
    }
    
    const promises = codes.map(code => getObjectbyCode(code));
    const objects = await Promise.all(promises);

    return objects;
  } catch (error) {
    console.error('Error searching for objects:', error);
    throw new Error('Error searching for objects');
  }
}

    


export default { getObjects, createObject, getObject, updateObject, deleteObject, getObjectbyResponsable, findObjectsWithFieldFalse, generatePDF, createPDF, getObjectbyCode, getObjectsByCode};