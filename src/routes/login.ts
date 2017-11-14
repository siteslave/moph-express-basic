
import * as express from 'express';
const router = express.Router();

router.get('/', (req, res,next) => {
  res.render('login', {title: 'Login'});
});


export default router;