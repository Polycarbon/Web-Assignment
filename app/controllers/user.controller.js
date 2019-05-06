const User = require('../models/user.model');
const axios = require('axios');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        user_id : req.body.user_id,
        user_password :req.body.user_password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email : req.body.email,
        mobile : req.body.mobile,
        facebook : req.body.facebook,
        pic_url : req.body.pic_url
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Generate new User
exports.generate = (req, res) =>{
    let n = 30
    axios.get('https://randomuser.me/api/?inc=gender,name,login,email,picture,cell&nat=us&results='+n)
        .then(response => {
            let data = response["data"]["results"]
            for (let i=0; i < data.length; i++) {
                // Create a User
                const user = new User({
                    user_id : data[i].login.username,
                    user_password :data[i].login.password,
                    first_name: data[i].name.first,
                    last_name: data[i].name.last,
                    email : data[i].email,
                    mobile : data[i].cell,
                    facebook : "www.facebook.com/" + data[i].login.username,
                    pic_url : "https://api.adorable.io/avatars/285/"+data[i].login.username+".png"
                });
                // Save User in the database
                user.save()
                    .then(data => {
                        // res.send(data);
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the User."
                    });
                });
            }

        });

    res.send({
        message: "Success",
    });
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.criteria) {
    //     return res.status(400).send({
    //         message: "User content can not be empty"
    //     });
    // }

    // Find user and update it with the request body
    var conditions = req.body.criteria
        , update = req.body.data
        , options = req.body.opts;

    User.updateOne(conditions, update, options, (err,numAffected)=>{
        res.send({
            message : numAffected+" is the number of updated documents"
        })
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({message: "User deleted successfully!",
                    data : note});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userId
        });
    });
};
// Delete a note with the specified noteId in the request
exports.deleteByName = (req, res) => {
    User.findOneAndDelete(req.firstname)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "User not found with id ",
                    data:note
                });
            }
            res.send({message: "User deleted successfully!",
                data : note});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userId
        });
    });
};

exports.get = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not get user with id " + req.params.userId
        });
    });
};

exports.verify = (req, res) => {
    User.findOne(req.body)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.body.user_id
                });
            }
            res.send({
                message: "login",
                exist:true
            });
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.body.user_id,
                exist:false
            });
        }
        return res.status(500).send({
            message: "Could not get user with id " + req.body.user_id,
            exist:false
        });
    });
};
