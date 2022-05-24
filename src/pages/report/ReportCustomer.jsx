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
import OverviewCustomer from "./report-customer/OverviewCustomer";
import { getStockIDStorage, getStockNameStorage } from "../../constants/user";
import ReportService from "../../service/report.service";
import Filters from "../report/components/Filters";
import ListCustomer from "./report-customer/ListCustomer";
import FiltersList from "./components/FiltersList";
import _ from "lodash";

import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

export default class ReportCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      sheet: {
        filters: false,
        filtersList: false,
      },
      tabActive: "",
      dataOverview: [],
      dataList: [],
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
          DateStart: [new Date("05/01/2021")], // Ngày bắt đầu
          DateEnd: [new Date("05/25/2022")], // Ngày kết thúc
          Pi: 1, // Trang hiện tại
          Ps: 10, // Số lượng item
          GroupCustomerID: "", // ID Nhóm khách hàng
          ProvincesID: "", // ID Thành phố
          DistrictsID: "", //ID Huyện
          SourceName: "", // ID Nguồn
          StaffID: "",
        },
      },
      PageTotal: 0,
      PageCount: 0,
      showPreloader: false,
    };
  }

  componentDidMount() {
    this.setState({ tabActive: "overview" });
    // this.getOverview();
    // this.getList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { filters, tabActive } = this.state;
    if (!_.isEqual(prevState.filters.Overview, filters.Overview)) {
      if (tabActive === "overview") {
        this.getOverview();
      }
    }
    if (!_.isEqual(prevState.filters.List, filters.List)) {
      if (tabActive === "list") {
        this.getList();
      }
    }
    if (prevState.tabActive !== tabActive) {
      var $$ = this.Dom7;
      var container = $$(".page-content");
      container.scrollTop(0, 300);
      if (tabActive === "overview") {
        this.getOverview();
      } else {
        this.getList();
      }
    }
  }

  getOverview = (isLoading = true, callback) => {
    const { loading, filters, sheet } = this.state;

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
          dataOverview: newResult,
          dataList: null,
          sheet: {
            ...sheet,
            filters: false,
          },
          filters: {
            ...filters,
            List: {
              ...filters.List,
              Pi: 1,
            },
          },
        });
        callback && callback();
        this.$f7.dialog.close();
      })
      .catch((error) => console.log(error));
  };

  getList = (isLoading = true, isRefresh = false, callback) => {
    const { loading, filters, sheet, dataList, showPreloader } = this.state;
    !showPreloader &&
      isLoading &&
      this.setState({
        loading: {
          ...loading,
          List: true,
        },
      });
    const newFilters = {
      ...filters.List,
      DateStart: null,
      DateEnd: null,
      StaffID: filters.List.StaffID ? filters.List.StaffID.value : "",
      GroupCustomerID: filters.List.GroupCustomerID
        ? filters.List.GroupCustomerID.value
        : "",
      SourceName: filters.List.SourceName ? filters.List.SourceName.value : "",
      ProvincesID: filters.List.ProvincesID
        ? filters.List.ProvincesID.value
        : "",
      DistrictsID: filters.List.DistrictsID
        ? filters.List.DistrictsID.value
        : "",
    };
    if (filters.List.DateStart.length > 0) {
      newFilters.DateStart = moment(filters.List.DateStart[0]).format(
        "DD/MM/YYYY"
      );
    }
    if (filters.List.DateEnd.length > 0) {
      newFilters.DateEnd = moment(filters.List.DateEnd[0]).format("DD/MM/YYYY");
    }
    if (isRefresh) {
      newFilters.Pi = 1;
    }

    ReportService.getReportCustomerList(newFilters)
      .then(({ data }) => {
        const { Members, Total, PCount } = data.result;
        this.setState({
          loading: {
            ...loading,
            List: false,
          },
          dataList: showPreloader ? [...dataList, ...Members] : Members,
          sheet: {
            ...sheet,
            filtersList: false,
          },
          PageTotal: Total,
          PageCount: PCount,
          showPreloader: false,
        });
        callback && callback();
        this.$f7.dialog.close();
      })
      .catch((error) => console.log(error));
  };

  onOpenSheet = () => {
    const { tabActive, sheet } = this.state;
    if (tabActive === "overview") {
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
        },
      });
    }
  };

  onHideSheet = () => {
    this.setState({
      sheet: {
        filters: false,
        filtersList: false,
      },
    });
  };

  loadRefresh(done) {
    const { tabActive } = this.state;
    if (tabActive === "overview") {
      this.getOverview(false, () => {
        setTimeout(() => {
          done();
        }, 500);
      });
    } else {
      this.getList(false, true, () => {
        setTimeout(() => {
          done();
        }, 500);
      });
    }
  }

  loadMoreAsync = () => {
    const { filters, PageCount, tabActive, showPreloader } = this.state;
    if (tabActive === "overview") return;
    if (filters.List.Pi >= PageCount) return;
    if (showPreloader) return false;
    this.setState({
      showPreloader: true,
      filters: {
        ...filters,
        List: {
          ...filters.List,
          Pi: filters.List.Pi + 1,
        },
      },
    });
  };

  render() {
    const {
      tabActive,
      filters,
      dataOverview,
      dataList,
      loading,
      sheet,
      showPreloader,
    } = this.state;

    return (
      <Page
        name="employee-service"
        ptr
        onPtrRefresh={this.loadRefresh.bind(this)}
        infinite
        infiniteDistance={50}
        infinitePreloader={showPreloader}
        onInfinite={() => this.loadMoreAsync()}
      >
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
              <Link onClick={() => this.onOpenSheet()}>
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
            <OverviewCustomer
              data={dataOverview}
              filters={filters.Overview}
              loading={loading.Overview}
            />
          )}
          {tabActive === "list" && (
            <ListCustomer
              data={dataList}
              filters={filters.List}
              loading={loading.List}
            />
          )}
        </div>
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
            if (!_.isEqual(values, filters.Overview)) {
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
        <FiltersList
          show={sheet.filtersList}
          onHide={() => {
            this.onHideSheet();
          }}
          filters={filters.List}
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
            if (!_.isEqual(values, filters.List)) {
              this.$f7.dialog.preloader("Đang tải ...");
              this.setState({
                filters: {
                  ...filters,
                  List: values,
                },
              });
            } else {
              this.getList(true, () => {
                this.onHideSheet();
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
