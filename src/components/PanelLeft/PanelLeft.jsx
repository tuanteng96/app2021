import Dom7 from "dom7";
import {
  AccordionContent,
  Link,
  List,
  ListItem,
  Page,
  Panel,
  View,
} from "framework7-react";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getStockNameStorage } from "../../constants/user";
import SelectStock from "../SelectStock";

const RouterReport = [
  {
    Title: "Báo cáo ngày",
    Desc: "Thống kê tổng hợp theo ngày",
    Href: "/report/date/",
  },
  {
    Title: "Khách hàng",
    Desc: "Tổng hợp, theo dõi lượng khách hàng",
    Href: "/report/customer/",
  },
  {
    Title: "Bán hàng",
    Desc: "Thống kê đơn hàng, thu chi đơn hàng",
    Href: "#",
    Children: [
      {
        Title: "Doanh số",
        Href: "/report/sell/",
      },
      {
        Title: "Chi tiết SP / DV bán ra",
        Href: "/",
      },
      {
        Title: "Thanh toán nợ",
        Href: "/",
      },
      {
        Title: "Trả hàng",
        Href: "/",
      },
    ],
  },
  {
    Title: "Dịch vụ",
    Desc: "Thống kê dịch vụ, thẻ dịch vụ",
    Href: "/report/services/",
  },
  // {
  //   Title: "Thu chi",
  //   Desc: "Lịch sử giao dịch thu chi",
  //   Href: "/report/monthly/",
  // },
  {
    Title: "Sổ quỹ",
    Desc: "Tổng hợp, theo dõi sổ quỹ",
    Href: "/report/cash-book/",
  },
  {
    Title: "Tồn kho",
    Desc: "Thống kê, theo dõi lượng tồn kho",
    Href: "/",
  },
  {
    Title: "Nhân viên",
    Desc: "Thống kê ca nhân viên",
    Href: "/",
    Children: [
      {
        Title: "Hoa hồng",
        Href: "/",
      },
      {
        Title: "Doanh số",
        Href: "/",
      },
      {
        Title: "Bảng lương",
        Href: "/",
      },
    ],
  },
  {
    Title: "Công nợ",
    Desc: "Thống kê công nợ",
    Href: "/",
    Children: [
      {
        Title: "Công nợ",
        Href: "/",
      },
      {
        Title: "Báo cáo khóa nợ",
        Href: "/",
      },
    ],
  },
  {
    Title: "Chăm sóc khách hàng",
    Desc: "Thống kê chăm sóc khách hàng",
    Href: "/",
    Children: [
      {
        Title: "Khách hàng sử dụng APP",
        Href: "/",
      },
      {
        Title: "Khách hàng sinh nhật",
        Href: "/",
      },
      {
        Title: "Khách hàng sắp lên cấp",
        Href: "/",
      },
      {
        Title: "Khách gần hết sản phẩm",
        Href: "/",
      },
      {
        Title: "Khách hàng sử dụng APP",
        Href: "/",
      },
      {
        Title: "Khách lâu không sử dụng dịch vụ",
        Href: "/",
      },
      {
        Title: "Khách hết thẻ trong ngày",
        Href: "/",
      },
      {
        Title: "Thời gian nghe Smart Call",
        Href: "/",
      },
      {
        Title: "Đánh giá dịch vụ",
        Href: "/",
      },
    ],
  },
  {
    Title: "Báo cáo khác",
    Desc: "Các loại báo cáo khác",
    Href: "/",
    Children: [
      {
        Title: "Top bán hàng",
        Href: "/",
      },
      {
        Title: "Top doanh số",
        Href: "/",
      },
      {
        Title: "Dịch vụ đã bán nhưng chưa thực hiện",
        Href: "/",
      },
      {
        Title: "Tổng tiền ví của khách hàng đang có",
        Href: "/",
      },
      {
        Title: "Tổng thẻ tiền của khách hàng đang có",
        Href: "/",
      },
      {
        Title: "Lợi nhuận",
        Href: "/",
      },
    ],
  },
];

function PanelLeft() {
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
            <div className="panel-nav nav-report">
              <List accordionList>
                {RouterReport &&
                  RouterReport.map((item, index) => (
                    <ListItem
                      className="item-1"
                      key={index}
                      link={item.Children ? "#" : item.Href}
                      view="#main-view"
                      panelClose={!item.Children ? true : false}
                      reloadAll={!item.Children ? true : false}
                      accordionItem={item.Children ? true : false}
                      header={item.Title}
                      footer={item.Desc}
                    >
                      {item.Children && (
                        <AccordionContent>
                          {item.Children &&
                            item.Children.map((sub, idx) => (
                              <ListItem
                                className="item-2"
                                view="#main-view"
                                key={idx}
                                title={`${idx + 1}. ${sub.Title}`}
                                link={sub.Href}
                                panelClose
                                reloadAll
                              ></ListItem>
                            ))}
                        </AccordionContent>
                      )}
                    </ListItem>
                  ))}
              </List>
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
