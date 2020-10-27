import http from "../service/http-common";

class UserService {
    login(username, password) {
        return http.get(`/app/index.aspx?USN=${username}&PWD=${password}&cmd=authen`);
    }
    register(fullname, password, phone, stock) {
        return http.get(`/app/index.aspx?Fn=${fullname}&Phone=${phone}&NewPWD=${password}&cmd=reg&ByStock=${stock}&USN=${phone}`);
    }
    getInfo(username, password) {
        return http.get(`/app/index.aspx?cmd=getInfo&USN=${username}&PWD=${password}`)
    }
    getListTagService(username, password, memberid) {
        return http.get(`/services/preview.aspx?a=1&USN=${username}&PWD=${password}&cmd=loadOrderService&MemberID=${memberid}&IsMember=1&fromOrderAdd=0`);
    }
    getBarCode(memberid) {
        return http.get(`/services/preview.aspx?cmd=Barcode&mid=${memberid}`);
    }
    updateBirthday(date, username, password) {
        return http.get(`/api/v1/?cmd=member_update_birth`, {
            params: {
                birth: date,
                USN: username,
                PWD: password
            }
        })
    }
    updateEmail(email, crpwd, username, password) {
        return http.get(`/api/v1/?cmd=member_update_email`, {
            params: {
                email: email,
                crpwd: crpwd,
                USN: username,
                PWD: password
            }
        })
    }
    updatePassword(username, password, data) {
        return http.post(`/app/index.aspx?cmd=chgpwd&USN=${username}&PWD=${password}`, data)
    }
}

export default new UserService();