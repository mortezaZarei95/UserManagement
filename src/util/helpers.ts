export let labelList = [
  { fName: "Name:" },
  { lName: "Family Name:" },
  {
    mobileNumber: "Mobile :",
  },
  { id: "ID No." },
  {
    birthDate: "Birth date:",
  },
  {
    address: "Address:",
  },
  {
    avatar: "Profile Pic:",
  },
];

export const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
