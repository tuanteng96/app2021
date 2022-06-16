import React, { useEffect } from "react";
import UserService from "../../../../../service/user.service";

import "moment/locale/vi";
import moment from "moment";
moment.locale("vi");

function Products({ MemberID }) {
  useEffect(() => {
    getListHistory();
  }, [MemberID]);

  const getListHistory = () => {
    UserService.getListTagService(MemberID, 0)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="h-100 p-15px bs-bb">
      <div className="list-em-history">
        <div className="item">
          <div className="text-uppercase fw-600">
            Ngày {moment().format("ll")}
          </div>
          <div className="item-lst">
            <div className="item-lst_sub d-flex justify-content-between align-items-center mt-0 border-bottom py-8px rounded-0">
              <div className="service-name fw-500 pr-20px">
                Chăm sóc da kem nền
              </div>
              <div className="staff fw-500">x5</div>
            </div>
            <div className="item-lst_sub d-flex justify-content-between align-items-center mt-0 border-bottom py-8px rounded-0">
              <div className="service-name fw-500 pr-20px">
                Chăm sóc da kem nền
              </div>
              <div className="staff fw-500">x8</div>
            </div>
            <div className="item-lst_sub d-flex justify-content-between align-items-center mt-0 border-bottom py-8px rounded-0">
              <div className="service-name fw-500 pr-20px">
                Chăm sóc da kem nền
              </div>
              <div className="staff fw-500">x8</div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="text-uppercase fw-600">
            Ngày {moment().format("ll")}
          </div>
          <div className="item-lst">
            <div className="item-lst_sub d-flex justify-content-between align-items-center mt-0 border-bottom py-8px rounded-0">
              <div className="service-name fw-500 pr-20px">
                Chăm sóc da kem nền
              </div>
              <div className="staff fw-500">x5</div>
            </div>
            <div className="item-lst_sub d-flex justify-content-between align-items-center mt-0 border-bottom py-8px rounded-0">
              <div className="service-name fw-500 pr-20px">
                Chăm sóc da kem nền
              </div>
              <div className="staff fw-500">x8</div>
            </div>
            <div className="item-lst_sub d-flex justify-content-between align-items-center mt-0 border-bottom py-8px rounded-0">
              <div className="service-name fw-500 pr-20px">
                Chăm sóc da kem nền
              </div>
              <div className="staff fw-500">x8</div>
            </div>
            <div className="item-lst_sub d-flex justify-content-between align-items-center mt-0 border-bottom py-8px rounded-0">
              <div className="service-name fw-500 pr-20px">
                Chăm sóc da kem nền
              </div>
              <div className="staff fw-500">x5</div>
            </div>
            <div className="item-lst_sub d-flex justify-content-between align-items-center mt-0 border-bottom py-8px rounded-0">
              <div className="service-name fw-500 pr-20px">
                Chăm sóc da kem nền
              </div>
              <div className="staff fw-500">x8</div>
            </div>
            <div className="item-lst_sub d-flex justify-content-between align-items-center mt-0 border-bottom py-8px rounded-0">
              <div className="service-name fw-500 pr-20px">
                Chăm sóc da kem nền
              </div>
              <div className="staff fw-500">x8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
