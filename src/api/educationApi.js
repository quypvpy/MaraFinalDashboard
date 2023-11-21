import axiosClient from './axiosClient';
const educationApi = {

    getAll(params) {
        const url = 'api/education';
        return axiosClient.post(url, { params });
    },
    add(data) {
        const url = 'api/createEdu';
        return axiosClient.post(url, data);
    },
    get(id) {
        const url = `api/eduId/${id}`;
        return axiosClient.get(url);
    },
    updateEdu(data) {
        const url = 'api/editEdu';
        return axiosClient.post(url, data);
        // return axiosClient.patch(url, data);
    },
    
    updateEduName(data) {
        const url = 'api/editEduName';
        return axiosClient.post(url, data);
    },
    
    updateEduStatus(data) {
        const url = 'api/editEduStatus';
        return axiosClient.post(url, data);
    },
    remove(id) {
        const url = 'api/deleteEdu';
        return axiosClient.post(url, id)
    }
};
export default educationApi;