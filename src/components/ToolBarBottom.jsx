import React from "react";
import {
    Link,
    Toolbar,
} from "framework7-react";

export default class ToolBarCustom extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div className="page-toolbar">
                <div className="page-toolbar-bottom js-toolbar-bottom" id="js-toolbar-bottom">
                    <div className="page-toolbar-indicator">
                        <div className="page-toolbar-indicator__left"></div>
                        <div className="page-toolbar-indicator__right"></div>
                    </div>
                    <Link noLinkClass href="/news/" className="page-toolbar-bottom__link js-toolbar-link toolbar-active">
                        <i className="las la-newspaper"></i>
                    </Link>
                    <Link noLinkClass href="/shop/" className="page-toolbar-bottom__link js-toolbar-link">
                        <i className="las la-shopping-cart"></i>
                    </Link>
                    <Link noLinkClass href="/" className="page-toolbar-bottom__link active">
                        <div className="page-toolbar-bottom__link-inner">
                            <i className="las la-calendar-plus"></i>
                        </div>
                    </Link>
                    <Link noLinkClass href="/maps/" className="page-toolbar-bottom__link js-toolbar-link">
                        <i className="las la-map-marked-alt"></i>
                    </Link>
                    <Link noLinkClass href="/users/" className="page-toolbar-bottom__link js-toolbar-link">
                        <i className="las la-user-circle"></i>
                    </Link>
                </div>
            </div>
        )
    }
}