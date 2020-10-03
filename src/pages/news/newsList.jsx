import React from 'react';
import { SERVER_APP } from './../../constants/config';
import {
    Page,
    Link,
    Navbar
  } from 'framework7-react';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            arrNews: [],
        }
    }

    render() {
        return (
            <Page name="news-list">
                <Navbar 
                    title="Danh sách tin tức"
                    innerClass="page-navbar"
                >
                    
                </Navbar>
                <div className="page-custom page-news ezs-navbar">
                    {/* <NavBar 
                        title="Danh sách tin tức" 
                    /> */}
                    <div className="page-render">
                        <div className="page-return">
                            Tin tức danh sách
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}