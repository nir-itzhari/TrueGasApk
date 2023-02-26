export const extractErrorMessage = (err: any): string => {
    if (typeof err === "string") return err;

    if (typeof err.response?.data === "string") return err.response.data;

    if (Array.isArray(err.response?.data)) return err.response.data[0];

    if (typeof err.message === "string") return err.message;

    return "Some error, please try again ";
}