import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function FormComponent() {
  const navigate = useNavigate();
  // const location = useLocation();
  const query = useQuery();

  // 初始值從 URL 參數或預設值
  const [inputValue1, setInputValue1] = useState<string>(
    query.get("input1") || ""
  );
  const [inputValue2, setInputValue2] = useState<string>(
    query.get("input2") || ""
  );
  const [selectValue, setSelectValue] = useState<string>(
    query.get("select") || ""
  );
  const [dateValue, setDateValue] = useState<string>(query.get("date") || "");
  const [numberValue, setNumberValue] = useState<number>(
    Number(query.get("number") || 0)
  );
  const [rangeValue] = useState<number>(Number(query.get("range") || 50));
  const [checkboxValue, setCheckboxValue] = useState<boolean>(
    query.get("checkbox") === "true"
  );
  const [radioValue, setRadioValue] = useState<string>(
    query.get("radio") || "option1"
  );

  // 使用 useEffect 監聽狀態變化，並更新 URL
  useEffect(() => {
    const params = new URLSearchParams({
      input1: inputValue1,
      input2: inputValue2,
      select: selectValue,
      date: dateValue,
      number: numberValue.toString(),
      range: rangeValue.toString(),
      checkbox: checkboxValue.toString(),
      radio: radioValue,
    });
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [
    inputValue1,
    inputValue2,
    selectValue,
    dateValue,
    numberValue,
    rangeValue,
    checkboxValue,
    radioValue,
    navigate,
    location.pathname,
  ]);

  // 處理輸入變更
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = event.target;
    if (type === "checkbox") {
      const { checked } = event.target as HTMLInputElement; // 斷言為 HTMLInputElement
      setCheckboxValue(checked);
    } else if (type === "radio") {
      setRadioValue(value);
    } else if (type === "number" || type === "range") {
      setNumberValue(Number(value));
    } else {
      switch (name) {
        case "input1":
          setInputValue1(value);
          break;
        case "input2":
          setInputValue2(value);
          break;
        case "select":
          setSelectValue(value);
          break;
        case "date":
          setDateValue(value);
          break;
      }
    }
  };

  // 處理表單提交
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      inputValue1,
      inputValue2,
      selectValue,
      dateValue,
      numberValue,
      rangeValue,
      checkboxValue,
      radioValue,
    };
    console.log("Submitting data:", data);

    const params = new URLSearchParams({
      input1: inputValue1,
      input2: inputValue2,
      select: selectValue,
      date: dateValue,
      number: numberValue.toString(),
      range: rangeValue.toString(),
      checkbox: checkboxValue.toString(),
      radio: radioValue,
    });
    navigate(`?${params.toString()}`, { replace: true });
    console.log("Form submitted and URL updated:", params.toString());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="input1"
        value={inputValue1}
        onChange={handleChange}
      />
      <input
        type="text"
        name="input2"
        value={inputValue2}
        onChange={handleChange}
      />
      <select name="select" value={selectValue} onChange={handleChange}>
        <option value="">請選擇</option>
        <option value="option1">選項1</option>
        <option value="option2">選項2</option>
      </select>
      <input
        type="date"
        name="date"
        value={dateValue}
        onChange={handleChange}
      />
      <input
        type="number"
        name="number"
        value={numberValue}
        onChange={handleChange}
      />
      <input
        type="range"
        name="range"
        value={rangeValue}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="checkbox"
        checked={checkboxValue}
        onChange={handleChange}
      />
      <div>
        <input
          type="radio"
          name="radio"
          value="option1"
          checked={radioValue === "option1"}
          onChange={handleChange}
        />{" "}
        Option 1
        <input
          type="radio"
          name="radio"
          value="option2"
          checked={radioValue === "option2"}
          onChange={handleChange}
        />{" "}
        Option 2
      </div>
      <button type="submit">提交</button>
    </form>
  );
}

export default FormComponent;
