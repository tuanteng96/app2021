import React from "react";
import { SERVER_APP } from "./../../constants/config";
import { Page, Link, Toolbar, Navbar } from "framework7-react";
import ShopDataService from "./../../service/shop.service";
import ReactHtmlParser from "react-html-parser";
import ToolBar from "../../components/ToolBar";

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
                    <ToolBar />
                </Toolbar>
            </Page>
        )
    }
}