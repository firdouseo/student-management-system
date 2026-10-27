import type { Request , Response } from "express"
import { StudentService } from "../services/studentService.js"
import type { IStudentService } from "../services/studentService.js" 


export interface IStudentController{
    createStudent(req:Request,res: Response):void
    getAllStudents(req:Request,res:Response):void
    getStudentsById(req:Request,res:Response):void
    updateStudent(req:Request,res:Response):void
    deleteStudent(req:Request,res:Response):void
}

export class Studentcontroller implements IStudentController  {
    constructor(private Studentservice: IStudentService){}

    createStudent=(req:Request,res:Response):void=>{
       try{
       const student=this.Studentservice.createStudent(req.body)
         console.log(student)
         res.status(200).json(student)
       }
    catch(error:any){
        res.status(500).json({error: error.message})
    }
        
    }

    getAllStudents=(req:Request,res:Response):void=>{
        try{
        const students=this.Studentservice.getAllStudents()
        res.status(200).json(students)
        }
        catch(error:any){
            res.status(500).json({error:error.message})
        }
    }

    getStudentsById=(req: Request, res: Response): void=> {
        try{
            const id=Number(req.params.id)
            const students=this.Studentservice.getStudentsById(id)
            res.status(200).json(students)
        }
        catch(error:any){
            res.status(500).json({error:error.message})
        }
    }

    updateStudent=(req:Request, res:Response):void=>{
        try{
            const id=Number(req.params.id)
            const updatestudent=this.Studentservice.updateStudent(id,req.body)
            res.status(200).json(updatestudent)
        }
        catch(error:any){
            res.status(500).json({error:error.message})
        }

    }

    deleteStudent=(req:Request,res:Response):void=>{
        try{
            const id=Number(req.params.id)
            const deleted=this.Studentservice.deleteStudent(id)
            res.status(200).json({message:'student deleted successfully '})
            return 
        }
        catch(error:any){
            if(error.message == "Student Not found"){
                res.status(404).json({error: error.message})
                            return 
            }

            res.status(500).json({error:error.message})
        }
    }
}