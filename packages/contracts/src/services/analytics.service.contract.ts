/**
 * Analytics Service Contract
 *
 * Interfaccia per il servizio analytics
 * UNICA FONTE DI VERITÀ per il contratto del servizio
 */

import type {
  UserAnalyticsReport,
  AnalyticsChartData,
  BodyMeasurement,
  UserGoal,
} from '@giulio-leone/types';

export interface IAnalyticsService {
  getUserAnalytics(userId: string): Promise<UserAnalyticsReport>;
  getChartData(userId: string, chartType: string, period?: string): Promise<AnalyticsChartData>;
  getBodyMeasurements(userId: string): Promise<BodyMeasurement[]>;
  createBodyMeasurement(
    userId: string,
    measurement: Omit<BodyMeasurement, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<BodyMeasurement>;
  getUserGoals(userId: string): Promise<UserGoal[]>;
  createUserGoal(
    userId: string,
    goal: Omit<UserGoal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<UserGoal>;
}
