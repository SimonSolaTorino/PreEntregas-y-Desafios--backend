import { Router } from "express";
import { main_view, socket_chat, socket_realtime } from "../controllers/views.js";
const router = Router()

router.get('/', main_view)

//para socket
router.get('/realtimeproducts',socket_realtime)
router.get('/chat', socket_chat)

export default router