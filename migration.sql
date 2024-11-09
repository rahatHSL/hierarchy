-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    positionId INT,
    positionName VARCHAR(100)
);
-- EmployeeHierarchy table (Closure Table)
CREATE TABLE IF NOT EXISTS employee_hierarchy (
    ancestor_id INT REFERENCES employees(id),
    descendant_id INT REFERENCES employees(id),
    depth INT,
    -- Distance from ancestor to descendant
    PRIMARY KEY (ancestor_id, descendant_id)
);
-- Employees insertion
INSERT INTO employees (id, name, positionId, positionName)
VALUES (1, 'CTO', 1, 'Chief Technology Officer'),
    (2, 'SSE', 2, 'Senior Software Engineer'),
    (3, 'SE', 3, 'Software Engineer'),
    (4, 'JSE', 4, 'Junior Software Engineer'),
    (5, 'SSE2', 2, 'Senior Software Engineer'),
    (6, 'SE2', 3, 'Software Engineer');
-- EmployeeHierarchy insertion
INSERT INTO employee_hierarchy (ancestor_id, descendant_id, depth)
VALUES (1, 1, 0),
    -- Self-reference for CTO
    (1, 2, 1),
    -- CTO -> SSE 
    (1, 3, 2),
    -- CTO -> SSE -> SE
    (1, 4, 3),
    -- CTO -> SSE -> SE -> JSE
    (1, 5, 2),
    -- CTO -> SSE2 and so on
    (1, 6, 3),
    (2, 2, 0),
    (2, 3, 1),
    (2, 6, 1),
    (2, 4, 2),
    (3, 3, 0),
    (3, 4, 1),
    (4, 4, 0),
    (5, 3, 1),
    (5, 4, 2),
    (6, 4, 1);