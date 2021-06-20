import { helperFormatNumber, helperFormatPercentage } from "../helpers/helpers";

export default function Elections({ children }) {
  const { city, elections } = children;

  const { name: cityName, votingPopulation, absence, presence } = city;

  return (
    <div className="border p-4">
      <h2 className="text-center font-semibold">Elections em {cityName}</h2>
      <div className="flex space-x-4 justify-center m-4">
        <span>
          <strong>Total de eleitores:</strong> {absence + presence}
        </span>
        <span>
          <strong>Abstenção:</strong> {absence}
        </span>
        <span>
          <strong>Comparecidos:</strong> {votingPopulation}
        </span>
        <span>
          <strong>Qantidades de Candidatos:</strong> {elections.length}
        </span>
      </div>

      <ul className="flex flex-row items-center justify-center flex-wrap">
        {elections.map(
          ({ id, username, candidateName, votes, percentage }, index) => {
            const imageUrl = `./img/${username}.png`;

            const select = index === 0 ? "bg-green-100" : "bg-red-100";

            return (
              <li
                key={id}
                className={`shadow-lg p-4 m-4 w-80 h-48 
              flex flex-col items-center justify-center 
              font-semibold rounded-xl flex-wrap ${select}`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <div>
                    <img
                      className="rounded-full"
                      src={imageUrl}
                      width={80}
                      height={80}
                      alt={candidateName}
                    />
                  </div>
                  <div>{candidateName}</div>
                  <div>
                    <strong>{helperFormatPercentage(percentage)}</strong>
                  </div>
                  <div>{helperFormatNumber(votes)} votos</div>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
