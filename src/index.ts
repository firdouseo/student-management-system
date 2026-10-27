import express from "express"
import dotenv from "dotenv"
import { Student } from "./models/studentmodel.js"
import type { IStudentRepository } from "./repositories/studentRepository.js"
import { StudentRepository } from "./repositories/studentRepository.js"
import type { IStudentService } from "./services/studentService.js"
import { StudentService } from "./services/studentService.js"
import type { IStudentController } from "./controllers/studentController.js"
import { Studentcontroller } from "./controllers/studentController.js"

dotenv.config()
const app=express()
const PORT=process.env.PORT||3001
app.use(express.json())

const studentrepository:IStudentRepository=new StudentRepository()
const studentservice:IStudentService=new StudentService(studentrepository)
const studentcontroller:IStudentController=new Studentcontroller(studentservice)


app.post('/students',studentcontroller.createStudent)
app.get('/students',studentcontroller.getAllStudents)
app.get('/students/:id',studentcontroller.getStudentsById)
app.put('/students/:id',studentcontroller.updateStudent)
app.delete('/students/:id',studentcontroller.deleteStudent)


app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})