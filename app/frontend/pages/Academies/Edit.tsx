import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import FlyonUILayout from "../../components/layout/FlyonUILayout";
import { useTranslations } from "../../lib/i18n";
import { Academy } from "./types";

interface Props {
  academy: Academy;
  errors: { [key: string]: string[] };
}

const AcademiesEditPage: React.FC<Props> = ({ academy, errors: serverErrors }) => {
  const { t } = useTranslations();
  const { data, setData, patch, processing, errors: clientErrors } = useForm({
    name: academy.name || "",
    address: academy.address || "",
    phone: academy.phone || "",
    email: academy.email || "",
    subdomain: academy.subdomain || "",
    status: academy.status || "active",
  });

  const errors = { ...serverErrors, ...clientErrors };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(`/admin/academies/${academy.id}`);
  };

  return (
    <FlyonUILayout>
      <Head title={`Edit ${academy.name} | Diquis`} />

      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Link href={`/admin/academies/${academy.id}`} className="btn btn-ghost mb-4">
            Back to Academy
          </Link>
          <h1 className="text-3xl font-bold">Edit Academy</h1>
          <p className="text-base-content/70 mt-1">Update the details for {academy.name}.</p>
        </div>

        <div className="card max-w-3xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="form-control md:col-span-2">
                  <label className="label"><span className="label-text">Academy Name</span></label>
                  <input
                    type="text"
                    className={`input input-bordered ${errors.name ? "input-error" : ""}`}
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                  />
                  {errors.name && <span className="text-error text-xs mt-1">{errors.name[0]}</span>}
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label"><span className="label-text">Contact Email</span></label>
                  <input
                    type="email"
                    className={`input input-bordered ${errors.email ? "input-error" : ""}`}
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                  />
                  {errors.email && <span className="text-error text-xs mt-1">{errors.email[0]}</span>}
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label"><span className="label-text">Contact Phone</span></label>
                  <input
                    type="tel"
                    className={`input input-bordered ${errors.phone ? "input-error" : ""}`}
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                  />
                  {errors.phone && <span className="text-error text-xs mt-1">{errors.phone[0]}</span>}
                </div>

                {/* Address */}
                <div className="form-control md:col-span-2">
                  <label className="label"><span className="label-text">Address</span></label>
                  <textarea
                    className={`textarea textarea-bordered ${errors.address ? "textarea-error" : ""}`}
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                  />
                  {errors.address && <span className="text-error text-xs mt-1">{errors.address[0]}</span>}
                </div>

                {/* Subdomain */}
                <div className="form-control">
                  <label className="label"><span className="label-text">Subdomain</span></label>
                  <input
                    type="text"
                    className={`input input-bordered ${errors.subdomain ? "input-error" : ""}`}
                    value={data.subdomain}
                    onChange={(e) => setData("subdomain", e.target.value)}
                    required
                  />
                  {errors.subdomain && <span className="text-error text-xs mt-1">{errors.subdomain[0]}</span>}
                </div>

                {/* Status */}
                <div className="form-control">
                  <label className="label"><span className="label-text">Status</span></label>
                  <select
                    className={`select select-bordered ${errors.status ? "select-error" : ""}`}
                    value={data.status}
                    onChange={(e) => setData("status", e.target.value)}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  {errors.status && <span className="text-error text-xs mt-1">{errors.status[0]}</span>}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Link href={`/admin/academies/${academy.id}`} className="btn btn-ghost">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary" disabled={processing}>
                  {processing ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FlyonUILayout>
  );
};

export default AcademiesEditPage;