import React from "react";
import BookDataService from "../../../service/book.service";
import { getUser } from "../../../constants/user";
import { SERVER_APP } from "../../../constants/config";
import { formatPriceVietnamese } from "../../../constants/format";
import ServiceCartSkeleton from "./ServiceCartSkeleton";

export default class ServiceCartComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getCardService();
  }

  getCardService = () => {
    const infoUser = getUser();
    if (!infoUser) return false;
    BookDataService.getCardService(infoUser.ID)
      .then((response) => {
        const data = response.data.data.the;
        const arrData = [];
        data.map((item) => {
          const Titles = item.Prod.Title;
          item.Titles = Titles;
          item.isActive = false;
          arrData.push(item);
        });
        this.setState({
          arrCardsv: arrData,
          isLoading: false,
        });
      })
      .catch((er) => console.log(er));
  };

  handleClick = (item) => {
    const { arrCardsv } = this.state;
    const id = item.OrderItemID;
    const index = arrCardsv.findIndex((obj) => obj.OrderItemID === id);
    if (index < 0) return false;
    const isActive = arrCardsv[index].isActive;
    arrCardsv[index].isActive = !isActive;
    this.setState({
      arrCardsv: arrCardsv,
    });

    const arrActive = arrCardsv.filter((item) => item.isActive);
    this.props.handleMultiService(arrActive);
  };

  resetActive = () => {
    const { arrCardsv } = this.state;
    arrCardsv.map((item) => {
      item.isActive = false;
    });
    this.setState({
      arrCardsv: arrCardsv,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { reset } = this.props;

    if (prevProps.reset !== reset) {
      this.resetActive();
    }
  }

  render() {
    const { arrCardsv, isLoading } = this.state;
    return (
      <div className="service-me__box">
        <div className="service-me__list">
          {isLoading && <ServiceCartSkeleton />}
          {!isLoading &&
            arrCardsv &&
            arrCardsv.map((item, index) => (
              <div
                className={`item ${item.isActive ? "active" : ""}`}
                onClick={() => this.handleClick(item)}
                key={index}
              >
                <div className="item-info">
                  <div className="title">{item.Prod.Title}</div>
                  <div className="count">
                    Còn <div className="count-number">{item.total}</div> buổi
                  </div>
                  <div className="price">
                    <div className="price-number">
                      {formatPriceVietnamese(item.Prod.PriceProduct)}
                    </div>
                    <div className="price-vnd">VNĐ</div>
                  </div>
                </div>
                <div className="item-image">
                  <img
                    src={SERVER_APP + item.Prod.Thumbnail_web}
                    alt={item.Title}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}