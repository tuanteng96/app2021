import React, { Fragment } from 'react';
import Skeleton from "react-loading-skeleton";
import ImageBG from "../../../assets/images/profile-img.png";

function SkeletonReportDate(props) {
    return (
      <Fragment>
        <div className="report-welcome bg-white">
          <div className="report-welcome__top">
            <div className="d--f jc--sb">
              <div className="pt-15px pl-15px pr-15px pb-35px">
                <div className="text-primary2 fw-600 font-size-md mb-3px">
                  Xin chào !
                </div>
                <div className="text-primary2 fw-500">Đang tải ...</div>
              </div>
              <div className="img d--f ai--e jc--c">
                <img src={ImageBG}></img>
              </div>
            </div>
            <div className="icon">
              <i className="las la-map-marked-alt text-white"></i>
            </div>
          </div>
        </div>
        <div className="bg-white pt-50px pl-15px pr-15px pb-15px mb-15px rounded">
          <div className="text-uppercase text-black fw-600 mb-10px">
            Thu chi hôm nay
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">Tổng thu</div>
            <div className="fw-600 font-size-sm text-success">
              <i className="las la-arrow-down"></i>{" "}
              <Skeleton height={19} width={80} />
            </div>
          </div>
          <div className="d--f jc--sb ai--c pt-8px">
            <div className="text-gray-700 font-size-xs fw-500">Tổng chi</div>
            <div className="fw-600 font-size-sm text-danger">
              <i className="las la-arrow-up"></i>{" "}
              <Skeleton height={19} width={80} />
            </div>
          </div>
        </div>

        <div className="bg-white p-15px mb-15px rounded position-relative zindex-1">
          <div className="text-uppercase text-black fw-600 mb-10px">
            Khách hàng
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">
              Khách hàng mới
            </div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={30} />
            </div>
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">Đến tại Spa</div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={30} />
            </div>
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">Web / App</div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={30} />
            </div>
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">
              Tổng khách CheckIn
            </div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={30} />
            </div>
          </div>
          <div className="d--f jc--sb ai--c pt-8px">
            <div className="text-gray-700 font-size-xs fw-500">
              Khách đang CheckIn
            </div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={30} />
            </div>
          </div>
          <div className="line-report-1"></div>
        </div>

        <div className="bg-white p-15px mb-15px rounded position-relative zindex-1">
          <div className="text-uppercase text-black fw-600 mb-10px">
            Bán hàng
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">
              Đơn hàng mới
            </div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={30} />
            </div>
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">Doanh số</div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={80} />
            </div>
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">Thanh toán</div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={80} />
            </div>
          </div>
          <div className="d--f jc--sb ai--c pt-8px">
            <div className="text-gray-700 font-size-xs fw-500">
              Thanh toán nợ
            </div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={80} />
            </div>
          </div>
          <div className="line-report-2"></div>
        </div>

        <div className="bg-white p-15px mb-5px rounded position-relative zindex-1">
          <div className="text-uppercase text-black fw-600 mb-10px">
            Dịch vụ
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">Đặt lịch</div>
            <div className="fw-600 font-size-sm">
              <Skeleton height={19} width={30} />
            </div>
          </div>
          <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
            <div className="text-gray-700 font-size-xs fw-500">
              Dịch vụ đang làm
            </div>
            <div className="fw-600 font-size-sm text-warning">
              <Skeleton height={19} width={30} />
            </div>
          </div>
          <div className="d--f jc--sb ai--c pt-8px">
            <div className="text-gray-700 font-size-xs fw-500">
              Dịch vụ hoàn thành
            </div>
            <div className="fw-600 font-size-sm text-success">
              <Skeleton height={19} width={30} />
            </div>
          </div>
          <div className="line-report-3"></div>
        </div>
      </Fragment>
    );
}

export default SkeletonReportDate;