import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useEffect, useState } from "react";

import { Input } from "../ui/input";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {};

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="input-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {/* {categories.length > 0 &&
          categories.map((category, index) => (
            <SelectItem
              key={index}
              value={String(index)}
              className="select-item p-regular-14">
              name
            </SelectItem>
          ))} */}
        <SelectItem value="phone">phone</SelectItem>
        <SelectItem value="computer">computer</SelectItem>
        <SelectItem value="service">service</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
