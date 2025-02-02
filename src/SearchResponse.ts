type ISODate = string; // Format: YYYY-MM-DD
type USDate = string; // Format: MM/DD/YYYY

interface Calendar {
  readonly weeks: null; // Always null it seems
  readonly dayName: string;
  readonly startDateHuman: string;
  readonly endDate: null; // Always null is seems
  readonly jobTemplate: string;
  readonly tripId: string;
  readonly id: number;
  readonly dateMobile: USDate;
  readonly isActive: boolean;
  readonly startDate: ISODate;
  readonly validDays: number;
}

interface Container {
  readonly zipCode: string;
  readonly address: string;
  readonly city: string;
  readonly containerType: string;
  readonly tripId: string | null;
  readonly firstCalendarDate: ISODate;
  readonly frequency: string | boolean;
  readonly searchByClient: boolean;
  readonly propertyCode: string;
  readonly hasFrequency: boolean;
  readonly calendars: readonly Calendar[];
  readonly customerId: string;
  readonly containerId: string;
  readonly contentType: string;
  readonly propertyNumber: string;
}

interface Result {
  readonly customerId: string;
  readonly zipCode: string;
  readonly containers: readonly Container[];
  readonly address: string;
  readonly city: string;
}

export interface SearchResponse {
  readonly multipleAddresses: boolean;
  readonly customerAddresses: readonly unknown[]; // Don't know the type yet
  readonly results: readonly Result[];
}
