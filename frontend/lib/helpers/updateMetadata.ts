/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";

export const UpdateMetadata = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const title = t("title");
    document.title = title;
  }, [t]); 

  return null;
};
