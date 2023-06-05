interface IDateProvider {
  compare(
    start_date: Date,
    end_date: Date,
    unit: "days" | "hours" | "minutes" | "seconds"
  ): number;
  convertToUTC(date: Date): string;
  now(): Date;
}

export { IDateProvider };
