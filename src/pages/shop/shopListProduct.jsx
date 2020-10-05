import React from "react";
import { SERVER_APP } from "./../../constants/config";
import { Page, Link, Toolbar, Navbar,Row,Col } from "framework7-react";
import ShopDataService from "./../../service/shop.service";
import ReactHtmlParser from "react-html-parser";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            itemView: 8, // Số item hiển thị trên 1 Page
            arrCateList: [],
            countCateList: "",
            totalCateList: "",
            titlePage: "",
            showPreloader: true,
            allowInfinite: true,
        };
    }

    getDataList = (ID, pi, ps, tag) => {
        //ID Cate
        //Trang hiện tại
        //Số sản phẩm trên trang
        // Tag
        ShopDataService.getList(ID, pi, ps, tag)
            .then((response) => {
                const arrCateList = response.data.data.lst;
                const countCateList = response.data.data.pcount;
                const totalCateList = response.data.data.total;
                const piCateList = response.data.data.pi;
                this.setState({
                    arrCateList: arrCateList,
                    countCateList: countCateList,
                    totalCateList: totalCateList,
                    piCateList: piCateList
                })
            })
            .catch((e) => {
                console.log(e);
            })
    }
    getTitleCate = () => {
        const CateID = this.$f7route.params.cateId;
        ShopDataService.getTitleCate(CateID)
            .then((response) => {
                const titlePage = response.data.data[0].Title;
                this.setState({
                    titlePage: titlePage
                });
            })
            .catch((e) => {
                console.log(e);
            })
    }
    checkSale = (SaleBegin, SaleEnd) => {
        var SaleBegins = SaleBegin.slice(0, 10);
        var SaleEnds = SaleEnd.slice(0, 10);
        var todaydate = new Date();
        var day = todaydate.getDate();
        var month = todaydate.getMonth() + 1;
        var year = todaydate.getFullYear();
        var datetoday = year + "-" + month + "-" + day;
    
        if (Date.parse(todaydate) < Date.parse(SaleEnd) && Date.parse(SaleBegin) <= Date.parse(todaydate)) {
            return "sale";
        }
        else {
            return "";
        }
    }
    formatPriceVietnamese = (price) => {
        return price.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    componentDidMount() {
        this.$f7ready((f7) => {
            const parentCateID = this.$f7route.params.parentId;
            const CateID = this.$f7route.params.cateId;
            const itemView = this.state.itemView;

            if (CateID === "hot") {
                this.setState({
                    titlePage: "Hôm nay Sale gì ?",
                    isTag: "hot"
                });
                this.getDataList(CateID, "1", itemView, "hot");

            }
            else {
                this.getDataList(CateID, "1", itemView, "");
                this.getTitleCate();
            }
        })
    }
    loadMore = () => {
        
        const self = this;
        const isState = self.state;
        const CateID = this.$f7route.params.cateId;
        const itemView = isState.itemView; // Tổng số item trên 1 page

        const tag = isState.isTag ? isState.isTag : "";

        if (!self.state.allowInfinite) return;
        console.log("1");
        self.setState({ allowInfinite: false });
        setTimeout(() => {
            if (isState.totalCateList <= isState.arrCateList.length) {
                self.setState({ showPreloader: false });
                return;
            }

            ShopDataService.getList(CateID, isState.piCateList + 1, itemView, tag)
                .then((response) => {
                    const arrCateList = response.data.data.lst;

                    var arrCateListNew = isState.arrCateList;
                    for (let item in arrCateList) {
                        arrCateListNew.push(arrCateList[item]);
                    }

                    self.setState({
                        arrCateList: arrCateListNew,
                        piCateList: isState.piCateList + 1,
                        allowInfinite: true
                    });
                })
                .catch((e) => {
                    console.log(e);
                })


        }, 1000);
    }

    loadRefresh(done) {
        setTimeout(() => {
            
            const CateID = this.$f7route.params.cateId;
            const itemView = this.state.itemView;

            if (CateID === "hot") {
                this.setState({
                    titlePage: "Hôm nay Sale gì ?",
                    isTag: "hot"
                });
                this.getDataList(CateID, "1", itemView, "hot");

            }
            else {
                this.getDataList(CateID, "1", itemView, "");
                this.getTitleCate();
            }
            this.setState({
                allowInfinite: true,
                showPreloader: true
            });
            done();
          }, 1000);
    }

    render() {
        const arrCateList = this.state.arrCateList;
        return (
            <Page
                name="shop-List"
                infinite
                ptr
                infiniteDistance={50}
                infinitePreloader={this.state.showPreloader}
                onInfinite={() => this.loadMore()}
                onPtrRefresh={this.loadRefresh.bind(this)}
            >
                <Navbar>
                    <div className="page-navbar">
                        <div className="page-navbar__back">
                            <Link onClick={() => this.$f7router.back()}>
                                <i className="las la-angle-left"></i>
                            </Link>
                        </div>
                        <div className="page-navbar__title">
                            <span className="title">
                                {this.state.titlePage}
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
                        <div className="page-shop__list">
                            <Row>
                                {
                                    arrCateList && arrCateList.map((item, index) => (

                                        <Col width="50" key={index}>
                                            <a href="" className="page-shop__list-item">
                                                <div className="page-shop__list-img">
                                                    <img src={SERVER_APP + "/Upload/image/" + item.photo} alt={item.title} />
                                                </div>
                                                <div className="page-shop__list-text">
                                                    <h3>{item.title}</h3>
                                                    <div className={"page-shop__list-price " + this.checkSale(item.source.SaleBegin,item.source.SaleEnd)}>
                                                        <span className="price"><b>₫</b>{this.formatPriceVietnamese(item.price)}</span>
                                                        <span className="price-sale"><b>₫</b>{this.formatPriceVietnamese(item.pricesale)}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </Col>
                                    ))
                                }
                            </Row>
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