import React from 'react';
import {
    Toolbar,
  } from 'framework7-react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import EditLocationOutlinedIcon from '@material-ui/icons/EditLocationOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';

export default class Nav extends React.Component {

    constructor() {
        super();
        this.state = {
           
        }
    }

    render() {
      return(
          <div className="page-nav">
              <ul>
                    {/* <li>
                        <HomeOutlinedIcon />
                        <b>Ưu đãi</b>
                    </li>
                    <li>
                        <ShoppingCartOutlinedIcon />
                        <b>Sản phẩm</b>
                   </li>
                   <li>
                        <EditLocationOutlinedIcon />
                        <b>Sản phẩm</b>
                   </li>
                   <li>
                       <PermIdentityOutlinedIcon/>
                       <b>Tài khoản</b>
                   </li> */}
              </ul>
          </div>
      );
    }
}