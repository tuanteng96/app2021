import React from "react";
import bgImage from '../../assets/images/headerbottombgapp.png';
import imgCheckin from '../../assets/images/checkin.svg';
import imgWallet from '../../assets/images/wallet.svg';
import imgLocation from '../../assets/images/location.svg';
import imgOrder from '../../assets/images/order.svg';
import imgDiary from '../../assets/images/diary.svg';
import imgCoupon from '../../assets/images/coupon.svg';
import imgEvaluate from '../../assets/images/evaluate.svg'
import { SERVER_APP } from "./../../constants/config";
import {checkAvt} from "../../constants/format";
import { removeUserStorage, getUser } from "../../constants/user";
import { Page, Link, Toolbar,Row, Col } from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";
import UserService from "../../service/user.service";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            memberInfo : []
        };
    }
    signOut = () => {
        removeUserStorage();
        this.$f7router.navigate('/login/');
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
        .catch(err => console.log(err))

    }
    render() {
        const member = this.state.memberInfo && this.state.memberInfo;
        return (
            <Page name="profile" noNavbar>
                <div className="profile-bg">
                    <div className="page-login__back">
                        <Link onClick={() => this.$f7router.back()}>
                            <i className="las la-arrow-left"></i>
                        </Link>
                    </div>
                    <div className="name">
                        {member.FullName}
                    </div>
                    <img src={bgImage}/>
                </div>
                <div className="profile-info">
                    <div className="profile-info__avatar">
                        <img src={checkAvt(member.Photo)} />
                        <Link noLinkClass href="/"><i className="las la-pen"></i></Link>
                    </div>
                    <div className="profile-info__basic">
                        <div className="name">{member.FullName}</div>
                        <div className="group">{member.acc_group > 0 ? (member.MemberGroups[0].Title) : "Khách thường"}</div>
                    </div>
                    <div className="profile-info__shortcuts">
                        <div className="profile-info__shortcut">
                            <Row>
                                <Col width="50">
                                    <div className="profile-info__shortcut-item">
                                        <Link noLinkClass href="/detail-profile/">Thông tin cá nhân</Link>
                                    </div>
                                </Col>
                                <Col width="50">
                                    <div className="profile-info__shortcut-item">
                                        <Link noLinkClass href="/barcode/">Check In</Link>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div className="profile-function">
                    <Row>
                        <Col width="33">
                            <Link noLinkClass href="/">
                                <div className="image">
                                    <img src={imgWallet}/>
                                </div>
                                <span>Ví điện tử</span>
                            </Link>
                        </Col>
                        <Col width="33">
                            <Link noLinkClass href="/">
                                <div className="image">
                                    <img src={imgDiary}/>
                                </div>
                                <span>Nhật ký</span>
                            </Link>
                        </Col>
                        <Col width="33">
                            <Link noLinkClass href="/">
                                <div className="image">
                                    <img src={imgOrder}/>
                                </div>
                                <span>Đơn hàng</span>
                            </Link>
                        </Col>
                        <Col width="33">
                            <Link noLinkClass href="/">
                                <div className="image">
                                    <img src={imgCoupon}/>
                                </div>
                                <span>Mã giảm giá</span>
                            </Link>
                        </Col>
                        <Col width="33">
                            <Link noLinkClass href="/">
                                <div className="image">
                                    <img src={imgEvaluate}/>
                                </div>
                                <span>Đánh giá</span>
                            </Link>
                        </Col>
                        <Col width="33">
                            <Link noLinkClass href="/">
                                <div className="image">
                                    <img src={imgLocation}/>
                                </div>
                                <span>Liên hệ</span>
                            </Link>
                        </Col>
                    </Row>
                </div>
                {/* <button type="button" onClick={() => this.signOut()}>Đăng xuất</button> */}
                <Toolbar tabbar position="bottom">
                    <ToolBarBottom />
                </Toolbar>
            </Page>
        )
    }
}