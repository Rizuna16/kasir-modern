import { useEffect, useState } from "react";

import { Select } from "../../../components/ui";

import type { Customer } from "../types";

import { getCustomers } from "../services/customerAdapter";

interface Props {
  value?: Customer;

  onChange: (customer?: Customer) => void;
}

export default function CustomerSelector({ value, onChange }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    setCustomers(getCustomers());
  }, []);

  function handleChange(id: string) {
    if (!id) {
      onChange(undefined);

      return;
    }

    const customer = customers.find((item) => item.id === id);

    onChange(customer);
  }

  return (
    <Select
      label="Customer"
      value={value?.id ?? ""}
      onChange={handleChange}
      options={[
        {
          value: "",
          label: "Walk In Customer",
        },

        ...customers.map((item) => ({
          value: item.id,
          label: `${item.kode} - ${item.nama}`,
        })),
      ]}
    />
  );
}
