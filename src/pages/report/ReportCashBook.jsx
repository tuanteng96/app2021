import React from "react";
import {
  Button,
  Link,
  Navbar,
  Page,
  PageContent,
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

export default class ReportCustomer extends React.Component {
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
              <span className="title">Báo cáo sổ quỹ</span>
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
                  Khách hàng
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Hôm nay
                  </div>
                  <div className="fw-600 font-size-sm">50</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Tuần này
                  </div>
                  <div className="fw-600 font-size-sm">120</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Tháng này
                  </div>
                  <div className="fw-600 font-size-sm">500</div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Tổng khách hàng
                  </div>
                  <div className="fw-600 font-size-sm">1250</div>
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
                  Biểu đồ khách hàng theo năm
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
                        src="https://preview.keenthemes.com/metronic8/demo12/assets/media/avatars/300-14.jpg"
                        alt=""
                      />
                    </div>
                    <div className="f--1 px-12px">
                      <div className="text-dark fw-600">Nguyễn Tài Tuấn</div>
                      <div className="fw-500 text-muted font-size-xs">
                        0971.02.11.96 - Khách hàng mới
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
                    Nguyễn Tài Tuấn
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
                    <div className="fw-500 text-gray-700">Số điện thoại</div>
                    <div className="fw-600 text-dark">0971021196</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Ngày tạo</div>
                    <div className="fw-600 text-dark">18:00 25/12/2022</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Cấp bậc</div>
                    <div className="fw-600 text-dark">
                      Khách hàng thân thiết
                    </div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Cơ sở</div>
                    <div className="fw-600 text-dark">Cser Hà Nội</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">
                      Tổng tiền thực chi
                    </div>
                    <div className="fw-600 text-dark">18,000,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Công nợ</div>
                    <div className="fw-600 text-dark">1,000,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Ví</div>
                    <div className="fw-600 text-dark">1,000,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Thẻ tiền</div>
                    <div className="fw-600 text-dark">1,000,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Thẻ bảo hành</div>
                    <div className="fw-600 text-dark">5 Thẻ</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed">
                    <div className="fw-500 text-gray-700">
                      Số buổi DV còn lại / Giá trị
                    </div>
                    <div className="fw-600 text-dark">1 buổi / 1,000,000</div>
                  </div>
                  <div>
                    <div className="fw-500 text-gray-700">
                      Nhân viên phụ trách
                    </div>
                    <div className="fw-600 text-dark">Nguyễn Thị Thu Trang</div>
                  </div>
                </div>
              </PageContent>
            </Sheet>
          </Tab>
        </Tabs>
        <Toolbar tabbar position="bottom">
          <ToolBarBottom />
        </Toolbar>
      </Page>
    );
  }
}
