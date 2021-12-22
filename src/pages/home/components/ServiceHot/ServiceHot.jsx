import React from "react";
import { Link } from "framework7-react";
import Slider from "react-slick";
import ShopDataService from "../../../../service/shop.service";
import SkeletonServiceHot from "./SkeletonServiceHot";
import { SERVER_APP } from "../../../../constants/config";
import { getStockIDStorage } from "../../../../constants/user";

export default class ServiceHot extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
      isLoading: true,
      arrService: [],
    };
  }

  componentDidMount() {
    this.getServicesAll();
  }
  handStyle = () => {
    const _width = this.state.width - 120;
    return Object.assign({
      width: _width,
    });
  };

  getServicesAll = () => {
    let stockid = getStockIDStorage();
    stockid ? stockid : 0;
    ShopDataService.getServiceParent(795, stockid)
      .then((response) => {
        const { data } = response.data;
        const newData = data.filter((item) => {
          return item.root.Tags.includes("hot");
        });
        this.setState({
          arrService: newData,
          isLoading: false,
        });
      })
      .catch((e) => console.log(e));
  };

  handleUrl = (item) => {
    console.log(item)
    this.props.f7.navigate(
      `/shop/${item.root.Paths[0].ID}/?ids=${item.root.ID}&cateid=${item.root.Paths[0].ParentID}`
    );
  };

  render() {
    const { isLoading, arrService } = this.state;
    const settingsNews = {
      className: "slider variable-width",
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      centerPadding: "20px",
      variableWidth: true,
      autoplay: true,
      autoplaySpeed: 5000,
    };

    return (
      <div className="page-news__list-ul">
        {!isLoading && (
          <Slider {...settingsNews}>
            {arrService &&
              arrService.map((item, index) => {
                if (index > 6) return null;
                return (
                  <Link
                    className="page-news__list-item box-shadow-none"
                    key={item.root.ID}
                    style={this.handStyle()}
                    onClick={() => this.handleUrl(item)}
                  >
                    <div className="images bd-rd3">
                      <img
                        src={SERVER_APP + item.root.Thumbnail_web}
                        alt={item.root.Title}
                      />
                    </div>
                    <div className="text">
                      <h6 className="text-cut-1">{item.root.Title}</h6>
                    </div>
                  </Link>
                );
              })}
          </Slider>
        )}
        {isLoading && <SkeletonServiceHot />}
      </div>
    );
  }
}
