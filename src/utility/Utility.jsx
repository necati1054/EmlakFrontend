// ================================ Utility Data Start ================================
// Text convert to string
export const convertToSlug = (text) => {
  return text.toLowerCase().replace(/\s+/g, "-");
};

export const slugURL = ({ url, id, ilanType }) => {
  return `/${url}/${
    ilanType == 1 ? "konut" : ilanType == 2 ? "isyeri" : "arsa"
  }/${id}`;
};

// Get The Current Month Name
export const getCurrentMonth = () => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth();
  const currentMonthName = monthNames[currentMonth];
  return currentMonthName;
};
// ================================ Utility Data End ================================
