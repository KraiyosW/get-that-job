const jwt = require('jsonwebtoken');

// Middleware สำหรับการยืนยันตัวตนด้วย JWT และตรวจสอบสิทธิ์การเข้าถึงข้อมูล
function authMiddleware(req, res, next) {
  // ตรวจสอบว่า Authorization header มีค่าเป็น Bearer token หรือไม่
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // แยก JWT token ออกมาจาก Authorization header
    const token = authHeader.split(' ')[1];

    try {
      // ยืนยันความถูกต้องของ JWT ด้วย secret key
      const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);

      // เพิ่มข้อมูล user จาก JWT ลงใน req object
      req.user = decodedToken.user;

      // เช็ค role ว่าเป็น 'professional' หรือไม่
      if (req.user.role !== 'professional') {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // ผ่านการตรวจสอบ ไปยัง middleware ต่อไป
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = authMiddleware;