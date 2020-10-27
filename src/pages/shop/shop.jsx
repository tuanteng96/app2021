import React from "react";
import { SERVER_APP } from "./../../constants/config";
import { Page, Link, Toolbar, Navbar } from "framework7-react";
import AdvDataService from '../../service/adv.service';
import ReactHtmlParser from "react-html-parser";
import ToolBarBottom from "../../components/ToolBarBottom";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            arrCateAdv: []
        };
    }

    componentDidMount() {
        this.$f7ready((f7) => {
            // Call F7 APIs here
            AdvDataService.getMenuShop()
                .then((response) => {

                    const arrCateAdv = response.data.data;
                    this.setState({
                        arrCateAdv: arrCateAdv
                    })
                })
                .catch((e) => {
                    console.log(e);
                });
        });
    }

    render() {
        const arrCateAdv = this.state.arrCateAdv;
        return (
            <Page name="shop">
                <Navbar>
                    <div className="page-navbar">
                        <div className="page-navbar__back">
                            <Link>
                                <i className="las la-map-marked-alt"></i>
                            </Link>
                        </div>
                        <div className="page-navbar__title">
                            <span className="title">Mua hàng</span>
                        </div>
                        <div className="page-navbar__noti">
                            <Link>
                                <i className="las la-bell"></i>
                            </Link>
                        </div>
                    </div>
                </Navbar>
                <div className="page-render p-0">
                    <div className="page-shop">
                        <div className="page-shop__category">
                            <ul>
                                {
                                    arrCateAdv && arrCateAdv.map(item => (
                                        <li key={item.ID}>
                                            <a href={"/shop/" + item.Link}>
                                                <img src={SERVER_APP + "/Upload/image/" + item.FileName} alt={item.Title} />
                                                <div className="page-shop__category-title">{item.Title}</div>
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <Toolbar tabbar position="bottom">
                    <ToolBarBottom />
                </Toolbar>
            </Page>
        )
    }
}