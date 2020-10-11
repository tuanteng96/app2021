import React from 'react';
import {
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter
} from 'framework7-react';

import routes from '../js/routes';


export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      // Framework7 Parameters
      f7params: {
        name: 'Cser Beauty', // App name
        theme: 'auto', // Automatic theme detection
        id: 'vn.cser',
        // App routes
        routes: routes,
        on: {
          init: function () {
            var ACC_ID = localStorage.getItem("ACC_ID");
            console.log("Mở lần đầu" + ACC_ID);
          },
          pageInit: function() {
            var ACC_ID = localStorage.getItem("ACC_ID");
            console.log("Khi quay lại" + ACC_ID);
          }
        },
        view: {
          routesBeforeEnter: function(to, from, resolve, reject) {
            console.log('check log in here')
            resolve();
          }
        },
      },
    }
  }
  render() {
    return (
      <App params={ this.state.f7params } >
        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />
      </App>
    )
  }
  componentDidMount() {
    this.$f7ready((f7) => {
      const self = this;
      self.$f7.dialog.preloader('Loading ...');
      setTimeout(() => {
        self.$f7.dialog.close();
      }, 2000);
    });
  }
}