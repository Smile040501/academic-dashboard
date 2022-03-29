import DocumentType from "./DocumentType";

export interface Student<T, U> extends DocumentType<Student<T, U>> {
    name: string;
    email: string;
    // googleId: string;
    joiningYear: number;
    department: string;
    courses: {
        // course, semester will be unique
        course: T; // course id
        completed: boolean;
        // enrolled: boolean;
        semester: U; // semester id
    }[];
    createdAt: string;
    updatedAt: string;
}
