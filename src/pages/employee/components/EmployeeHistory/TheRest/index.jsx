import React, { Fragment, useEffect, useState } from "react";
import UserService from "../../../../../service/user.service";

import "moment/locale/vi";
import moment from "moment";
import { groupbyDDHHMM } from "../../../../../constants/format";
import PageNoData from "../../../../../components/PageNoData";
import LoadingChart from "../../../../../components/Loading/LoadingChart";
moment.locale("vi");

function TheRest({ MemberID }) {
  const [ListData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListHistory();
  }, [MemberID]);

  const getListHistory = (isLoading = true) => {
    isLoading && setLoading(true);
    UserService.getListTagService(MemberID, 0)
      .then(({ data }) => {
        const newData = [];
        for (let item of data) {
          if (item.TabIndex < 2) {
            let nearestDate = null;
            item.Services &&
              item.Services.filter((service) => service.Status === "done").map(
                ({ BookDate }) => {
                  if (!nearestDate) {
                    nearestDate = BookDate;
                  }

                  let diff = moment(BookDate).diff(
                    moment(nearestDate),
                    "minutes"
                  );

                  if (diff > 0) {
                    nearestDate = BookDate;
                  }
                }
              );

            item.Services =
              item.Services &&
              item.Services.filter((service) => service.Status !== "done");

            item.LastSession = nearestDate;
            newData.push(item);
          }
        }
        setListData(newData);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    };
    
  return (
    <div className="min-h-100 p-15px bs-bb">
      {loading && <LoadingChart />}
      {!loading && (
        <Fragment>
          {ListData && ListData.length > 0 ? (
            <div className="list-em-history">
              {ListData.map((item, index) => (
                <div className="bg-white rounded mb-15px p-15px" key={index}>
                  <div className="text-uppercase fw-600 mb-5px">
                    {item.OrderItem.ProdTitle} ({item.Title})
                  </div>
                  <div className="mb-3px">
                    Số buổi còn{" "}
                    {item.TabIndex === 1 ? (
                      <span className="text-danger fw-500">Thẻ bảo hành</span>
                    ) : (
                      <>
                        <span className="text-danger fw-500">
                          {item.Services.length}
                        </span>{" "}
                        buổi
                      </>
                    )}
                  </div>
                  <div>
                    Buổi gần nhất{" "}
                    {item.LastSession
                      ? moment(item.LastSession).format("HH:mm DD-MM-YYYY")
                      : "Chưa thực hiện"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <PageNoData />
          )}
        </Fragment>
      )}
    </div>
  );
}

export default TheRest;
