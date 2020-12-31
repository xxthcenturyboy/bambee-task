import sequelize, { Op } from 'sequelize';
import {
  Table, Column, Model, DataType, CreatedAt, Default, ForeignKey, PrimaryKey,
  AllowNull, Unique,
  BelongsTo,
  HasOne, HasMany,
  Is, IsUrl, IsUUID, NotEmpty,
} from 'sequelize-typescript';
import {
  hash,
  verify
} from 'server/lib/crypt/hashing';

import Email from 'server/models/Email';
import { maxBy } from 'lodash';

@Table({
  tableName: 'users',
  indexes: [],
  underscored: true,
})
export default class User extends Model<User> {

  @PrimaryKey
  @Default(sequelize.fn('uuid_generate_v4'))
  @AllowNull(false)
  @Column(DataType.UUID)
  id: string;

  @HasMany(() => Email)
  Emails: Email[];

  @Column({ field: 'hashword', type: DataType.STRING })
  hashword: string;

  // TODO: Validate!
  @Column({ field: 'first_name', type: DataType.STRING })
  firstName: string;

  // TODO: Validate!
  @Column({ field: 'last_name', type: DataType.STRING })
  lastName: string;

  @Default(sequelize.fn('now'))
  @AllowNull(false)
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  async getEmails(): Promise<Email[]> {
    this.Emails = null
      || this.Emails
      || await Email.findAllByUserId(this.id);
    return this.Emails;
  }

  async getEmail(email: string): Promise<Email | null> {
    const Emails = await this.getEmails();
    return Emails.find(Email => email === Email.email) || null;
  }

  async getVerifiedEmail(): Promise<string | null> {
    const Emails = await this.getEmails();

    const Email: Email | undefined = maxBy(
      Emails.filter(({ isVerified }) => isVerified),
      ({ verifiedAt }) => verifiedAt
    );

    return Email && Email.email || null;
  }

  static async registerAndCreateFromEmail(email: string, password: string): Promise<User> {
    if (!email.endsWith('@bambee.com')) {
      try {
        await Email.assertEmailIsValid(email);
      } catch (err) {
        throw err;
      }
    }

    const hashword = await hash(password);

    const user = await User.create({
      hashword,
    });

    await Email.createOrFindOneByUserId(user.id, email);

    return user;
  }

  static async loginWithPassword(email: string, password: string): Promise<User | null> {
    const userEmail = await Email.findOne({
      where: {
        email
      }
    });

    if (!userEmail) {
      throw new Error('Email not found');
    }

    const user = await this.findOne({
      where: {
        id: userEmail.userId
      }
    });

    if (!user) {
      throw new Error('User not found!');
    }

    if (await verify(user.hashword, password)) {
      return user;
    }

    return null;
  }

}
