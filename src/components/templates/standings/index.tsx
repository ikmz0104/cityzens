import axios from "axios";
import React, { useState, useEffect } from "react";

export const Standings: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState("eng.1");
  const [selectedYear, setSelectedYear] = useState("2021");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData([]);
    axios
      .get(
        `https://api-football-standings.azharimm.site/leagues/${selectedLeague}/standings?season=${selectedYear}`
      )
      .then((res) => {
        setData(res.data.data.standings);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [selectedYear, selectedLeague]);

  return (
    <div className="standings-container">
      <div className="select-fields">
        <select
          name="select-league"
          id="select-league"
          defaultValue={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
        >
          <option value="eng.1">Premier League</option>
          <option value="esp.1">La Liga</option>
          <option value="ita.1">Serie A</option>
          <option value="ger.1">Bundesliga</option>
          <option value="fra.1">Ligue 1</option>
          <option value="jpn.1">J1</option>
        </select>
        <select
          name="select-year"
          id="select-year"
          onChange={(e) => setSelectedYear(e.target.value)}
          defaultValue={selectedYear}
        >
          <option value="2021">2021-22</option>
          <option value="2020">2020-21</option>
          <option value="2019">2019-20</option>
          <option value="2018">2018-19</option>
          <option value="2017">2017-18</option>
          <option value="2016">2016-17</option>
          <option value="2015">2015-16</option>
          <option value="2014">2014-15</option>
          <option value="2013">2013-14</option>
          <option value="2012">2012-13</option>
          <option value="2011">2011-12</option>
        </select>
      </div>

      <div className="ranking-div">
        {loading ? (
          null
        ) : (
          data?.map((data, index) => (
            <div key={index} className="ranking-div-inner">
              <h1>
                <span>
                  {`${index + 1}.`}
                  <img
                    src={data.team.logos[0]?.href}
                    alt="#"
                    className="logo-small"
                  />
                </span>{" "}
                {data.team.shortDisplayName}
              </h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default React.memo(Standings);