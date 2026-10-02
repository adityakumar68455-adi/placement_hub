
import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";

function CompanyDashboard() {

  const [Company, setCompany] = useState({
   success: false,
    data: {
      totalJobs: '',
      totalApplications: '',
      shortlisted: '',
      interviewing: '',
      selected: '',
      rejected: ''}
  });

  useEffect(() => {

    const fetchDashboard = async () => {
      try {

        const token = localStorage.getItem("token");

        const response = await api.get(
          "/companyDashboard/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("dashboard is show", response.data);

        setCompany(response.data);

      } catch (error) {

        console.log(
          "Dashboard failed",
          error.response?.data?.message ||
          error.response?.data ||
          error.message
        );

      }
    };

    fetchDashboard();

  }, []);


return (
<div className="min-h-screen bg-[#f7f5f2] text-[#292524]">

  {/* Header */}
  <div className="px-6 pt-7 pb-5">
    <div className="max-w-7xl mx-auto">

      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#a8a29e]">
        Company Dashboard
      </p>

      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292524]">
        Welcome back 👋
      </h1>

      <p className="mt-1 text-sm text-[#78716c]">
        Here's a quick overview of your recruitment activity.
      </p>

    </div>
  </div>


  <main className="max-w-7xl mx-auto px-6 pb-8">

    {/* Statistics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Total Jobs */}
      <div className="rounded-2xl bg-white border border-[#e9e4de]
        p-5 shadow-[0_2px_10px_rgba(70,60,50,0.035)]
        transition-all duration-200 hover:-translate-y-0.5
        hover:shadow-[0_6px_18px_rgba(70,60,50,0.06)]">

        <p className="text-sm font-medium text-[#78716c]">
          Total Jobs
        </p>

        <p className="mt-3 text-3xl font-semibold tracking-tight text-[#292524]">
          {Company.data.totalJobs}
        </p>

        <p className="mt-1 text-xs text-[#a8a29e]">
          Jobs posted
        </p>

      </div>


      {/* Applications */}
      <div className="rounded-2xl bg-white border border-[#e9e4de]
        p-5 shadow-[0_2px_10px_rgba(70,60,50,0.035)]
        transition-all duration-200 hover:-translate-y-0.5
        hover:shadow-[0_6px_18px_rgba(70,60,50,0.06)]">

        <p className="text-sm font-medium text-[#78716c]">
          Applications
        </p>

        <p className="mt-3 text-3xl font-semibold tracking-tight text-[#292524]">
          {Company.data.totalApplications}
        </p>

        <p className="mt-1 text-xs text-[#a8a29e]">
          Total applications
        </p>

      </div>


      {/* Shortlisted */}
      <div className="rounded-2xl bg-white border border-[#e9e4de]
        p-5 shadow-[0_2px_10px_rgba(70,60,50,0.035)]
        transition-all duration-200 hover:-translate-y-0.5
        hover:shadow-[0_6px_18px_rgba(70,60,50,0.06)]">

        <p className="text-sm font-medium text-[#78716c]">
          Shortlisted
        </p>

        <p className="mt-3 text-3xl font-semibold tracking-tight text-[#292524]">
          {Company.data.shortlisted}
        </p>

        <p className="mt-1 text-xs text-[#a8a29e]">
          Candidates shortlisted
        </p>

      </div>


      {/* Selected */}
      <div className="rounded-2xl bg-white border border-[#e9e4de]
        p-5 shadow-[0_2px_10px_rgba(70,60,50,0.035)]
        transition-all duration-200 hover:-translate-y-0.5
        hover:shadow-[0_6px_18px_rgba(70,60,50,0.06)]">

        <p className="text-sm font-medium text-[#78716c]">
          Selected
        </p>

        <p className="mt-3 text-3xl font-semibold tracking-tight text-[#292524]">
          {Company.data.selected}
        </p>

        <p className="mt-1 text-xs text-[#a8a29e]">
          Candidates selected
        </p>

      </div>

    </div>


    {/* Recruitment Overview + Hiring Performance */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">


      {/* Recruitment Overview */}
      <div className="lg:col-span-2 rounded-2xl bg-white
        border border-[#e9e4de]
        shadow-[0_2px_10px_rgba(70,60,50,0.035)]
        overflow-hidden">

        <div className="px-5 py-4 border-b border-[#f0ece7]">

          <h2 className="text-base font-semibold text-[#292524]">
            Recruitment Overview
          </h2>

          <p className="mt-1 text-xs text-[#a8a29e]">
            Candidate application pipeline
          </p>

        </div>


        <div className="p-5 space-y-5">

          {/* Applied */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <span className="text-sm text-[#78716c]">
                Applied
              </span>

              <span className="text-sm font-medium text-[#44403c]">
                {Company.data.totalApplications}
              </span>

            </div>

            <div className="h-1.5 rounded-full bg-[#f0ece7] overflow-hidden">
              <div className="h-full w-full rounded-full bg-[#9b8f83]" />
            </div>

          </div>


          {/* Shortlisted */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <span className="text-sm text-[#78716c]">
                Shortlisted
              </span>

              <span className="text-sm font-medium text-[#44403c]">
                {Company.data.shortlisted}
              </span>

            </div>

            <div className="h-1.5 rounded-full bg-[#f0ece7] overflow-hidden">
              <div className="h-full w-[65%] rounded-full bg-[#a99bbb]" />
            </div>

          </div>


          {/* Interviewing */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <span className="text-sm text-[#78716c]">
                Interviewing
              </span>

              <span className="text-sm font-medium text-[#44403c]">
                {Company.data.interviewing}
              </span>

            </div>

            <div className="h-1.5 rounded-full bg-[#f0ece7] overflow-hidden">
              <div className="h-full w-[45%] rounded-full bg-[#c5a77d]" />
            </div>

          </div>


          {/* Selected */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <span className="text-sm text-[#78716c]">
                Selected
              </span>

              <span className="text-sm font-medium text-[#44403c]">
                {Company.data.selected}
              </span>

            </div>

            <div className="h-1.5 rounded-full bg-[#f0ece7] overflow-hidden">
              <div className="h-full w-[30%] rounded-full bg-[#91a995]" />
            </div>

          </div>

        </div>

      </div>


      {/* Hiring Performance */}
      <div className="rounded-2xl bg-white border border-[#e9e4de]
        shadow-[0_2px_10px_rgba(70,60,50,0.035)]
        p-5">

        <h2 className="text-base font-semibold text-[#292524]">
          Hiring Performance
        </h2>

        <p className="mt-1 text-xs text-[#a8a29e]">
          Your recruitment performance
        </p>


        <div className="mt-8">

          <div className="flex items-center justify-between mb-2">

            <span className="text-sm text-[#78716c]">
              Progress
            </span>

            <span className="text-sm font-medium text-[#57534e]">
              72%
            </span>

          </div>

          <div className="h-1.5 rounded-full bg-[#f0ece7] overflow-hidden">
            <div className="h-full w-[72%] rounded-full bg-[#91a995]" />
          </div>

        </div>


        <div className="mt-7 rounded-xl bg-[#f4f1ed] p-4">

          <p className="text-sm font-medium text-[#57534e]">
            Good progress ✨
          </p>

          <p className="mt-1 text-xs leading-5 text-[#a8a29e]">
            Your recruitment activity is moving steadily.
          </p>

        </div>

      </div>

    </div>


    {/* Job Status */}
    <div className="mt-4 rounded-2xl bg-white border border-[#e9e4de]
      shadow-[0_2px_10px_rgba(70,60,50,0.035)]
      p-5">

      <h2 className="text-base font-semibold text-[#292524]">
        Job Status
      </h2>

      <p className="mt-1 text-xs text-[#a8a29e]">
        Current status of your posted jobs
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

        {/* Active */}
        <div className="rounded-xl bg-[#f1f6f2] border border-[#e0ebe2] p-4">

          <p className="text-2xl font-semibold text-[#617967]">
            18
          </p>

          <p className="mt-1 text-xs text-[#819484]">
            Active
          </p>

        </div>


        {/* Closed */}
        <div className="rounded-xl bg-[#f5f4f2] border border-[#e9e6e1] p-4">

          <p className="text-2xl font-semibold text-[#78716c]">
            4
          </p>

          <p className="mt-1 text-xs text-[#a8a29e]">
            Closed
          </p>

        </div>


        {/* Draft */}
        <div className="rounded-xl bg-[#f8f3e9] border border-[#eee4d1] p-4">

          <p className="text-2xl font-semibold text-[#9a8056]">
            2
          </p>

          <p className="mt-1 text-xs text-[#b29d7b]">
            Draft
          </p>

        </div>

      </div>

    </div>

  </main>

</div>
)


}
export default CompanyDashboard;
