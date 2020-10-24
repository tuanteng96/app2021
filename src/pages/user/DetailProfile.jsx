import React from "react";
import { Page, Link, Toolbar, Row, Col } from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";

export default class extends React.Component {
    render() {
        return(
            <Page name="detail-profile">
                <ToolBarBottom />
            </Page>
        )
    }
}