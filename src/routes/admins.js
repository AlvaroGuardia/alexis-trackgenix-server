import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validation/admins';

const router = express.Router();

router
  .get('/', adminControllers.getAllAdmins)
  .get('/id/:id', adminControllers.getAdminById)
  .get('/firstName/:firstName', adminControllers.getAdminByFirstName)
  .get('/lastName/:lastName', adminControllers.getAdminByLastName)
  .get('/email/:email', adminControllers.getAdminByEmail)
  .get('/isActive/:active', adminControllers.getAdminByStatus)
  .delete('/:id', adminControllers.deleteAdmin)
  .post('/', adminValidations.createAdminValidations, adminControllers.createAdmin)
  .put('/:id', adminValidations.updateAdminValidations, adminControllers.updateAdmin);

export default router;
