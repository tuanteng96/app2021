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
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  getTheme,
} from "bizcharts";

const data = [
  { item: "Dịch vụ trị lông", percent: 0.4 },
  { item: "Dịch vụ tắm trắng", percent: 0.21 },
  { item: "Dịch vụ giảm béo", percent: 0.17 },
  { item: "Dịch vụ chăm sóc da", percent: 0.13 },
  { item: "Dịch vụ chăm sóc bầu", percent: 0.09 },
];
const colors = data.reduce((pre, cur, idx) => {
  pre[cur.item] = getTheme().colors10[idx];
  return pre;
}, {});

const cols = {
  percent: {
    formatter: (val) => {
      val = val * 100 + "%";
      return val;
    },
  },
};

export default class ReportServices extends React.Component {
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
              <span className="title">Báo cáo dịch vụ</span>
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
                  Dịch vụ
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Tổng dịch vụ
                  </div>
                  <div className="fw-600 font-size-sm">200</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-primary font-size-xs fw-500">
                    Đang thực hiện
                  </div>
                  <div className="fw-600 font-size-sm">20</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-success font-size-xs fw-500">
                    Đã hoàn thành
                  </div>
                  <div className="fw-600 font-size-sm">77</div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-danger font-size-xs fw-500">
                    Hủy dịch vụ
                  </div>
                  <div className="fw-600 font-size-sm">3</div>
                </div>
              </div>
              <div className="bg-white p-15px rounded">
                <div className="text-center text-uppercase fw-500 mt-15px">
                  Biểu đồ dịch vụ tuần này
                </div>
                <Chart
                  height={400}
                  data={data}
                  scale={cols}
                  interactions={["element-active"]}
                  autoFit
                  //padding={[15, 15, 30, 30]}
                >
                  <Coordinate type="theta" radius={0.75} />
                  <Tooltip showTitle={false} />
                  <Axis visible={false} />
                  <Interval
                    position="percent"
                    adjust="stack"
                    color="item"
                    style={{
                      lineWidth: 1,
                      stroke: "#fff",
                    }}
                    label={[
                      "item",
                      (item) => {
                        return {
                          offset: 20,
                          content: (data) => {
                            return "";
                            //return `${data.item}\n ${data.percent * 100}%`;
                          },
                          style: {
                            fill: colors[item],
                          },
                        };
                      },
                    ]}
                  />
                </Chart>
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
                        src="https://bizweb.dktcdn.net/100/431/926/products/d27a9ccd-1e32-4c43-b0ce-00a37978ddc9.jpg"
                        alt=""
                      />
                    </div>
                    <div className="f--1 px-12px">
                      <div className="text-dark fw-600">
                        #106301 - Dịch vụ triệt lông nách
                      </div>
                      <div className="fw-500 text-muted font-size-xs">
                        Đang sử dụng - 30,000,000
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
                    #106301 - Dịch vụ triệt lông nách
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
                    <div className="fw-500 text-gray-700">Điểm</div>
                    <div className="fw-600 text-dark">Cser Hà Nội</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Dịch vụ gốc</div>
                    <div className="fw-600 text-dark">
                      Dịch vụ triệt lông nách
                    </div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Thẻ liệu trình</div>
                    <div className="fw-600 text-dark">2</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Buổi</div>
                    <div className="fw-600 text-dark">3</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Giá trị</div>
                    <div className="fw-600 text-dark">1,000,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">
                      Nhân viên thực hiện
                    </div>
                    <div className="fw-600 text-dark">Nguyễn Tài Tuấn</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Tổng lương</div>
                    <div className="fw-600 text-dark">80,0000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Trạng thái</div>
                    <div className="fw-600 text-dark">Đang thực hiện</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Đánh giá</div>
                    <div className="fw-600 text-dark">5 Sao</div>
                  </div>
                  <div>
                    <div className="fw-500 text-gray-700">
                      Nội dung đánh giá
                    </div>
                    <div className="mt-10px text-dark">
                      Thực hiện tốt, nhân viên rất có tâm và có tầm. Chăm da cả
                      năm không bằng 1 buổi MESO. Bí quyết sở hữu làn da mịn
                      màng, căng bóng như Diễn viên Hàn Quốc
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
