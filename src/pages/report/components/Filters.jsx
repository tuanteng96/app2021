import React, { useEffect, useState } from "react";
import { ListInput, Sheet } from "framework7-react";
import { Formik, Form } from "formik";
import userService from "../../../service/user.service";

function Filters({ loading, show, onHide, filters, onSubmit }) {
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
          { ID: -1, Title: "Tất cả cơ sở" },
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
                          onChange={handleChange}
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
                          placeholder="Ngày bắt đầu - Ngày kết thúc"
                          value={values.Date}
                          readonly
                          calendarParams={{
                            dateFormat: "dd/mm/yyyy",
                            rangePicker: true,
                            footer: true,
                            toolbarCloseText: "Xác nhận",
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
