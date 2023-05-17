import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class sensitive_rules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sensitive_rules_name: string;

  @Column()
  sensitive_rules_detail: string;

  @Column()
  sensitive_rules_content: string;
  
  @Column()
  sensitive_rules_create_time: Date;
}