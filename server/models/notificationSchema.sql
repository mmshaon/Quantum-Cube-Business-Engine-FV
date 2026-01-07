-- QCBE Module 16.0: Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(50), -- INFO, SUCCESS, WARNING, DANGER
    status VARCHAR(20) DEFAULT 'UNREAD',
    creator_id INTEGER REFERENCES creators(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Real-time Editor Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action TEXT,
    module_id VARCHAR(10),
    creator_id INTEGER REFERENCES creators(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
