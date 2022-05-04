import { Link, Page, Panel, View } from "framework7-react";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getStockNameStorage } from "../../constants/user";
import SelectStock from "../SelectStock";

const RouterReport = [
  {
    Title: "Báo cáo ngày",
    Desc: "Thống kê tổng hợp theo ngày",
    Href: ["/", "/report/date/"],
  },
  {
    Title: "Khách hàng",
    Desc: "Tổng hợp, theo dõi lượng khách hàng",
    Href: [],
  },
  {
    Title: "Bán hàng",
    Desc: "Thống kê đơn hàng, thu chi đơn hàng",
    Href: [],
  },
  {
    Title: "Dịch vụ",
    Desc: "Thống kê dịch vụ, thẻ dịch vụ",
    Href: [],
  },
  {
    Title: "Sổ quỷ",
    Desc: "Tổng hợp, theo dõi sổ quỷ",
    Href: [],
  },
  {
    Title: "Tồn kho",
    Desc: "Thống kê, theo dõi lượng tồn kho",
    Href: [],
  },
  {
    Title: "Nhân viên",
    Desc: "Thống kê ca nhân viên",
    Href: [],
  },
  {
    Title: "Chăm sóc khách hàng",
    Desc: "Thống kê chăm sóc khách hàng",
    Href: [],
  },
  {
    Title: "Công nợ",
    Desc: "Ghi nợ, đơn nợ còn và hết",
    Href: [],
  },
  {
    Title: "Lợi nhuận",
    Desc: "Tổng hợp chi phí lợi nhận",
    Href: [],
  },
];

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
    if (href.some((item) => item === f7.$f7.views.main.router.url)) {
      f7.$f7.panel.close();
    }
    else {
      f7.$f7.panel.close();
      f7.$f7router.navigate(href[0]);
    }
  };

  const isCheckActive = (href) => {
    return href.some((item) => item === f7.$f7.views.main.router.url);
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
              {RouterReport &&
                RouterReport.map((item, index) => (
                  <Link
                    key={index}
                    noLinkClass
                    className={`${isCheckActive(item.Href) ? "active" : ""}`}
                    onClick={() => onChangeHref(item.Href)}
                  >
                    <div className="title">{item.Title}</div>
                    <div className="desc">{item.Desc}</div>
                  </Link>
                ))}
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
