import axiosClient from './axiosClient';
const courseCateApi = {

    getAll() {
        const url = 'api/courseCate';
        return axiosClient.get(url);
    },
    

};
export default courseCateApi;