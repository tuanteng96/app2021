import React from "react";
import { SERVER_APP } from "./../../constants/config";
import ShopDataService from "./../../service/shop.service";
import { Page, Link, Toolbar, Navbar } from "framework7-react";
import ReactHtmlParser from "react-html-parser";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            arrCate: []
        };
    }
    componentDidMount() {
        this.$f7ready((f7) => {
            const cateID = this.$f7route.params.cateId;
            ShopDataService.getCate(cateID)
                .then((response) => {
                    const arrCate = response.data;
                    this.setState({
                        arrCate: arrCate
                    })
                })
                .catch((e) => {
                    console.log(e);
                });
        })
    }
    getTitle = () => {
        if (this.$f7route.params.cateId === "795") {
            return "Danh Mục Dịch Vụ"
        }
        else {
            return "Danh Mục Sản Phẩm"
        }
    }
    render() {
        const arrCate = this.state.arrCate;
        return (
            <Page name="shop-cate">
                <Navbar>
                    <div className="page-navbar">
                        <div className="page-navbar__back">
                            <Link onClick={() => this.$f7router.back()}>
                                <i className="las la-angle-left"></i>
                            </Link>
                        </div>
                        <div className="page-navbar__title">
                            <span className="title">{this.getTitle()}</span>
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
                        <div className="page-shop__cate">
                            {
                                arrCate && arrCate.map(item => (
                                    <a href={"/shop/list/" + item.ParentID +"/" + item.ID} className="page-shop__cate-item" key={item.ID}>
                                        <div className="page-shop__cate-img">
                                            <img src={SERVER_APP + "/Upload/image/"+ item.Thumbnail2} alt={item.Title} />
                                        </div>
                                        <div className="page-shop__cate-text">
                                            <h3>{item.Title}</h3>
                                            <div className="page-shop__cate-desc">
                                            {ReactHtmlParser(item.Desc)}
                                            </div>
                                            <i className="las la-arrow-right"></i>
                                        </div>
                                    </a>
                                ))
                            }
                        </div>
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