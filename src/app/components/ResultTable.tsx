import { useState, useEffect } from "react";

interface ResultTableProps {
  discs: any[];
  selectedDisc: string;
}

const ResultTable = ({ discs, selectedDisc }: ResultTableProps) => {
  const [selectedDiscObj, setSelectedDiscObj] = useState<any>();
  const [recommendedDiscs, setRecommendedDiscs] = useState<any[]>([]);
  const [isDiscFound, setIsDiscFound] = useState(true);
  //gets flight numbers of selected disc and save in selectedNumbers
  useEffect(() => {
    try{
      const getFlightNumbers = (discName: string) => {
        const selected = discs.find(
          (disc) =>
            disc.MOLD.trim().toLowerCase() === discName.trim().toLowerCase()
        );
        return selected;
      };
  
      const flightNumbers = selectedDisc ? getFlightNumbers(selectedDisc) : null;
      setSelectedDiscObj(flightNumbers);
    }catch(err){
      console.error(err)
    }
    
  }, [discs, selectedDisc]);

  //Get recommended disc array based on difference in flight numbers
  const getRecommendedDiscs = () => {
    if (!selectedDiscObj){
      setIsDiscFound(false);
      return
    };
    setIsDiscFound(true);
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
      {!isDiscFound ? (
        <div className="p-4 bg-card text-center">
          <p className="text-lg">Could not find a disc with that name, try something else!</p>
        </div>
      ): (
        recommendedDiscs.length > 0 && (
          <div className="flex flex-col w-full items-center">
            <p className="p-4 text-center">These discs might be up your alley!</p>
            <div className="overflow-auto flex  w-full max-h-96 border-2 border-border rounded-lg scrollbar scrollbar-thumb-neutral-400 scrollbar-thumb-rounded scrollbar-w-2 scrollbar-h-2">
              <table className="table-auto rounded-lg  border-collapse overflow-x-scroll overflow-y-scroll w-full ">
                <thead className="border-b-2 border-border">
                  <tr className="divide-x divide-border *:px-6 *:py-4">
                    <th scope="col">Mold</th>
                    <th scope="col">Type</th>
                    <th scope="col">Speed</th>
                    <th scope="col">Glide</th>
                    <th scope="col">Turn</th>
                    <th scope="col">Fade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-left">
                  {recommendedDiscs.slice(0, 20).map((recommendedDisc, index) => (
                    <tr
                      key={index}
                      className="divide-x divide-border *:px-6 *:py-4"
                    >
                      <td><a href={"https://otbdiscs.com/?s="+recommendedDisc.disc.MOLD+"&post_type=product"} target="_blank">{recommendedDisc.disc.MOLD}</a></td>
                      <td>{recommendedDisc.disc.DISCTYPE}</td>
                      <td>{recommendedDisc.disc.SPEED}</td>
                      <td>{recommendedDisc.disc.GLIDE}</td>
                      <td>{recommendedDisc.disc.TURN}</td>
                      <td>{recommendedDisc.disc.FADE}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
      
    </>
  );
};

export default ResultTable;
