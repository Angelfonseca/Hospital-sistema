
import { Object } from "../interfaces/objects.interface";
import ObjectModel from "../models/object.model";
import * as XLSX from 'xlsx';
const path = require('path');
import mongoose from 'mongoose';
import { get } from "http";




const getObjects = async () => {
  const objects = await ObjectModel.find();
  return objects;
};
const createObject = async (object: Object) => {
  const objectData = await ObjectModel.create(object)
  const objectCode = `${objectData.asignado}-${objectData.cve_cabms}-${objectData.consecutivo}`;
  const check = await getObjectbyCode(objectCode);
  if(check.length > 1){
    throw { status: 409, message: 'Error: El objeto ya existe!' };
  }
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
    console.log('buffer')

    return buffer;
  } catch (error) {
    throw new Error('Error al generar el archivo Excel');
  }
};

const generateExcelbyCodes = async (codes: string[]): Promise<Buffer> => {
  try {
    const wb = XLSX.utils.book_new();
    const objects = await getObjectsByCode(codes);
    console.log('inicvio de la funcion')
    console.log(objects[0])

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
    // console.log(objects)
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

    let codesData: any[] = []; // Explicitly define the type of codesData as an array of any type
    for (let index = 0; index < codes.length; index++) {
        const code = codes[index];
        const data = await getObjectbyCode(code);
        codesData.push(data[0]);
    }
    let response = [].concat(...codesData);
    return response;
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
    if (!objects) console.log("objeto no encontrado")
    return objects;
  } catch (error) {
    console.error('Error searching for objects:', error);
    throw new Error('Error searching for objects');
  }
}

const getIdbyCode = async (code: string) => {
    try {
      if (!code || typeof code !== 'string') { // Verificar si code es null, undefined o no es una cadena
        throw new Error('Code parameter is required and must be a string');
      }
      const parts = code.split('-');
      if (parts.length < 3) { // Verificar que el código tenga al menos 3 partes divididas por '-'
        throw new Error('Invalid code format');
      }
      const div1 = parts[1];
      const div2 = parts[2];
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
  let objectsIds: any[] = [];
  try {
    if (!codes || codes.length === 0) {
      throw new Error('Codes parameter is required');
    }
    for (let index = 0; index < codes.length; index++) {
      const code = codes[index];
      if (typeof code !== 'string' || code.trim() === '') {
        throw new Error('Invalid code format');
      }
      const id = await getIdbyCode(code);
      objectsIds.push(id);
    }
    return objectsIds;
  } catch (error) {
    throw new Error('Error searching for objects');
  }
}


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
    if (!code || typeof code !== 'string') {
      throw new Error('Code parameter is required and must be a string');
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
    return uniqueResponsables;
  } catch (error) {
    console.error('Error getting responsables:', error);
    throw new Error('Error getting responsables');
  }
}

const getUbicacionesofObjects = async () => {
  try {
    const objects = await getObjects();
    const ubicaciones = objects.map(object => object.ubicacion);

    // Normalizar las ubicaciones eliminando espacios adicionales y caracteres no deseados
    const normalizedUbicaciones = ubicaciones.map(ubicacion => {
      const trimmedUbicacion = ubicacion.trim();
      const cleanedString = trimmedUbicacion.replace(/\s+/g, ' ');
      return cleanedString.toUpperCase(); // Convertir a mayúsculas para hacer la comparación más consistente
    });

    // Eliminar duplicados
    const uniqueNormalizedUbicaciones = Array.from(new Set(normalizedUbicaciones));

    return uniqueNormalizedUbicaciones;
  } catch (error) {
    console.error('Error getting ubicaciones:', error);
    throw new Error('Error getting ubicaciones');
  }
}

const getObjectsfromUbicacion = async (ubicacion: string) => {
  try {
    const decodedUbicacion = decodeURIComponent(ubicacion);
    const regex = new RegExp(decodedUbicacion, 'i');
    const objects = await ObjectModel.find({ ubicacion: { $regex: regex } });

    if (!objects || objects.length === 0) {
      throw new Error('Objects not found for the specified responsible');
    }

    return objects;
  } catch (error) {
    throw new Error('Error retrieving objects by responsible');
  }
};

const updateUbicacionwithCode = async (id: string, ubicacion: string) => {
  if (!id || !ubicacion) throw new Error('ID and ubicacion parameters are required');
  try {
    const object = await ObjectModel.findByIdAndUpdate(id, { ubicacion }, { new: true });
    if (!object) throw new Error('Object not found');
    return object;
  } catch (error) {
    console.error('Error updating objects:', error);
    throw new Error('Error updating objects');
  }
};

const updateUbicacionofObjects = async (codes: string[], ubicacion: string) => {
  try {
    if (!codes || codes.length === 0) throw new Error('Codes parameter is required');
    const ids = await getIdsbyCodes(codes);
    if (!ids || ids.length === 0) throw new Error('No valid IDs found for the given codes');
    const objects = await Promise.all(ids.map(id => updateUbicacionwithCode(id.toString(), ubicacion)));
    console.log('Updated objects:', objects); // Log the updated objects
    return objects.filter(obj => obj !== null);
  } catch (error) {
    console.error('Error updating objects:', error);
    throw new Error('Error updating objects');
  }
};

export default { getObjects,updateUbicacionofObjects ,getIdsbyCodes, createObject,getObjectsfromUbicacion, getObject, updateObject, deleteObject, getObjectbyResponsable, findObjectsWithFieldFalse,getResponsablesofObjects, generateExcelbyResponsable, getObjectbyCode, getObjectsByCode, generateExcelbyCodes, updateResponsableofObjects, updateResponsablewithCode, updateObjectsbyCodes, updateObjectbyCode, getUbicacionesofObjects};