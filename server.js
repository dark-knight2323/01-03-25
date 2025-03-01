const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
app.use(express.json());
mongoose.connect('mongodb+srv://rvsraghuram07:Raghu2005@cluster0.oae0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=> console.log("Successfully connected"))
    .catch((err)=> console.log(err));


const studentSchema = new mongoose.Schema({
    "name":{type:String, required:true, unique:true},
    "age":{type:Number, required:true}
})
const student = mongoose.model('student', studentSchema);

app.post('/addStudent', (req, res) => {
    const newStudent = new student(req.body);
    newStudent.save()
    .then(()=>{
        req.status(200).json({message:'Student added'});
    })
    .catch((err)=>{
        res.status(400).json({message:'Student not added'});
    })
    res.send('Student added');
}); 


app.get('/getStudents', (req, res) => {
    student.find()
    .then((students)=>{
        res.status(200).json(students);
    })
    .catch((err)=>{
        res.status(400).json({message:'Students not found'});
    })
});

app.get('/getStudent/:name', (req, res) => {
    student.findOne({name:req.params.name})
    .then((student)=>{
        if(student){
            res.status(200).json({
                "message":"Student found",
                "student":student
            });
        }
        else{
            res.status(404).json({
                "message":"Student not found"
            });
        }
        
    })
    .catch((err)=>{
        res.status(400).json({message:'Student not found'});
    })
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});