import React from "react";
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
import NotificationIcon from "../../components/NotificationIcon";
import PageNoData from "../../components/PageNoData";
import moment from "moment";
import "moment/locale/vi";
import Filters from "./components/Filters";
import { getStockIDStorage } from "../../constants/user";
moment.locale("vi");
export default class ReportingDate extends React.Component {
  constructor() {
    super();
    this.state = {
      sheetOpened: false,
      filters: {
        Date: [],
        StockID: Number(getStockIDStorage()) || -1,
      },
    };
  }

  componentDidMount() {}

  onChangeDateS = (evt) => {
    const start = evt[0];
    const end = evt[1] ? evt[1] : evt[0];
    this.setState({
      startDate: moment(start).format("DD/MM/YYYY"),
      endDate: moment(end).format("DD/MM/YYYY"),
      arrDefaultDate: evt,
    });
  };

  render() {
    const { sheetOpened, filters } = this.state;

    return (
      <Page name="employee-service">
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
          <div className="bg-white p-15px mb-15px rounded">
            <div className="text-uppercase text-black fw-600 mb-10px">
              Thu chi hôm nay
            </div>
            <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
              <div className="text-gray-700 font-size-xs fw-500">Tổng thu</div>
              <div className="fw-600 font-size-sm text-success">
                <i className="las la-arrow-down"></i> 15,000,000
              </div>
            </div>
            <div className="d--f jc--sb ai--c pt-8px">
              <div className="text-gray-700 font-size-xs fw-500">Tổng chi</div>
              <div className="fw-600 font-size-sm text-danger">
                <i className="las la-arrow-up"></i> 8,000,000
              </div>
            </div>
          </div>

          <div className="bg-white p-15px mb-15px rounded">
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
              <div className="text-gray-700 font-size-xs fw-500">Web / App</div>
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
          </div>

          <div className="bg-white p-15px mb-15px rounded">
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
              <div className="text-gray-700 font-size-xs fw-500">Doanh số</div>
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
          </div>

          <div className="bg-white p-15px mb-5px rounded">
            <div className="text-uppercase text-black fw-600 mb-10px">
              Dịch vụ
            </div>
            <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
              <div className="text-gray-700 font-size-xs fw-500">Đặt lịch</div>
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
          </div>

          {/* <PageNoData text="Đang cập nhập ..." /> */}
        </div>
        <Filters
          show={sheetOpened}
          onHide={() => {
            this.$f7.calendar.close();
            this.setState({ sheetOpened: false });
          }}
          filters={filters}
          onSubmit={(values) => console.log(values)}
        />

        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
