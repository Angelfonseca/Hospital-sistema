
import { Object } from "../interfaces/objects.interface";
import ObjectModel from "../models/object.model";
import * as XLSX from 'xlsx';
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

const generateExcelbyResponsable = async (id: string): Promise<Buffer> => {
  try {
    const wb = XLSX.utils.book_new();
    const objects = await getObjectbyResponsable(id);

    // Crear matriz para almacenar datos, incluyendo nombres de columnas
    const data: any[][] = [
      [
        'Asignado',
        'Cve Cabms',
        'Consecutivo',
        'Descripción',
        'Costo',
        'Marca',
        'Modelo',
        'Serie',
        'Motor',
        'Descripción',
        'Recursos',
        'Responsable',
        'Ubicación',
        'Consumible',
        'Activo'
      ]
    ];

    objects.forEach((object: any) => {
      const rowData: any[] = [
        object.asignado,
        object.cve_cabms,
        object.consecutivo,
        object.descrip_bm,
        object.costo_bien,
        object.marca,
        object.modelo,
        object.serie,
        object.motor || '',
        object.descripcion || '',
        object.recursos,
        object.responsable,
        object.ubicacion,
        object.consumible,
        object.activo
      ];
      data.push(rowData);
    });

    // Crear una hoja con los datos
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Agregar la hoja al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte de objetos');

    // Escribir el libro de trabajo en un buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return buffer;
  } catch (error) {
    throw new Error('Error al generar el archivo Excel');
  }
};

const generateExcelbyCodes = async (codes: string[]): Promise<Buffer> => {
  if (!codes || codes.length === 0) {
    throw new Error('Codes parameter is required');
  }
  try {
    const wb = XLSX.utils.book_new();
    const objects = await getObjectsByCode(codes);

    const data: any[][] = [
      [
        'Asignado',
        'Cve Cabms',
        'Consecutivo',
        'Descripción',
        'Costo',
        'Marca',
        'Modelo',
        'Serie',
        'Motor',
        'Descripción',
        'Recursos',
        'Responsable',
        'Ubicación',
        'Consumible',
        'Activo'
      ]
    ];

    objects.forEach((object: any) => {
      const rowData: any[] = [
        object.asignado,
        object.cve_cabms,
        object.consecutivo,
        object.descrip_bm,
        object.costo_bien,
        object.marca,
        object.modelo,
        object.serie,
        object.motor || '',
        object.descripcion || '',
        object.recursos,
        object.responsable,
        object.ubicacion,
        object.consumible,
        object.activo
      ];
      data.push(rowData);
    });

    // Crear una hoja con los datos
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Agregar la hoja al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte de objetos');

    // Escribir el libro de trabajo en un buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return buffer;
  } catch (error) {
    throw new Error('Error al generar el archivo Excel');
  }
};

const getObjectsByCode = async (codes: string[]) => {
  try {
    if (!codes || codes.length === 0) {
      console.log('Codes parameter is required')
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






export default { getObjects, createObject, getObject, updateObject, deleteObject, getObjectbyResponsable, findObjectsWithFieldFalse, generateExcelbyResponsable, getObjectbyCode, getObjectsByCode, generateExcelbyCodes };