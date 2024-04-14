
import { Object } from "../interfaces/objects.interface";
import ObjectModel from "../models/object.model";
import * as XLSX from 'xlsx';
const path = require('path');
import mongoose from 'mongoose';




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
  try {
    const wb = XLSX.utils.book_new();
    const objects = await getObjectsByCode(codes);

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
    console.log(objects)
    return buffer;
  
  } catch (error: any) {
    console.log('Error al generar el archivo Excel:', error.message);
    throw new Error('Error al generar el archivo Excel');
    
  }
}

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

const getIdbyCode = async (code: string) => {
  try {
    if (!code) {
      throw new Error('Code parameter is required');
    }
    const div1 = code.split('-')[1];
    const div2 = code.split('-')[2];
    const object = await ObjectModel.findOne({ cve_cabms: div1, consecutivo: div2 });
    if (!object) {
      throw new Error('Object not found');
    }
    return object._id; // Se retorna el ID del objeto encontrado
  } catch (error) {
    console.error('Error searching for objects:', error);
    throw new Error('Error searching for objects');
  }
};

// Función para obtener los IDs de objetos a partir de un array de códigos
const getIdsbyCodes = async (codes: string[]) => {
  try {
    if (!codes || codes.length === 0) {
      throw new Error('Codes parameter is required');
    }
    const promises = codes.map(code => getIdbyCode(code));
    const ids = await Promise.all(promises);
    return ids;
  } catch (error) {
    console.error('Error searching for objects:', error);
    throw new Error('Error searching for objects');
  }
};

// Función para actualizar el responsable de un objeto dado su ID
const updateResponsablewithCode = async (id: string, responsable: string) => {
  if (!id || !responsable) {
    throw new Error('ID and responsable parameters are required');
  }
  try {
    const object = await ObjectModel.findByIdAndUpdate(id, { responsable }, { new: true });
    if (!object) {
      throw new Error('Object not found');
    }
    return object;
  } catch (error) {
    console.error('Error updating object:', error);
    throw new Error('Error updating object');
  }
};

const updateResponsableofObjects = async (codes: string[], responsable: string) => {
  try {
    if (!codes || codes.length === 0) {
      throw new Error('IDs parameter is required');
    }
    const ids = await getIdsbyCodes(codes);
    const promises = ids.map(id => updateResponsablewithCode(id.toString(), responsable)); 
    const objects = await Promise.all(promises);
    return objects;
  } catch (error) {
    console.error('Error updating objects:', error);
    throw new Error('Error updating objects');
  }
};

const updateObjectbyCode = async (code: string, object: Object) => {
  try {
    if (!code) {
      throw new Error('Code parameter is required');
    }
    const div1 = code.split('-')[1];
    const div2 = code.split('-')[2];
    const objectData = await ObjectModel.findOneAndUpdate({ cve_cabms: div1, consecutivo: div2 }, object, { new: true });
    if (!objectData) {
      throw new Error('Object not found');
    }
    return objectData;
  } catch (error) {
    console.error('Error updating object:', error);
    throw new Error('Error updating object');
  }
};

const updateObjectsbyCodes = async (codes: string[], object: Object) => {
  try {
    if (!codes || codes.length === 0) {
      throw new Error('Codes parameter is required');
    }
    const promises = codes.map(code => updateObjectbyCode(code, object));
    const objects = await Promise.all(promises);
    return objects;
  } catch (error) {
    console.error('Error updating objects:', error);
    throw new Error('Error updating objects');
  }
}
const getResponsablesofObjects = async () => {
  try {
    const objects = await getObjects();
    const responsables = objects.map(object => object.responsable);
    const uniqueResponsables = Array.from(new Set(responsables));
    for (let i = 0; i < uniqueResponsables.length; i++) {
      uniqueResponsables[i] = encodeURIComponent(uniqueResponsables[i]);
    }
    return uniqueResponsables;
  } catch (error) {
    console.error('Error getting responsables:', error);
    throw new Error('Error getting responsables');
  }
}

export default { getObjects, createObject, getObject, updateObject, deleteObject, getObjectbyResponsable, findObjectsWithFieldFalse,getResponsablesofObjects, generateExcelbyResponsable, getObjectbyCode, getObjectsByCode, generateExcelbyCodes, updateResponsableofObjects, updateResponsablewithCode, updateObjectsbyCodes, updateObjectbyCode };