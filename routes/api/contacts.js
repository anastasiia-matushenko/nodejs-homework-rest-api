const express = require("express");
const ctrl = require("../../controllers/contacts");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getContactsAll);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, ctrl.removeContactById);

router.patch(
  "/:contactId",
  authenticate,
  validateBody(schemas.updateSchema, "missing fields"),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrl.updateStatusContact
);

module.exports = router;
