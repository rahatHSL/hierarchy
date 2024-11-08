import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { EmployeeHierarchy } from './EmployeeHierarchy'

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  positionId!: number

  @Column()
  positionName!: string

  @OneToMany(() => EmployeeHierarchy, hierarchy => hierarchy.descendant)
  descendants!: EmployeeHierarchy[]

  @OneToMany(() => EmployeeHierarchy, hierarchy => hierarchy.ancestor)
  ancestors!: EmployeeHierarchy[]
}
