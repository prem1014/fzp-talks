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

    public static updateFeedback(feedbackId: string): Promise<any> {
        return axios.put(this.apiUrl + 'feedback/' + feedbackId);
    }

    public static saveUsers(users: any): Promise<any> {
        return axios.post(this.apiUrl + 'user', {user: users })
    }

    public static getUsers(): Promise<any> {
        return axios.get(this.apiUrl + 'user')
    }

    public static getListOfMukhiyak(): Promise<any> {
        return axios.get(this.apiUrl + 'mukhiya');
    }

    public static updateMukhiyaDetails(id: string): Promise<any> {
        return axios.put(this.apiUrl + 'mukhiya/' + id);
    }

    public static getFeedBackAndUsers(): Promise<any> {
        return axios.all([AppService.getFeedback(), AppService.getUsers(), AppService.getListOfMukhiyak()])
    }
}

export default AppService;