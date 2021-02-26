const { MessageRepository } = require('../repositories/messageRepository');

class MessageService {

    deleteMessage(id) {
        const message = MessageRepository.delete(id);
        if(!message) {
            throw Error('404 Message not found');
        }
        return message;
    }

    updateMessage(id, newData) {
        if (!MessageRepository.getOne({ 'id': id })) throw Error('404 Message not found');
        const message = MessageRepository.update(id, newData);        
        if(!message) {
            throw Error('404 Message was not updated');
        }
        return message;
    }

    getMessageById(id) {
        const message = MessageRepository.getOne({ 'id': id });        
        if(!message) {
            throw Error('404 Message not found');
        }
        return message;
    }

    getMessages() {
        const messages = MessageRepository.getAll();
        if(!messages) {
            return null;
        }
        return messages;
    }

    addMessage(messageData) {
        const message = MessageRepository.create(messageData);
        if(!message) {
            throw Error('Message not created');
        }
        return message;
    }

}

module.exports = new MessageService();