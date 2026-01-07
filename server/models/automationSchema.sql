-- QCBE Module 9.0: Automation Engine
CREATE TABLE IF NOT EXISTS automations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    trigger_type VARCHAR(50), -- TIME_BASED, EVENT_BASED, CONDITION_BASED
    action_type VARCHAR(50),  -- SEND_EMAIL, GENERATE_REPORT, UPDATE_CUBE
    config JSONB,             -- Specific rules and logic
    is_active BOOLEAN DEFAULT TRUE,
    last_run TIMESTAMP,
    creator_id INTEGER REFERENCES creators(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
