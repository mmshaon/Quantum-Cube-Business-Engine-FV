import jwt from 'jsonwebtoken';
import { YUSRA_MASTER_IDENTITY } from '../yusraPersona.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (email === process.env.SEED_CREATOR_EMAIL && password === process.env.SEED_CREATOR_PASSWORD) {
    const token = jwt.sign({ email, role: 'CREATOR' }, process.env.JWT_SECRET);
    return res.json({
      success: true,
      token,
      yusra_greeting: `[IDENTITY VERIFIED] ${YUSRA_MASTER_IDENTITY.name} reporting for duty, Creator Maynul.`,
      god_mode: true
    });
  }
  res.status(401).json({ success: false, message: "Unauthorized access detected." });
};
