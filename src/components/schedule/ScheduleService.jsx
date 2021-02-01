import React from "react";
import { Link, Toolbar } from "framework7-react";
import ShopDataService from "../../service/shop.service";
import ServiceHotComponent from "./service/ServiceHotComponent";

export default class ScheduleService extends React.Component {
  constructor() {
    super();
    this.state = {
      arrProd: [],
    };
  }
  componentDidMount() {
    this.getProd();
  }
  getProd = () => {
    ShopDataService.getProd()
      .then((response) => {
        //console.log(response);
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div className="page-schedule__box">
        <div className="service-me">
          <h5>Thẻ dịch vụ của bạn</h5>
        </div>
        <div className="service-hot">
          <h5>Dịch vụ nổi bật</h5>
          <ServiceHotComponent />
        </div>
        <div className="service-spa">
          <h5>Dịch vụ Spa</h5>
        </div>
      </div>
    );
  }
}
