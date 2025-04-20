import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Model } from 'sequelize';
import { sequelize } from '../environment/sequelize';

// using sqlite

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: 'INTEGER',
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: 'STRING',
      allowNull: false,
    },
    email: {
      type: 'STRING',
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: 'DATE',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: 'DATE',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'User',
  },
);

export default User;
