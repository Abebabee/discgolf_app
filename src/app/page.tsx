"use client";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import InputField from "./components/InputField";
import readDiscData from "@/app/hooks/readDiscData";

export default function Home() {
  const [discData, setDiscData] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { fetchCsvData } = readDiscData();

  useEffect(() => {
    fetchCsvData("/discdata.csv", setDiscData);
  }, []);

  console.log(discData);

  useEffect(() => {
    // Extract disc names from disc data
    const discNames = discData
      .map((disc: any) => disc.MOLD) // Map to disc names without trimming
      .filter((name: string | null) => name !== null) // Filter out null disc names
      .map((name: string) => name.trim()); // Trim disc names

    // Filter disc names based on input value
    const filteredSuggestions = discNames.filter((name: string) =>
      name.toLowerCase().includes(inputValue.toLowerCase())
    );
    // Set filtered suggestions
    setSuggestions(filteredSuggestions);
  }, [inputValue, discData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <main className="bg-background flex flex-row justify-center items-center h-screen">
      <div className="bg-card flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center items-center text-foreground">
          <p>I would like a disc similar to:</p>
        </div>
        <div className="flex flex-col justify-center items-center text-foreground">
          <div className="flex flex-row justify-center items-center text-foreground">
            <InputField
              placeholder={"e.g. Firebird"}
              onChange={handleInputChange}
              value={inputValue}
            ></InputField>
            <Button name={"Search"} href={""} bg={"bg-primary"}></Button>
          </div>
          <div className="relative text-foreground overflow-y-auto max-h-80 w-full border border-border mt-1">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="pl-2  hover:bg-primary">
                {suggestion}
              </div>
            ))}
          </div>
        </div>

        <div className="text-foreground">Results here</div>
      </div>
    </main>
  );
}
