import React, { Fragment, useState } from "react";
import { Animated } from "react-animated-css";
import PageNoData from "../../../components/PageNoData";
import OverviewCustomerSkt from "../Skeleton/report-customer/OverviewCustomerSkt";
import { Link, PageContent, Sheet, Toolbar } from "framework7-react";

function ListCustomer({ filters, data, loading }) {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [initialValues, setInitialValues] = useState(null)

    const onOpenSheet = (item) => {
        setInitialValues(item);
        setSheetOpen(true);
    }
    const onHideSheet = () => {
        setInitialValues(null);
        setSheetOpen(false);
    }

    return (
        <Animated
            animationIn="fadeInLeft"
            animationOut="fadeOut"
            isVisible={true}
            animationInDuration={500}
        >
            {loading && <OverviewCustomerSkt filters={filters} />}
            {!loading && (
                <Fragment>
                    {data ? (
                        <Fragment>
                            {Array(10)
                                .fill()
                                .map((item, index) => (
                                    <div
                                        className={`d--f ai--c ${index !== 9 ? "pb-12px mb-12px border-bottom-dashed" : ""
                                            }`}
                                        key={index}
                                        onClick={() => onOpenSheet(item)}
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
                        </Fragment>
                    ) : (
                        <PageNoData text="Không có dữ liệu" />
                    )}
                </Fragment>
            )}
            <Sheet
                className="sheet-scroll"
                opened={sheetOpen}
                onSheetClosed={onHideSheet}
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
                            <div className="fw-600 text-dark">Khách hàng thân thiết</div>
                        </div>
                        <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                            <div className="fw-500 text-gray-700">Cơ sở</div>
                            <div className="fw-600 text-dark">Cser Hà Nội</div>
                        </div>
                        <div className="mb-10px pb-10px border-bottom-dashed d--f jc--sb ai--c">
                            <div className="fw-500 text-gray-700">Tổng tiền thực chi</div>
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
                            <div className="fw-500 text-gray-700">Nhân viên phụ trách</div>
                            <div className="fw-600 text-dark">Nguyễn Thị Thu Trang</div>
                        </div>
                    </div>
                </PageContent>
            </Sheet>
        </Animated>
    );
}

export default ListCustomer;
