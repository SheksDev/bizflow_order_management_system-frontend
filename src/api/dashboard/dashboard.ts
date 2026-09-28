import api from "../axios"
import type { DashboardQuery } from "./types/dashboard";


export const GetDashboardMetrics = async (
    {period, date, month} : DashboardQuery
) => {

    const params = {
        period: period,
        ...(date && { date: date }),
        ...(month && { month: month }),
    };

    const response = api.get("/dashboard/summary", {params});

    return response;
}