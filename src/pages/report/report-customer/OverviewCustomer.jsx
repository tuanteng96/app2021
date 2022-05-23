import React, { Fragment } from "react";
import { Chart, Interval, Tooltip } from "bizcharts";
import { Animated } from "react-animated-css";
import PageNoData from "../../../components/PageNoData";
import OverviewCustomerSkt from "../Skeleton/report-customer/OverviewCustomerSkt";

function OverviewCustomer({ filters, data, loading }) {
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
          <div className="bg-white p-15px mb-15px rounded position-relative zindex-1">
            <div className="text-uppercase text-black fw-600 mb-10px">
              Khách hàng{" "}
              <span className="text-none font-size-min fw-400 text-muted">
                {filters.StockName}
              </span>
            </div>
            <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
              <div className="text-gray-700 font-size-xs fw-500">
                Hôm nay
              </div>
              <div className="fw-600 font-size-sm">
                <span className="text-none font-size-min fw-400 text-muted pr-3px">
                  Online {data?.Today_Onl || 0} /
                </span>
                {data?.Today || 0}
              </div>
            </div>
            <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
              <div className="text-gray-700 font-size-xs fw-500">
                Tuần này
              </div>
              <div className="fw-600 font-size-sm">
                <span className="text-none font-size-min fw-400 text-muted pr-3px">
                  Online {data?.ThisWeek_Onl || 0} /
                </span>
                {data?.ThisWeek || 0}
              </div>
            </div>
            <div className="border-bottom-dashed d--f jc--sb ai--c py-8px">
              <div className="text-gray-700 font-size-xs fw-500">
                Tháng này
              </div>
              <div className="fw-600 font-size-sm">
                <span className="text-none font-size-min fw-400 text-muted pr-3px">
                  Online {data?.ThisMonth_Onl || 0} /
                </span>
                {data?.ThisMonth || 0}
              </div>
            </div>
            <div className="d--f jc--sb ai--c pt-8px">
              <div className="text-gray-700 font-size-xs fw-500">
                Tổng khách hàng
              </div>
              <div className="fw-600 font-size-sm">
                <span className="text-none font-size-min fw-400 text-muted pr-3px">
                  Online {data?.TSo_Onl || 0} /
                </span>
                {data?.TSo || []}
              </div>
            </div>
            <div className="line-report-1"></div>
          </div>
          <div className="bg-white p-15px rounded">
            <Chart
              height={400}
              autoFit
              data={data?.SoKHs_ByMonth_ThisYear || []}
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
        </Fragment>
      )}
    </Animated>
  );
}

export default OverviewCustomer;
