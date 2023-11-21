import axiosClient from './axiosClient';
const courseApi = {

    getAll(params) {
        const url = 'api/course';
        return axiosClient.post(url, params );
    },
    add(data) {
        const url = 'api/createCourse';
        return axiosClient.post(url, data);
    },
    get(id) {
        const url = `api/courseId/${id}`;
        return axiosClient.get(url);
    },
    updateCourse(data) {
        const url = 'api/editCourse';
        return axiosClient.post(url, data);
        // return axiosClient.patch(url, data);
    },
    updateStatus(data) {
        const url = 'api/courseStatus';
        return axiosClient.post(url, data);
        // return axiosClient.patch(url, data);
    },
    
    updateRoleStatus(data) {
        const url = '/editRoleStatus';
        return axiosClient.post(url, data);
        // return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = '/deleteRole';
        return axiosClient.post(url, id)
    }
};
export default courseApi;