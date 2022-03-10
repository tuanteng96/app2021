import { Link } from "framework7-react";
import React, { useState } from "react";
import { checkSale, formatPriceVietnamese } from "../../constants/format";

function ShopListServiceItem({ item }) {
  const [itemShow, setItemShow] = useState(3);
  return (
    <div className="service-about__list">
      <ul>
        {item.items &&
          item.items.slice(0, itemShow).map((subitem) => (
            <li key={subitem.ID}>
              <Link href={"/shop/detail/" + subitem.ID}>
                <div className="title">{subitem.Title}</div>
                <div
                  className={
                    "price " +
                    (subitem.IsDisplayPrice !== 0 &&
                    checkSale(
                      subitem.SaleBegin,
                      subitem.SaleEnd,
                      subitem.PriceSale
                    ) === true
                      ? "sale"
                      : "")
                  }
                >
                  {subitem.IsDisplayPrice === 0 ? (
                    <span className="price-to">Liên hệ</span>
                  ) : (
                    <React.Fragment>
                      <span className="price-to">
                        {formatPriceVietnamese(subitem.PriceProduct)}
                        <b>đ</b>
                      </span>
                      <span className="price-sale">
                        {formatPriceVietnamese(subitem.PriceSale)}
                        <b>đ</b>
                      </span>
                    </React.Fragment>
                  )}
                </div>
              </Link>
            </li>
          ))}
      </ul>
      {item.items.length > 3 && itemShow < item.items.length && (
        <button
          className="btn-more-service"
          onClick={() => setItemShow(itemShow + 5)}
        >
          Xem thêm <i class="las la-angle-down"></i>
        </button>
      )}
    </div>
  );
}

export default ShopListServiceItem;
