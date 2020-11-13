import React from "react";
import { Page, Link, Toolbar, Navbar } from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
        };
    }
    componentDidMount() {

    }

    render() {
        return (
            <Page>
                <Navbar>
                    <div className="page-navbar">
                        <div className="page-navbar__back">
                            <Link onClick={() => this.$f7router.back()}>
                                <i className="las la-angle-left"></i>
                            </Link>
                        </div>
                        <div className="page-navbar__title">
                            <span className="title">Thông báo</span>
                        </div>
                        <div className="page-navbar__noti">
                            <Link>
                                <i className="las la-check"></i>
                            </Link>
                        </div>
                    </div>
                </Navbar>
                <Toolbar tabbar position="bottom">
                    <ToolBarBottom />
                </Toolbar>
            </Page>
        )
    }
}