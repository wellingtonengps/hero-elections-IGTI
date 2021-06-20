import { getCandidate, getCities, getElections } from "./httpService";

const CACHE = {};

export async function apiGetAllCandidates() {
  const allCandidates = await getCandidate("/candidates");
  CACHE["Candidates"] = allCandidates;
  return allCandidates;
}

export async function apiGetAllCities() {
  const allCities = await getCities("/cities");
  const sortedCities = allCities.sort((a, b) => a.name.localeCompare(b.name));
  CACHE["Cities"] = sortedCities;
  return sortedCities;
}

export async function apiGetAllElections(cityId) {
  const allElections = await getElections(`/election?cityId=${cityId}`);

  const city = CACHE["Cities"].find(({ id }) => id === cityId);

  const elections = allElections
    .sort((a, b) => b.votes - a.votes)
    .map((item) => {
      const candidate = CACHE["Candidates"].find(
        ({ id }) => id === item.candidateId
      );

      const percentage = (item.votes / city.presence) * 100;

      return {
        candidateName: candidate.name,
        username: candidate.username,
        percentage: percentage,
        ...item,
      };
    });

  const resultOfCity = { city, elections };

  return resultOfCity;
}
