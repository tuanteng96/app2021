import React, { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import ImageAvt from "../../../../assets/images/avatar-null.png";

function ListCustomerSkt() {
  return (
    <Fragment>
      {Array(5)
        .fill()
        .map((item, index) => (
          <div
            className={`d--f ai--c pb-12px mb-12px border-bottom-dashed`}
            key={index}
          >
            <div className="w-40px h-40px rounded d--f ai--c jc--c bg-light fw-600 overflow-hidden">
              <img className="w-100" src={ImageAvt} alt="" />
            </div>
            <div className="f--1 px-12px">
              <div className="text-dark fw-600">
                <Skeleton height={15} width={100} />
              </div>
              <div className="fw-500 text-muted font-size-xs">
                <Skeleton height={15} width={200} />
              </div>
            </div>
            <div>
              <button className="btn svg-icon svg-icon-2 text-svg w-30px h-30px rounded bg-light shadows">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    opacity="0.5"
                    x={18}
                    y={13}
                    width={13}
                    height={2}
                    rx={1}
                    transform="rotate(-180 18 13)"
                    fill="currentColor"
                  />
                  <path
                    d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
    </Fragment>
  );
}

export default ListCustomerSkt;
