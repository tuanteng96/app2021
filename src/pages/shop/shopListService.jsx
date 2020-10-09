import React from "react";
import { SERVER_APP } from "./../../constants/config";
import { Page, Link, Toolbar, Navbar } from "framework7-react";
import ShopDataService from "./../../service/shop.service";
import ReactHtmlParser from "react-html-parser";
import ToolBarBottom from "../../components/ToolBarBottom";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            titlePage: "",
            arrService: [],
        };
    }

    getService = (cateid) => {
        ShopDataService.getServiceParentID(cateid)
            .then((response) => {
                var arrServiceParent = response.data.data;
                arrServiceParent.forEach((item) => {
                    var ParentID = item.ID;
                    ShopDataService.getServiceProdID(ParentID)
                        .then((response) => {
                            const arrServiceProd = response.data.data;
                            item.Lst = arrServiceProd;
                        })
                        .catch((e) => console.log(e))
                })
                this.setState({
                    arrService: arrServiceParent
                })
            })
            .catch((e) => console.log(e));
    }

    getTitleCate = () => {
        const CateID = this.$f7route.params.cateId;
        ShopDataService.getTitleCate(CateID)
          .then((response) => {
            const titlePage = response.data.data[0].Title;
            this.setState({
              titlePage: titlePage,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      };

    componentDidMount() {
        this.$f7ready((f7) => {
            const CateID = this.$f7route.params.cateId;
            this.getTitleCate();
            this.getService(CateID);
        });
    }

    render() {
        const arrService = this.state.arrService;
        console.log(arrService);
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
                <div className="page-render">
                    <div className="page-shop">
                        <div className="page-shop__service">
                            <div className="page-shop__service-list">
                                {
                                    arrService && arrService.map((item) =>
                                        (<div className="page-shop__service-item" key={item.ID}>
                                            <div className="page-shop__service-item service-about">
                                                <div className="service-about__img">
                                                    <img
                                                        src={SERVER_APP + "/Upload/image/" + item.Thumbnail}
                                                        alt={item.Title}
                                                    />
                                                </div>
                                                <div className="service-about__content">
                                                    <div className="service-about__content-text">
                                                        {ReactHtmlParser(item.Desc)}
                                                    </div>
                                                </div>
                                                <div className="service-about__list">
                                                    {item.Lst}
                                                    <ul>
                                                        {/* {
                                                            item.lst.map((item) => {
                                                                console.log(item);
                                                            })
                                                        } */}
                                                        <li>
                                                            <div className="title">

                                                            </div>
                                                            <div className="price">
                                                                <span className="price-to"></span>
                                                                <span className="price-sale"></span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>)
                                    )
                                }
                            </div>
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