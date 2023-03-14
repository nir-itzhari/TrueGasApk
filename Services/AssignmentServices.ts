import axios from "axios";
import config from "../Utils/Config";
import { fetchAssignmentsAction, updateAssignmentAction } from "../redux/AssignmentState";
import AssignmentModel from "../Models/AssignmentModel";
import { format } from "date-fns";
import { addAssignmentAction, deleteAssignmentAction } from './../redux/AssignmentState';
import store from "../redux/Store";

class AssignmentService {

    public async fetchAssignments(): Promise<AssignmentModel[]> {

        if (store.getState().assignmentsState.assignments.length === 0) {
            const response = await axios.get<AssignmentModel[]>(config.assignmentsUrl);
            const assignments = response.data;
            store.dispatch(fetchAssignmentsAction(assignments));
        }
        return store.getState().assignmentsState.assignments;
    }

    public async getOneAssignments(assignmentId: string): Promise<AssignmentModel> {
        let assignment = store.getState().assignmentsState.assignments.find(a => a.assignmentId === assignmentId);
        if (!assignment) {
            const response = await axios.get<AssignmentModel>(config.assignmentsUrl + assignmentId);
            assignment = response.data;
        }
        return assignment;
    }

    public async addNewAssignment(assignments: AssignmentModel): Promise<AssignmentModel> {

        const formData = new FormData();
        formData.append('date', format(assignments.date, "YYYY-MM-DD"))
        formData.append('title', assignments.title);
        formData.append('description', assignments.description);
        formData.append('user_id', assignments.user_id);
        formData.append('client_id', assignments.client_id);
        formData.append('imageFile', assignments.imageFile.item(0));

        const response = await axios.post<AssignmentModel>(config.assignmentsUrl, formData);
        const addedAssignments = response.data;

        store.dispatch(addAssignmentAction(addedAssignments));

        return addedAssignments;
    }

    public async updateAssignment(assignments: AssignmentModel): Promise<AssignmentModel> {

        const formData = new FormData();
        formData.append('date', format(assignments.date, "YYYY-MM-DD"))
        formData.append('title', assignments.title);
        formData.append('description', assignments.description);
        formData.append('user_id', assignments.user_id);
        formData.append('client_id', assignments.client_id);
        formData.append('imageFile', assignments.imageFile.item(0));

        const response = await axios.post<AssignmentModel>(config.assignmentsUrl, formData);
        const updatedAssignments = response.data;

        store.dispatch(updateAssignmentAction(updatedAssignments));

        return updatedAssignments;
    }

    public async deleteOneAssignment(assignmentId: string): Promise<void> {
        await axios.delete(config.assignmentsUrl + assignmentId);
        store.dispatch(deleteAssignmentAction(assignmentId));
    }
}
const assignmentService = new AssignmentService();

export default assignmentService
