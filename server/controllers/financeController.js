import db from '../db/index.js'; // আপনার ডাটাবেস কানেকশন

export const getFinancialSummary = async (req, res) => {
  try {
    const revenue = await db.query("SELECT SUM(amount) FROM transactions WHERE type = 'REVENUE'");
    const expenses = await db.query("SELECT SUM(amount) FROM transactions WHERE type = 'EXPENSE'");
    
    const balance = (revenue.rows[0].sum || 0) - (expenses.rows[0].sum || 0);
    
    res.json({
      success: true,
      data: {
        total_revenue: revenue.rows[0].sum || 0,
        total_expenses: expenses.rows[0].sum || 0,
        current_balance: balance,
        yusra_insight: balance > 0 ? "মাইনুল, আপনার প্রজেক্ট লাভে আছে। নতুন কিউব ইনভেস্টমেন্ট করা যেতে পারে।" : "সতর্কতা: খরচ আয়ের চেয়ে বেশি।"
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
