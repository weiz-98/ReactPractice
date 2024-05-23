import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // 核心样式
import "ag-grid-community/styles/ag-theme-alpine.css"; // 主题样式
import { ColDef, ColGroupDef } from "ag-grid-community"; // 导入 ColGroupDef
import RowHeightSelector from "./RowHeightSelector";

// 定义行数据的类型
interface RowData {
  id1: number;
  id2: number;
  value1: number;
  value2: number;
}

const TablePage = () => {
  // 尝试从 localStorage 读取行高值，如果不存在则默认为 50
  const initialRowHeight = Number(localStorage.getItem("rowHeight")) || 50;

  const [rowHeight, setRowHeight] = useState<number>(initialRowHeight);
  const handleRowHeightChange = (newHeight: string): void => {
    const height = Number(newHeight);
    setRowHeight(height);
    localStorage.setItem("rowHeight", height.toString());
  };

  // 更新 columnDefs 的定义来包含可收起/展开的列组
  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: "Detailed ID",
      headerClass: "my-header-class",
      children: [
        {
          headerName: "Total ID",
          columnGroupShow: "closed",
          valueGetter: (params) => params.data.id1 + params.data.id2,
        },
        {
          headerName: "ID-A",
          field: "id1",
          sortable: true,
          filter: true,
          columnGroupShow: "open",
          hide: false,
        },
        {
          headerName: "ID-B",
          field: "id2",
          sortable: true,
          filter: true,
          columnGroupShow: "open",
          hide: false,
        },
      ],
    },
    {
      headerName: "Detailed Data",
      headerClass: "my-header-class",
      children: [
        {
          headerName: "Total",
          columnGroupShow: "closed",
          valueGetter: (params) => params.data.value1 + params.data.value2,
        },
        {
          headerName: "Value1",
          field: "value1",
          sortable: true,
          filter: true,
          columnGroupShow: "open",
          hide: false,
        },
        {
          headerName: "Value2",
          field: "value2",
          sortable: true,
          filter: true,
          columnGroupShow: "open",
          hide: false,
        },
      ],
    },
  ]);

  const [rowData, setRowData] = useState<RowData[]>([]); // 使用 RowData 类型定义状态

  useEffect(() => {
    // 模拟异步获取数据
    const fetchData = async () => {
      const mockApi = new Promise<RowData[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id1: 1, id2: 10, value1: 1, value2: 2 },
            { id1: 2, id2: 20, value1: 2, value2: 4 },
            { id1: 3, id2: 30, value1: 3, value2: 6 },
          ]);
        }, 1000);
      });

      const data = await mockApi;
      setRowData(data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div style={{ display: "flex", height: 400, width: "100%" }}>
      <div style={{ flexGrow: 1 }} className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          rowHeight={rowHeight}
        />
      </div>
      <div
        style={{
          marginLeft: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <RowHeightSelector
          currentRowHeight={rowHeight}
          onRowHeightChange={handleRowHeightChange}
        />
      </div>
    </div>
  );
};

export default TablePage;
