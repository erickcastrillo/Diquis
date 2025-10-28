import React from 'react';
import { usePage, Link, Head } from '@inertiajs/react';
import Layout from './Layout';

const Home: React.FC = () => {
  const { message, auth, flash } = usePage().props as any;

  return (
    <Layout>
      <Head title="Home" />
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body p-5">
              <h1 className="display-4 fw-bold mb-4">Welcome to Diquis!</h1>
              <p className="lead text-muted mb-4">{message}</p>
              
              {flash && flash.notice && (
                <div className="alert alert-success" role="alert">
                  {flash.notice}
                </div>
              )}
              
              {flash && flash.alert && (
                <div className="alert alert-danger" role="alert">
                  {flash.alert}
                </div>
              )}

              <hr className="my-4" />
              
              {auth && auth.user ? (
                <div className="text-center">
                  <h3>Welcome back, <span className="text-primary">{auth.user.email}</span>!</h3>
                  <p className="mb-3">You are successfully authenticated.</p>
                  <Link 
                    href="/users/sign_out" 
                    method="delete"
                    className="btn btn-outline-danger"
                  >
                    Sign Out
                  </Link>
                </div>
              ) : (
                <div className="text-center">
                  <h3>You are not signed in</h3>
                  <p className="mb-4">Please sign in or create an account to continue.</p>
                  <Link href="/users/sign_in" className="btn btn-primary me-3">
                    Sign In
                  </Link>
                  <Link href="/users/sign_up" className="btn btn-outline-primary">
                    Sign Up
                  </Link>
                </div>
              )}

              <hr className="my-4" />

              <div className="row g-4">
                <div className="col-12 col-md-4">
                  <div className="card bg-primary bg-opacity-10 border-primary h-100">
                    <div className="card-body">
                      <h5 className="card-title text-primary">Rails 8 + RSpec</h5>
                      <p className="card-text text-primary-emphasis">
                        Robust backend with comprehensive testing framework.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="card bg-success bg-opacity-10 border-success h-100">
                    <div className="card-body">
                      <h5 className="card-title text-success">Devise Auth</h5>
                      <p className="card-text text-success-emphasis">
                        Complete authentication system with UUID support.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="card bg-info bg-opacity-10 border-info h-100">
                    <div className="card-body">
                      <h5 className="card-title text-info">React + Inertia.js</h5>
                      <p className="card-text text-info-emphasis">
                        Modern SPA experience with TypeScript support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;