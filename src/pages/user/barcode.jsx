import React from "react";
import bgImage from '../../assets/images/headerbottombgapp.png';
import { SERVER_APP } from "./../../constants/config";
import {checkAvt} from "../../constants/format";
import { getUser } from "../../constants/user";
import { Page, Link, Toolbar,Row, Col } from "framework7-react";
import UserService from "../../service/user.service";
import QRCode from 'qrcode.react';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            memberInfo: [],
            code: ""
        };
    }
    componentDidMount() {
        const infoUser = getUser();
        const username = infoUser.MobilePhone;

        UserService.getInfo(username)
        .then(response => {
            const memberInfo = response.data.info;
            this.setState({
                memberInfo: memberInfo
            })
        })
        .catch(err => console.log(err));

        this.getBarCode(infoUser.ID);

    }

    getBarCode = (memberID) => {
        UserService.getBarCode(memberID)
        .then(response => {
            const code = response.data.code;
            this.setState({
                code: code
            })
        })
        .catch(err => console.log(err))
    }

    loadMore(done) {
        const self = this;
        const moreUser = getUser();
        const moreID = moreUser.ID;
        setTimeout(() => {
            self.getBarCode(moreID);
            done();
        },1000);
    }

    render() {
        const member = this.state.memberInfo && this.state.memberInfo;
        const code = this.state.code && this.state.code;
        return (
            <Page name="barcode" noNavbar noToolbar ptr ptrPreloader onPtrRefresh={this.loadMore.bind(this)}>
                <div className="profile-bg">
                    <div className="page-login__back">
                        <Link onClick={() => this.$f7router.back()}>
                            <i className="las la-arrow-left"></i>
                        </Link>
                    </div>
                    <div className="name">
                        Check In
                    </div>
                    <img src={bgImage}/>
                </div>
                <div className="profile-info">
                    <div className="profile-info__avatar">
                        <img src={checkAvt(member.Photo)} />
                    </div>
                    <div className="profile-info__basic">
                        <div className="name">{member.FullName}</div>
                        <div className="group">{member.acc_group > 0 ? (member.MemberGroups[0].Title) : "Khách thường"}</div>
                    </div>
                </div>
                <div className="barcode-qr">
                    <div className="barcode-qr__box">
                        <div className="barcode-qr__box-text">
                            <i className="las la-camera"></i>
                            <span>Vui lòng di chuyển máy ảnh của bạn qua màn hình của thiết bị khác</span>
                        </div>
                        <QRCode
                            id='qrcode'
                            value={code}
                            size={240}
                            level={'M'}
                            includeMargin={true}
                            />
                    </div>
                </div>
            </Page>
        )
    }
}