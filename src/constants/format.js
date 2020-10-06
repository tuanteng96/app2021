//Format VNĐ
export const formatPriceVietnamese = (price) => {
    return price.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

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