import http from "../service/http-common";

class NewsDataService {
    getAll() {
        return http.get("/app/index.aspx?cmd=home2");
    }
    getBanner() {
        return http.get("/app/index.aspx?cmd=adv&pos=App.Banner");
    }
    get(id) {
        return http.get(`/tutorials/${id}`);
    }
}

export default new NewsDataService();