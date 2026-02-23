/**
 * Health Integration Configuration
 */

export type HealthDataType = 'steps' | 'heartRate' | 'activeCalories' | 'weight' | 'workout';

// Auto-sync interval (in milliseconds)
export const AUTO_SYNC_INTERVAL = 30 * 60 * 1000; // 30 minutes

// Default sync period (days to look back)
export const DEFAULT_SYNC_DAYS = 7;

// Health data types to sync
export const HEALTH_DATA_TYPES: HealthDataType[] = [
  'steps',
  'heartRate',
  'activeCalories',
  'weight',
  'workout',
];

// Apple HealthKit permissions
export const APPLE_HEALTH_PERMISSIONS = {
  permissions: {
    read: ['StepCount', 'HeartRate', 'ActiveEnergyBurned', 'BodyMass', 'Workout'],
    write: [], // We only read data, no writing
  },
};

// Android Health Connect permissions
export const ANDROID_HEALTH_PERMISSIONS = [
  { accessType: 'read', recordType: 'Steps' },
  { accessType: 'read', recordType: 'HeartRate' },
  { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
  { accessType: 'read', recordType: 'Weight' },
  { accessType: 'read', recordType: 'ExerciseSession' },
];

// Workout activity type mapping
export const WORKOUT_ACTIVITY_TYPES = {
  // Apple HealthKit activity types
  ios: {
    1: 'Running',
    2: 'Cycling',
    3: 'Swimming',
    4: 'Walking',
    5: 'Yoga',
    6: 'Strength Training',
    7: 'Cardio',
    8: 'HIIT',
    // Add more as needed
  },
  // Android Health Connect activity types
  android: {
    1: 'RUNNING',
    2: 'BIKING',
    3: 'SWIMMING',
    4: 'WALKING',
    5: 'YOGA',
    6: 'STRENGTH_TRAINING',
    7: 'CARDIO',
    8: 'HIGH_INTENSITY_INTERVAL_TRAINING',
    // Add more as needed
  },
} as const;

// API endpoints
export const HEALTH_ENDPOINTS = {
  SYNC_DATA: '/api/health/sync',
  GET_SUMMARY: '/api/health/summary',
  GET_DATA: '/api/health/data',
} as const;

// AsyncStorage keys for health integration
export const HEALTH_STORAGE_KEYS = {
  LAST_SYNC_TIME: '@health/lastSyncTime',
  AUTO_SYNC_ENABLED: '@health/autoSyncEnabled',
  PERMISSIONS_GRANTED: '@health/permissionsGranted',
} as const;
