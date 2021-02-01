import React from "react";
import { Link, Toolbar } from "framework7-react";
import NewsDataService from "../../../service/news.service";
import Slider from "react-slick";
import { SERVER_APP } from "../../../constants/config";
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
    NewsDataService.getBannerName("App.DichVuBook")
      .then((response) => {
        const data = response.data.data;
        this.setState({
          isLoading: false,
          arrService: data,
        });
      })
      .catch((er) => console.log(er));
  };
  render() {
    const { arrService } = this.state;
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
          <Slider {...settingService}>
            {arrService &&
              arrService.map((item, index) => {
                return (
                  <div
                    className="item"
                    key={item.ID}
                    style={this.handStyle()}
                  >
                    <img
                      src={SERVER_APP + "/Upload/image/" + item.FileName}
                      alt={item.Title}
                    />
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}
