import http from "../service/http-common";

class ShopDataService {
    getCate(id) {
        return http.get(`/app/index.aspx?cmd=cate_parentid&id=${id}`);
    }
    getList(id, pi, ps, tags) {
        return http.get(`/app/index.aspx?cmd=search_prods&key=&cates=${id}&pi=${pi}&ps=${ps}&tags=${tags}`);
    }
    getTitleCate(id) {
        return http.get(`/api/v3/content?cmd=id&id=${id}&tb=categories`);
    }
}

export default new ShopDataService();