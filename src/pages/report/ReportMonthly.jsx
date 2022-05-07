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
  G2,
  Chart,
  Axis,
  Tooltip,
  Point,
  Interval,
} from "bizcharts";

var data = [
  {
    name: "Đầu kì",
    vote: 35654,
  },
  {
    name: "Thu",
    vote: 65456,
  },
  {
    name: "Chi",
    vote: 45724,
  },
  {
    name: "Cuối kì",
    vote: 13654,
  },
];
var imageMap = {
  John: "https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png",
  Damon: "https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png",
  Patrick: "https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png",
  Mark: "https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png",
};
const scale = {
  vote: {
    min: 0,
  },
};


export default class ReportMonthly extends React.Component {
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
              <span className="title">Báo cáo thu chi</span>
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
                  Thu chi ngày
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Đầu kì
                  </div>
                  <div className="fw-600 font-size-sm">18,000,000</div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">Thu</div>
                  <div className="fw-600 font-size-sm text-success">
                    <i className="las la-arrow-down"></i> 2,000,000
                  </div>
                </div>
                <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
                  <div className="text-gray-700 font-size-xs fw-500">Chi</div>
                  <div className="fw-600 font-size-sm text-danger">
                    <i className="las la-arrow-up"></i> 2,000,000
                  </div>
                </div>
                <div className="d--f jc--sb ai--c pt-8px">
                  <div className="text-gray-700 font-size-xs fw-500">
                    Cuối kì
                  </div>
                  <div className="fw-600 font-size-sm">15,000,000</div>
                </div>
              </div>

              <div className="bg-white p-15px rounded">
                <div className="text-center text-uppercase fw-500 mt-15px">
                  Biểu đồ thu chi theo tuần
                </div>
                <Chart
                  data={data}
                  padding={[50, 0, 70, 0]}
                  scale={scale}
                  autoFit
                  height={600}
                >
                  <Axis
                    name="vote"
                    labels={null}
                    title={null}
                    line={null}
                    tickLine={null}
                  />
                  <Interval
                    position="name*vote"
                    color={[
                      "name",
                      ["#7f8da9", "#fec514", "#db4c3c", "#daf0fd"],
                    ]}
                  />
                  <Tooltip />
                  <Point
                    position="name*vote"
                    size={60}
                    shape={[
                      "name",
                      function (name) {
                        return ["image", imageMap[name]];
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
                      {index % 2 == 0 ? (
                        <i className="las la-arrow-up font-size-xl text-danger"></i>
                      ) : (
                        <i className="las la-arrow-down font-size-xl text-success"></i>
                      )}
                    </div>
                    <div className="f--1 px-12px">
                      <div className="text-dark fw-600 text-truncate">
                        #106301 - Thu 300,000 - Cser Hà Nội
                      </div>
                      <div className="fw-500 text-muted font-size-xs text-truncate">
                        Thu phí mua sản phẩm phụ kèm dịch vụ trị mụn
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
                  <div className="left line-height-xs text-uppercase fw-500 font-size-md text-truncate">
                    #106301 - Thu 300,000
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
                    <div className="fw-500 text-gray-700">Điểm</div>
                    <div className="fw-600 text-dark">Cser Hà Nội</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Số tiền</div>
                    <div className="fw-600 text-dark">1,300,000</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Phương thức</div>
                    <div className="fw-600 text-dark">Chuyển khoản</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Nhân viên tạo</div>
                    <div className="fw-600 text-dark">Nguyễn Tài Tuấn</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Loại</div>
                    <div className="fw-600 text-dark">Thu đơn hàng</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Khách hàng</div>
                    <div className="fw-600 text-dark">Nguyễn Tài Tuấn</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Đơn hàng</div>
                    <div className="fw-600 text-dark">#301222</div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed">
                    <div className="fw-500 text-gray-700">
                      Nội dung đơn hàng
                    </div>
                    <div className="text-dark mt-2px">
                      Đơn hàng mua cái gì đó.
                    </div>
                  </div>
                  <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                    <div className="fw-500 text-gray-700">Nhân viên nhận</div>
                    <div className="fw-600 text-dark">Nguyễn Tài Tuấn</div>
                  </div>
                  <div>
                    <div className="fw-500 text-gray-700">Ghi chú</div>
                    <div className="text-dark mt-2px">Không có ghi chú</div>
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
