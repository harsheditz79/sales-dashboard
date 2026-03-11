"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "../atoms/Card";
import { Button } from "../atoms/Button"; // Tumhara custom Button component
import { FilterInput } from "../molecules/FilterInput";
import { salesData } from "@/utils/mockData";

const COLORS = ["#8884d8", "#82ca9d", "#ff7300"];

const formatLegend = (value: string) => {
  return value.replace("sales", "Sales ");
};

export const SalesChart = () => {
  // Initial default value for threshold
  const INITIAL_THRESHOLD = 0;

  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [threshold, setThreshold] = useState<number>(INITIAL_THRESHOLD);

  // Function to handle resetting the threshold
  const handleResetThreshold = () => {
    setThreshold(INITIAL_THRESHOLD);
  };

  const totalSales = salesData.reduce(
    (acc, curr) => {
      acc.sales2022 += curr.sales2022;
      acc.sales2023 += curr.sales2023;
      acc.sales2024 += curr.sales2024;
      return acc;
    },
    { sales2022: 0, sales2023: 0, sales2024: 0 },
  );

  const pieData = [
    { name: "2022", value: totalSales.sales2022 },
    { name: "2023", value: totalSales.sales2023 },
    { name: "2024", value: totalSales.sales2024 },
  ];

  const filteredData = salesData.map((item) => ({
    ...item,
    sales2022: item.sales2022 >= threshold ? item.sales2022 : 0,
    sales2023: item.sales2023 >= threshold ? item.sales2023 : 0,
    sales2024: item.sales2024 >= threshold ? item.sales2024 : 0,
  }));

  return (
    <Card className="w-full">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl font-bold text-gray-900">Sales Overview</h2>
        <div className="flex items-end gap-2">
          <FilterInput
            label="Threshold"
            value={threshold}
            onChange={setThreshold}
          />

          <Button
            onClick={handleResetThreshold}
            isActive={true}
            className="hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setChartType("bar")}
          isActive={chartType === "bar"}
        >
          Bar
        </Button>
        <Button
          onClick={() => setChartType("line")}
          isActive={chartType === "line"}
        >
          Line
        </Button>
        <Button
          onClick={() => setChartType("pie")}
          isActive={chartType === "pie"}
        >
          Pie
        </Button>
      </div>

      <div className="h-[300px] md:h-[400px] w-full" style={{ minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <Legend formatter={formatLegend} />
              <Bar dataKey="sales2022" fill={COLORS[0]} />
              <Bar dataKey="sales2023" fill={COLORS[1]} />
              <Bar dataKey="sales2024" fill={COLORS[2]} />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <Legend formatter={formatLegend} />
              <Line type="monotone" dataKey="sales2022" stroke={COLORS[0]} />
              <Line type="monotone" dataKey="sales2023" stroke={COLORS[1]} />
              <Line type="monotone" dataKey="sales2024" stroke={COLORS[2]} />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
