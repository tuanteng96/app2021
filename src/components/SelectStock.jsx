import React from "react";
import { Page, Link, Toolbar, Actions, ActionsGroup, ActionsLabel, ActionsButton, Button } from "framework7-react";
import UserService from "../service/user.service";
import { setStockIDStorage, getStockIDStorage,setStockNameStorage } from "../constants/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class SelectStock extends React.Component {
    constructor() {
        super();
        this.state = {
            arrStock: []
        }
    }

    getStock() {
        UserService.getStock()
            .then(response => {
                const CurrentStockID = response.data.data.CurrentStockID;
                const ListStock = response.data.data.all;
                const arrStock = [];

                ListStock.map((item) => {
                    if (item.ID !== 778) {
                        arrStock.push(item);
                    }
                });

                this.setState({
                    CurrentStockID: CurrentStockID,
                    arrStock: arrStock
                });
            })
    }

    componentDidMount() {
        this.getStock();
        const isOpenStock = this.props.isOpenStock;
        if (isOpenStock === true) {
            this.refs.actionStock.open();
        }
        else {
            const StockID = getStockIDStorage();
            this.setState({
                StockID: StockID
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const isOpenStock = this.props.isOpenStock;

        if (prevProps.isOpenStock !== isOpenStock) {
            this.refs.actionStock.open();
        }
    }

    handleChangeStock = (event) => {
        var target = event.target;
        var CheckedStock = target.value;
        var NameStock = target.title;
        var bodyData = new FormData();
        bodyData.append("stockid", CheckedStock);

        UserService.setStock(bodyData)
            .then(response => {
                this.refs.actionStock.close();
                setStockIDStorage(CheckedStock);
                setStockNameStorage(NameStock);
                this.setState({
                    StockID: CheckedStock
                })
                toast.success("Chọn điểm thành công !", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500
                });
                if (this.props.fnSuccess !== undefined) {
                    this.props.fnSuccess(true);
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        const arrStock = this.state.arrStock;
        const StockID = this.state.StockID && this.state.StockID;

        return (
            <Actions className="action-stock" ref="actionStock">
                <ActionsGroup>
                    <div className="action-stock__list">
                        <div className="action-stock__list-name title">
                            <h5>Chọn cơ sở gần bạn</h5>
                        </div>
                        {
                            arrStock && arrStock.map(item => (
                                <div className={"action-stock__list-name " + (parseInt(StockID) === item.ID ? "currentStock" : "")} key={item.ID}>
                                    <input
                                        name="ValueStock"
                                        type="radio"
                                        value={item.ID}
                                        title={item.Title}
                                        id={item.ID}
                                        defaultChecked={parseInt(StockID) === item.ID}
                                        onChange={(e) => this.handleChangeStock(e)} />
                                    <label htmlFor={item.ID}>{item.Title} <i className="las la-check"></i></label>
                                </div>
                            ))
                        }
                    </div>
                </ActionsGroup>
                <ActionsGroup>
                    <ActionsButton color="red">Đóng</ActionsButton>
                </ActionsGroup>
            </Actions>
        );
    }
}