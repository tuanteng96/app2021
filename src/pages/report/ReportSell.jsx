import React from "react";
import {
  Button,
  Link,
  List,
  ListItem,
  Navbar,
  Page,
  PageContent,
  Popover,
  Segmented,
  Sheet,
  Subnavbar,
  Tab,
  Tabs,
  Toolbar,
} from "framework7-react";
import ToolBarBottom from "../../components/ToolBarBottom";
import NotificationIcon from "../../components/NotificationIcon";
import PageNoData from "../../components/PageNoData";

import { Chart, Interval, Tooltip } from "bizcharts";

const data = [
  { year: "T1", KH: 30 },
  { year: "T2", KH: 50 },
  { year: "T3", KH: 61 },
  { year: "T4", KH: 45 },
  { year: "T5", KH: 48 },
  { year: "T6", KH: 90 },
  { year: "T7", KH: 200 },
  { year: "T8", KH: 182 },
  { year: "T9", KH: 90 },
  { year: "T10", KH: 250 },
  { year: "T11", KH: 123 },
  { year: "T12", KH: 189 },
];

export default class ReportSell extends React.Component {
  constructor() {
    super();
    this.state = { sheetOpened: false, initialValues: null };
  }

  componentDidMount() {}

  onOpenSheet = (item) => {
    this.setState({
      sheetOpened: true,
      initialValues: item,
    });
  };

  onHideSheet = () => {
    this.setState({
      sheetOpened: false,
      initialValues: null,
    });
  };

  render() {
    const { initialValues, sheetOpened } = this.state;
    return (
      <Page name="employee-service">
        <Navbar>
          <div className="page-navbar">
            <div className="page-navbar__back">
              <Link onClick={() => this.$f7.panel.toggle()}>
                <i className="las la-bars font-size-xl"></i>
              </Link>
            </div>
            <div className="page-navbar__title">
              <span className="title">Báo cáo bán hàng</span>
            </div>
            <div className="page-navbar__noti">
              <NotificationIcon />
            </div>
          </div>
          <Subnavbar>
            <Segmented raised>
              <Button tabLink="#overview" tabLinkActive>
                Tổng quan
              </Button>
              <Button tabLink="#list">Danh sách</Button>
            </Segmented>
          </Subnavbar>
        </Navbar>
        <Tabs animated>
          <Tab id="overview" className="overflow-auto" tabActive>
            <div className="page-render">
              <div className="bg-white p-15px mb-15px rounded">
                <div className="text-uppercase text-black fw-600 mb-10px">
                  Báo cáo doanh số
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Hôm nay
                  </div>
                  <div className="fw-600 font-size-sm">18,000,000</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Thanh toán TM / CK / QT
                  </div>
                  <div className="fw-600 font-size-sm">
                    <Link
                      className="text-dark d--f ai--c"
                      //noLinkClass
                      popoverOpen=".popover-detail"
                    >
                      <i className="las la-question-circle font-size-md"></i>
                      <span className="line-height-xs m-0">1,000,000</span>
                    </Link>
                  </div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Thanh toán từ thẻ tiền
                  </div>
                  <div className="fw-600 font-size-sm">2,000,000</div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Nợ phát sinh trong ngày
                  </div>
                  <div className="fw-600 font-size-sm">15,000,000</div>
                </div>
              </div>

              <div className="bg-white p-15px mb-15px rounded">
                <div className="text-uppercase text-black fw-600 mb-10px">
                  Sản phẩm / Nguyên vật liệu
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Kem dưỡng da
                  </div>
                  <div className="fw-600 font-size-sm">2</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Serum dưỡng da
                  </div>
                  <div className="fw-600 font-size-sm">25</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Nguyên vật liệu 1
                  </div>
                  <div className="fw-600 font-size-sm">1</div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Nguyên vật liệu 2
                  </div>
                  <div className="fw-600 font-size-sm">2</div>
                </div>
              </div>

              <div className="bg-white p-15px mb-15px rounded">
                <div className="text-uppercase text-black fw-600 mb-10px">
                  Dịch vụ / Phụ phí
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Thẻ 10 buổi chăm sóc da
                  </div>
                  <div className="fw-600 font-size-sm">1</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Thẻ 12 buổi trị nám
                  </div>
                  <div className="fw-600 font-size-sm">1</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Phụ phí 1
                  </div>
                  <div className="fw-600 font-size-sm">1</div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Phụ phí 2
                  </div>
                  <div className="fw-600 font-size-sm">2</div>
                </div>
              </div>

              <div className="bg-white p-15px mb-15px rounded">
                <div className="text-uppercase text-black fw-600 mb-10px">
                  Thẻ tiền
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Thẻ tiền 500,000
                  </div>
                  <div className="fw-600 font-size-sm">1</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Thẻ tiền 2,000,000
                  </div>
                  <div className="fw-600 font-size-sm">1</div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Thẻ tiền 10,000,000
                  </div>
                  <div className="fw-600 font-size-sm">2</div>
                </div>
              </div>

              <div className="bg-white p-15px rounded">
                <Chart
                  height={400}
                  autoFit
                  data={data}
                  interactions={["active-region"]}
                  padding={[15, 15, 30, 30]}
                >
                  <Interval position="year*KH" />
                  <Tooltip shared />
                </Chart>
                <div className="text-center text-uppercase fw-500 mt-15px">
                  Biểu đồ doanh số theo năm
                </div>
              </div>
              {/* <PageNoData text="Đang cập nhập ..." /> */}
            </div>
          </Tab>
          <Tab id="list" className="bg-white overflow-auto">
            <div className="page-render">
              {Array(10)
                .fill()
                .map((item, index) => (
                  <div
                    className={`d--f ai--c ${
                      index !== 9 ? "pb-12px mb-12px border-bottom-dashed" : ""
                    }`}
                    key={index}
                    onClick={() => this.onOpenSheet(index)}
                  >
                    <div className="w-40px h-40px rounded d--f ai--c jc--c bg-light fw-600 overflow-hidden">
                      <img
                        className="w-100"
                        src="https://preview.keenthemes.com/metronic8/demo1/assets/media/stock/ecommerce/4.gif"
                        alt=""
                      />
                    </div>
                    <div className="f--1 px-12px">
                      <div className="text-dark fw-600">
                        #106301 - Cser Hà Nội
                      </div>
                      <div className="fw-500 text-muted font-size-xs">
                        Tổng đơn hàng 1,300,000
                      </div>
                    </div>
                    <div>
                      <button className="btn svg-icon svg-icon-2 text-svg w-30px h-30px rounded bg-light shadows">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            opacity="0.5"
                            x={18}
                            y={13}
                            width={13}
                            height={2}
                            rx={1}
                            transform="rotate(-180 18 13)"
                            fill="currentColor"
                          />
                          <path
                            d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <Sheet
              className="sheet-scroll"
              opened={sheetOpened}
              onSheetClosed={this.onHideSheet}
              swipeToClose
              backdrop
            >
              <Toolbar>
                <div className="px-15px w-100 d--f ai--c jc--sb">
                  <div className="left line-height-xs text-uppercase fw-500 font-size-md">
                    #106301 - Cser Hà Nội
                  </div>
                  <div className="right">
                    <Link sheetClose>
                      <i className="las la-times"></i>
                    </Link>
                  </div>
                </div>
              </Toolbar>
              <PageContent className="bg-white">
                <div className="p-15px">
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Ngày</div>
                    <div className="fw-600 text-dark">22:30 02/11/2022</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Thành tiền</div>
                    <div className="fw-600 text-dark">1,300,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Voucher</div>
                    <div className="fw-600 text-dark">4VH5U</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Giảm giá</div>
                    <div className="fw-600 text-dark">3%</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Tổng tiền</div>
                    <div className="fw-600 text-dark">1,300,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Thanh toán</div>
                    <div className="fw-600 text-dark">1,000,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Còn nợ</div>
                    <div className="fw-600 text-dark">300,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Khách hàng</div>
                    <div className="fw-600 text-dark">Nguyễn Tài Tuấn</div>
                  </div>
                  <div>
                    <div className="fw-500 text-gray-700">
                      Chi tiết đơn hàng
                    </div>
                    <div className="mt-15px">
                      <div className="d--f ai--c mt-10px">
                        <div className="w-35px border rounded">
                          <img
                            src="https://preview.keenthemes.com/metronic8/demo1/assets/media/stock/ecommerce/6.gif"
                            alt=""
                          />
                        </div>
                        <div className="f--1 pl-10px">
                          <div className="fw-500">Lọ trị mụn - #102301</div>
                          <div className="font-size-xs">500,000 x 2</div>
                        </div>
                      </div>
                      <div className="d--f ai--c mt-10px">
                        <div className="w-35px border rounded">
                          <img
                            src="https://preview.keenthemes.com/metronic8/demo1/assets/media/stock/ecommerce/6.gif"
                            alt=""
                          />
                        </div>
                        <div className="f--1 pl-10px">
                          <div className="fw-500">
                            Lọ trị Nám tàn nhan - #102301
                          </div>
                          <div className="font-size-xs">500,000 x 3</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PageContent>
            </Sheet>
          </Tab>
        </Tabs>
        <Popover className="popover-detail">
          <div className="py-10px">
            <div className="pb-10px mb-10px border-bottom px-15px d--f jc--sb">
              <div className="text-gray-700 font-size-xs fw-500">Tiền mặt</div>
              <div className="fw-600 font-size-sm">10,000,000</div>
            </div>
            <div className="pb-10px mb-10px border-bottom px-15px d--f jc--sb">
              <div className="text-gray-700 font-size-xs fw-500">
                Chuyển khoản
              </div>
              <div className="fw-600 font-size-sm">5,000,000</div>
            </div>
            <div className="px-15px d--f jc--sb">
              <div className="text-gray-700 font-size-xs fw-500">Quẹt thẻ</div>
              <div className="fw-600 font-size-sm">3,000,000</div>
            </div>
          </div>
        </Popover>
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
