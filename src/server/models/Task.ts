import sequelize, { Op, } from 'sequelize';
import {
  Table, Column, Model, DataType, CreatedAt, Default, ForeignKey, PrimaryKey,
  AllowNull, Unique,
  BelongsTo, HasOne, HasMany,
  Is, IsUrl, IsEmail, DeletedAt, Scopes,
} from 'sequelize-typescript';
import User from './User';
import { TaskStatus } from 'shared/types/tasks';
import { SortDirection } from 'shared/types/pagination';
import moment from 'moment';

@Table({
  modelName: 'tasks',
  indexes: [],
  underscored: true,
  timestamps: true,
})
export default class Task extends Model<Task> {
  @PrimaryKey
  @Default(sequelize.fn('uuid_generate_v4'))
  @AllowNull(false)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ field: 'user_id', type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Default(() => `New Task - ${moment().format('M/D/YYYY H:m')}`)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @Column({ field: 'due_date', type: DataType.DATE })
  dueDate: Date | null;

  @Column({ field: 'completed_at', type: DataType.DATE })
  completedAt: Date | null;

  @Default(TaskStatus.INCOMPLETE)
  @AllowNull(false)
  @Column(DataType.ENUM(...Object.keys(TaskStatus)))
  status: string;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  deletedAt: Date | null;

  @CreatedAt
  @Default(sequelize.fn('now'))
  @AllowNull(false)
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column(new DataType.VIRTUAL(DataType.BOOLEAN, ['deletedAt']))
  get isDeleted (): boolean {
    return !!this.getDataValue('deletedAt');
  }

  @Column(new DataType.VIRTUAL(DataType.BOOLEAN, ['deletedAt']))
  get isComplete (): boolean {
    return !!this.getDataValue('completedAt') && this.getDataValue('status') === TaskStatus.COMPLETE;
  }

  static async createTask (userId: string, name?: string, description?: string, dueDate?: string): Promise<Task> {
    const dateDue = dueDate ? new Date(dueDate) : undefined;

    return await Task.create({
      userId,
      name,
      description,
      dueDate: dateDue
    });
  }

  static async findTaskById(taskId: string): Promise<Task> {
    return await this.findByPk(taskId);
  }

  static async findAllIncompleteByUserIdPaginated(
    userId: string,
    sortField: string,
    sortDir: SortDirection,
    limit: number,
    offset: number
  ): Promise<{count: number, rows: Task[]}> {
    return await this.findAndCountAll({
      where: {
        userId,
        status: {
          [Op.ne]: TaskStatus.COMPLETE,
        },
        deletedAt: null,
        completedAt: null,
      },
      order: [
        [sortField, sortDir],
      ],
      limit,
      offset
    });
  }

  static async findAllCompleteByUserIdPaginated(
    userId: string,
    sortField: string,
    sortDir: SortDirection,
    limit: number,
    offset: number
  ): Promise<{count: number, rows: Task[]}> {
    return await this.findAndCountAll({
      where: {
        userId,
        status: {
          [Op.eq]: TaskStatus.COMPLETE,
        },
        deletedAt: null,
      },
      order: [
        [sortField, sortDir],
      ],
      limit,
      offset
    });
  }

  static async findAllByUserIdPaginated(
    userId: string,
    sortField: string,
    sortDir: SortDirection,
    limit: number,
    offset: number
  ): Promise<{count: number, rows: Task[]}> {
    return await this.findAndCountAll({
      where: {
        userId,
        deletedAt: null,
      },
      order: [
        [sortField, sortDir],
      ],
      limit,
      offset
    });
  }

  static async findAllIncompleteByUserId (userId: string): Promise<Task[]> {
    return await Task.findAll({
      where: {
        userId,
        status: {
          [Op.ne]: TaskStatus.COMPLETE,
        },
        deletedAt: null,
        completedAt: null,
      },
    });
  }

  static async findAllByUserId(userId: string): Promise<Task[]> {
    return await this.findAll({
      where: {
        userId,
        deletedAt: null,
      }
    });
  }

  static async updateTask(taskId: string, name?: string, description?: string, dueDate?: string): Promise<Task | void> {
    const task: Task = await this.findByPk(taskId);

    if (!task) {
      return;
    }

    if (name) {
      task.setDataValue('name', name);
    }

    if (description) {
      task.setDataValue('description', description);
    }

    if (dueDate) {
      task.setDataValue('dueDate', new Date(dueDate));
    }

    await task.save();

    return task;
  }

  static async markComplete(taskId: string): Promise<[number, Task]> {
    return await Task.update({
      completedAt: new Date(),
      status: TaskStatus.COMPLETE
    }, {
      where: {
        id: taskId
      }
    });
  }

  static async markDeleted(taskId: string): Promise<[number, Task]> {
    return await Task.update({
      deletedAt: new Date(),
      status: TaskStatus.COMPLETE
    }, {
      where: {
        id: taskId
      }
    });
  }

}
