-- QCBE Module 6.0: Brainstorming & Strategy
CREATE TABLE IF NOT EXISTS strategies (
    id SERIAL PRIMARY KEY,
    goal TEXT NOT NULL,
    cube_id VARCHAR(50),
    phases JSONB, -- [Phase 1: Research, Phase 2: Action...]
    risks JSONB,
    timeline VARCHAR(100),
    creator_id INTEGER REFERENCES creators(id),
    status VARCHAR(20) DEFAULT 'DRAFT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
