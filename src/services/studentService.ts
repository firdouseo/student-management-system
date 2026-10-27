import type { IStudentRepository } from '../repositories/studentRepository.js'
import { Student } from "../models/studentmodel.js"

export interface IStudentService{
    
    createStudent(data:Omit<Student,"id">):Student
    getAllStudents():Student[]
    getStudentsById(id:number): Student | undefined
    updateStudent(id:number,updateData:Partial<Omit<Student,"id">>):Student | null
    deleteStudent(id:number):boolean

}

export class StudentService implements IStudentService{
            constructor(private studentRepo:IStudentRepository){}

            createStudent(data:Omit<Student,"id">):Student{
                if(!data.name || !data.age || !data.course)
                    throw new Error("Invalid student data")

                return this.studentRepo.addStudent(data)
            }

            getAllStudents(): Student[] {
                return this.studentRepo.getAllStudents()
            }

            getStudentsById(id:number): Student | undefined{
                const student= this.studentRepo.getStudentsById(id)
                if(!student)
                    throw new Error("Student Not found")

                return student
            }

            updateStudent(id: number, updateData: Partial<Omit<Student, "id">>): Student | null {
                const updatedStudent = this.studentRepo.updateStudent(id,updateData)
                if(!updatedStudent)
                    throw new Error("Student Not found")
                
                return updatedStudent
            }

            deleteStudent(id: number): boolean {
                const deleted=this.studentRepo.deleteStudent(id)
                if(!deleted)
                    throw new Error("Student Not found")

                return deleted
            }
}

