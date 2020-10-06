import http from "../service/http-common";

class ShopDataService {
    getCate(id) {
        return http.get(`/app/index.aspx?cmd=cate_parentid&id=${id}`);
    }
    getList(id, pi, ps, tags, keys) {
        return http.get(`/app/index.aspx?cmd=search_prods&key=${keys}&cates=${id}&pi=${pi}&ps=${ps}&tags=${tags}`);
    }
    getTitleCate(id) {
        return http.get(`/api/v3/content?cmd=id&id=${id}&tb=categories`);
    }
    getDetail(id) {
        return http.get(`/app/index.aspx?id=${id}&cmd=prodid`);
    }
}

export default new ShopDataService();