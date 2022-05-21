import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import LoadingChart from "../../../../components/Loading/LoadingChart";

function OverviewCustomerSkt({filters}) {
  return (
    <Fragment>
      <div className="bg-white p-15px mb-15px rounded position-relative zindex-1">
        <div className="text-uppercase text-black fw-600 mb-10px">
          Khách hàng
          <span className="text-none font-size-min fw-400 text-muted pl-3px">
            {filters.StockName}
          </span>
        </div>
        <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
          <div className="text-gray-700 font-size-xs fw-500">Hôm nay</div>
          <div className="fw-600 font-size-sm">
            <Skeleton height={19} width={30} />
          </div>
        </div>
        <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
          <div className="text-gray-700 font-size-xs fw-500">Tuần này</div>
          <div className="fw-600 font-size-sm">
            <Skeleton height={19} width={30} />
          </div>
        </div>
        <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
          <div className="text-gray-700 font-size-xs fw-500">Tháng này</div>
          <div className="fw-600 font-size-sm">
            <Skeleton height={19} width={30} />
          </div>
        </div>
        <div className="d--f jc--sb ai--c pt-8px">
          <div className="text-gray-700 font-size-xs fw-500">
            Tổng khách hàng
          </div>
          <div className="fw-600 font-size-sm">
            <Skeleton height={19} width={30} />
          </div>
        </div>
        <div className="line-report-1"></div>
      </div>
      <div className="bg-white p-15px rounded">
        <div>
          <LoadingChart />
        </div>
        <div className="text-center text-uppercase fw-500 mt-15px">
          Biểu đồ khách hàng theo năm
        </div>
      </div>
    </Fragment>
  );
}

export default OverviewCustomerSkt;
