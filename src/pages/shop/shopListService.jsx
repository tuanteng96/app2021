import React from "react";
import { SERVER_APP } from "./../../constants/config";
import { Page, Link, Toolbar, Navbar } from "framework7-react";
import ShopDataService from "./../../service/shop.service";
import ReactHtmlParser from "react-html-parser";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            arrCateAdv: []
        };
    }
    render() {
        return (
            <Page name="shop-List">
                <Navbar>
                    <div className="page-navbar">
                        <div className="page-navbar__back">
                            <Link onClick={() => this.$f7router.back()}>
                                <i className="las la-angle-left"></i>
                            </Link>
                        </div>
                        <div className="page-navbar__title">
                            <span className="title">

                            </span>
                        </div>
                        <div className="page-navbar__noti">
                            <Link>
                                <i className="las la-bell"></i>
                            </Link>
                        </div>
                    </div>
                </Navbar>
                <div className="page-render no-bg">
                    <div className="page-shop no-bg">
                        DV
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
                                <Link href="/shop/">
                                    <i className="las la-shopping-cart"></i>
                                    <span>Mua hàng</span>
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
        )
    }
}