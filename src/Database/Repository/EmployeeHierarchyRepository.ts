import { DatabaseClient } from '../../Provider/PostgresDB'
import { EmployeeHierarchy } from '../model/EmployeeHierarchy'

export interface Hierarchy {
  id: number
  name: string
  positionId: number
  positionName: string
  parent_id: number
  level: number
  child?: Hierarchy[] | null
}

export const EmployeeHierarchyRepository = DatabaseClient.getRepository(EmployeeHierarchy).extend({
  async getEmployeeHierarchy(employeeId: number) {
    const results: Promise<Hierarchy[]> = await this.query(
      `
        WITH RECURSIVE EmployeeTree AS (
            -- Start from immediate children of the specified employee
            SELECT 
                e.id,
                e.name,
                e.positionId,
                e.positionName,
                eh.ancestor_id AS parent_id, 
                1 AS level
            FROM 
                "employees" e
            INNER JOIN "employee_hierarchy" eh ON e.id = eh.descendant_id
            WHERE 
                eh.ancestor_id = $1 AND eh.depth = 1 -- Only direct children
            
            UNION ALL
            
            -- Recursive part: get all descendants of each employee
            SELECT 
                e.id,
                e.name,
                e.positionId,
                e.positionName,
                et.id AS parent_id,
                et.level + 1 AS level
            FROM 
                "employees" e
            INNER JOIN "employee_hierarchy" eh ON e.id = eh.descendant_id
            INNER JOIN EmployeeTree et ON eh.ancestor_id = et.id
            WHERE eh.depth = 1
        )
        
        SELECT 
            id,
            name,
            positionId,
            positionName,
            parent_id,
            level
        FROM 
            EmployeeTree
        ORDER BY 
            level, parent_id, id;
      `,
      [employeeId]
    )

    return results
  },
})
