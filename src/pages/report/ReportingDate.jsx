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

moment.locale("vi");
export default class ReportingDate extends React.Component {
  constructor() {
    super();
    this.state = {
      sheetOpened: false,
      loading: false,
      filters: {
        Date: [new Date()],
        StockID: Number(getStockIDStorage()) || -1,
      },
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
    ReportService.getReportDate(filters)
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
          sheetOpened: false,
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
    const { sheetOpened, filters, loading } = this.state;

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
              <div className="report-welcome bg-white">
                <div className="report-welcome__top">
                  <div className="d--f jc--sb">
                    <div className="pt-15px pl-15px pr-15px pb-35px">
                      <div className="text-primary2 fw-600 font-size-md mb-3px">
                        Xin chào !
                      </div>
                      <div className="text-primary2 fw-500">
                        {getStockNameStorage() || "Tất cả cơ sở"}
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
                    <i className="las la-arrow-down"></i> 15,000,000
                  </div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Tổng chi
                  </div>
                  <div className="fw-600 font-size-sm text-danger">
                    <i className="las la-arrow-up"></i> 8,000,000
                  </div>
                </div>
              </div>

              <div className="bg-white p-15px mb-15px rounded position-relative zindex-1">
                <div className="text-uppercase text-black fw-600 mb-10px">
                  Khách hàng
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Khách hàng mới
                  </div>
                  <div className="fw-600 font-size-sm">50</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Đến tại Spa
                  </div>
                  <div className="fw-600 font-size-sm">12</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Web / App
                  </div>
                  <div className="fw-600 font-size-sm">25</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Tổng khách CheckIn
                  </div>
                  <div className="fw-600 font-size-sm">25</div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Khách đang CheckIn
                  </div>
                  <div className="fw-600 font-size-sm">16</div>
                </div>
                <div className="line-report-1"></div>
              </div>

              <div className="bg-white p-15px mb-15px rounded position-relative zindex-1">
                <div className="text-uppercase text-black fw-600 mb-10px">
                  Bán hàng
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Đơn hàng mới
                  </div>
                  <div className="fw-600 font-size-sm">50</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Doanh số
                  </div>
                  <div className="fw-600 font-size-sm">12,000,000</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Thanh toán
                  </div>
                  <div className="fw-600 font-size-sm">8,000,000</div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Thanh toán nợ
                  </div>
                  <div className="fw-600 font-size-sm">4,000,000</div>
                </div>
                <div className="line-report-2"></div>
              </div>

              <div className="bg-white p-15px mb-5px rounded position-relative zindex-1">
                <div className="text-uppercase text-black fw-600 mb-10px">
                  Dịch vụ
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Đặt lịch
                  </div>
                  <div className="fw-600 font-size-sm">50</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Dịch vụ đang làm
                  </div>
                  <div className="fw-600 font-size-sm text-warning">15</div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Dịch vụ hoàn thành
                  </div>
                  <div className="fw-600 font-size-sm text-success">4</div>
                </div>
                <div className="line-report-3"></div>
              </div>
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
