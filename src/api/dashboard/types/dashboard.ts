

export interface DashboardQuery {
    period: string;
    date: string,
    month: string;
}

export interface MetricsPeriod {
    type: "CURRENT_MONTH" | "PREVIOUS_MONTH" | "CUSTOM";
    startDate: string;
    endDate: string;
}

export interface OrderMetrics {
    active: number;
    pending: number;
    completed: number;
    cancelled: number;
    unpaidBalances: number;
}

export interface InflowMetrics {
    total: string;
    orders: string,
    tips: string,
}

export interface OutflowMetrics {
    total: string;
    expenses: string,
    refunds: string,
}

export interface CashflowMetrics {
    total: string,
    inflow: string,
    outflow: string,
}

export interface FinancialMetrics {
    grossOrderValue: string;
    balanceDue: string;
    inflow: InflowMetrics
    outflow: OutflowMetrics;
    outflowEntries: number;
    netRevenue: string;
    cashFlow: CashflowMetrics;
    // paymentsReceived: string;
}

export interface Comparison {
    comparisonAvailable: boolean;
    direction: "INCREASE" | "DECREASE" | "NO_CHANGE";
    percentageChange: number;
}

export interface ComparisonMetrics {
    grossOrderValue: Comparison;
    paymentReceived: Comparison;
    inflow: string,
    outflow: string,
}

export interface DashboardMetrics {
    period: MetricsPeriod;
    orders: OrderMetrics;
    financials: FinancialMetrics;
    comparisons: ComparisonMetrics;
}