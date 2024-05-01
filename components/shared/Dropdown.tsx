import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchDropdownContentList } from "@/lib/actions/selectData-actions";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface dropdownContentType {
  id: number;
  name: string;
}

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  placeholder: string;
  type: "category" | "location";
};

const Dropdown = ({
  value,
  onChangeHandler,
  placeholder,
  type,
}: DropdownProps) => {
  const [dropdownContent, setDropdownContent] = useState<dropdownContentType[]>(
    []
  );

  useEffect(() => {
    const fetchDropdownContent = async () => {
      const dropdownContent = await fetchDropdownContentList(type);
      setDropdownContent(dropdownContent);
    };

    fetchDropdownContent();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="input-field">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {dropdownContent.length > 0 &&
          dropdownContent.map(({ id, name }) => (
            <SelectItem
              key={id}
              value={String(id)}
              className="select-item p-regular-14 cursor-pointer hover:text-[#007aff] trasition duration-200">
              {name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
