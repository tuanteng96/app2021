import React from 'react';
import {
    Toolbar,
  } from 'framework7-react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import EditLocationOutlinedIcon from '@material-ui/icons/EditLocationOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';

export default class Nav extends React.Component {

    constructor() {
        super();
        this.state = {
            isActive: true
        }
    }

    render() {
        const isProps = this.props;
        return(
            <div className="page-nav">
                <ul className="page-nav__menu page-nav__4">
                        <li className={isProps.itemActive === "news" ? "active" : ""}>
                            <LoyaltyOutlinedIcon />
                            <b>Ưu đãi</b>
                        </li>
                        <li>
                            <ShoppingCartOutlinedIcon />
                            <b>Sản phẩm</b>
                    </li>
                    <li>
                            <EditLocationOutlinedIcon />
                            <b>Liên hệ</b>
                    </li>
                    <li>
                        <PermIdentityOutlinedIcon/>
                        <b>Tài khoản</b>
                    </li>
                </ul>
            </div>
        );
    }
}