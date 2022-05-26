import React from "react";
import {
  Link,
  Navbar,
  Page,
  Toolbar,
} from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";
import NotificationIcon from "../../components/NotificationIcon";
import PageNoData from "../../components/PageNoData";
import SelectStock from "../../components/SelectStock";
import IframeResizer from "iframe-resizer-react";
import { SERVER_APP } from "../../constants/config";
import Dom7 from "dom7";
import UserService from "../../service/user.service";
import { getStockIDStorage, getUser } from "../../constants/user";

window.Info = {
  User: getUser(),
  Stocks: [],
  CrStockID: getStockIDStorage(),
};

window.token = localStorage.getItem("token");

export default class Report extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpenStock: false,
      isShow: false,
    };
  }

  componentDidMount() {
    var $ = Dom7;
    if ($(".dialog-preloader").length === 0) {
      this.$f7.dialog.preloader("Đang tải báo cáo ... ");
    }
    UserService.getStock().then((response) => {
      const ListStock = response.data.data.all.filter(
        (item) => item.ID !== 778
      );
      window.Info = {
        ...window.Info,
        User: getUser(),
        Stocks: ListStock,
        CrStockID: getStockIDStorage(),
      };
      window.token = localStorage.getItem("token");
      this.setState({
        isShow: true,
      });
    });
  }

  openStock = () => {
    this.setState({
      isOpenStock: !this.state.isOpenStock,
    });
  };

  render() {
    const { isShow } = this.state;
    return (
      <Page name="employee-service">
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link onClick={() => this.openStock()}>
                <i className="las la-map-marked-alt"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">Báo cáo</span>
            </div>
            <div className="page-navbar__noti">
              <NotificationIcon />
            </div>
          </div>
        </Navbar>
        <div className="h-100">
          {isShow && (
            <IframeResizer
              scrolling={true}
              heightCalculationMethod="bodyScroll"
              src={`${SERVER_APP}/App23/index.html`}
              style={{ border: 0, width: "100%", height: "100%" }}
              onLoad={() => {
                this.$f7.dialog.close();
              }}
            />
          )}
        </div>
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
        <SelectStock
          isOpenStock={this.state.isOpenStock}
          nameStock={(name) => {
            this.$f7.views.main.router.navigate(
              this.$f7.views.main.router.url,
              {
                reloadCurrent: true,
              }
            );
          }}
        />
      </Page>
    );
  }
}
