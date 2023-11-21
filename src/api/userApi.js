import axiosClient from './axiosClient';
const userApi = {

    // user is teacher
    getAll() {
        const url = 'api/user';
        return axiosClient.get(url);
    },
    // user is all
    getAllUser() {
        const url = 'api/userAll';
        return axiosClient.get(url);
    },
    get(id) {
        const url = `api/UserId/${id}`;
        return axiosClient.get(url);
    },
    update(data) {
        const url = 'api/editUser';
        return axiosClient.post(url, data);
        
    },
    create(data) {
        const url = 'api/createUser';
        return axiosClient.post(url, data);
        // return axiosClient.patch(url, data);
    },
    checklogin(data) {
        const url = 'api/checkLoginUser';
        return axiosClient.post(url, data);
        // return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = 'api/deleteUser';
        return axiosClient.post(url, id)
    }
  
};
export default userApi;