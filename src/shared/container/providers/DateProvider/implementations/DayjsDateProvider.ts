import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compare(
    start_date: Date,
    end_date: Date,
    unit: "days" | "hours" | "minutes" | "seconds"
  ): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, unit);
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  now(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
