import { useState, useEffect } from "react";

interface ResultTableProps {
  discs: any[];
  selectedDisc: string;
}

const ResultTable = ({ discs, selectedDisc }: ResultTableProps) => {
  const [selectedDiscObj, setSelectedDiscObj] = useState<any>();
  const [recommendedDiscs, setRecommendedDiscs] = useState<any[]>([]);
  //gets flight numbers of selected disc and save in selectedNumbers
  useEffect(() => {
    const getFlightNumbers = (discName: string) => {
      const selected = discs.find(
        (disc) =>
          disc.MOLD.trim().toLowerCase() === discName.trim().toLowerCase()
      );
      return selected;
    };

    const flightNumbers = selectedDisc ? getFlightNumbers(selectedDisc) : null;
    setSelectedDiscObj(flightNumbers);
  }, [discs, selectedDisc]);

  //Get recommended disc array based on difference in flight numbers
  const getRecommendedDiscs = () => {
    if (!selectedDiscObj) return;
    //Filter array to only show the same type of disc and not include the selected disc
    const filteredDiscs = discs.filter(
      (disc) =>
        disc.DISCTYPE === selectedDiscObj.DISCTYPE &&
        disc.MOLD.trim().toLowerCase() !==
          selectedDiscObj.MOLD.trim().toLowerCase()
    );

    const recommendedDiscsArr = filteredDiscs.map((disc) => {
      const speedDifference = Math.abs(selectedDiscObj.SPEED - disc.SPEED);
      const glideDifference = Math.abs(selectedDiscObj.GLIDE - disc.GLIDE);
      const turnDifference = Math.abs(selectedDiscObj.TURN - disc.TURN);
      const fadeDifference = Math.abs(selectedDiscObj.FADE - disc.FADE);

      const similarityScore =
        (speedDifference + glideDifference + turnDifference + fadeDifference) /
        4;

      return {
        disc: disc,
        similarityScore: similarityScore,
      };
    });
    recommendedDiscsArr.sort((a, b) => a.similarityScore - b.similarityScore);
    setRecommendedDiscs(recommendedDiscsArr);
  };
  useEffect(() => {
    getRecommendedDiscs();
  }, [selectedDiscObj]);

  return (
    <>
      {recommendedDiscs.length > 0 && (
        <div className="flex flex-col items-center">
          <p className="p-4">These discs might be up your alley!</p>
          <table className="table-fixed rounded-lg border-2 border-border">
            <thead className="border-b-2 border-border">
              <tr className="divide-x divide-border *:px-6 *:py:4">
                <th scope="col">
                  Mold
                </th>
                <th scope="col">
                  Type
                </th>
                <th scope="col">
                  Speed
                </th>
                <th scope="col">
                  Glide
                </th>
                <th scope="col">
                  Turn
                </th>
                <th scope="col">
                  Fade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-left">
              {recommendedDiscs.slice(0, 5).map((recommendedDisc, index) => (
                <tr key={index} className="divide-x divide-border *:px-6 *:py-4 *:whitespace-nowrap">
                  <td>
                    {recommendedDisc.disc.MOLD}
                  </td>
                  <td>
                    {recommendedDisc.disc.DISCTYPE}
                  </td>
                  <td>
                    {recommendedDisc.disc.SPEED}
                  </td>
                  <td>
                    {recommendedDisc.disc.GLIDE}
                  </td>
                  <td>
                    {recommendedDisc.disc.TURN}
                  </td>
                  <td>
                    {recommendedDisc.disc.FADE}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ResultTable;
