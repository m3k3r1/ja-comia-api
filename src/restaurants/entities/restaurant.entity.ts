import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('restaurants')
export default class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  coverSm?: string;

  @Column()
  coverMd?: string;

  @Column()
  coverLg?: string;

  @Column()
  logoSm?: string;

  @Column()
  logoMd?: string;

  @Column()
  logoLg?: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
