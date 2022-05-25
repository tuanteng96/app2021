import React, { useEffect, useState } from "react";
import { Link, ListInput, Sheet, Toolbar } from "framework7-react";
import { Formik, Form } from "formik";
import userService from "../../../service/user.service";
import AsyncSelectStaffs from "../../../components/Selects/AsyncSelectStaffs";
import AsyncSelectGroupsCustomer from "../../../components/Selects/AsyncSelectGroupsCustomer";
import AsyncSelectSource from "../../../components/Selects/AsyncSelectSource";
import AsyncSelectProvinces from "../../../components/Selects/AsyncSelectProvinces";
import AsyncSelectDistrics from "../../../components/Selects/AsyncSelectDistrics";

function FiltersList({ loading, show, onHide, filters, onSubmit, options }) {
  const [first, setFirst] = useState(0);
  const [ListStock, setListStock] = useState([]);

  useEffect(() => {
    setFirst(first + 1);
  }, [show]);

  useEffect(() => {
    if (first === 2 && show) {
      async function fetchStockList() {
        let { data } = await userService.getStock();
        setListStock([
          { ID: "", Title: "Tất cả cơ sở" },
          ...data.data.all.filter((item) => item.ID !== 778),
        ]);
      }
      fetchStockList();
    }
  }, [first, show]);

  return (
    <Sheet
      className="sheet-filters"
      opened={show}
      onSheetClosed={onHide}
      // swipeToClose
      // swipeToStep
      backdrop
    >
      <Formik
        initialValues={filters}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formikProps) => {
          const {
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
          } = formikProps;
          return (
            <Form>
              <div className="sheet-modal-swipe-step">
                <div className="sheet-modal-swipe__close"></div>
                <Link className="sheet-icon-close" sheetClose>
                  <i className="las la-times"></i>
                </Link>
                <div className="sheet-body">
                  <ul>
                    <ListInput
                      label="Cơ sở kinh doanh"
                      type="select"
                      value={values.StockID}
                      name="StockID"
                      placeholder="Chọn cơ sở..."
                      onChange={(event) => {
                        setFieldValue("StockID", event.target.value, false);
                        if (event.target.value) {
                          const StockName =
                            ListStock &&
                            ListStock.filter(
                              (item) => item.ID === Number(event.target.value)
                            )[0].Title;
                          setFieldValue("StockName", StockName, false);
                        } else {
                          setFieldValue("StockName", "Tất cả cơ sở", false);
                        }
                      }}
                      onBlur={handleBlur}
                    >
                      {ListStock &&
                        ListStock.map((item, index) => (
                          <option value={item.ID} key={index}>
                            {item.Title}
                          </option>
                        ))}
                    </ListInput>
                    {"DateStart" in values && (
                      <ListInput
                        label="Ngày bắt đầu"
                        type="datepicker"
                        placeholder="Ngày bắt đầu"
                        value={values.DateStart}
                        readonly
                        calendarParams={{
                          ...options,
                        }}
                        clearButton
                        onCalendarChange={(data) =>
                          setFieldValue("DateStart", data, false)
                        }
                        onInputClear={() =>
                          setFieldValue("DateStart", [], false)
                        }
                      />
                    )}
                    {"DateEnd" in values && (
                      <ListInput
                        label="Ngày kết thúc"
                        type="datepicker"
                        placeholder={`${
                          options.rangePicker
                            ? "Ngày bắt đầu - Ngày kết thúc"
                            : "Ngày kết thúc"
                        }`}
                        value={values.DateEnd}
                        readonly
                        calendarParams={{
                          ...options,
                        }}
                        clearButton
                        onCalendarChange={(data) =>
                          setFieldValue("DateEnd", data, false)
                        }
                        onInputClear={() => setFieldValue("DateEnd", [], false)}
                      />
                    )}
                    {"StaffID" in values && (
                      <div className="form-group mb-20px">
                        <label>Nhân viên</label>
                        <AsyncSelectStaffs
                          name="StaffID"
                          onChange={(otp) => {
                            setFieldValue("StaffID", otp, false);
                          }}
                          is
                        />
                      </div>
                    )}
                    {"GroupCustomerID" in values && (
                      <div className="form-group mb-20px">
                        <label>Nhóm khách hàng</label>
                        <AsyncSelectGroupsCustomer
                          //menuPosition="fixed"
                          name="GroupCustomerID"
                          onChange={(otp) =>
                            setFieldValue("GroupCustomerID", otp, false)
                          }
                        />
                      </div>
                    )}
                    {"SourceName" in values && (
                      <div className="form-group mb-20px">
                        <label>Nguồn khách hàng</label>
                        <AsyncSelectSource
                          menuPlacement="top"
                          name="SourceName"
                          onChange={(otp) => {
                            setFieldValue("SourceName", otp, false);
                          }}
                        />
                      </div>
                    )}
                    {"ProvincesID" in values && (
                      <div className="form-group mb-20px">
                        <label>Tỉnh / Thành Phố</label>
                        <AsyncSelectProvinces
                          menuPlacement="top"
                          name="ProvincesID"
                          value={values.ProvincesID}
                          onChange={(otp) => {
                            setFieldValue("ProvincesID", otp, false);
                            setFieldValue("DistrictsID", "", false);
                          }}
                        />
                      </div>
                    )}
                    {"DistrictsID" in values && (
                      <div className="form-group">
                        <label>Quận / Huyện</label>
                        <AsyncSelectDistrics
                          menuPlacement="top"
                          key={values.ProvincesID?.value}
                          ProvincesID={values.ProvincesID?.value}
                          name="DistrictsID"
                          value={values.DistrictsID}
                          onChange={(otp) =>
                            setFieldValue("DistrictsID", otp, false)
                          }
                        />
                      </div>
                    )}
                  </ul>
                </div>
                <div className="sheet-footer">
                  <button
                    type="submit"
                    className={`page-btn-order btn-submit-order ${
                      loading && "loading"
                    }`}
                    disabled={loading}
                  >
                    <span>Lọc kết quả</span>
                    <div className="loading-icon">
                      <div className="loading-icon__item item-1"></div>
                      <div className="loading-icon__item item-2"></div>
                      <div className="loading-icon__item item-3"></div>
                      <div className="loading-icon__item item-4"></div>
                    </div>
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Sheet>
  );
}

export default FiltersList;
