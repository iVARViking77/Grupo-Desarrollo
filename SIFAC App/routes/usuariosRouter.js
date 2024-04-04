const express = require("express")
const router = express.Router()

const usuariosController = require("../controllers/usuariosController")

router.post("/", usuariosController.create)
router.post("/:usuario", usuariosController.signIn)
router.get("/:usuario/rol-contratista", usuariosController.getUsersByRolContratista)
router.get("/:usuario/rol-facturador", usuariosController.getUsersByRolContratista)
router.get("/", usuariosController.getAll)
router.put("/:usuario", usuariosController.update)
router.get("/:usuario", usuariosController.delete)

module.exports = router