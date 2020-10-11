import http from "../service/http-common";

class UserService {
    login(username, password) {
        return http.get(`/app/index.aspx?USN=${username}&PWD=${password}&cmd=authen`);
    }
    register(fullname, password, phone, stock) {
        return http.get(`/app/index.aspx?Fn=${fullname}&Phone=${phone}&NewPWD=${password}&cmd=reg&ByStock=${stock}&USN=${phone}`);
    }
}

export default new UserService();