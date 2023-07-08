import { Select } from "antd";
import React from "react";

export default function Langselect({ setLanguage, getTheme }) {
  const handleChange = (val) => {
    setLanguage(JSON.parse(val));
    localStorage.setItem("codex-lang", val);
  };

  return (
    <div className="sels">
      <Select
        className={`${getTheme ? "ant-light" : "ant-dark"}`}
        showSearch
        style={{
          width: 110,
        }}
        defaultValue={
          localStorage.getItem("codex-lang")
            ? localStorage.getItem("codex-lang")
            : '["cpp","cpp"]'
        } // if previously arrived than load that language else default is cpp
        onChange={handleChange}
        bordered={false}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          {
            value: '["java","java"]',
            label: "Java",
          },
          {
            value: '["py","python"]',
            label: "Python",
          },
          {
            value: '["c","c"]',
            label: "C",
          },
          {
            value: '["cpp","cpp"]',
            label: "C++",
          },
          {
            value: '["go","go"]',
            label: "GoLang",
          },
          {
            value: '["js","javascript"]',
            label: "NodeJS",
          },
        ]}
      />
    </div>
  );
}
