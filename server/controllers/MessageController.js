// const Message = require('../db/models/Message.js');
const Message = '';

function getMessages(req, res) {
  Message.find()
    .then(messages => {
      res.send(messages);
    })
    .catch(err => {
      console.error('Error fetching messages from Message model', err);
      res.status(501).send(err);
    });
}

function addNewMessage(req, res) {
  let counter = 0;
  const messages = [
    {
      username: 'Airyque',
      text: ++counter
    }
  ]
  messages.forEach(data => {
    const message = new Message({
      username: data.username,
      text: data.text
    });
    message.save()
      .then(() => {
        getMessages(req, res);
      })
      .catch(err => {
        console.error('Error adding message', err);
        res.status(501).send(err);
      });
    
  })
}


module.exports.getMessages = getMessages;
module.exports.addNewMessage = addNewMessage;
