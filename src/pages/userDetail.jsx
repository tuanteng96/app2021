import React from "react";
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavTitleLarge,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button
  } from 'framework7-react';
export default class extends React.Component {
    constructor() {
      super();
      this.state = {
        title: "Hello Framework7",
      }
    }
    render() {
        const paramsID = this.$f7route.params.userId;
        console.log(this.$f7route);
        return (
            <Page name="detailUser">
                <Navbar>
                    <NavLeft>
                        <NavLeft backLink="Back"></NavLeft>
                    </NavLeft>
                    <NavTitle>User ID {paramsID}</NavTitle>
                    <NavRight>
                        <Link>Right Link</Link>
                    </NavRight>
                </Navbar>
                {/* <Navbar large sliding={false}>
                    <NavLeft>
                        <NavLeft backLink="Back"></NavLeft>
                    </NavLeft>
                    <NavTitle sliding>ID USER : </NavTitle>
                    <NavRight>
                        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
                    </NavRight>
                    <NavTitleLarge>ID USER : {paramsID}</NavTitleLarge>
                </Navbar> */}
                Detail User
            </Page>
        )
    }
}