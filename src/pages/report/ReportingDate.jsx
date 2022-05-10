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
          Báo cáo ngày
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
