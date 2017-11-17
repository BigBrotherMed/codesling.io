import express from 'express';

import {
  authUser,
  createUser,
  userUpdate,
  userDelete,
} from '../controllers/userController';
import {
  slingFetch,
  slingPost,
  slingUpdate,
  slingDelete,
  slingCreateNew,
  slingCommit,
  slingRevert,
} from '../controllers/slingController';
import {
  slingMsgFetch,
  slingMsgPost,
} from '../controllers/slingMsgController';
import { verifyUserWithJWT } from '../middleware/authentication';

const router = express.Router();

// Authorization route for login
router.route('/users/auth')
  .post(authUser);

// CRUD ops for users
router.route('/users')
  .post(createUser);
router.route('/users/:id')
  .put(userUpdate)
  .delete(userDelete);

// CRUD ops for slings
router.route('/slings/:slingId')
  .get(slingFetch)
  .post(verifyUserWithJWT, slingPost)
  .put(slingUpdate)
  .delete(verifyUserWithJWT, slingDelete);

router.route('/new-sling')
  .get(verifyUserWithJWT, slingCreateNew);

router.route('/commit-sling/:slingId')
  .post(verifyUserWithJWT, slingCommit);

router.route('/revert-sling/:slingId')
  .get(verifyUserWithJWT, slingRevert);

router.route('/slings/messages/:slingId')
  .get(slingMsgFetch)
  .post(slingMsgPost);

export default router;
