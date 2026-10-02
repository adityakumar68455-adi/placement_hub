import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import JobUpdateForm from './JobUpdateForm';
import { toast } from 'react-toastify';

function GetJob() {
  const [jobData, setJobData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showJob, setShowJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);


 

  // =========================
  // DELETE JOB
  // =========================
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const resDelete = await api.delete(`/jobs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(resDelete.data.success== true){
        toast('Delete Successfully')
      }

      console.log('Delete successful:', resDelete.data);

      // Remove deleted job from UI
      setJobData((prevJobs) =>
        prevJobs.filter((job) => job._id !== id)
      );

      // Decrease total count
      setTotalCount((prevCount) => prevCount - 1);

    } catch (error) {
      console.log(
        'Delete failed:',
        error.response?.data?.message ||
          error.response?.data ||
          error.message
      );
    }
  };

  // =========================
  // GET ALL COMPANY JOBS
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/jobs/my-jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Get jobs data payload:', response.data);

        // Get jobs array from response
        const jobsArray =
          response.data.jobs ||
          response.data.data ||
          response.data;

        if (Array.isArray(jobsArray)) {
          setJobData(jobsArray);

          // Set total count
          setTotalCount(
            response.data.count ?? jobsArray.length
          );
        } else {
          console.error(
            'API response is not an array:',
            response.data
          );

          setJobData([]);
          setTotalCount(0);
        }

      } catch (error) {
        console.error(
          'Error fetching jobs:',
          error.response?.data?.message ||
            error.response?.data ||
            error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Loading jobs...
        </h2>
      </div>
    );
  }

 
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">

    {/* ================= HEADER ================= */}
    <div className="mb-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <div className="flex items-center gap-3">

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">

              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>

            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Jobs
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage and monitor your job postings
              </p>
            </div>

          </div>
        </div>


        {/* Job Count */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm">

          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>

          <span className="text-sm text-gray-500">
            Total Jobs
          </span>

          <span className="font-bold text-gray-900">
            {totalCount}
          </span>

        </div>

      </div>

    </div>


    {/* ================= NO JOBS ================= */}
    {jobData.length === 0 ? (

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 sm:p-16 text-center">

        {/* Empty Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-5">

          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>

        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          No jobs found
        </h2>

        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          You haven't created any job postings yet.
          Create a job to start receiving applications.
        </p>

      </div>

    ) : (

      /* ================= JOB GRID ================= */
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {jobData.map((job) => (

          <div
            key={job._id}
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >

            {/* ================= CARD TOP ================= */}
            <div className="p-6">

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-start gap-3">

                  {/* Job Icon */}
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                  </div>


                  {/* Title */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {job.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Job ID: {job._id.slice(-6)}
                    </p>
                  </div>

                </div>


                {/* Job Type */}
                <span className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-600">
                  {job.jobType}
                </span>

              </div>


              {/* ================= DESCRIPTION ================= */}
              <p className="text-sm text-gray-500 mt-5 line-clamp-3 leading-6">
                {job.description}
              </p>


              {/* ================= JOB DETAILS ================= */}
              <div className="mt-6 space-y-3">


                {/* Location */}
                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Location
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {job.location || "Not specified"}
                    </p>
                  </div>

                </div>


                {/* CTC */}
                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-600">

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      CTC
                    </p>

                    <p className="text-sm font-semibold text-gray-700">
                      {job.ctc || "Not specified"}
                    </p>
                  </div>

                </div>


                {/* Deadline */}
                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500">

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>

                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Application Deadline
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* ================= BUTTONS ================= */}
            <div className="border-t border-gray-100 bg-gray-50/70 p-4">

              <div className="flex gap-3">

                {/* Update */}
                <button
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                  onClick={() => {
                    setShowJob(true);
                    setSelectedJob(job);
                  }}
                >

                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-8.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"
                    />
                  </svg>

                  Update

                </button>


                {/* Delete */}
                <button
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-50 text-red-600 border border-red-100 px-4 py-2.5 text-sm font-semibold hover:bg-red-600 hover:text-white active:scale-95 transition-all"
                  onClick={() => handleDelete(job._id)}
                >

                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>

                  Delete

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    )}


    {/* ================= UPDATE FORM ================= */}
    {showJob && (
      <JobUpdateForm
        setJobData={setJobData}
        job={selectedJob}
        onShow={() => setShowJob(false)}
      />
    )}

  </div>
);

}
export default GetJob;