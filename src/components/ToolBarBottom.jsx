import React from "react";
import { Link } from "framework7-react";
import { getUser } from "../constants/user";

export default class ToolBarCustom extends React.Component {
  constructor() {
    super();
  }
  user = getUser();
  componentDidMount() {}

  menuToolbar = () => {
    const ACC_TYPE = this.user && this.user.acc_type;
    switch (ACC_TYPE) {
      case "M":
        return (
          <React.Fragment>
            <Link
              noLinkClass
              href="/news/"
              className="page-toolbar-bottom__link js-toolbar-link toolbar-active"
            >
              <i className="las la-newspaper"></i>
            </Link>
            <Link
              noLinkClass
              href="/shop/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-shopping-cart"></i>
            </Link>
            <Link
              noLinkClass
              href="/schedule/"
              className="page-toolbar-bottom__link active"
            >
              <div className="page-toolbar-bottom__link-inner">
                <i className="las la-calendar-plus"></i>
              </div>
            </Link>
            <Link
              noLinkClass
              href="/cardservice/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-clipboard-list"></i>
            </Link>
            <Link
              noLinkClass
              href="/profile/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-user-circle"></i>
            </Link>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <Link
              noLinkClass
              href="/news/"
              className="page-toolbar-bottom__link js-toolbar-link toolbar-active"
            >
              <i className="las la-newspaper"></i>
            </Link>
            <Link
              noLinkClass
              href="/shop/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-shopping-cart"></i>
            </Link>
            <Link
              noLinkClass
              href="/login/"
              className="page-toolbar-bottom__link active"
            >
              <div className="page-toolbar-bottom__link-inner">
                <i className="las la-calendar-plus"></i>
              </div>
            </Link>
            <Link
              noLinkClass
              href="/maps/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-map-marked-alt"></i>
            </Link>
            <Link
              noLinkClass
              href="/login/"
              className="page-toolbar-bottom__link js-toolbar-link"
            >
              <i className="las la-user-circle"></i>
            </Link>
          </React.Fragment>
        );
    }
  };

  render() {
    return (
      <div className="page-toolbar">
        <div
          className="page-toolbar-bottom js-toolbar-bottom"
          id="js-toolbar-bottom"
        >
          <div className="page-toolbar-indicator">
            <div className="page-toolbar-indicator__left"></div>
            <div className="page-toolbar-indicator__right"></div>
          </div>
          {this.menuToolbar()}
        </div>
      </div>
    );
  }
}
