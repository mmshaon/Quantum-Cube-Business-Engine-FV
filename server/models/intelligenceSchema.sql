-- QCBE Module 10.0: Executive Intelligence
CREATE TABLE IF NOT EXISTS insights (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50), -- STRATEGIC, OPERATIONAL, FINANCIAL
    priority VARCHAR(20), -- CRITICAL, HIGH, MEDIUM
    content TEXT NOT NULL,
    impact_score INTEGER,
    status VARCHAR(20) DEFAULT 'UNREAD',
    creator_id INTEGER REFERENCES creators(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Creator Insight
INSERT INTO insights (type, priority, content, impact_score) 
VALUES ('STRATEGIC', 'CRITICAL', 'Master Maynul, cross-cube analysis suggests immediate expansion into Module 15.0 to secure 40% market lead.', 95)
ON CONFLICT DO NOTHING;
