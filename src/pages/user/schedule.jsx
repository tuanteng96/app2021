import React from "react";
import { Page, Link, Navbar, Toolbar } from "framework7-react";
import ToolBarBottom from '../../components/ToolBarBottom';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
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
                <Toolbar tabbar position="bottom">
                    <ToolBarBottom />
                </Toolbar>
            </Page>
        )
    }
}