import { SERVER_APP } from "../constants/config";
import imgAvatarNull from "./../assets/images/avatar-null.png";
import imgAvatarNull2 from "./../assets/images/avatar-null2.png";
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

//Format VNĐ
export const formatPriceVietnamese = (price) => {
    return price.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

//format date service
export const formatDateSv = (date) => {
    const dateSv = date.split("T")[0];
    const dateTo = dateSv.split("-");
    return dateTo[2] + "/" + dateTo[1] + "/" + dateTo[0];
}
export const formatDateNotYYYY = (date) => {
    if (date === null) return false;
    const dateSv = date.split("T")[0];
    const dateTo = dateSv.split("-");
    return dateTo[2] + "-" + dateTo[1];
}

// Check Sale 

export const checkSale = (SaleBegin, SaleEnd) => {
    var SaleBegins = SaleBegin.slice(0, 10);
    var SaleEnds = SaleEnd.slice(0, 10);
    var todaydate = new Date();
    var day = todaydate.getDate();
    var month = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datetoday = year + "-" + month + "-" + day;

    if (
        Date.parse(todaydate) < Date.parse(SaleEnd) &&
        Date.parse(SaleBegin) <= Date.parse(todaydate)
    ) {
        return true;
    } else {
        return false;
    }
};

//Tính phần trăm sale Product

export const percentagesSale = (Price, PriceSale) => {
    return 100 - ((PriceSale / Price) * 100);
}

//Check avatar Null
export const checkAvt = (src) => {
    if (src === "null.gif" || src === "") {
        return imgAvatarNull
    } else {
        return SERVER_APP + "/Upload/image/" + src;
    }
}
export const checkAvt2 = (src) => {
    if (src === "null.gif" || src === "") {
        return imgAvatarNull2;
    } else {
        return SERVER_APP + "/Upload/image/" + src;
    }
}

// Get date max book
export const maxBookDate = (services) => {
    var max = '';
    services && services.map((x) => {
        if (x.BookDate && x.BookDate > max) max = x.BookDate;
    })
    if (max) {
        return moment(max).fromNow()
    }
    return max;
}