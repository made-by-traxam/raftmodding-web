import { DataTypes, Model } from 'sequelize';

import sequelize from '../sequelize';
import { Mod } from './ModModel';

export interface ScheduledModDeletion extends Model {
  modId: string;
  deletionTime: Date;
  mod?: Mod;
}

export const scheduledModDeletionModel = sequelize.define<ScheduledModDeletion>(
  'scheduled-mod-deletion',
  {
    modId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      references: {
        model: 'mods',
        key: 'id',
      },
    },
    deletionTime: {
      type: DataTypes.DATE,
    },
  },
);
