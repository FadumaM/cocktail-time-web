import React from "react";
import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/react-hooks";

const Cocktail = () => {
  const { id } = useParams();
  // const { data, loading } = useQuery(GET_COCKTAIL, {
  //   variables: {id:  },
  // });
  console.log(id);
  return (
    <div>
      <h1>Helllo</h1>
    </div>
  );
};

export default Cocktail;
