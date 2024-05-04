interface ResultTableProps {
  discs: any[];
  selectedDisc?: any[];
}

const ResultTable = ({ discs }: ResultTableProps) => {
 
  return (
    <table className="table-fixed rounded-lg border-2 border-border">
      <thead className="border-b-2 border-border">
        <tr className="divide-x divide-border">
          <th scope="col" className="px-6 py-4">Mold</th>
          <th scope="col" className="px-6 py-4">Type</th>
          <th scope="col" className="px-6 py-4">Speed</th>
          <th scope="col" className="px-6 py-4">Glide</th>
          <th scope="col" className="px-6 py-4">Turn</th>
          <th scope="col" className="px-6 py-4">Fade</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border text-left">
        {discs.slice(0,5).map((disc, index) => (
          <tr key={index} className="divide-x divide-border">
            <td className="whitespace-nowrap px-6 py-4">{disc.MOLD}</td>
            <td className="whitespace-nowrap px-6 py-4">{disc.DISCTYPE}</td>
            <td className="whitespace-nowrap px-6 py-4">{disc.SPEED}</td>
            <td className="whitespace-nowrap px-6 py-4">{disc.GLIDE}</td>
            <td className="whitespace-nowrap px-6 py-4">{disc.TURN}</td>
            <td className="whitespace-nowrap px-6 py-4">{disc.FADE}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
