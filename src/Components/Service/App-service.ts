import axios from 'axios';

class AppService {
    //private static apiUrl = 'http://localhost:9000/api/';
    private static apiUrl = 'https://nrf-api.herokuapp.com/api/'
    constructor() {

    }

    public static saveFeedback(feedback: any): Promise<any> {
        return axios.post(this.apiUrl + 'feedback', {feedback: feedback})
    }

    public static getFeedback(): Promise<any> {
        return axios.get(this.apiUrl + 'feedback');
    }

    public static saveUsers(users: any): Promise<any> {
        return axios.post(this.apiUrl + 'user', {user: users })
    }

    public static getUsers(): Promise<any> {
        return axios.get(this.apiUrl + 'user')
    }

    public static getFeedBackAndUsers(): Promise<any> {
        return axios.all([AppService.getFeedback(), AppService.getUsers()])
    }
}

export default AppService;