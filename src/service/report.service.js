import { getToken } from "../constants/user";
import http from "../service/http-common";

class ReportService {
    getReportDate(data) {
        return http.post(`/api/v3/r23/bao-cao-ngay/danh-sach?token=${getToken()}`, JSON.stringify(data));
    }
}

export default new ReportService();