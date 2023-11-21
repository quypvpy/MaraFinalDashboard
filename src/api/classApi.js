import axiosClient from './axiosClient';
const classApi = {

    getAll(params) {
        const url = 'api/class';
        return axiosClient.post(url, params );
    },
    createClass(params) {
        const url = 'api/createClass';
        return axiosClient.post(url, params );
    },
    updatePass(params) {
        const url = 'api/UpdatePass';
        return axiosClient.post(url, params );
    },
    getIdTeacher(id) {

        const url = `api/getIdClassTeacher/${id}`;
        return axiosClient.get(url);
    },
    getIdStudent(id) {

        const url = `api/getIdClassStudent/${id}`;
        return axiosClient.get(url);
    },
    editSchedule(params) {
        const url = 'api/editSchedules';
        return axiosClient.post(url, params );
    },

    
    add(data) {
        const url = 'api/createCourse';
        return axiosClient.post(url, data);
    },
    get(id) {
        const url = `/eduId/${id}`;
        return axiosClient.get(url);
    },
    updateEdu(data) {
        const url = '/editEdu';
        return axiosClient.post(url, data);
        // return axiosClient.patch(url, data);
    },
    

};
export default classApi;