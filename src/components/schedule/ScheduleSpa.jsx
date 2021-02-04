import React from "react";
import {
  Link,
  Tabs,
  Tab,
  Row,
  Col,
} from "framework7-react";
import UserService from "../../service/user.service";
import { getStockIDStorage, getStockNameStorage } from "../../constants/user";
import IconLocation from "../../assets/images/location1.svg";
import SkeletonStock from "./SkeletonStock";
import Slider from "react-slick";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

export default class ScheduleSpa extends React.Component {
  constructor() {
    super();
    this.state = {
      arrListDate: [], // Hiển thị 3 ngày từ ngày today next
      arrStock: [], // List Stock
      bookDate: "", // Ngày đặt lịch
      timeSelected: "",
      itemBook: {},
      isLoadingStock: true
    };
  }

  componentDidMount() {
    this.listDate();
    this.getStock();
    const gettoday = moment();
    const bookDateDefault = moment(gettoday).format("DD/MM/YYYY");

    const CurrentStockID = getStockIDStorage();
    const CurrentStockName = getStockNameStorage();
    this.setState({
      CurrentStockID: CurrentStockID,
      CurrentStockName: CurrentStockName,
      width: window.innerWidth,
      bookDate: bookDateDefault,
    });
  }

  group = (items, n) =>
    items.reduce((acc, x, i) => {
      const idx = Math.floor(i / n);
      acc[idx] = [...(acc[idx] || []), x];
      return acc;
    }, []);

  getStock = () => {
    UserService.getStock().then((response) => {
      const ListStock = response.data.data.all;
      const arrStock = [];

      ListStock.map((item) => {
        if (item.ID !== 778) {
          arrStock.push(item);
        }
      });

      this.setState({
        arrStock: arrStock,
        isLoadingStock: false,
      });
    });
  };

  listDate = () => {
    const gettoday = moment();
    const arrListDate = [];
    const arrListTime = [];
    for (let day = 0; day <= 630; day += 15) {
      var time = moment("2020-11-05T07:30:00").add(day, "m").format("LT");
      var timeFull = moment("2020-11-05T07:30:00").add(day, "m").format("LTS");
      var item = {
        time: time,
        fullTime: timeFull,
      };
      arrListTime.push(item);
    }

    for (let day = 0; day <= 2; day++) {
      switch (day) {
        case 0:
          var todayFormat = moment(gettoday).add(day, "days").format("DD/MM");
          var today = moment(gettoday).add(day, "days").format("DD/MM/YYYY");
          var item = {
            dateFormat: "Hôm nay " + todayFormat,
            date: today,
            name: "today",
            arrtime: arrListTime,
          };
          arrListDate.push(item);
          break;
        case 1:
          var tomorrowFormat = moment(gettoday)
            .add(day, "days")
            .format("DD/MM");
          var tomorrow = moment(gettoday).add(day, "days").format("DD/MM/YYYY");
          var item = {
            dateFormat: "Ngày mai " + tomorrowFormat,
            date: tomorrow,
            name: "tomorrow",
            arrtime: arrListTime,
          };
          arrListDate.push(item);
          break;

        default:
          var tomorrowAfterFormat = moment(gettoday)
            .add(day, "days")
            .format("DD/MM");
          var tomorrowAfter = moment(gettoday)
            .add(day, "days")
            .format("DD/MM/YYYY");
          var item = {
            dateFormat: "Ngày kia " + tomorrowAfterFormat,
            date: tomorrowAfter,
            name: "tomorrowAfter",
            arrtime: arrListTime,
          };
          arrListDate.push(item);
          break;
      }
    }
    this.setState({
      arrListDate: arrListDate,
    });
  };

  formatTime = (time) => {
    return time.replace(":", "h");
  };
  checkTime = (date, time) => {
    const dateOne = date.split("/");
    const timeOne = time.split(":");
    //dateOne[0] Date
    //dateOne[1] Month
    //dateOne[2] Year
    //timeOne[0] Hour
    //timeOne[1] Min

    const dateTwo = moment(new Date()).format("L").split("/");
    const timeTwo = moment(new Date()).format("LTS").split(":");
    var dateFullOne = new Date(
      dateOne[2],
      dateOne[1],
      dateOne[0],
      timeOne[0],
      timeOne[1],
      timeOne[2]
    );
    var dateFullTwo = new Date(
      dateTwo[2],
      dateTwo[1],
      dateTwo[0],
      timeTwo[0],
      timeTwo[1],
      timeTwo[2]
    );
    if (dateFullOne < dateFullTwo) {
      return " not-time";
    } else {
      return "";
    }
  };
  handStyle = () => {
    const _width = this.state.width / 4 - 12;
    return Object.assign({
      width: _width,
    });
  };

  onDateChanged = (event) => {
    const target = event.target;
    const value = target.value;
    const { itemBook, CurrentStockName } = this.state;
    const itemBookNew = itemBook;
    itemBookNew.nameStock = CurrentStockName;
    itemBookNew.time && delete itemBookNew.time;
    this.setState({
      dateSelected: value,
      timeSelected: "",
      itemBook: itemBookNew,
    });
    this.props.handleTime(itemBookNew);
  };

  handleStock = (item) => {
    const {
      bookDate,
      dateSelected,
      timeSelected,
    } = this.state;
    const itemBookNew = {};
    itemBookNew.stock = item.ID;
    itemBookNew.nameStock = item.Title;
    timeSelected ? itemBookNew.time = timeSelected : "";
    itemBookNew.date = dateSelected ? dateSelected : bookDate;
    this.setState({
      StockSelected: item.ID,
      CurrentStockName: item.Title,
      itemBook: itemBookNew,
    });
    this.props.handleTime(itemBookNew);
  };

  handleTime = (time) => {
    const {
      CurrentStockID,
      CurrentStockName,
      StockSelected,
      bookDate,
      dateSelected,
    } = this.state;
    const itemBookNew = {};
    itemBookNew.time = time;
    itemBookNew.stock = StockSelected ? StockSelected : parseInt(CurrentStockID);
    itemBookNew.date = dateSelected ? dateSelected : bookDate;
    itemBookNew.nameStock = CurrentStockName;
    this.setState({
      timeSelected: time,
      itemBook: itemBookNew,
    });
    this.props.handleTime(itemBookNew);
  };

  render() {
    const { arrListDate, arrStock, timeSelected, isLoadingStock } = this.state;
    const CurrentStockID =
      this.state.CurrentStockID && this.state.CurrentStockID;
    const settings = {
      className: "slider variable-width",
      dots: false,
      arrows: false,
      infinite: true,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      afterChange: (current) => {},
      beforeChange: (current, next) => {},
    };
    return (
      <div className="page-schedule__box">
        <div className="page-schedule__location">
          <h5>1. Chọn spa gần bạn</h5>
          <div className="page-schedule__location-list">
            <Row>
              {isLoadingStock && <SkeletonStock />}
              {!isLoadingStock &&
                arrStock &&
                arrStock.map((item, index) => (
                  <Col width="50" key={index}>
                    <div className="location">
                      <div
                        className="location-item"
                        onClick={() => this.handleStock(item)}
                      >
                        <input
                          id={"location-" + item.ID}
                          type="radio"
                          name="checklocation"
                          value={item.ID}
                          defaultChecked={parseInt(CurrentStockID) === item.ID}
                        />
                        <label htmlFor={"location-" + item.ID}>
                          {item.Title}
                        </label>
                        <div className="icon">
                          <img src={IconLocation} alt="Location" />
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
        <div className="page-schedule__time">
          <h5>2. Chọn thời gian</h5>
          <div className="page-schedule__date">
            <Row>
              {arrListDate &&
                arrListDate.map((item, index) => (
                  <Col width="33" key={index}>
                    <Link
                      noLinkClass
                      tabLink={"#tab-" + item.name}
                      tabLinkActive={index === 0 ? true : false}
                    >
                      <input
                        type="radio"
                        onChange={this.onDateChanged}
                        name="checkdate"
                        value={item.date}
                      />
                      <span>{item.dateFormat}</span>
                    </Link>
                  </Col>
                ))}
            </Row>
          </div>
          <div className="page-schedule__note">
            <div className="page-schedule__note-item">
              <div className="box box-not"></div>
              <span>Hết chỗ</span>
            </div>
            <div className="page-schedule__note-item">
              <div className="box box-no"></div>
              <span>Còn chỗ</span>
            </div>
            <div className="page-schedule__note-item">
              <div className="box box-succes"></div>
              <span>Đang chọn</span>
            </div>
          </div>
          <Tabs animated>
            {arrListDate &&
              arrListDate.map((item, index) => (
                <Tab
                  key={index}
                  id={"tab-" + item.name}
                  className="page-tab-location"
                  tabActive={index === 0 ? true : false}
                >
                  <div className="page-schedule__time-list">
                    <Slider {...settings}>
                      {this.group(item.arrtime, 4).map((children, k) => (
                        <div
                          className="group-time"
                          style={this.handStyle()}
                          key={k}
                        >
                          {children.map((sub, i) => (
                            <div
                              className={
                                "group-time__item" +
                                this.checkTime(item.date, sub.fullTime)
                              }
                              key={i}
                              onClick={() => this.handleTime(sub.time)}
                            >
                              <label
                                className={
                                  timeSelected === sub.time ? "active" : ""
                                }
                              >
                                {this.formatTime(sub.time)}
                              </label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </Slider>
                  </div>
                </Tab>
              ))}
          </Tabs>
        </div>
      </div>
    );
  }
}
