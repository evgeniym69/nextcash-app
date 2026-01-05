"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTransactionYearsRange } from "@/data/getTransactionYearsRange";
import {} from "@radix-ui/react-select";
import { useRouter } from "next/navigation";

type Props = {
  year: number;
  yearsRange: number[];
};
export default function CashflowFilters({ year, yearsRange }: Props) {
  const router = useRouter();
  return (
    <div>
      <Select
        defaultValue={year.toString()}
        onValueChange={(value) => {
          router.push(`/dashboard?cfyear=${value}`);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {yearsRange?.map((yr) => (
            <SelectItem key={yr} value={yr.toString()}>
              {yr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
