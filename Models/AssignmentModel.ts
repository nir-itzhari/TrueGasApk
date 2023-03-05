class AssignmentModel {
    public assignmentId: string;
    public date: Date;
    public title: string;
    public description: string;
    public client_id: string;
    public user_id: string;
    public imageFile: FileList = null;
    public imageName: string;
    public isDone?: boolean;
}

export default AssignmentModel;