-- QCBE Module 24.0: System Settings
CREATE TABLE IF NOT EXISTS system_configs (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Module 21.0: UI Visibility & Access Control
CREATE TABLE IF NOT EXISTS module_controls (
    id SERIAL PRIMARY KEY,
    module_id VARCHAR(10) UNIQUE NOT NULL,
    module_name VARCHAR(100),
    is_enabled BOOLEAN DEFAULT TRUE,
    access_level VARCHAR(50) DEFAULT 'CREATOR', -- CREATOR, ADMIN, STAFF
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Settings for Creator
INSERT INTO system_configs (key, value) VALUES 
('SECURITY_POLICY', '{"mfa": "REQUIRED", "biometric": "ENABLED", "session_timeout": "3600"}'),
('THEME_CONFIG', '{"primary": "#00FFA3", "god_mode_color": "#FF0000"}')
ON CONFLICT DO NOTHING;

INSERT INTO module_controls (module_id, module_name, is_enabled) VALUES 
('1.0', 'Authentication', true),
('7.0', 'Finance', true),
('13.0', 'Voice Intelligence', true),
('15.0', 'Global Core', true)
ON CONFLICT DO NOTHING;
