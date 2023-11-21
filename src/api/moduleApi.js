import axiosClient from './axiosClient';
const moduleApi = {

    get(params) {
        const url = 'api/moduleId';
        return axiosClient.post(url, params );
    },
    create(params) {
        const url = 'api/createModule';
        return axiosClient.post(url, params );
    },
    update(params) {
        const url = 'api/editModule';
        return axiosClient.post(url, params );
    },
    
    delete(params) {
        const url = 'api/deleteModule';
        return axiosClient.post(url, params );
    },
    

  
};
export default moduleApi;