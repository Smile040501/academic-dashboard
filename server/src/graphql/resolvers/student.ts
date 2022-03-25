import { Student } from "../../interfaces/Student";
import StudentModel from "../../models/student";

const addStudent = async (args: { studentInput: Student }, _: Request) => {
    try {
        const { name, email, department, joiningYear, courses } =
            args.studentInput;

        // TODO: Input validation

        const student = new StudentModel({
            name,
            email,
            department,
            joiningYear,
            courses,
        });
        const createdStudent = await student.save();

        return createdStudent;
    } catch (error) {
        throw error;
    }
};

export default { addStudent };
