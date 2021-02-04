import React from "react";
import { Page, Link, Navbar, Toolbar, Row, Col } from "framework7-react";
import NotificationIcon from "../../components/NotificationIcon";
import ToolBarBottom from "../../components/ToolBarBottom";
import BookDataService from "../../service/book.service";
import { getUser } from "../../constants/user";
import SkeletonSchedulesManage from "../../components/schedule/SkeletonSchedulesManage";
import {
  groupbyDDHHMM2,
  getTimeToCreate,
  getDateToCreate,
} from "../../constants/format";
import { SERVER_APP } from "../../constants/config";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getListBooks();
  }

  getListBooks = () => {
    const userInfo = getUser();
    if (!userInfo) return false;
    BookDataService.getCardService(userInfo.ID)
      .then((response) => {
        const data = response.data.data.tu_van;
        this.setState({
          dataBooks: groupbyDDHHMM2(data),
          isLoading: false,
        });
      })
      .catch((er) => console.log(er));
  };

  handleDelete = (item) => {
    const _this = this;
    _this.$f7.dialog.confirm("Bạn chắc chắn mình muốn hủy lịch ?", () => {
      console.log("1");
    });
  }

  render() {
    const { dataBooks, isLoading } = this.state;
    return (
      <Page name="schedule-manage">
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link onClick={() => this.$f7router.back()}>
                <i className="las la-angle-left"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">Quản lý đặt lịch</span>
            </div>
            <div className="page-navbar__noti">
              <NotificationIcon />
            </div>
          </div>
        </Navbar>
        <div className="page-wrapper">
          <div className="chedule-manage">
            <div className="chedule-manage__lst">
              {isLoading && <SkeletonSchedulesManage />}

              {!isLoading && dataBooks &&
                dataBooks.map((item, index) => (
                  <div className="item" key={index}>
                    <div className="item-date">
                      Ngày {moment(item.day).format("ll")}
                    </div>
                    <div className="item-lst">
                      {item.items &&
                        item.items.map((subitem, subIndex) => (
                          <div className="item-lst__box" key={subIndex}>
                            <div className="time-book">
                              Đặt lúc
                              <div className="time">
                                {getTimeToCreate(subitem.createDate)}
                              </div>
                            </div>
                            <div className="time-wrap">
                              <div className="service-book">
                                <div className="service-book__info">
                                  <div className="title">
                                    {subitem.service.Title}
                                  </div>
                                </div>
                                <div className="service-book__img">
                                  <img
                                    src={`${SERVER_APP}${subitem.service.Thumbnail_web}`}
                                    alt={subitem.service.Title}
                                  />
                                </div>
                              </div>
                              <div className="service-time">
                                <Row>
                                  <Col width="50">
                                    <div className="service-time__item">
                                      <div>Ngày đặt lịch</div>
                                      <div>{getDateToCreate(subitem.date)}</div>
                                    </div>
                                  </Col>
                                  <Col width="50">
                                    <div className="service-time__item">
                                      <div>Thời gian</div>
                                      <div>{getTimeToCreate(subitem.date)}</div>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <div className="stock">
                                Đặt lịch tại {subitem.stock.Title}
                                <button
                                  onClick={() => this.handleDelete(item)}
                                  className="btn-close"
                                >
                                  Hủy Lịch
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
