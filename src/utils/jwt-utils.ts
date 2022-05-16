
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export default class JWTUtils {

  public static generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' });
  }

  public static authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)

      if (err) return res.sendStatus(403)

      req.user = user

      next()
    })
  }

  public static authenticateAdminToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      
      if (err) return res.sendStatus(403)
      
      req.user = user
      
      if(!user.admin)
        return res.sendStatus(403);
        
      next()
    })
  }

}