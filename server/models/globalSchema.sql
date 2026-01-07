-- QCBE Module 15.0: Global Core
CREATE TABLE IF NOT EXISTS regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL, -- e.g., Asia-Pacific, Europe, USA
    currency VARCHAR(10),
    timezone VARCHAR(50),
    compliance_protocol TEXT, -- Local tax/legal rules
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cube_sync (
    id SERIAL PRIMARY KEY,
    source_cube VARCHAR(50),
    target_cube VARCHAR(50),
    sync_type VARCHAR(50), -- KNOWLEDGE, RESOURCE, DATA
    last_sync TIMESTAMP
);

-- Initial Regions
INSERT INTO regions (name, currency, timezone) VALUES 
('Bangladesh (HQ)', 'BDT', 'Asia/Dhaka'),
('Global (Standard)', 'USD', 'UTC')
ON CONFLICT DO NOTHING;
