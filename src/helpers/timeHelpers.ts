import moment from "moment";

export const timeStampToLocal = (timeStamp: number) => {
  const momentTime = moment(new Date(timeStamp));
  return momentTime.fromNow();
  //   return momentTime.format("DD/MM/YY [at] hh:mm:ss A");

  /**
   * @todo:
   * Add this as a setting to redux
   */
};
