import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateFormatterService {

    constructor() { }

    /**
     * Converts a local date/time string (e.g., 'Mon Oct 13 2025 02:05:05 GMT+0630')
     * into the standard ISO 8601 UTC format: YYYY-MM-DDTHH:mm:ss.sss+00:00.
     * * @param localDateTimeInput The local date/time string, including the timezone offset.
     * @returns The formatted UTC ISO string, or null if invalid.
     */
    public toUtcIsoFormat(localDateTimeInput: Date | string | number): string | null {

        const date = new Date(localDateTimeInput);

        if (isNaN(date.getTime())) {
            return null; // Invalid date
        }

        const isoStringWithZ = date.toISOString();

        const finalIsoString = isoStringWithZ.replace('Z', '+00:00');

        return finalIsoString;
    }
}
