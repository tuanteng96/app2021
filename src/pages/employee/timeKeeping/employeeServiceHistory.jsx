import React from "react";
import {
  Col,
  f7,
  Link,
  Navbar,
  Page,
  Subnavbar,
  Row,
  Sheet,
  Toolbar,
} from "framework7-react";
import ToolBarBottom from "../../../components/ToolBarBottom";
import NotificationIcon from "../../../components/NotificationIcon";
import { Animated } from "react-animated-css";
import History from "../components/EmployeeHistory/Home";
import Products from "../components/EmployeeHistory/Products/Products";
import TheRest from "../components/EmployeeHistory/TheRest";

export default class employeeServiceHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      tabActive: "DV",
    };
  }
  componentDidMount() {}
  render() {
    const { tabActive } = this.state;
    const { memberId, orderItem } = this.$f7route.params;
    return (
      <Page name="employee-history">
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link
                onClick={() =>
                  this.$f7router.back("/employee/service/", {
                    force: true,
                    ignoreCache: true,
                    reload: true,
                  })
                }
              >
                <i className="las la-angle-left"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">Lịch sử khách hàng</span>
            </div>
            <div className="page-navbar__noti">
              <NotificationIcon />
            </div>
          </div>
          <Subnavbar className="cardservice-tab-head">
            <div className="cardservice-title">
              <Link
                noLinkClass
                tabLinkActive={tabActive === "DV"}
                onClick={() => this.setState({ tabActive: "DV" })}
              >
                Lịch sử dịch vụ
              </Link>
              <Link
                noLinkClass
                tabLinkActive={tabActive === "SPDM"}
                onClick={() => this.setState({ tabActive: "SPDM" })}
              >
                Sản phẩm đã mua
              </Link>
              <Link
                noLinkClass
                tabLinkActive={tabActive === "BC"}
                onClick={() => this.setState({ tabActive: "BC" })}
              >
                Buổi còn
              </Link>
            </div>
          </Subnavbar>
        </Navbar>
        {tabActive === "DV" && (
          <Animated
            className="min-h-100"
            animationIn="bounceInLeft"
            animationOut="bounceInLeft"
            animationInDuration={500}
            isVisible={true}
          >
            <History MemberID={memberId} />
          </Animated>
        )}
        {tabActive === "SPDM" && (
          <Animated
            className="min-h-100"
            animationIn="bounceInLeft"
            animationOut="bounceInLeft"
            animationInDuration={500}
            isVisible={true}
          >
            <Products MemberID={memberId} />
          </Animated>
        )}
        {tabActive === "BC" && (
          <Animated
            className="min-h-100"
            animationIn="bounceInLeft"
            animationOut="bounceInLeft"
            animationInDuration={500}
            isVisible={true}
          >
            <TheRest MemberID={memberId} />
          </Animated>
        )}
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
