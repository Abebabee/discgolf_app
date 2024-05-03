import Papa from 'papaparse'
type Callback = (data:any) => void;

const readDiscData = () =>{
  const fetchCsvData = async (filePath: string, callback: Callback) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const csvString = await response.text();
      const { data } = Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
      });
      callback(data);
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  };
  
  return {fetchCsvData}
}
export default readDiscData