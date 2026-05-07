const router = require("express").Router();
const verifyJWT = require("../middlewares/verifyJWT")
const userController = require("../controllers/userController");

router.post("/user", userController.createUser);
router.get("/user", verifyJWT, userController.readUsers);
router.put("/user", verifyJWT, userController.updateUser);
router.delete("/user/:cpf", verifyJWT, userController.deleteUser);
router.post("/login",userController.loginUser);

const eventoController = require('../controllers/eventoController');

router.post('/evento', verifyJWT, eventoController.createEvento);
router.get('/evento', verifyJWT, eventoController.getAllEventos);
router.put('/evento', verifyJWT, eventoController.updateEvento);
router.delete('/evento/:id', verifyJWT, eventoController.deleteEvento);

const organizadorController = require("../controllers/organizadorController");

router.post("/organizador", verifyJWT, organizadorController.createOrganizador);
router.get("/organizador", verifyJWT, organizadorController.getAllOrganizadores);
router.get("/organizador/:id", verifyJWT, organizadorController.getOrganizadorById);
router.put("/organizador", verifyJWT, organizadorController.updateOrganizador);
router.delete("/organizador/:id", verifyJWT, organizadorController.deleteOrganizador);

const ingressoController = require('../controllers/ingressoController');

router.post('/ingresso', verifyJWT, ingressoController.createIngresso);
router.get('/ingresso', verifyJWT, ingressoController.getAllIngressos);
router.get('/ingresso/evento/:id', verifyJWT, ingressoController.getByIdEvento);
router.put('/ingresso', verifyJWT, ingressoController.updateIngresso);
router.delete('/ingresso/:id', verifyJWT, ingressoController.deleteIngresso);

module.exports = router;
