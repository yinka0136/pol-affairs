import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
@Unique(['title'])
export class Gallery extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  imageUrl: string;
  @Column()
  image_public_id: string;
}
