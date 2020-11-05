import React from "react";
import { Page, Link, Navbar, Toolbar, Tabs, Tab } from "framework7-react";
import ToolBarBottom from '../../components/ToolBarBottom';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            arrListDate: []// Hiển thị 3 ngày từ ngày today next
        };
    }
    componentDidMount() {
        this.listDate();
    }
    listDate = () => {
        const gettoday = moment();
        const maxDay = 3;
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
                    var today = moment(gettoday).add(day, 'days').format("DD/MM");
                    var item = {
                        date: "Hôm nay " + today,
                        name: "today",
                        arrtime: arrListTime
                    }
                    arrListDate.push(item);
                    break;
                case 2:
                    var tomorrow = moment(gettoday).add(day, 'days').format("DD/MM");
                    var item = {
                        date: "Ngày mai " + tomorrow,
                        name: "tomorrow",
                        arrtime: arrListTime
                    }
                    arrListDate.push(item);
                    break;

                default:
                    var tomorrowAfter = moment(gettoday).add(day, 'days').format("DD/MM");
                    var item = {
                        date: "Ngày kia " + tomorrowAfter,
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

    render() {
        const { arrListDate } = this.state;
        console.log(arrListDate);
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
                                <Link key={index} noLinkClass tabLink={"#tab-" + item.name} tabLinkActive={index === 0 ? true : false}>{item.date}</Link>
                            ))
                        }
                    </div>
                    <div className="page-schedule__time">
                        <h5>Chọn thời gian</h5>
                        <Tabs animated>
                            {
                                arrListDate && arrListDate.map((item, index) => (
                                    <Tab key={index} id={"tab-" + item.name} className="page-content" tabActive={index === 0 ? true : false}>
                                        {item.date}
                                        {
                                            item.arrtime.map((sub,i) => (
                                                <div key={i}>
                                                    <input type="text" value={sub.time} type="radio" name="checktime"/>
                                                    <span>{sub.time}</span>
                                                </div>
                                            ))
                                        }
                                    </Tab>
                                ))
                            }
                        </Tabs>
                    </div>
                </div>
                <Toolbar tabbar position="bottom">
                    <ToolBarBottom />
                </Toolbar>
            </Page>
        )
    }
}