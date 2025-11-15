import { Head, Link } from "@inertiajs/react";
import React from "react";
import FlyonUILayout from "../../components/layout/FlyonUILayout";
import { useTranslations } from "../../lib/i18n";
import { Academy } from "./types";

interface Props {
  academies: Academy[];
  can_create: boolean;
}

const AcademiesIndexPage: React.FC<Props> = ({ academies, can_create }) => {
  const { t } = useTranslations();

  return (
    <FlyonUILayout>
      <Head title="Academy Management | Diquis" />

      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Academy Management</h1>
            <p className="text-base-content/70 mt-1">
              A list of all the academies in the system.
            </p>
          </div>
          {can_create && (
            <Link href="/admin/academies/new" className="btn btn-primary">
              Create Academy
            </Link>
          )}
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subdomain</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {academies.map((academy) => (
                  <tr key={academy.id}>
                    <td>
                      <div className="font-bold">{academy.name}</div>
                    </td>
                    <td>{academy.email}</td>
                    <td>{academy.subdomain}</td>
                    <td>
                      <span className={`badge badge-outline badge-sm ${
                        academy.status === 'active' ? 'badge-success' : 'badge-error'
                      }`}>
                        {academy.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/admin/academies/${academy.id}`}
                        className="btn btn-ghost btn-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </FlyonUILayout>
  );
};

export default AcademiesIndexPage;

