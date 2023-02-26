
import AssignmetnModel from './../Models/AssignmentModel';
export class AssignmentsState {
    public assignments: AssignmetnModel[] = [];

}

export enum AssignmentActionType {
    FetchAssignments = "FetchAssignments",
    AddAssignment = "AddAssignment",
    UpdateAssignment = "UpdateAssignment",
    DeleteAssignment = "DeleteAssignment",
}

export interface AssignmentAction {
    type: AssignmentActionType;
    payload: any;
}

export const fetchAssignmentsAction = (assignments: AssignmetnModel[]): AssignmentAction => {
    return { type: AssignmentActionType.FetchAssignments, payload: assignments };
}

export const addAssignmentAction = (assignment: AssignmetnModel): AssignmentAction => {
    return { type: AssignmentActionType.AddAssignment, payload: assignment };
}
export const updateAssignmentAction = (assignment: AssignmetnModel): AssignmentAction => {
    return { type: AssignmentActionType.UpdateAssignment, payload: assignment };
}
export const deleteAssignmentAction = (assignmentId: string): AssignmentAction => {
    return { type: AssignmentActionType.DeleteAssignment, payload: assignmentId };
}


export const assignmentsReducer = (currentState = new AssignmentsState(), action: AssignmentAction): AssignmentsState => {
    const newState = { ...currentState };

    switch (action.type) {
        case AssignmentActionType.FetchAssignments:
            newState.assignments = action.payload;
            break;
        case AssignmentActionType.AddAssignment:
            newState.assignments.push(action.payload);
            break;
        case AssignmentActionType.UpdateAssignment:
            const indexToUpdate = newState.assignments.findIndex(a => a.assignmentId === action.payload.assignmentId);
            if (indexToUpdate >= 0) {
                newState.assignments[indexToUpdate] = action.payload;
            }
            break;
        case AssignmentActionType.DeleteAssignment:
            const indexToDelete = newState.assignments.findIndex(a => a.assignmentId === action.payload);
            if (indexToDelete >= 0) {
                newState.assignments.splice(indexToDelete, 1);
            }
    }

    return newState;
}