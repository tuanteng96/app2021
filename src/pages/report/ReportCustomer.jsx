import React, { Fragment } from "react";
import {
  Button,
  Link,
  Navbar,
  Page,
  PageContent,
  Segmented,
  Sheet,
  Subnavbar,
  Tab,
  Tabs,
  Toolbar,
} from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";
import { Animated } from "react-animated-css";
import OverviewCustomer from "./report-customer/OverviewCustomer";
import { getStockIDStorage, getStockNameStorage } from "../../constants/user";
import ReportService from "../../service/report.service";
import Filters from "../report/components/Filters";

import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

export default class ReportCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      sheet: {
        filters: false,
        detail: false,
      },
      initialValues: null,
      tabActive: "overview",
      dataResult: {
        Overview: null,
        List: null,
      },
      loading: {
        Overview: false,
        List: false,
      },
      filters: {
        Overview: {
          Date: [new Date()],
          StockID: Number(getStockIDStorage()) || "",
          StockName: getStockNameStorage() || "Tất cả cơ sở",
        },
      },
    };
  }

  componentDidMount() {
    this.getOverview();
  }

  componentDidUpdate(prevProps, prevState) {
    const { filters } = this.state;
    if (
      prevState.filters.Overview.Date !== filters.Overview.Date ||
      prevState.filters.Overview.StockID !== filters.Overview.StockID
    ) {
      this.getOverview();
    }
  }

  getOverview = (isLoading = true, callback) => {
    const { loading, filters, dataResult, sheet } = this.state;
    isLoading &&
      this.setState({
        loading: {
          ...loading,
          Overview: true,
        },
      });
    const newFilters = {
      StockID: filters.StockID,
    };
    if (filters.Date && filters.Date.length > 0) {
      newFilters.Date = moment(filters.Date[0]).format("DD/MM/yyyy");
    } else {
      newFilters.Date = moment(new Date()).format("DD/MM/yyyy");
    }
    ReportService.getReportCustomerOverview(newFilters)
      .then(({ data }) => {
        const newResult = {
          ...data.result,
          SoKHs_ByMonth_LastYear: data?.result?.SoKHs_ByMonth_LastYear.map(
            (item, index) => ({
              year: `T${index + 1}`,
              KH: item,
            })
          ),
          SoKHs_ByMonth_ThisYear: data?.result?.SoKHs_ByMonth_ThisYear.map(
            (item, index) => ({
              year: `T${index + 1}`,
              KH: item,
            })
          ),
        };
        this.setState({
          loading: {
            ...loading,
            Overview: false,
          },
          dataResult: {
            ...dataResult,
            Overview: newResult,
          },
          sheet: {
            ...sheet,
            filters: false,
          },
        });
        callback && callback();
        this.$f7.dialog.close();
      })
      .catch((error) => console.log(error));
  };

  onOpenSheet = (item, type) => {
    const { sheet } = this.state;
    if (type === "filters") {
      this.setState({
        sheet: {
          ...sheet,
          filters: true,
        },
      });
    } else {
      this.setState({
        sheet: {
          ...sheet,
          detail: true,
        },
        initialValues: item,
      });
    }
  };

  onHideSheet = () => {
    this.setState({
      sheet: {
        filters: false,
        detail: false,
      },
      initialValues: null,
    });
  };

  loadMore(done) {
    const { tabActive } = this.state;
    const self = this;
    if (tabActive === "overview") {
      this.getOverview(false, () => {
        setTimeout(() => {
          done();
        }, 500);
      });
    }
  }

  render() {
    const {
      initialValues,
      sheetOpened,
      tabActive,
      filters,
      dataResult,
      loading,
      sheet,
    } = this.state;

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
              <span className="title">Báo cáo khách hàng</span>
            </div>
            <div className="page-navbar__filter">
              <Link onClick={() => this.onOpenSheet("", "filters")}>
                <i className="las la-filter font-size-xl"></i>
              </Link>
            </div>
          </div>
          <Subnavbar>
            <Segmented raised>
              <Button
                onClick={() => this.setState({ tabActive: "overview" })}
                tabLinkActive={tabActive === "overview"}
              >
                Tổng quan
              </Button>
              <Button
                onClick={() => this.setState({ tabActive: "list" })}
                tabLinkActive={tabActive === "list"}
              >
                Danh sách
              </Button>
            </Segmented>
          </Subnavbar>
        </Navbar>

        <div className={`page-render ${tabActive === "list" && "bg-white"}`}>
          {tabActive === "overview" && (
            <Fragment>
              <OverviewCustomer
                data={dataResult.Overview}
                filters={filters.Overview}
                loading={loading.Overview}
              />
              <Filters
                show={sheet.filters}
                onHide={() => {
                  this.onHideSheet();
                }}
                filters={filters.Overview}
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
                    values.Date !== filters.Overview.Date ||
                    values.StockID !== filters.Overview.StockID
                  ) {
                    this.$f7.dialog.preloader("Đang tải ...");
                    this.setState({
                      filters: {
                        ...filters,
                        Overview: values,
                      },
                    });
                  } else {
                    this.getOverview(true, () => {
                      this.onOpenSheet();
                    });
                  }
                }}
              />
            </Fragment>
          )}
          {tabActive === "list" && (
            <Animated
              animationIn="fadeInLeft"
              animationOut="fadeOut"
              isVisible={true}
              animationInDuration={500}
            >
              {Array(10)
                .fill()
                .map((item, index) => (
                  <div
                    className={`d--f ai--c ${
                      index !== 9 ? "pb-12px mb-12px border-bottom-dashed" : ""
                    }`}
                    key={index}
                    onClick={() => this.onOpenSheet(index)}
                  >
                    <div className="w-40px h-40px rounded d--f ai--c jc--c bg-light fw-600 overflow-hidden">
                      <img
                        className="w-100"
                        src="https://preview.keenthemes.com/metronic8/demo12/assets/media/avatars/300-14.jpg"
                        alt=""
                      />
                    </div>
                    <div className="f--1 px-12px">
                      <div className="text-dark fw-600">Nguyễn Tài Tuấn</div>
                      <div className="fw-500 text-muted font-size-xs">
                        0971.02.11.96 - Khách hàng mới
                      </div>
                    </div>
                    <div>
                      <button className="btn svg-icon svg-icon-2 text-svg w-30px h-30px rounded bg-light shadows">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            opacity="0.5"
                            x={18}
                            y={13}
                            width={13}
                            height={2}
                            rx={1}
                            transform="rotate(-180 18 13)"
                            fill="currentColor"
                          />
                          <path
                            d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </Animated>
          )}
        </div>
        <Sheet
          className="sheet-scroll"
          opened={sheetOpened}
          onSheetClosed={this.onHideSheet}
          swipeToClose
          backdrop
        >
          <Toolbar>
            <div className="px-15px w-100 d--f ai--c jc--sb">
              <div className="left line-height-xs text-uppercase fw-500 font-size-md">
                Nguyễn Tài Tuấn
              </div>
              <div className="right">
                <Link sheetClose>
                  <i className="las la-times"></i>
                </Link>
              </div>
            </div>
          </Toolbar>
          <PageContent className="bg-white">
            <div className="p-15px">
              <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                <div className="fw-500 text-gray-700">Số điện thoại</div>
                <div className="fw-600 text-dark">0971021196</div>
              </div>
              <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                <div className="fw-500 text-gray-700">Ngày tạo</div>
                <div className="fw-600 text-dark">18:00 25/12/2022</div>
              </div>
              <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                <div className="fw-500 text-gray-700">Cấp bậc</div>
                <div className="fw-600 text-dark">Khách hàng thân thiết</div>
              </div>
              <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                <div className="fw-500 text-gray-700">Cơ sở</div>
                <div className="fw-600 text-dark">Cser Hà Nội</div>
              </div>
              <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                <div className="fw-500 text-gray-700">Tổng tiền thực chi</div>
                <div className="fw-600 text-dark">18,000,000</div>
              </div>
              <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                <div className="fw-500 text-gray-700">Công nợ</div>
                <div className="fw-600 text-dark">1,000,000</div>
              </div>
              <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                <div className="fw-500 text-gray-700">Ví</div>
                <div className="fw-600 text-dark">1,000,000</div>
              </div>
              <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                <div className="fw-500 text-gray-700">Thẻ tiền</div>
                <div className="fw-600 text-dark">1,000,000</div>
              </div>
              <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                <div className="fw-500 text-gray-700">Thẻ bảo hành</div>
                <div className="fw-600 text-dark">5 Thẻ</div>
              </div>
              <div className="mb-10px pb-10px border-bottom-dashed">
                <div className="fw-500 text-gray-700">
                  Số buổi DV còn lại / Giá trị
                </div>
                <div className="fw-600 text-dark">1 buổi / 1,000,000</div>
              </div>
              <div>
                <div className="fw-500 text-gray-700">Nhân viên phụ trách</div>
                <div className="fw-600 text-dark">Nguyễn Thị Thu Trang</div>
              </div>
            </div>
          </PageContent>
        </Sheet>
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
