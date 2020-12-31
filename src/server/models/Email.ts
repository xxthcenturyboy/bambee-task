import sequelize, { Op, } from 'sequelize';
import {
  Table, Column, Model, DataType, CreatedAt, Default, ForeignKey, PrimaryKey,
  AllowNull, Unique,
  BelongsTo, HasOne, HasMany,
  Is, IsUrl, IsEmail, DeletedAt, Scopes,
} from 'sequelize-typescript';
import User from './User';
import disposableDomains from 'server/lib/email/disposable-email-providers';

@Table({
  modelName: 'emails',
  indexes: [],
  underscored: true,
  timestamps: true,
})
export default class Email extends Model<Email> {
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

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  deletedAt: Date | null;

  @Column({ field: 'verified_at', type: DataType.DATE })
  verifiedAt: Date | null;

  @CreatedAt
  @Default(sequelize.fn('now'))
  @AllowNull(false)
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column(new DataType.VIRTUAL(DataType.BOOLEAN, ['verifiedAt', 'deletedAt']))
  get isVerified (): boolean {
    return !!this.getDataValue('verifiedAt') && !this.getDataValue('deletedAt');
  }

  @Column(new DataType.VIRTUAL(DataType.BOOLEAN, ['deletedAt']))
  get isDeleted (): boolean {
    return !!this.getDataValue('deletedAt');
  }

  static async createOrFindOneByUserId (userId: string, email: string): Promise<[Email, boolean]> {
    const UserEmail = await this.findOrCreate({
      where: {
        userId,
        email
      },
      defaults: {
        userId,
        email,
        verifiedAt: new Date()
      }
    });

    return UserEmail;
  }

  static async isEmailAvailable (email: string): Promise<boolean> {
    const existing = await this.findOne({
      where: {
        email,
        verifiedAt: {
          [Op.ne]: null,
        },
        deletedAt: null,
      },
    });

    if (existing === null) {
      return true;
    }

    return !existing;
  }

  static async findAllByUserId (userId): Promise<Email[]> {
    return await Email.findAll({
      where: {
        userId,
      },
    });
  }

  static async assertEmailIsValid (email: string): Promise<void> {
    const cleanedEmail = email.replace(/\s/g, '').toLowerCase();

    // Disallow dots and plus
    const emailParts = cleanedEmail.split('@');
    const [prefix, domain] = emailParts;

    const hasInvalidCharsInPrefix = /\+/.test(prefix);
    const badGmail = domain === 'gmail.com' && /[\+]/.test(prefix);
    if (hasInvalidCharsInPrefix || badGmail) {
      throw new Error(`
          The email you provided is not valid.
      `);
    }

    // disallow disposable domains
    const isDisposable = disposableDomains.some(dd => email.includes(dd));
    if (isDisposable) {
      // tslint:disable-next-line:max-line-length
      throw new Error('The email you provided is not valid. Please note that we do not allow disposable emails or emails that do not exist, so make sure to use a real email address.');
    }
  }

}
