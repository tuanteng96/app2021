import http from "../service/http-common";

class BookDataService {
    getCardService(id) {
        return http.get(`/api/v3/bookclient?cmd=get&MemberID=${id}`);
    }
    postBook(data) {
        return http.post(`/api/v3/bookclient?cmd=book`, data);
    }
}

export default new BookDataService();