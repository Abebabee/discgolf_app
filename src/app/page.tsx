"use client"
import { useEffect, useState } from "react";
import Button from "./components/Button";
import InputField from "./components/InputField";
import readDiscData from "@/app/hooks/readDiscData";
import ResultTable from "./components/ResultTable";

export default function Home() {
  const [discData, setDiscData] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedDisc, setSelectedDisc] = useState("")
  const { fetchCsvData } = readDiscData();

  useEffect(() => {
    fetchCsvData("./discdata.csv", setDiscData);
  }, []);

  useEffect(() => {
    const discNames = discData
      .map((disc: any) => disc.MOLD)
      .filter((name: string | null) => name !== null)
      .map((name: string) => name.trim());
    const filteredSuggestions = discNames.filter((name: string) =>
      name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [inputValue, discData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };
  const handleButtonClick = () =>{
    setSelectedDisc(inputValue);
    setInputValue("");
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSelectedDisc(inputValue);
      setInputValue("");
    }
  };

  return (
    <main className="bg-background flex flex-row justify-center items-center h-screen">
      <div className="bg-card flex flex-col justify-center items-center relative w-full">
        <div className="flex flex-row justify-center items-center text-foreground">
          <p>I would like a disc similar to:</p>
        </div>
        <div className="flex flex-row justify-center items-center text-foreground">
          <div className="relative flex">
          <div className="flex flex-row">
            <InputField
              placeholder={"e.g. Firebird"}
              onChange={handleInputChange}
              value={inputValue}
              onKeyDown={handleKeyDown}
            />
            <Button name={"Search"} href={""} bg={"bg-primary"} onClick={handleButtonClick}/>
            </div>
            {inputValue && (
              <div className="absolute top-full left-0 text-foreground overflow-y-auto max-h-80 w-full border border-border mt-1 bg-card">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="pl-2 hover:bg-primary cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col text-foreground w-full lg:w-3/5">
          {selectedDisc && (
            <ResultTable discs={discData} selectedDisc={selectedDisc} />
          )}
        </div>
      </div>
    </main>
  );
}