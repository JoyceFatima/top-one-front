"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export const Dashboard: React.FC = () => {
  const summary = [
    { title: "Total Sales", value: "$25,000", trend: "up" },
    { title: "Total Orders", value: "1,200", trend: "up" },
    { title: "Pending Orders", value: "150", trend: "down" },
    { title: "Net Profit", value: "$10,500", trend: "up" },
  ];

  const reports = [
    {
      id: 1,
      date: "2024-01-10",
      description: "Monthly sales report",
      amount: "$5,000",
    },
    {
      id: 2,
      date: "2024-01-11",
      description: "Weekly profit report",
      amount: "$1,200",
    },
    {
      id: 3,
      date: "2024-01-12",
      description: "Top-selling products",
      amount: "$3,800",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <header>
        <h1 className="text-3xl font-bold text-blue-600 dark:text-yellow-400">
          Sales Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your sales and performance metrics.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summary.map((item, index) => (
          <Card
            key={index}
            className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white shadow-md"
          >
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.value}</p>
              <p
                className={`text-sm ${
                  item.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.trend === "up" ? "▲ Trending Up" : "▼ Trending Down"}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Recent Reports
        </h2>
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-white">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-4">{report.description}</td>
                  <td className="p-4">{report.amount}</td>
                  <td className="p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-slate-700 dark:bg-slate-300 text-slate-300 dark:text-slate-700 border-none shadow-md mr-2"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-slate-800 dark:bg-slate-400 text-slate-200 dark:text-slate-800 border-none shadow-md"
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
