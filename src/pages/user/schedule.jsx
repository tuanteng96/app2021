import React from "react";
import {
  Page,
  Link,
  Navbar,
  Toolbar,
  Sheet,
  Row,
  Col,
  Subnavbar,
  Tabs,
  Tab,
} from "framework7-react";
import ScheduleSpa from "../../components/schedule/ScheduleSpa";
import ScheduleService from "../../components/schedule/ScheduleService";
import ScheduleSuccess from "../../components/schedule/ScheduleSuccess";
import BooksIcon from "../../components/BooksIcon";
import ServiceSheetSkeleton from "../../components/schedule/service/ServiceSheetSkeleton";
import { TiLocation, TiTime, TiCalendarOutline, TiHeart } from "react-icons/ti";
import { getUser } from "../../constants/user";
import { BiCheckDouble } from "react-icons/bi";
import BookDataService from "../../service/book.service";
import { toast } from "react-toastify";
import ToolBarBottom from "../../components/ToolBarBottom";
import { IoCloseOutline } from "react-icons/io5";
import moment from "moment";
import "moment/locale/vi";
import { checkSale, formatPriceVietnamese } from "../../constants/format";
import { SERVER_APP } from "../../constants/config";
import _ from "lodash";
import { Animated } from "react-animated-css";


moment.locale("vi");

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      onFinish: false,
      activeStep: 0,
      selectedService: [],
      isLoadingStep1: false,
      isLoading: false,
      isLoadingSheet: true,
      sheetOpened: false,
      //new
      tabCurrent: 0,
      height: 0,
    };
  }
  componentDidMount() {
    const height = this.divElement.clientHeight - this.divBtn.clientHeight;
    this.setState({ height })
  }

  onResetStep = () => {
    this.setState({
      activeStep: 0,
    });
  };

  nextStep = () => {
    if (this.state.tabCurrent < 3) {
      this.setState({ tabCurrent: this.state.tabCurrent + 1 });
    }
  };

  previousStep = () => {
    if (this.state.tabCurrent > 0) {
      this.setState({ tabCurrent: this.state.tabCurrent - 1 });
    }
  };

  handleTime = (item) => {
    this.setState({
      itemStepTime: item,
    });
  };

  handleNote = (evt) => {
    const { value } = evt.target;
    this.setState({
      serviceNote: value,
    });
  };

  nextService = () => {
    this.setState({
      isLoadingStep1: true,
    });
    setTimeout(() => {
      this.setState({
        isLoadingStep1: false,
      });
      this.nextStep();
    }, 300);
  };
  nextSuccessService = () => {
    this.setState({
      sheetOpened: true,
    });
  };

  submitBooks = () => {
    const { itemStepTime, serviceNote, itemBooks } = this.state;
    const infoUser = getUser();
    const self = this;
    if (!infoUser) {
      return false;
    }

    const date = itemStepTime.date + " " + itemStepTime.time;

    const itemBooksList = [];
    if (itemBooks[0].Prod) {
      itemBooks.map((item, index) => {
        const itemBook = {};
        itemBook.stock_id = itemStepTime && itemStepTime.stock;
        itemBook.service_id = item.Prod.ID;
        itemBook.desc = serviceNote ? serviceNote : "Không có ghi chú .";
        itemBook.date = date;
        itemBooksList.push(itemBook);
      });
    } else {
      itemBooks.map((item, index) => {
        const itemBook = {};
        itemBook.stock_id = itemStepTime && itemStepTime.stock;
        itemBook.service_id = item.ServiceID;
        itemBook.desc = serviceNote ? serviceNote : "Không có ghi chú .";
        itemBook.date = date;
        itemBooksList.push(itemBook);
      });
    }

    const data = {
      memberid: infoUser.ID,
      books: itemBooksList,
    };

    this.setState({
      isLoading: true,
    });

    BookDataService.postBook(data)
      .then((response) => {
        const rt = response.data.data;
        if (rt.errors) {
          toast.error(rt.errors[0], {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 3000,
          });
          this.setState({
            isLoading: false,
            sheetOpened: false,
          });
        } else {
          setTimeout(() => {
            self.$f7.preloader.hide();
            toast.success("Đặt lịch thành công !", {
              position: toast.POSITION.TOP_LEFT,
              autoClose: 3000,
            });

            this.setState({
              isLoading: false,
              sheetOpened: false,
              itemBooks: null,
            });
            this.nextStep();
          }, 1000);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  closeSheet = () => {
    this.setState({
      sheetOpened: false,
    });
  };

  closeSerivePosition = () => {
    this.setState({
      itemBooks: null,
      selectedService: {
        ID: 0,
        subitemID: 0,
      },
    });
  };

  controlsStep = () => {
    const { itemStepTime, isLoadingStep1, selectedService } = this.state;

    switch (this.state.tabCurrent) {
      case 0:
        return (
          <div className="schedule-toolbar">
            <button
              type="button"
              className={`btn-submit-order btn-submit-order ${(itemStepTime && !itemStepTime["time"]) ||
                (itemStepTime && isNaN(itemStepTime["stock"])) ||
                !itemStepTime
                ? "btn-no-click"
                : ""
                } ${!itemStepTime && "btn-no-click"} ${isLoadingStep1 && "loading"
                }`}
              onClick={() => this.nextService()}
            >
              <span>Chọn dịch vụ</span>
              <div className="loading-icon">
                <div className="loading-icon__item item-1"></div>
                <div className="loading-icon__item item-2"></div>
                <div className="loading-icon__item item-3"></div>
                <div className="loading-icon__item item-4"></div>
              </div>
            </button>
          </div>
        );
        break;
      case 1:
        return (
          <div className="schedule-toolbar">
            <button
              type="button"
              className={`btn-submit-order btn-submit-order 
              ${!selectedService || selectedService.length === 0 && "btn-no-click"}`}
              onClick={() => this.nextSuccessService()}
            >
              <span>Đặt lịch ngay</span>
              <div className="loading-icon">
                <div className="loading-icon__item item-1"></div>
                <div className="loading-icon__item item-2"></div>
                <div className="loading-icon__item item-3"></div>
                <div className="loading-icon__item item-4"></div>
              </div>
            </button>
          </div>
        );
      default:
        return <ToolBarBottom />;
        break;
    }
  };

  onToBack = () => {
    if (this.state.tabCurrent === 0) {
      this.$f7router.back();
    } else {
      this.previousStep();
    }
  };

  handleService = (item) => {
    const { selectedService } = this.state;
    const index = this.state.selectedService.findIndex(service => service.ID === item.ID);
    if (index > -1) {
      this.setState({
        selectedService: selectedService.filter(service => service.ID !== item.ID)
      })
    }
    else {
      this.setState({
        selectedService: [...selectedService, item]
      })
    }
  }

  loadRefresh(done) {
    const _this = this;
    setTimeout(function () {
      _this.setState({ showPreloader: false });
      done();
    }, 1000);
  }

  render() {
    const {
      isLoading,
      sheetOpened,
      itemStepTime,
      itemBooks,
      sheetServiceOpened,
      itemAdvisory,
      lstAdvisory,
      selectedService,
      //new
      tabCurrent,
      height
    } = this.state;
    return (
      <Page
        name="schedule"
        ptr
        infiniteDistance={50}
        //infinitePreloader={showPreloader}
        onPtrRefresh={this.loadRefresh.bind(this)}
      >
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link onClick={() => this.onToBack()}>
                <i className="las la-angle-left"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">Đặt lịch</span>
            </div>
            <div className="page-navbar__noti">
              <BooksIcon />
            </div>
          </div>
          <Subnavbar className="subnavbar-booking">
            <div className="page-schedule__step" ref={(divBtn) => { this.divBtn = divBtn }}>
              <Link
                className={`page-schedule__step-item`}
                noLinkClass
                tabLink={`#book-${0}`}
                tabLinkActive={tabCurrent === 0}
                onClick={() => this.state.tabCurrent > 0 && this.setState({ tabCurrent: 0 })}
              >
                <div className="number">1</div>
                <div className="text">
                  <span>Thời gian</span>
                </div>
              </Link>
              <Link
                className={`page-schedule__step-item`}
                noLinkClass
                tabLink={`#book-${1}`}
                tabLinkActive={tabCurrent === 1}
                onClick={() => this.state.tabCurrent > 1 && this.setState({ tabCurrent: 1 })}
              >
                <div className="number">2</div>
                <div className="text">
                  <span>Đặt lịch</span>
                </div>
              </Link>
              <Link
                className={`page-schedule__step-item`}
                noLinkClass
                tabLink={`#book-${2}`}
                tabLinkActive={tabCurrent === 2}
              >
                <div className="number">3</div>
                <div className="text">
                  <span>Hoàn tất</span>
                </div>
              </Link>
            </div>
          </Subnavbar>
        </Navbar>
        <div className={`page-schedule h-100`} ref={(divElement) => { this.divElement = divElement }}>
          <Tabs>
            <Tab id={`#book-${0}`} tabActive={tabCurrent === 0}>
              <Animated animationIn="bounceInLeft" animationOut="bounceInLeft" animationInDuration={700} isVisible={true}>
                <ScheduleSpa handleTime={(item) => this.handleTime(item)} />
              </Animated>
            </Tab>
            <Tab className="h-100" id={`#book-${1}`} tabActive={tabCurrent === 1}>
              {tabCurrent === 1 && <Animated animationIn="bounceInRight" animationOut="bounceInLeft" isVisible={true}>
                <ScheduleService
                  height={height}
                  selectedService={selectedService}
                  handleService={(ID) => this.handleService(ID)}
                />
              </Animated>}
            </Tab>
            <Tab id={`#book-${2}`} tabActive={tabCurrent === 2}>
              {tabCurrent === 2 && <Animated animationIn="bounceInLeft" animationOut="bounceInLeft" animationInDuration={700} isVisible={true}>
                <ScheduleSuccess onResetStep={() => this.onResetStep()} />
              </Animated>}
            </Tab>
          </Tabs>
        </div>
        <Sheet
          className="sheet-swipe-product sheet-swipe-service"
          style={{ height: "auto", "--f7-sheet-bg-color": "#fff" }}
          opened={sheetOpened}
          onSheetClosed={() => this.closeSheet()}
          swipeToClose
          swipeToStep
          backdrop
        >
          <div className="sheet-modal-swipe-step">
            <div className="sheet-modal-swipe__close"></div>
            <div className="sheet-swipe-product__content sheet-swipe-service__content">
              <div className="sheet-pay-head sheet-service-header">
                Xác nhận thông tin
              </div>
              <div className="sheet-pay-body sheet-service-body">
                <div className="sheet-service-body__content">
                  <div className="location">
                    <div className="icon">
                      <TiLocation /> Cơ sở
                      <span>{itemStepTime && itemStepTime.nameStock}</span>
                    </div>
                  </div>
                  <div className="time">
                    <Row>
                      <Col width="50">
                        <div className="time-box">
                          <div className="icon">
                            <TiCalendarOutline />
                            Ngày
                          </div>
                          <div className="text">
                            {itemStepTime && itemStepTime.date}
                          </div>
                        </div>
                      </Col>
                      <Col width="50">
                        <div className="time-box">
                          <div className="icon">
                            <TiTime />
                            Giờ
                          </div>
                          <div className="text">
                            {itemStepTime && itemStepTime.time}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="service">
                    <div className="icon">
                      <TiHeart />
                      Dịch vụ đã chọn
                    </div>
                    {selectedService &&
                      selectedService.map((item, index) => (
                        <div className="text" key={index}>
                          {item.Title}
                          <BiCheckDouble />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="sheet-service-body__note">
                  <textarea
                    onChange={this.handleNote}
                    placeholder="Cho chúng tôi biết lưu ý thêm của bạn"
                  ></textarea>
                </div>
                <div className="sheet-pay-body__btn">
                  <button
                    className={
                      "page-btn-order btn-submit-order " +
                      (isLoading ? "loading" : "")
                    }
                    onClick={() => this.submitBooks()}
                  >
                    <span>Đặt Lịch</span>
                    <div className="loading-icon">
                      <div className="loading-icon__item item-1"></div>
                      <div className="loading-icon__item item-2"></div>
                      <div className="loading-icon__item item-3"></div>
                      <div className="loading-icon__item item-4"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Sheet>

        <div
          className={`page-schedule--order ${itemBooks && itemBooks[0].ServiceNew > 0 ? "show" : ""
            }`}
        >
          <div className="item">
            <div className="image">
              <img
                src={`
                  ${SERVER_APP}/Upload/image/${itemBooks && itemBooks[0].Thumbnail
                  }
                `}
                alt={itemBooks && itemBooks[0].Title}
              />
            </div>
            <div className="text">
              <div className="text-title">
                {itemBooks && itemBooks[0].Title}
              </div>
              <div
                className={
                  "text-price " +
                  (checkSale(
                    itemBooks && itemBooks[0].SaleBegin,
                    itemBooks && itemBooks[0].SaleEnd
                  ) === true
                    ? "sale"
                    : "")
                }
              >
                <span className="price-to">
                  {formatPriceVietnamese(
                    itemBooks && itemBooks[0].PriceProduct
                  )}
                  <b>đ</b>
                </span>
                <span className="price-sale">
                  {formatPriceVietnamese(itemBooks && itemBooks[0].PriceSale)}
                  <b>đ</b>
                </span>
              </div>
            </div>
            <div className="close" onClick={() => this.closeSerivePosition()}>
              <IoCloseOutline />
            </div>
          </div>
        </div>

        <Toolbar tabbar position="bottom">
          {this.controlsStep()}
        </Toolbar>
      </Page >
    );
  }
}
