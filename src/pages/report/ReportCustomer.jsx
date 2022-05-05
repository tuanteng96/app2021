import React from "react";
import { Link, Navbar, Page, Toolbar } from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";
import NotificationIcon from "../../components/NotificationIcon";
import PanelLeft from "../../components/PanelLeft/PanelLeft";
import PageNoData from "../../components/PageNoData";

export default class ReportCustomer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
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
              <span className="title">Báo cáo khách hàng</span>
            </div>
            <div className="page-navbar__noti">
              <NotificationIcon />
            </div>
          </div>
        </Navbar>
        <PanelLeft f7={this} />
        <div className="page-render">
          {/* <PageNoData text="Đang cập nhập ..." /> */}
        </div>
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
