import { Link, Page, Panel, View } from "framework7-react";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getStockNameStorage } from "../../constants/user";
import SelectStock from "../SelectStock";

function PanelLeft({ f7 }) {
  const [isOpenStock, setIsOpenStock] = useState(false);
  const [isReload, setIsReload] = useState(0);
  const [nameIsStock, setNameIsStock] = useState("");

  useEffect(() => {
    const stockName = getStockNameStorage();
    setNameIsStock(stockName);
  }, []);

  const nameStock = (name) => {
    setNameIsStock(name);
  };

  const handleStock = () => {
    setIsOpenStock(!isOpenStock);
  };

  const onChangeHref = (href) => {
    f7.$f7.panel.close();
    f7.$f7router.navigate(href);
  };

  const isCheckActive = (href) => {
    return f7.$f7.views.main.router.url === href;
  };

  return (
    <Panel
      className="panel-report"
      left
      reveal
      resizable
      closeByBackdropClick
      backdrop
    >
      <View>
        <Page>
          <div className="panel-header">Menu Báo cáo</div>
          <div className="panel-body">
            <div className="panel-nav">
              <Link
                noLinkClass
                className={`${isCheckActive("/") ? "active" : ""}`}
                onClick={() => onChangeHref("/")}
              >
                <div className="title">Báo cáo ngày</div>
                <div className="desc">Thống kê tổng hợp theo ngày</div>
              </Link>
              <Link noLinkClass>
                <div className="title">Khách hàng</div>
                <div className="desc">Tổng hợp, theo dõi lượng khách hàng</div>
              </Link>
              <Link noLinkClass>
                <div className="title">Bán hàng</div>
                <div className="desc">Thống kê đơn hàng, thu chi đơn hàng</div>
              </Link>
              <Link noLinkClass>
                <div className="title">Dịch vụ</div>
                <div className="desc">Thống kê dịch vụ, thẻ dịch vụ</div>
              </Link>
              <Link noLinkClass>
                <div className="title">Sổ quỷ</div>
                <div className="desc">Tổng hợp, theo dõi sổ quỷ</div>
              </Link>
              <Link noLinkClass>
                <div className="title">Tồn kho</div>
                <div className="desc">Thống kê, theo dõi lượng tồn kho</div>
              </Link>
              <Link noLinkClass>
                <div className="title">Nhân viên</div>
                <div className="desc">Thống kê ca nhân viên</div>
              </Link>
              <Link noLinkClass>
                <div className="title">Chăm sóc khách hàng</div>
                <div className="desc">Thống kê chăm sóc khách hàng</div>
              </Link>
              <Link noLinkClass>
                <div className="title">Công nợ</div>
                <div className="desc">Ghi nợ, đơn nợ còn và hết</div>
              </Link>
              <Link noLinkClass>
                <div className="title">Lợi nhuận</div>
                <div className="desc">Tổng hợp chi phí lợi nhận</div>
              </Link>
            </div>
          </div>
          <div className="panel-footer" onClick={handleStock}>
            <div className="stock-name">
              {nameIsStock ? nameIsStock : "Bạn đang ở điểm ?"}
              <FaChevronDown />
            </div>
            <i className="las la-cog"></i>
          </div>
        </Page>
      </View>
      <SelectStock
        isOpenStock={isOpenStock}
        nameStock={(name) => nameStock(name)}
        isReload={isReload}
      />
    </Panel>
  );
}

export default PanelLeft;
