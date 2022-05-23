import React, { Fragment } from "react";
import {
  Button,
  Link,
  Navbar,
  Page,
  Segmented,
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
import ListCustomer from "./report-customer/ListCustomer";
moment.locale("vi");

export default class ReportCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      sheet: {
        filters: false,
        filtersList: false,
      },
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
        List: {
          StockID: Number(getStockIDStorage()) || "", // ID Stock
          DateStart: new Date(), // Ngày bắt đầu
          DateEnd: new Date(), // Ngày kết thúc
          Pi: 1, // Trang hiện tại
          Ps: 10, // Số lượng item
          GroupCustomerID: '', // ID Nhóm khách hàng
          ProvincesID: '', // ID Thành phố
          DistrictsID: '', //ID Huyện
          SourceName: '', // ID Nguồn
          StaffID: ''
        }
      },
      PageTotal: 0
    };
  }

  componentDidMount() {
    this.getOverview();
    this.getList();
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
      StockID: filters.Overview.StockID,
    };
    if (filters.Overview.Date && filters.Overview.Date.length > 0) {
      newFilters.Date = moment(filters.Overview.Date[0]).format("DD/MM/yyyy");
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

  getList = (isLoading = true, callback) => {
    const { loading, filters, dataResult, sheet } = this.state;
    const newFilters = {
      ...filters.List,
      DateStart: filters.List.DateStart
        ? moment(filters.List.DateStart).format('DD/MM/yyyy')
        : null,
      DateEnd: filters.List.DateEnd
        ? moment(filters.List.DateEnd).format('DD/MM/yyyy')
        : null,
      StaffID: filters.List.StaffID ? filters.List.StaffID.value : '',
      GroupCustomerID: filters.List.GroupCustomerID
        ? filters.List.GroupCustomerID.value
        : '',
      SourceName: filters.List.SourceName ? filters.List.SourceName.value : '',
      ProvincesID: filters.List.ProvincesID ? filters.List.ProvincesID.value : '',
      DistrictsID: filters.List.DistrictsID ? filters.List.DistrictsID.value : ''
    }
    isLoading &&
      this.setState({
        loading: {
          ...loading,
          List: true,
        },
      });

    ReportService.getReportCustomerList(newFilters)
      .then(({ data }) => {
        console.log(data.result)
        const { Members, Total } = data.result;
        this.setState({
          loading: {
            ...loading,
            List: false,
          },
          dataResult: {
            ...dataResult,
            List: Members,
          },
          sheet: {
            ...sheet,
            filters: false,
          },
          PageTotal: Total
        });
        callback && callback();
        this.$f7.dialog.close();
      })
      .catch((error) => console.log(error));
  };

  onOpenSheet = (type) => {
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
          filtersList: true,
        }
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
      tabActive,
      filters,
      dataResult,
      loading,
      sheet,
    } = this.state;
    console.log(dataResult.List)
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
              <Link onClick={() => this.onOpenSheet("filters")}>
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
                      this.onHideSheet();
                    });
                  }
                }}
              />
            </Fragment>
          )}
          {tabActive === "list" && (
            <Fragment>
              <ListCustomer
                data={dataResult.List}
                filters={filters.List}
                loading={loading.List}
              />
            </Fragment>
          )}
        </div>
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
