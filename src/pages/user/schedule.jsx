import React from "react";
import { Page, Link, Navbar, Toolbar, Tabs, Tab } from "framework7-react";
import ToolBarBottom from '../../components/ToolBarBottom';
import UserService from "../../service/user.service";
import { setStockIDStorage, getStockIDStorage,setStockNameStorage } from "../../constants/user";
import Slider from "react-slick";
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            arrListDate: [], // Hiển thị 3 ngày từ ngày today next
            arrStock: [], // List Stock
        };
    }
    componentDidMount() {
        this.listDate();
        this.getStock();
        const CurrentStockID = getStockIDStorage();
        this.setState({
            CurrentStockID: CurrentStockID,
            width: window.innerWidth
        });
    }

    group = (items, n) => items.reduce((acc, x, i) => {
        const idx = Math.floor(i / n);
        acc[idx] = [...(acc[idx] || []), x];
        return acc;
    }, []);

    getStock() {
        UserService.getStock()
            .then(response => {
                const ListStock = response.data.data.all;
                const arrStock = [];

                ListStock.map((item) => {
                    if (item.ID !== 778) {
                        arrStock.push(item);
                    }
                });

                this.setState({
                    arrStock: arrStock
                });
            })
    }

    listDate = () => {
        const gettoday = moment();
        const arrListDate = [];
        const arrListTime = [];
        for (let day = 0; day <= 630; day +=15) {
            var time = moment("2020-11-05T07:30:00").add(day, 'm').format('LT');
            var item = {
                time : time
            }
            arrListTime.push(item);
        }

        for (let day = 1; day <= 3; day++) {
            switch (day) {
                case 1:
                    var todayFormat = moment(gettoday).add(day, 'days').format("DD/MM");
                    var today = moment(gettoday).add(day, 'days').format("DD/MM/YYYY");
                    var item = {
                        dateFormat: "Hôm nay " + todayFormat,
                        date: today,
                        name: "today",
                        arrtime: arrListTime
                    }
                    arrListDate.push(item);
                    break;
                case 2:
                    var tomorrowFormat = moment(gettoday).add(day, 'days').format("DD/MM");
                    var tomorrow = moment(gettoday).add(day, 'days').format("DD/MM/YYYY");
                    var item = {
                        dateFormat: "Ngày mai " + tomorrowFormat,
                        date: tomorrow,
                        name: "tomorrow",
                        arrtime: arrListTime
                    }
                    arrListDate.push(item);
                    break;

                default:
                    var tomorrowAfterFormat = moment(gettoday).add(day, 'days').format("DD/MM");
                    var tomorrowAfter = moment(gettoday).add(day, 'days').format("DD/MM/YYYY");
                    var item = {
                        dateFormat: "Ngày kia " + tomorrowAfterFormat,
                        date: tomorrowAfter,
                        name: "tomorrowAfter",
                        arrtime: arrListTime
                    }
                    arrListDate.push(item);
                    break;
            }
        }
        this.setState({
            arrListDate: arrListDate
        })
    }

    handStyle = () => {
        const _width = (this.state.width / 4) - 10;
        return Object.assign({
          width: _width,
        });
    }

    onDateChanged = (event) => {
        const target = event.target;
        const value = target.value;
        console.log(value);
    }

    render() {
        const { arrListDate,arrStock } = this.state;
        const CurrentStockID = this.state.CurrentStockID && this.state.CurrentStockID;
        const settings = {
            className: "slider variable-width",
            dots: false,
            arrows: false,
            infinite: true,
            slidesToShow: 4,
            spaceBetween: 30,
            slidesPerView: 'auto',
        };
        return (
            <Page name="schedule">
                <Navbar>
                    <div className="page-navbar">
                        <div className="page-navbar__back">
                            <Link>
                                <i className="las la-map-marked-alt"></i>
                            </Link>
                        </div>
                        <div className="page-navbar__title">
                            <span className="title">Đặt lịch</span>
                        </div>
                        <div className="page-navbar__noti">
                            <Link>
                                <i className="las la-bell"></i>
                            </Link>
                        </div>
                    </div>
                </Navbar>
                <div className="page-schedule">
                    <div className="page-schedule__date">
                        {
                            arrListDate && arrListDate.map((item, index) => (
                                <Link key={index} noLinkClass tabLink={"#tab-" + item.name} tabLinkActive={index === 0 ? true : false}>
                                    <input type="radio" onChange={this.onDateChanged} name="checkdate" value={item.date} />
                                    <span>{item.dateFormat}</span>
                                </Link>
                            ))
                        }
                    </div>
                    <div className="page-schedule__location">
                        <h5>Chọn spa gần bạn</h5>
                        <div className="page-schedule__location-list">
                            {
                                arrStock && arrStock.map((item,index) => (
                                    <div className="locaiton" key={index}>
                                        <input 
                                            type="radio" 
                                            name="checklocation" 
                                            value={item.ID}
                                            defaultChecked={parseInt(CurrentStockID) === item.ID} />
                                        <span>{item.Title}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="page-schedule__time">
                        <h5>Chọn thời gian</h5>
                        <Tabs animated>
                            {
                                
                                arrListDate && arrListDate.map((item, index) => (
                                    <Tab key={index} id={"tab-" + item.name} className="page-tab-location" tabActive={index === 0 ? true : false}>
                                        <Slider {...settings}>
                                        {
                                            this.group(item.arrtime, 5).map((children,k) =>
                                                <div className="group" style={this.handStyle()} key={k}>
                                                {
                                                    children.map((sub, i) => (
                                                        <div key={i}>
                                                            <input value={sub.time} type="radio" name="checktime"/>
                                                            <span>{sub.time}</span>
                                                        </div>
                                                    ))
                                                }
                                                </div>
                                            )
                                        }
                                        </Slider>
                                    </Tab>
                                ))
                            }
                        </Tabs>
                    </div>
                    <button type="button">Next</button>
                </div>
                <Toolbar tabbar position="bottom">
                    <ToolBarBottom />
                </Toolbar>
            </Page>
        )
    }
}