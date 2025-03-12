import React from "react";
import { VaultNavbar } from "../../../../components";
import { ExportData, SettingsLinks } from "../../../../components";

const SettingsExportData = () => {
  return (
    <>
      <VaultNavbar />
      <section className="ui__container">
        {" "}
        {/*Grid*/}
        <SettingsLinks />
        <section className="ui-section__container">
          <ExportData />
        </section>
      </section>
    </>
  );
};

export default SettingsExportData;
