const { Router } = require('express');
const MessageService = require('../services/messageService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.get('/', (req, res, next) => {
    try {
        const messagesData = MessageService.getMessages();        
        res.data = messagesData;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
    try {
        const message = MessageService.getMessageById(req.params.id)
        res.data = message;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post('/', (req, res, next) => {
    try {
        const messageData = MessageService.addMessage(req.body)        
        res.data = messageData;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.put('/:id', (req, res, next) => {
    try {
        const messageId = req.params.id;
        const newData = req.body;
        const message = MessageService.updateMessage(messageId, newData)
        res.data = message;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
    try {
        const message = MessageService.deleteMessage(req.params.id)
        res.data = message;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;