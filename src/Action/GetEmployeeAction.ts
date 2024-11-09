import {
  EmployeeHierarchyRepository,
  Hierarchy,
} from '../Database/Repository/EmployeeHierarchyRepository'
import { GetEmployeeParams } from '../Request/GetEmployeeRequest'

export class getEmployeeAction {
  constructor(private readonly params: GetEmployeeParams) {}
  async execute() {
    const employees = await EmployeeHierarchyRepository.getEmployeeHierarchy(this.params.id)

    const employeeMap = new Map<number, Hierarchy>()
    const hierarchy: Hierarchy[] = []

    for (const employee of employees) {
      const nestedEmployee = { ...employee, child: null }
      employeeMap.set(employee.id, nestedEmployee)

      if (!employeeMap.has(employee.parent_id)) {
        hierarchy.push(nestedEmployee)
      } else {
        const parent = employeeMap.get(employee.parent_id)
        if (parent) {
          if (!parent.child) parent.child = []
          parent.child.push(nestedEmployee)
        }
      }
    }
    if (!hierarchy.length) throw new Error('Employee not found')

    return hierarchy
  }
}
