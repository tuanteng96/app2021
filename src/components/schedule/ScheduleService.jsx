// import React from "react";
// import { Link, ListItem, Toolbar } from "framework7-react";

// const ScheduleService = () => {
//   constructor() {
//     super();
//     this.state = {
//       arrProd: [],
//       activeID: 0,
//       arrProdActive: [],
//     };
//   }
//   componentDidMount() {

//   }

//   serviceSelected = (item) => {
//     this.props.handleService(item);
//     this.setState({
//       activeID: 0,
//     });
//   };

//   handleDataService = (item, data, loading) => {
//     this.setState({
//       activeID: item.OrderItemID,
//     });
//     this.props.handleDataService(item, data, loading);
//   };

//   handleMultiService = (item) => {
//     this.props.handleService(item.length > 0 ? item : null);
//     this.setState({
//       activeID: 0,
//     });
//   };

//   render() {
//     const { activeID } = this.state;
//     return (
//       <div className="page-schedule__box">
//         <div className="service-me">

//         </div>
//       </div>
//     );
//   }
// }

import React, { useEffect, useRef, useState } from "react";
import { Link, ListItem, Toolbar } from "framework7-react";
import { getStockIDStorage, getUser } from "../../constants/user";
import BookDataService from "../../service/book.service";
import InfiniteScroll from "react-infinite-scroll-component";

function ScheduleService({ height, selectedService, handleService }) {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    Ps: 10,
    Pi: 1,
    Key: "",
    Total: 0,
  });
  const [Total, setTotal] = useState(0);
  const [listService, setListService] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function getServices() {
      setLoading(true);
      const StockID = getStockIDStorage() || 0;
      const { ID } = getUser();
      const objFilter = {
        MemberID: ID,
        StockID: StockID,
        ...filters,
      };
      const { data } = await BookDataService.getCardService(objFilter);
      const lst =
        filters.Pi > 1 ? [...new Set([...listService, ...data.lst])] : data.lst;
      setLoading(false);
      setTotal(data.total);
      setListService(lst);
    }
    getServices();
  }, [filters]);

  const fetchMoreData = () => {
    if (listService.length >= Total) {
      setHasMore(false);
      return;
    }
    setFilters({
      ...filters,
      Pi: filters.Pi + 1,
    });
  };
  console.log(selectedService)
  return (
    <div className="page-schedule__box h-100">
      <div className="service-me h-100">
        {listService && listService.length > 0 && (
          <InfiniteScroll
            dataLength={listService.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={listService.length < Total && <div>Đang tải ...</div>}
            height={height}
            // endMessage={
            //   <p style={{ textAlign: "center" }}>
            //     <b>Tổng có {filters.Total} nhân viên</b>
            //   </p>
            // }
          >
            <div className="service-me__list">
              {listService.map((item, index) => (
                <div className={`item ${selectedService.some(service => service.ID === item.ID) && "active"}`} key={index} onClick={() => handleService(item)}>
                  <div className="item-title">
                    {item.Title}
                  </div>
                  <div className="item-desc">
                    {index + 3} buổi liệu trình
                  </div>
                  <i className="las la-check-circle"></i>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default ScheduleService;
