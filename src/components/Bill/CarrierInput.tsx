"use client";

import { useRef, useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import { CARRIERS } from "@/lib/constants";
import type { ICarrier } from "@/types";

const carriers: ICarrier[] = CARRIERS;

interface CarrierInputProps {
  className?: string;
  onChange: (value: string) => void; // Callback để gửi giá trị ra ngoài
  required?: boolean;
}

export default function CountryInput({ required = false, className, onChange }: CarrierInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (value: string) => {
    setInputValue(value);
    onChange(value); // Xuất giá trị ra component cha
  };

  const handleSelect = (carrier: ICarrier) => {
    const selectedValue = `${carrier.name}`;
    handleChange(selectedValue);
    setShowDropdown(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Input */}
      <input
        type="text"
        className="w-full h-full p-1 pr-[25px] border border-gray-500"
        placeholder="Select carrier..."
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onAbort={() => setShowDropdown(false)}
        required={required}
      />
      <Icon className={`absolute right-1 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer`} sx={{ fontSize: "18px !important" }} onClick={() => setShowDropdown(!showDropdown)}>
        {showDropdown ? "expand_less" : "expand_more"}
      </Icon>

      {/* Dropdown */}
      {showDropdown && (
        <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 max-h-[140px] overflow-auto">
          {carriers
            // .filter((c) => c.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((value, idx) => (
              <li key={value.name + idx} className="p-2 text-[14px] cursor-pointer hover:bg-gray-200 " onClick={() => handleSelect(value)}>
                {value.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
