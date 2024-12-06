import React from "react";
import { Pagination as AntPagination } from "antd";
import "./Pagination.scss";
const Pagination = ({ current, total, onChange, pageSize }) => {
  return (
    <AntPagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={(page) => {
        onChange(page); // Trigger page change
      }}
      showSizeChanger // Enable page size changer
    />
  );
};

export default Pagination;
