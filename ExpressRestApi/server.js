const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://Bernard:bernard12@cluster0.n19gr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});
const User = mongoose.model('User', userSchema);

app.get('/api/users', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(error){
        res.status(500).json({message: 'Error fetching users', error});
    }
});
 
app.post('/api/users', async (req, res) => {
    try{
        const newUser = new User({
            name: req.body.name,
            email: req.body.email
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(error) {
        res.status(500).json({message: 'Error adding user', error});
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(404).json({message: 'Error fetching user', error});
    }
});

app.put('/api/users/:id', async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {name: req.body.name, email: req.body.email},
            {new: true, runValidators: true});

            if(!updatedUser){
                return res.status(404).json({message: 'User not found'});
            }
            res.json(updatedUser);
    } catch(error) {
        res.status(500).json({message: "Error updating user", error});
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser){
            return res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Error deleting user', error});
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
