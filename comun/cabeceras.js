import axios from "axios";

export const CABECERAS = () => {
  axios
    .get(
      "https://appgaztaroa-a3165-default-rtdb.europe-west1.firebasedatabase.app/"
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
