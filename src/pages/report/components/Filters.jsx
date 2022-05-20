import React, { useEffect, useState } from "react";
import { ListInput, Sheet } from "framework7-react";
import { Formik, Form } from "formik";
import userService from "../../../service/user.service";

function Filters({ loading, show, onHide, filters, onSubmit, options }) {
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
      className="sheet-swipe-product sheet-swipe-employee"
      style={{ height: "auto", "--f7-sheet-bg-color": "#fff" }}
      opened={show}
      onSheetClosed={onHide}
      swipeToClose
      swipeToStep
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
                <div className="sheet-swipe-product__content">
                  <div className="sheet-pay-body">
                    <div className="sheet-pay-body__form">
                      <ul>
                        <ListInput
                          label="Cơ sở kinh doanh"
                          type="select"
                          value={values.StockID}
                          name="StockID"
                          placeholder="Chọn cơ sở..."
                          onChange={(event) => {
                            setFieldValue("StockID",event.target.value, false);
                            if (event.target.value) {
                              const StockName =
                                ListStock &&
                                ListStock.filter(
                                  (item) =>
                                    item.ID === Number(event.target.value)
                                )[0].Title;
                              setFieldValue("StockName", StockName, false);
                            }
                            else {
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
                        <ListInput
                          label="Chọn ngày"
                          type="datepicker"
                          placeholder={`${
                            options.rangePicker
                              ? "Ngày bắt đầu - Ngày kết thúc"
                              : "Chọn ngày"
                          }`}
                          value={values.Date}
                          readonly
                          calendarParams={{
                            ...options,
                          }}
                          clearButton
                          onCalendarChange={(data) =>
                            setFieldValue("Date", data, false)
                          }
                          onInputClear={() => setFieldValue("Date", [], false)}
                        />
                      </ul>
                    </div>
                    <div className="sheet-pay-body__btn">
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
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Sheet>
  );
}

export default Filters;
