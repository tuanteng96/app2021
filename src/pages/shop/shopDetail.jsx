import React from "react";
import { SERVER_APP } from "./../../constants/config";
import { formatPriceVietnamese, checkSale, percentagesSale } from "../../constants/format";
import ShopDataService from "./../../service/shop.service";
import { Page, Link, Toolbar, Navbar, PhotoBrowser, Button } from "framework7-react";
import ReactHtmlParser from "react-html-parser";
import ToolBar from "../../components/ToolBar";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            arrDetail: [],
            photos: [],
        };
    }
    componentDidMount() {
        this.$f7ready((f7) => {
            const cateID = this.$f7route.params.cateId;
            ShopDataService.getDetail(cateID)
                .then((response) => {
                    const arrDetail = response.data.data;
                    const photos = arrDetail.photos;
                    const ptotosNew = [];
                    for (let photo in photos) {
                        var itemPhoho = {};
                        itemPhoho.url = SERVER_APP + "/Upload/image/" + photos[photo].Value;
                        itemPhoho.caption = photos[photo].Title;
                        ptotosNew.push(itemPhoho);
                    }
                    this.setState({
                        arrDetail: arrDetail,
                        photos: ptotosNew
                    })
                })
                .catch((e) => {
                    console.log(e);
                });
        })
    }

    render() {
        const productItem = this.state.arrDetail;
        return (
            <Page name="shop-detail">
                <Navbar>
                    <div className="page-navbar">
                        <div className="page-navbar__back">
                            <Link onClick={() => this.$f7router.back()}>
                                <i className="las la-angle-left"></i>
                            </Link>
                        </div>
                        <div className="page-navbar__title">
                            <span className="title">{productItem.title}</span>
                        </div>
                        <div className="page-navbar__noti">
                            <Link>
                                <i className="las la-bell"></i>
                            </Link>
                        </div>
                    </div>
                </Navbar>
                <PhotoBrowser
                    photos={this.state.photos}
                    theme="dark"
                    popupCloseLinkText="Đóng"
                    navbarOfText="/"
                    ref={(el) => { this.standaloneDark = el }}
                />
                { typeof productItem !== "undefined" &&
                    Object.keys(productItem).length !== 0 ? (
                        <div className="page-render no-bg p-0">
                            <div className="page-shop no-bg">
                                <div className="page-shop__detail">
                                    <div className="page-shop__detail-img">
                                        <img onClick={() => this.standaloneDark.open()} src={SERVER_APP + "/Upload/image/" + productItem.prod.Thumbnail} alt={productItem.title} />
                                    </div>
                                    <div className={"page-shop__detail-list " + (checkSale(productItem.prod.SaleBegin, productItem.prod.SaleEnd) === true ? "sale" : "")}>
                                        <ul>
                                            <li>
                                                <div className="title">
                                                    Mã sản phẩm
                                                </div>
                                                <div className="text">
                                                    {productItem.prod.DynamicID}
                                                </div>
                                            </li>
                                            <li className="product">
                                                <div className="title">
                                                    Giá {checkSale(productItem.prod.SaleBegin, productItem.prod.SaleEnd) === true ? "Gốc" : ""}
                                                </div>
                                                <div className="text">
                                                    {formatPriceVietnamese(productItem.price)}<b>₫</b>
                                                </div>
                                            </li>
                                            <li className="product-sale">
                                                <div className="title">
                                                    Giảm <div className="badges badges-danger">{percentagesSale(productItem.price, productItem.pricesale)}%</div>
                                                </div>
                                                <div className="text">
                                                    {formatPriceVietnamese(productItem.pricesale)}<b>₫</b>
                                                </div>
                                            </li>
                                            {
                                                productItem.prod.Desc !== "" && productItem.prod.Detail !== "" ? (
                                                    <li className="content">
                                                        <div className="content-post">
                                                            {ReactHtmlParser(productItem.prod.Desc)}
                                                            {ReactHtmlParser(productItem.prod.Detail)}
                                                        </div>
                                                    </li>
                                                ) : ("")
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ("<div>Không tìm thấy sản phẩm</div>")}
                <Toolbar tabbar position="bottom">
                    <div className="page-toolbar">
                        <div className="page-toolbar__order">
                            <button className="page-btn-order">Đặt hàng</button>
                        </div>
                    </div>
                </Toolbar>
            </Page>
        )
    }
}