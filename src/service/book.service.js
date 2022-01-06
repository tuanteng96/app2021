import http from "../service/http-common";

class BookDataService {
    getCardService(data) {
        return http.get(`/api/v3/mbook?cmd=getroot&memberid=${data.MemberID}&ps=${data.Ps}&pi=${data.Pi}&key=${data.Key}&stockid=${data.StockID}`);
    }
    postBook(data) {
        return http.post(`/api/v3/bookclient?cmd=book`, data);
    }
    bookDelete(id) {
        return http.post(`/api/v3/bookclient?cmd=delete&ids=${id}`)
    }

}

export default new BookDataService();