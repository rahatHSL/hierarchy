import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm'
import { Employee } from './Employee'

@Entity('employee_hierarchy')
export class EmployeeHierarchy {
  @PrimaryColumn()
  ancestor_id!: number

  @PrimaryColumn()
  descendant_id!: number

  @Column()
  depth!: number

  @ManyToOne(() => Employee, employee => employee.descendants)
  @JoinColumn({ name: 'ancestor_id' })
  ancestor!: Employee

  @ManyToOne(() => Employee, employee => employee.ancestors)
  @JoinColumn({ name: 'descendant_id' })
  descendant!: Employee
}
