import AssignmentModel from './AssignmentModel';


export class ClientModel {
    public _id: string;
    public fullName: string;
    public city: string;
    public street: string;
    public buildingNumber: string;
    public floor: string;
    public apartmentNumber: string;
    public phoneNumber: string;
    public phoneNumberTwo?: string;
    public assignmentIds: string[];
    public assignments: AssignmentModel[]; // You can replace 'any' with the actual type of the 'assignment' property if it has a specific type.
}