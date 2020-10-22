import http from "../service/http-common";

class UserService {
    login(username, password) {
        return http.get(`/app/index.aspx?USN=${username}&PWD=${password}&cmd=authen`);
    }
    register(fullname, password, phone, stock) {
        return http.get(`/app/index.aspx?Fn=${fullname}&Phone=${phone}&NewPWD=${password}&cmd=reg&ByStock=${stock}&USN=${phone}`);
    }
    getInfo(username) {
        return http.get(`/app/index.aspx?cmd=getInfo&USN=${username}&PWD=1234`)
    }
    getListTagService(username, password, memberid) {
        return http.get(`/services/preview.aspx?a=1&USN=${username}&PWD=${password}&cmd=loadOrderService&MemberID=${memberid}&IsMember=1&fromOrderAdd=0`);
    }
    getBarCode(memberid) {
        return http.get(`/services/preview.aspx?cmd=Barcode&mid=${memberid}`);
    }
}

export default new UserService();