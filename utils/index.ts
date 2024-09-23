import moment from "jalali-moment";

export const convertToJalali = (isoDate: string) => {
  const jalaliDate = moment(isoDate, "YYYY-MM-DDTHH:mm:ssZ")
    .locale("fa")
    .format("jYYYY/jMM/jDD");

  return jalaliDate;
};
