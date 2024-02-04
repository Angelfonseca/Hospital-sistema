import { Object } from "../interfaces/objects.interface";
import ObjectModel from "../models/object.model";
import fs from 'fs';
import PDFDocument from 'pdfkit';
import * as table from 'table';
import { handleHttp } from "../utils/error.handle";


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
    const objects = await ObjectModel.find({ responsable: responsable });

    if (!objects || objects.length === 0) {
        throw new Error('Object not found');
    }

    return objects;
}

const createPDF = async (id: string) => {
    try {
        const objects = await getObjectbyResponsable(id);

        if (!objects || objects.length === 0) {
            throw new Error('No objects found for the specified responsible');
        }

        const doc = new PDFDocument();
        const output = fs.createWriteStream('output.pdf');

        // Pipe the PDF to the output stream
        doc.pipe(output);

        // Add content to the PDF
        doc.fontSize(25).text('Bienvenido a nuestro PDF', { align: 'center' });

        // Convert objects to a 2D array for the table
        const data = objects.map(object => [
            object.asignado,
            object.cve_cabms,
            object.consecutivo.toString(),
            object.descrip_bm,
            object.costo_bien.toString(),
            object.marca,
            object.modelo,
            object.serie,
            object.motor || '',
            object.descripcion || '',
            object.recursos,
            object.responsable,
            object.ubicacion,
            object.consumible.toString(),
        ]);

        // Generate the table string without borders
        const tableString = table.table([['Asignado', 'Cve Cabms', 'Consecutivo', 'Descripción', 'Costo Bien', 'Marca', 'Modelo', 'Serie', 'Motor', 'Descripción', 'Recursos', 'Responsable', 'Ubicación', 'Consumible'], ...data], {
            border: table.getBorderCharacters('void'),
        });

        // Add the table to the PDF without borders
        doc.moveDown().text(tableString);

        // End the document
        doc.end();

        // Handle the end event to close the output stream
        output.on('finish', () => {
            console.log('PDF created successfully');
        });
    } catch (error: any) {
        console.error('Error creating PDF:', error.message);
    }
};
export default { getObjects, createObject, getObject, updateObject, deleteObject, getObjectbyResponsable, createPDF};