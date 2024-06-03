import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchDropdownContentList } from "@/lib/actions/selectData-actions";
import { useEffect, useState } from "react";

interface dropdownContentType {
  id: number;
  name: string;
}

const Dropdown = ({
  value,
  onChangeHandler,
  placeholder,
  type,
  setSelectedCategory,
  myProductsCategories = [],
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

  const handleValueChange = (newValue: string) => {
    if (setSelectedCategory) {
      setSelectedCategory(newValue);
    } else {
      onChangeHandler && onChangeHandler(newValue); // Pass the new value to the onChangeHandler
    }
  };

  const content =
    myProductsCategories.length > 0
      ? dropdownContent.filter(({ id }) => myProductsCategories.includes(id))
      : dropdownContent;

  return (
    <Select onValueChange={handleValueChange} value={value}>
      <SelectTrigger className="input-field">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {dropdownContent.length > 0 &&
          content.map(({ id, name }) => (
            <SelectItem
              key={id}
              value={id.toString()}
              className="select-item p-regular-14 cursor-pointer hover:text-[#007aff] trasition duration-200">
              {name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
