import React, { Fragment } from "react";
import {
  Link,
  ListInput,
  ListItem,
  Navbar,
  Page,
  Sheet,
  Toolbar,
} from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";
import moment from "moment";
import "moment/locale/vi";
import Filters from "./components/Filters";
import { getStockIDStorage, getStockNameStorage } from "../../constants/user";
import ReportService from "../../service/report.service";
import ImageBG from "../../assets/images/profile-img.png";
import SkeletonReportDate from "./Skeleton/SkeletonReportDate";
import { formatPricePositive, formatPriceVietnamese } from "../../constants/format";
import PageNoData from "../../components/PageNoData";

moment.locale("vi");
export default class ReportingDate extends React.Component {
  constructor() {
    super();
    this.state = {
      sheetOpened: false,
      loading: false,
      filters: {
        Date: [new Date()],
        StockID: Number(getStockIDStorage()) || "",
        StockName: getStockNameStorage() || "Tất cả cơ sở",
      },
      ResultDay: null,
    };
  }

  componentDidMount() {
    this.getReportDays();
  }

  componentDidUpdate(prevProps, prevState) {
    const { filters } = this.state;
    if (
      prevState.filters.Date !== filters.Date ||
      prevState.filters.StockID !== filters.StockID
    ) {
      this.getReportDays();
    }
  }

  getReportDays = (isLoading = true, callback) => {
    const { filters } = this.state;
    isLoading && this.setState({ loading: true });
    const newFilters = {
      StockID: filters.StockID,
    };
    if (filters.Date && filters.Date.length > 0) {
      newFilters.Date = moment(filters.Date[0]).format("DD/MM/yyyy");
    }
    else {
      newFilters.Date = moment(new Date()).format("DD/MM/yyyy");
    }
    ReportService.getReportDate(newFilters)
      .then(({ data }) => {
        this.setState({
          loading: false,
          sheetOpened: false,
          ResultDay: data.result,
        });
        callback && callback();
        this.$f7.dialog.close();
      })
      .catch((error) => console.log(error));
  };

  onChangeDateS = (evt) => {
    const start = evt[0];
    const end = evt[1] ? evt[1] : evt[0];
    this.setState({
      startDate: moment(start).format("DD/MM/YYYY"),
      endDate: moment(end).format("DD/MM/YYYY"),
      arrDefaultDate: evt,
    });
  };

  loadMore(done) {
    const self = this;
    this.getReportDays(false, () => {
      setTimeout(() => {
        done();
      }, 1000);
    });
  }

  render() {
    const { sheetOpened, filters, loading, ResultDay } = this.state;
    return (
      <Page name="employee-service" ptr onPtrRefresh={this.loadMore.bind(this)}>
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link onClick={() => this.$f7.panel.toggle()}>
                <i className="las la-bars font-size-xl"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">Báo cáo ngày</span>
            </div>
            <div className="page-navbar__filter">
              {/* <NotificationIcon /> */}
              <Link onClick={() => this.setState({ sheetOpened: true })}>
                <i className="las la-filter font-size-xl"></i>
              </Link>
            </div>
          </div>
        </Navbar>
        <div className="page-render">
          {loading && <SkeletonReportDate />}
          {!loading && (
            <Fragment>
              {ResultDay ? (
                <Fragment>
                  <div className="report-welcome bg-white">
                    <div className="report-welcome__top">
                      <div className="d--f jc--sb">
                        <div className="pt-15px pl-15px pr-15px pb-35px">
                          <div className="text-primary2 fw-600 font-size-md mb-3px">
                            Xin chào !
                          </div>
                          <div className="text-primary2 fw-500">
                            {filters.StockName}
                          </div>
                        </div>
                        <div className="img d--f ai--e jc--c">
                          <img src={ImageBG}></img>
                        </div>
                      </div>
                      <div className="icon">
                        <i className="las la-map-marked-alt text-white"></i>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white pt-50px pl-15px pr-15px pb-15px mb-15px rounded">
                    <div className="text-uppercase text-black fw-600 mb-10px">
                      Thu chi hôm nay
                    </div>
                    <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Tổng thu
                      </div>
                      <div className="fw-600 font-size-sm text-success">
                        <i className="las la-arrow-down"></i>{" "}
                        {formatPricePositive(ResultDay.TgThu)}
                      </div>
                    </div>
                    <div className="d--f jc--sb ai--c pt-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Tổng chi
                      </div>
                      <div className="fw-600 font-size-sm text-danger">
                        <i className="las la-arrow-up"></i>{" "}
                        {formatPricePositive(ResultDay.TgChi)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-15px mb-15px rounded position-relative zindex-1">
                    <div className="text-uppercase text-black fw-600 mb-10px d--f jc--sb ai--c">
                      Khách hàng
                      <span className="text-success font-size-lg font-app-1">
                        +{ResultDay.KHMoi}{" "}
                        <span className="text-none font-size-sm fw-400 text-gray-700">
                          khách hàng mới
                        </span>
                      </span>
                    </div>
                    <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Đến tại Spa
                      </div>
                      <div className="fw-600 font-size-sm">
                        {ResultDay.KHDenTaiSpa}
                      </div>
                    </div>
                    <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Web / App
                      </div>
                      <div className="fw-600 font-size-sm">
                        {ResultDay.KHWebApp}
                      </div>
                    </div>
                    <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Khách đang CheckIn
                      </div>
                      <div className="fw-600 font-size-sm">
                        {ResultDay.KHDangCheckIn}
                      </div>
                    </div>
                    <div className="d--f jc--sb ai--c pt-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Tổng khách CheckIn
                      </div>
                      <div className="fw-600 font-size-sm">
                        {ResultDay.KHCheckIn}
                      </div>
                    </div>
                    <div className="line-report-1"></div>
                  </div>

                  <div className="bg-white p-15px mb-15px rounded position-relative zindex-1">
                    <div className="text-uppercase text-black fw-600 mb-10px d--f jc--sb ai--c">
                      Bán hàng
                      <span className="text-success font-size-lg font-app-1">
                        +{ResultDay.DonHangMoi}{" "}
                        <span className="text-none font-size-sm fw-400 text-gray-700">
                          đơn hàng mới
                        </span>
                      </span>
                    </div>
                    <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Doanh số
                      </div>
                      <div className="fw-600 font-size-sm">
                        {formatPriceVietnamese(ResultDay.DSo)}
                      </div>
                    </div>
                    <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Thanh toán
                      </div>
                      <div className="fw-600 font-size-sm">
                        {formatPriceVietnamese(ResultDay.DSo_DaTT)}
                      </div>
                    </div>
                    <div className="d--f jc--sb ai--c pt-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Thanh toán nợ
                      </div>
                      <div className="fw-600 font-size-sm">
                        {formatPriceVietnamese(ResultDay.DSo_No)}
                      </div>
                    </div>
                    <div className="line-report-2"></div>
                  </div>

                  <div className="bg-white p-15px mb-5px rounded position-relative zindex-1">
                    <div className="text-uppercase text-black fw-600 mb-10px d--f jc--sb ai--c">
                      Dịch vụ
                      <span className="text-success font-size-lg font-app-1">
                        +{ResultDay.DVu_DatLich}{" "}
                        <span className="text-none font-size-sm fw-400 text-gray-700">
                          đặt lịch mới
                        </span>
                      </span>
                    </div>
                    <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Dịch vụ đang làm
                      </div>
                      <div className="fw-600 font-size-sm text-warning">
                        {ResultDay.DVu_DangTHien}
                      </div>
                    </div>
                    <div className="d--f jc--sb ai--c pt-8px">
                      <div className="text-gray-700 font-size-xs fw-500">
                        Dịch vụ hoàn thành
                      </div>
                      <div className="fw-600 font-size-sm text-success">
                        {ResultDay.DVu_DaXong}
                      </div>
                    </div>
                    <div className="line-report-3"></div>
                  </div>
                </Fragment>
              ) : (
                <PageNoData text="Không có dữ liệu" />
              )}
            </Fragment>
          )}
        </div>
        <Filters
          show={sheetOpened}
          onHide={() => {
            this.setState({ sheetOpened: false });
          }}
          filters={filters}
          options={{
            dateFormat: "dd/mm/yyyy",
            rangePicker: false,
            footer: true,
            toolbarCloseText: "Đóng",
            openIn: "popover",
            footer: false,
            closeOnSelect: true,
          }}
          onSubmit={(values) => {
            if (
              values.Date !== filters.Date ||
              values.StockID !== filters.StockID
            ) {
              this.$f7.dialog.preloader("Đang tải ...");
              this.setState({ filters: values });
            } else {
              this.getReportDays(true, () => {
                this.setState({ sheetOpened: false });
              });
            }
          }}
        />

        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
