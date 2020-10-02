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

    create(data) {
        return http.post("/tutorials", data);
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
    }

    delete(id) {
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll() {
        return http.delete(`/tutorials`);
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new NewsDataService();