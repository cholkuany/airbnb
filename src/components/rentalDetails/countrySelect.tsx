"use client";

import Select from "react-select";
import { SingleValue } from "react-select";

import { useCountries } from "@/app/hooks/useCountries";
import { CountrySelectValue, CountrySelectProps } from "@/types";

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
}) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(newValue: SingleValue<CountrySelectValue>) =>
          onChange(newValue as CountrySelectValue)
        }
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="flex flex-row items-center gap-3">
            <div className="text-2xl">{option.flag}</div>
            <div>
              {option.name},
              <span className="text-neutral-500 ml-1 text-sm">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};
