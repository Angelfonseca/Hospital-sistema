import { Request, Response } from 'express';
import objectsService from '../services/objects.service';
import { handleHttp } from "../utils/error.handle";


const getObjects = async (req: Request, res: Response) => {
  try {
    const objects = await objectsService.getObjects();
    res.status(200).json(objects);
  } catch (error: any) {
    handleHttp(res, error, "Error getting objects");
    return new Error;
  }
};

const createObject = async (req: Request, res: Response) => {
  try {
    const object = req.body;
    const newObject = await objectsService.createObject(object);
    res.status(201).json(newObject);
  } catch (error: any) {
    handleHttp(res, error, "Error creating object");
    return new Error;
  }
};

const getObject = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Id parameter is required' });
  }
  try {
    const id = req.params.id;
    const object = await objectsService.getObject(id);
    res.status(200).json(object);
  } catch (error: any) {
    handleHttp(res, error, "Error getting object");
    return new Error;
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
    return new Error;
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

    if (!responsable || typeof responsable !== 'string') {
      return res.status(400).json({ error: 'Invalid responsable parameter' });
    }

    const objects = await objectsService.getObjectbyResponsable(responsable);

    res.status(200).json(objects);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error getting objects by responsable' });
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

const generateExcelbyResponsable = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const excelBuffer = await objectsService.generateExcelbyResponsable(id);

    // Establecer los encabezados de la respuesta para indicar que se enviará un archivo Excel
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="reporte_${id}.xlsx"`);
    
    // Enviar el contenido del archivo Excel como respuesta
    res.send(excelBuffer);

    console.log('Archivo Excel generado y enviado correctamente');
  } catch (error: any) {
    console.error('Error al generar y enviar el archivo Excel:', error.message);
    res.status(500).json({ error: 'Error al generar y enviar el archivo Excel' });
  }
};

const generateExcelbyCodes = async (req: Request, res: Response) => {
  try {
    const codes = req.body.codes;

    if (!Array.isArray(codes) || codes.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty codes array' });
    }

    const excelBuffer = await objectsService.generateExcelbyCodes(codes);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte.xlsx"');
    res.send(excelBuffer);
   

    console.log('Archivo Excel generado y enviado correctamente');
  } catch (error: any) {
    handleHttp(res, error, "Error generating and sending the Excel file");
    return new Error('Error al generar y enviar el archivo Excel');
  }
};

const getObjectsByCode = async (req: Request, res: Response) => {
  try {
    const codes = req.body.codes;

    if (!Array.isArray(codes) || codes.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty codes array' });
    }
    const objects = await objectsService.getObjectsByCode(codes);;
    return res.status(200).json(objects);
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


const getObjectbyCode = async (req: Request, res: Response) => {
  if (!req.params.code) {
    return res.status(400).json({ error: 'Code parameter is required' });
  }
  try {
    const code = req.params.code;
    if (!code) {
      return res.status(400).json({ error: 'Code parameter is required' });
    }
    const objects = await objectsService.getObjectbyCode(code);
    return res.status(200).json(objects);
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error getting object by code' });
  }
}

const updateResponsableofObjects = async (req: Request, res: Response) => {
  try {
    const responsable = req.body.responsable;
    const codes = req.body.codes;
    if (!responsable || !Array.isArray(codes) || codes.length === 0) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
    const updatedObjects = await objectsService.updateResponsableofObjects(codes, responsable);
    return res.status(200).json(updatedObjects);
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error updating responsable of objects' });
  }
}

const updateResponsableofObject = async (req: Request, res: Response) => {
  try {
    const responsable = req.body.responsable;
    const code = req.body.code;
    if (!responsable || !code) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }
    const updatedObject = await objectsService.updateResponsablewithCode(code, responsable);
    return res.status(200).json(updatedObject);
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error updating responsable of object' });
  }
}

const updateObjectbyCode = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;
    const object = req.body;
    const updatedObject = await objectsService.updateObjectbyCode(code, object);
    res.status(200).json(updatedObject);
  } catch (error: any) {
    handleHttp(res, error, "Error updating object");
    return new Error;
  }
}

const updateObjectsbyCodes = async (req: Request, res: Response) => {
  try {
    const codes = req.body.codes;
    const object = req.body.object;
    const updatedObjects = await objectsService.updateObjectsbyCodes(codes, object);
    res.status(200).json(updatedObjects);
  } catch (error: any) {
    handleHttp(res, error, "Error updating objects");
    return new Error;
  }
}

const getResponsablesofObjects = async (req: Request, res: Response) => {
  try {
    const responsables = await objectsService.getResponsablesofObjects();
    res.status(200).json(responsables);
  } catch (error: any) {
    handleHttp(res, error, "Error getting responsables of objects");
    return new Error;
  }
}

const getUbicacionesofObjects = async (req: Request, res: Response) => {
  try {
    const ubicaciones = await objectsService.getUbicacionesofObjects();
    res.status(200).json(ubicaciones);
  } catch (error: any) {
    handleHttp(res, error, "Error getting ubicaciones of objects");
    return new Error;
  }
}

const getObjectsfromUbicacion = async (req: Request, res: Response) => {
  if (!req.params.ubicacion) {
    return res.status(400).json({ error: 'Ubicacion parameter is required' });
  }
  try {
    const ubicacion = req.params.ubicacion;
    const objects = await objectsService.getObjectsfromUbicacion(ubicacion);
    res.status(200).json(objects);
  } catch (error: any) {
    handleHttp(res, error, "Error getting objects from ubicacion");
    return new Error;
  }
}

export default {
  getObjects,
  createObject,
  getObject,
  updateObject,
  deleteObject,
  getObjectbyResponsable,
  getObjectsWithFieldFalse,
  generateExcelbyResponsable,
  getObjectbyCode,
  getObjectsByCode,
  generateExcelbyCodes,
  updateResponsableofObjects,
  updateResponsableofObject,
  updateObjectbyCode,
  updateObjectsbyCodes,
  getResponsablesofObjects,
  getUbicacionesofObjects,
  getObjectsfromUbicacion
};
