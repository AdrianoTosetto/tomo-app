import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("interests")
export class Interest {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  name: string
}
