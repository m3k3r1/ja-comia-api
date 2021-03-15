import RestaurantSections from 'src/restaurant-sections/entities/restaurant-sections.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('restaurant_items')
export default class RestaurantItems extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  section_id: string;

  @ManyToOne(() => RestaurantSections)
  @JoinColumn({ name: 'section_id' })
  section: RestaurantSections;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
