import Header from "../components/Header";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Elections from "../components/Elections";
import Select from "../components/Select";

import {
  apiGetAllCandidates,
  apiGetAllCities,
  apiGetAllElections,
} from "../services/apiService";

function Loading() {
  return (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
}

export default function ElectionsPage() {
  const [loadingPage, setLoading] = useState(true);
  const [loadingElections, setLoadingElections] = useState(true);

  const [cities, setCities] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [currentElections, setCurrentElections] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    async function getElections() {
      const apiGetCities = await apiGetAllCities();
      const apiGetCandidates = await apiGetAllCandidates();

      setCities(apiGetCities);
      setCandidates(apiGetCandidates);
      setSelectedCity(apiGetCities[0].id);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    getElections();
  }, []);

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    async function getElections() {
      setLoadingElections(true);
      const cityElections = await apiGetAllElections(selectedCity);
      setCurrentElections(cityElections);

      setTimeout(() => {
        setLoadingElections(false);
      }, 500);
    }

    getElections();
  }, [selectedCity]);

  function handleCityChange(newCity) {
    setSelectedCity(newCity);
  }

  let mainJsx = <Loading />;
  if (!loadingPage) {
    mainJsx = (
      <div>
        <div className="flex flex-col items-center justify-center mb-4">
          <Select
            labelDescription="Escolha o municipio: "
            selectValue={selectedCity}
            onSelectedChange={handleCityChange}
          >
            {cities.map(({ id, name }) => ({ id, description: name }))}
          </Select>
        </div>
        {loadingElections ? (
          <Loading />
        ) : (
          <Elections>{currentElections}</Elections>
        )}
      </div>
    );
  }

  return (
    <div>
      <>
        <Header>Hero-Elections</Header>
        <main>
          <div className="container mx-auto p-4">{mainJsx}</div>
        </main>
      </>
    </div>
  );
}
