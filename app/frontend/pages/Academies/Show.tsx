import { Head, Link } from "@inertiajs/react";
import React from "react";
import FlyonUILayout from "../../components/layout/FlyonUILayout";
import { useTranslations } from "../../lib/i18n";
import { Academy } from "./types";

interface Props {
  academy: Academy;
  can_edit: boolean;
  can_delete: boolean;
}

const AcademiesShowPage: React.FC<Props> = ({ academy, can_edit, can_delete }) => {
  const { t } = useTranslations();

  return (
    <FlyonUILayout>
      <Head title={`${academy.name} | Diquis`} />

      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Link href="/admin/academies" className="btn btn-ghost mb-4">
            Back to Academies
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{academy.name}</h1>
              <p className="text-base-content/70 mt-1">Details for this academy.</p>
            </div>
            <div className="flex gap-2">
              {can_edit && (
                <Link href={`/admin/academies/${academy.id}/edit`} className="btn btn-primary">
                  Edit
                </Link>
              )}
              {can_delete && (
                <Link
                  href={`/admin/academies/${academy.id}`}
                  method="delete"
                  as="button"
                  className="btn btn-error"
                  onBefore={() => confirm("Are you sure you want to delete this academy?")}
                >
                  Delete
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Name</h3>
                <p>{academy.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <p>
                  <span className={`badge badge-outline ${
                    academy.status === 'active' ? 'badge-success' : 'badge-error'
                  }`}>
                    {academy.status}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{academy.email}</p>
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>{academy.phone}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-semibold">Address</h3>
                <p>{academy.address}</p>
              </div>
              <div>
                <h3 className="font-semibold">Subdomain</h3>
                <p>{academy.subdomain}</p>
              </div>
              <div>
                <h3 className="font-semibold">Created At</h3>
                <p>{new Date(academy.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FlyonUILayout>
  );
};

export default AcademiesShowPage;
