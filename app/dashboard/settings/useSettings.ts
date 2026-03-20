import { useState } from "react";

export type SettingsForm = {
  theme: string;
  notifications: boolean;
  emailUpdates: boolean;
  twoFactor: boolean;
};

export const useSettings = () => {
  const [formData, setFormData] = useState<SettingsForm>({
    theme: "auto",
    notifications: true,
    emailUpdates: true,
    twoFactor: false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return {
    formData,
    handleChange,
    handleSave,
  };
};
