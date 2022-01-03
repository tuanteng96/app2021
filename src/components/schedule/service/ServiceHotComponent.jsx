import React from "react";
import ShopDataService from "../../../service/shop.service";
import Slider from "react-slick";
import { SERVER_APP } from "../../../constants/config";
import { getStockIDStorage } from "../../../constants/user";
import { AiFillCheckCircle } from "react-icons/ai";
import ServiceHotSkeleton from "./ServiceHotSkeleton";

export default class ServiceHotComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getService();
  }
  handStyle = () => {
    const _width = this.state.width - 70;
    return Object.assign({
      width: _width,
    });
  };
  getService = () => {
    let stockid = getStockIDStorage();
    stockid ? stockid : 0;
    ShopDataService.getServiceOriginal()
    .then(({ data }) => {
      const result = data.data;
      if (result) {
        let newData = [];
        if (stockid > 0) {
          newData = result.filter((item) => {
            const arrayStatus = item?.root?.Status
              ? item.root.Status.split(",")
              : [];
            return (
              (item.root.OnStocks.includes("*") &&
                arrayStatus.indexOf("2") > -1) ||
              (item.root.OnStocks.includes(stockid) &&
                arrayStatus.indexOf("2") > -1)
            );
          });
        } else {
          newData = result.filter((item) => {
            return item.root.Tags.includes("hot");
          });
        }
        this.setState({
          arrService: newData,
          isLoading: false,
        });
      }
    })
    .catch((err) => console.log(err));
  };

  handleClick = (item) => {
    const id = item.ID;
    const Titles = item.Title;
    item.OrderItemID = id;
    item.Titles = Titles;
    item.ServiceID = parseInt(item.Link);
    this.setState({
      active: id,
    });
    const itemBooks = [item];
    this.props.serviceSelected(itemBooks);
  };

  resetActive = () => {
    this.setState({
      active: 0,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { reset } = this.props;

    if (prevProps.reset !== reset) {
      this.resetActive();
    }
  }

  render() {
    const { arrService, isLoading, active } = this.state;

    const settingService = {
      className: "slider variable-width",
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      centerPadding: "20px",
      variableWidth: true,
    };
    return (
      <div className="service-hot__box">
        <div className="service-hot__list">
          {isLoading && <ServiceHotSkeleton />}
          <Slider {...settingService}>
            {!isLoading &&
              arrService &&
              arrService.map((item, index) => {
                return (
                  <div
                    className={`item ${
                      active === item.root.ID ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => this.handleClick(item.root)}
                    style={this.handStyle()}
                  >
                    <img
                      src={SERVER_APP + "/Upload/image/" + item.root.Thumbnail}
                      alt={item.root.Title}
                    />
                    <div className="icon">
                      <AiFillCheckCircle />
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}
