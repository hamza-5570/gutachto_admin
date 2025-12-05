import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useGetCasesQuery } from "@/services/admin-api";
import { Skeleton } from "@/components/ui/skeleton"; // import Skeleton

const STATUSES = [
  "case created",
  "data questions",
  "updated",
  "data answers",
  "cost calculation commisssioned",
  "cost calculation finished",
  "sent to lawyer",
  "lawyer questions",
  "change invoice",
  "payment",
];

function computeStats(cases = []) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const openCases = cases.filter((c) => c && c.status !== "closed").length;

  const newCasesThisMonth = cases.filter((c) => {
    if (!c || !c.start_date) return false;
    const d = new Date(c.start_date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const statusCounts = STATUSES.reduce((acc, s) => {
    acc[s] = 0;
    return acc;
  }, {});

  cases.forEach((c) => {
    const s = (c && c.status) || "unknown";
    if (statusCounts.hasOwnProperty(s)) {
      statusCounts[s] += 1;
    }
  });

  let totalPaid = 0;
  let totalUnpaid = 0;

  cases.forEach((c) => {
    const invoice = c && c.invoice;
    if (invoice) {
      const paid = Number(invoice.paid_sum) || 0;
      const total = Number(invoice.total_invoiced_amount) || 0;
      totalPaid += paid;
      totalUnpaid += Math.max(0, total - paid);
    }
  });

  return {
    openCases,
    newCasesThisMonth,
    statusCounts,
    totalPaid,
    totalUnpaid,
  };
}

export default function DashboardWidgets() {
  const { data, isLoading } = useGetCasesQuery();
  const stats = computeStats(data || []);
  const { openCases, newCasesThisMonth, statusCounts, totalPaid, totalUnpaid } =
    stats;
  const { t } = useTranslation();

  const STATUSES = [
    "case created",
    "data questions",
    "updated",
    "data answers",
    "cost calculation commisssioned",
    "cost calculation finished",
    "sent to lawyer",
    "lawyer questions",
    "change invoice",
    "payment",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* Open Cases */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("dashboard.openCases")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-24 mb-2" />
          ) : (
            <p className="text-3xl font-bold">{openCases}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboard.openCasesLabel")}
          </p>
        </CardContent>
      </Card>

      {/* New Cases This Month */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("dashboard.newCasesThisMonth")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-10 w-24 mb-2" />
          ) : (
            <p className="text-3xl font-bold">{newCasesThisMonth}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            {t("dashboard.newCasesLabel")}
          </p>
        </CardContent>
      </Card>

      {/* Cases by Status */}
      <Card className="rounded-2xl shadow-sm col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("dashboard.casesByStatus")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {isLoading
              ? STATUSES.map((status) => (
                  <Skeleton key={status} className="h-6 w-full" />
                ))
              : STATUSES.map((status) => {
                  const formattedStatus = status.replace(/\s+/g, "_"); // e.g., "case created" → "case_created"

                  return (
                    <div
                      key={status}
                      className="flex items-center justify-between"
                    >
                      <span className="capitalize text-sm font-medium">
                        {t(`statuses.${formattedStatus}`)}
                      </span>
                      <span className="text-sm font-semibold">
                        {statusCounts[status] || 0}
                      </span>
                    </div>
                  );
                })}
          </div>
        </CardContent>
      </Card>

      {/* Payments Overview */}
      <Card className="rounded-2xl shadow-sm col-span-1 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {t("dashboard.paymentsOverview")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {t("dashboard.totalPaid")}
              </p>
              {isLoading ? (
                <Skeleton className="h-10 w-32" />
              ) : (
                <p className="text-2xl font-bold">€ {totalPaid.toFixed(2)}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {t("dashboard.totalUnpaid")}
              </p>
              {isLoading ? (
                <Skeleton className="h-10 w-32" />
              ) : (
                <p className="text-2xl font-bold text-red-500">
                  € {totalUnpaid.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
