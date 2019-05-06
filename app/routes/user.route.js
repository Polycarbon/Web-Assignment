const users = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/contacts')
        .get(users.findAll)
        .post(users.create)
        .delete (users.deleteByName);

    app.get('/contacts/generate', users.generate);

    app.route('/contacts/:userId')
        .delete(users.delete)
        .get(users.get);

    // Create a new Note
    app.get('/contacts/generate', users.generate);

    // Update a Note with noteId
    app.put('/contacts/update', users.update);

    // Delete a Note with noteId
    app.delete('/contacts/:userId', users.delete);

    app.post('/verify', users.verify);

}
