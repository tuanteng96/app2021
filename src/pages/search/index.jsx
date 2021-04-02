import { Link, Page, Toolbar } from "framework7-react";
import React from "react";
import ToolBarBottom from "../../components/ToolBarBottom";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Page noNavbar name="search">
        <div className="page-search">
          <div className="page-search__header">
            <Link onClick={() => this.$f7router.back()}>
              <i className="las la-angle-left"></i>
            </Link>
            <div className="form-search">
              <form>
                <input type="search" placeholder="Bạn muốn tìm ?" />
              </form>
            </div>
          </div>
          <div className="page-search__content">
            <div class="history"> 
              
            </div>
          </div>
          Tìm kiếm
        </div>
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
