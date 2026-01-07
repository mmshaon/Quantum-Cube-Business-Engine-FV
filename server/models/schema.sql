-- QCBE Module 1.0: Authentication & Identity
CREATE TABLE IF NOT EXISTS creators (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    god_mode_status BOOLEAN DEFAULT FALSE,
    voice_fingerprint TEXT,
    face_id_data TEXT,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ইনজেক্টিং মাইনুল (The Creator)
INSERT INTO creators (email, password_hash, god_mode_status) 
VALUES ('shaoncmd@gmail.com', 'BadSoul@1989', TRUE)
ON CONFLICT (email) DO NOTHING;
