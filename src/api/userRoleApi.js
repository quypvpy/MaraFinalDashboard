import axiosClient from './axiosClient';
const userRoleApi = {

    getAll(params) {
        const url = 'api/role';
        return axiosClient.post(url, { params });
    },
    get(id) {
        const url = `api/roleId/${id}`;
        return axiosClient.get(url);
    },
    add(data) {
        const url = 'api/createRole';
        return axiosClient.post(url, data);
    },
    updateRoleName(data) {
        const url = 'api/editRoleName';
        return axiosClient.post(url, data);
        // return axiosClient.patch(url, data);
    },
    updateRoleStatus(data) {
        const url = 'api/editRoleStatus';
        return axiosClient.post(url, data);
        // return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = 'api/deleteRole';
        return axiosClient.post(url, id)
    }
};
export default userRoleApi;