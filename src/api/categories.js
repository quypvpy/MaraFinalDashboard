import axiosClient from './axiosClient';
const categories = {

    getAll(params) {
        const url = 'api/categories';
        return axiosClient.post(url, params );
    },
    add(data) {
        const url = '/createEdu';
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
export default categories;