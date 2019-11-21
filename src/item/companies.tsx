import * as React from "react";
import {  getImageUrl } from "../api";
import { ProductionCompany } from "../types";

interface CompaniesProps {
  companies: ProductionCompany[]
}

export const Companies = ({ companies = [] }:CompaniesProps) => {
  return <div className="clearBothAfter">
    { companies.length
      ? companies.map((company, i) => {
        const { name, logo_path } = company;
          return <div key={i} className="content-bg primary-c company">
            { logo_path &&
              <img
                src={getImageUrl(logo_path, "w200")}
                title={name}
                alt={name}
              />
            }
            <div className="text-center">{name}</div>
          </div>;
        })
      : "-"
    }
  </div>;
}

