-- QCBE Module 5.0: Projects & Cubes
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, PAUSED, COMPLETED
    priority VARCHAR(20) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, CRITICAL
    creator_id INTEGER REFERENCES creators(id),
    cube_id VARCHAR(50), -- Reference to Multi-Cube Logic
    completion_rate INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Project for Creator
INSERT INTO projects (name, status, priority, cube_id) 
VALUES ('QCBE Master Engine', 'ACTIVE', 'CRITICAL', 'CUBE-001')
ON CONFLICT DO NOTHING;
