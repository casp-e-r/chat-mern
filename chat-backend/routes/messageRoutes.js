import express from 'express'
import { allMessages, sendMessage } from '../controllers/messageControllers.js'
import { protect } from '../middleware/authMiddleware.js'
// import message from '../models/messageModal'


const router =express.Router()

router.route('/').post(protect,sendMessage)
router.route('/:chatId').get(protect,allMessages)


export default router


