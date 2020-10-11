import React from "react";
import { SERVER_APP } from "./../../constants/config";
import {removeUserStorage} from "../../constants/user";
import { Page, Link, Toolbar } from "framework7-react";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
        };
      }
      signOut = () => {
        removeUserStorage();
        this.$f7router.navigate('/login/');
      }
      render() {
          return (
              <Page name="profile">
                  <button type="button" onClick={() => this.signOut()}>Đăng xuất</button>
              </Page>
          )
      }
}