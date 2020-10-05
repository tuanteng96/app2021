import React from "react";
import { SERVER_APP } from "./../../constants/config";
import ReactHtmlParser from "react-html-parser";
import NewsDataService from "../../service/news.service";
import { Page, Link, Navbar, Toolbar } from "framework7-react";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      arrayItem: [],
    };
  }

  fixedContentDomain = (content) => {
    if (!content) return "";
    return content.replace(/src=\"\//g, 'src="' + SERVER_APP + '/');
  }

  componentDidMount() {
    this.$f7ready((f7) => {
      NewsDataService.getAll()
        .then((response) => {
          const arrNews = response.data.news;
          const paramsID = this.$f7route.params.postId;
          const arrayItem = arrNews.filter((item) => {
            return item.ID == paramsID;
          });
          this.setState({
            arrayItem: arrayItem,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  render() {
    return (
      <Page name="news-list-detail">
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link onClick={() => this.$f7router.back()}>
                <i className="las la-angle-left"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              {typeof this.state.arrayItem !== "undefined" &&
                this.state.arrayItem.length > 0 ? (
                  <span className="title">{this.state.arrayItem[0].Title}</span>
                ) : (
                  <span className="title">Loadding ...</span>
                )}
            </div>
            <div className="page-navbar__noti">
              <Link>
                <i className="las la-bell"></i>
              </Link>
            </div>
          </div>
        </Navbar>
        {typeof this.state.arrayItem !== "undefined" &&
          this.state.arrayItem.length > 0 ? (
            <div className="page-render p-0 no-bg">
              <div className="page-news">
                <div className="page-news__detail">
                  <div className="page-news__detail-img">
                    <img
                      src={SERVER_APP + this.state.arrayItem[0].Thumbnail_web}
                    />
                  </div>
                  <div className="page-news__detail-content">
                    <div className="page-news__detail-shadow">
                      {ReactHtmlParser(this.fixedContentDomain(this.state.arrayItem[0].Desc))}
                      {ReactHtmlParser(this.fixedContentDomain(this.state.arrayItem[0].Content))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
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
    );
  }
}
