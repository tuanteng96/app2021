import React from "react";
import { SERVER_APP } from "./../../constants/config";
import { Page, Link, Toolbar, Navbar } from "framework7-react";
import ReactHtmlParser from "react-html-parser";
import NewsDataService from "../../service/news.service";
import Slider from "react-slick";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      arrNews: [],
      arrBanner: [],
    };
  }
  getDateVietnamese = () => {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    var day = d.getDay();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var days = new Array(
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy"
    );
    var months = new Array(
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12"
    );
    return (
      <div className="page-news__header-date">
        <div className="date">
          {days[day]}, {date} tháng {months[month]}
        </div>
        <h3>Hôm nay</h3>
      </div>
    );
  };
  handStyle = () => {
    const _width = this.state.width - 100;
    return Object.assign({
      width: _width,
    });
  };
  componentDidMount() {
    this.$f7ready((f7) => {
      var $$ = this.Dom7;
      this.setState({ width: window.innerWidth });
      // Call F7 APIs here
      NewsDataService.getBanner()
        .then((response) => {
          const arrBanner = response.data.data;
          this.setState({
            arrBanner: arrBanner,
          });
        })
        .catch((e) => {
          console.log(e);
        });

      NewsDataService.getAll()
        .then((response) => {
          const arrNews = response.data.news;
          this.setState({
            arrNews: arrNews,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  componentDidUpdate(prevProps) {}

  render() {
    const arrBanner = this.state.arrBanner;
    const arrNews = this.state.arrNews;
    var settingsBanner = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
    };
    const settingsNews = {
      className: "slider variable-width",
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      centerPadding: "20px",
      variableWidth: true,
    };
    return (
      <Page name="news">
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link>
                <i className="las la-map-marked-alt"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">Hôm nay có gì mới ?</span>
            </div>
            <div className="page-navbar__noti">
              <Link>
                <i className="las la-bell"></i>
              </Link>
            </div>
          </div>
        </Navbar>
        <div className="page-wrapper">
          <div className="page-render">
            <div className="page-news__header">
              {this.getDateVietnamese()}
              <div className="page-news__header-user">
                <i className="las la-user-circle"></i>
              </div>
            </div>
            {arrNews &&
              arrNews.map((item, index) => {
                if (index >= 1) return null;
                return (
                  <div className="page-news__dear" key={item.ID}>
                    <div className="page-news__dear-img">
                      <a href={"/news/detail/" + item.ID + "/"}>
                        <img
                          src={SERVER_APP + item.Thumbnail_web}
                          alt={item.Title}
                        />
                      </a>
                    </div>
                    <div className="page-news__dear-text">
                      <a href="">
                        <h4>{item.Title}</h4>
                        <div className="desc">{ReactHtmlParser(item.Desc)}</div>
                      </a>
                    </div>
                  </div>
                );
              })}
            <div className="page-news__slide">
              <Slider {...settingsBanner}>
                {arrBanner &&
                  arrBanner.map((item, index) => {
                    if (index >= 3) return null;
                    return (
                      <div className="page-news__slide-item" key={item.ID}>
                        <img
                          src={SERVER_APP + "/Upload/image/" + item.FileName}
                          alt={item.Title}
                        />
                      </div>
                    );
                  })}
              </Slider>
            </div>
            <div className="page-news__list">
              <div className="page-news__list-head">
                <h5>Tin tức mới</h5>
                <div className="all">
                  <Link href="/news-list/">
                    Xem tất cả <i className="las la-angle-right"></i>
                  </Link>
                </div>
              </div>
              <div className="page-news__list-ul">
                <Slider {...settingsNews}>
                  {arrNews &&
                    arrNews.map((item, index) => {
                      if (index < 1 && index < 4) return null;
                      return (
                        <div
                          className="page-news__list-item"
                          key={item.ID}
                          style={this.handStyle()}
                        >
                          <div className="images">
                            <a href="">
                              <img
                                src={SERVER_APP + item.Thumbnail_web}
                                alt={item.Title}
                              />
                            </a>
                          </div>
                          <div className="text">
                            <a href="">
                              <h6>{item.Title}</h6>
                              <div className="desc">
                                {ReactHtmlParser(item.Desc)}
                              </div>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <Toolbar tabbar position="bottom">
          <div className="page-toolbar">
            <ul className="page-toolbar__list toolbar-item-4">
              <li>
                <Link href="/news/">
                  <i className="las la-newspaper"></i>
                  <span>Ưu đãi</span>
                </Link>
              </li>
              <li>
                <Link href="/about/">
                  <i className="las la-shopping-cart"></i>
                  <span>Dịch vụ</span>
                </Link>
              </li>
              <li>
                <Link href="/maps/">
                  <i className="las la-map-marked-alt"></i>
                  <span>Liên hệ</span>
                </Link>
              </li>
              <li>
                <Link href="/users/">
                  <i className="las la-user-circle"></i>
                  <span>Tài khoản</span>
                </Link>
              </li>
            </ul>
          </div>
        </Toolbar>
      </Page>
    );
  }
}
