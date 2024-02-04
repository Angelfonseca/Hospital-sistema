import {Schema , model} from 'mongoose';
import {Object} from '../interfaces/objects.interface';

const ObjectSchema = new Schema<Object>(
    {
      asignado: {
        type: String,
        required: true
      },
      cve_cabms: {
        type: String,
        required: true
      },
      consecutivo: {
        type: Number,
        required: true
      },
      descrip_bm: {
        type: String,
        required: true
      },
      costo_bien: {
        type: Number,
        required: true
      },
      marca: {
        type: String,
        required: true
      },
      modelo: {
        type: String,
        required: true
      },
      serie: {
        type: String,
        required: true
      },
      motor: {
        type: String
      },
      descripcion: {
        type: String
      },
      recursos: {
        type: String,
        required: true
      },
      responsable: {
        type: String,
        required: true,
      },
      ubicacion: {
        type: String,
        required: true
      },
      consumible: {
        type: Boolean,
        required: true
      }
    },
    {
      timestamps: true
    }
  )

    const ObjectModel = model<Object>('Object', ObjectSchema);
    export default ObjectModel;