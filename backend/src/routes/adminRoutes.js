const express = require("express")
const router = express.Router()

const { getAdminDashboardAnalytics,
        verifyCompanyLifecycle ,
        getAllCompanies ,
        getAllStudents , 
        toggleStudentEligibility , 
        getAllJobs , 
        closeJobByAdmin , 
        getAllApplications , 
        getPlacedStudents 
        } = require("../controllers/adminController.js")
const {protect, authorizeRoles} = require("../middlewares/authMiddleware.js")

router.get("/dashboard",protect, authorizeRoles("admin"), getAdminDashboardAnalytics)
router.put("/company/status/:id", protect, authorizeRoles("admin"), verifyCompanyLifecycle)
router.get("/companies", protect , authorizeRoles("admin") , getAllCompanies)

router.get("/students", protect , authorizeRoles("admin") , getAllStudents)
router.get("/placements", protect , authorizeRoles("admin") , getPlacedStudents)
router.put("/student/status/:id", protect , authorizeRoles("admin"), toggleStudentEligibility)



router.get("/jobs", protect , authorizeRoles("admin") , getAllJobs)
router.put("/job/:id/close", protect , authorizeRoles("admin") ,closeJobByAdmin )
router.get("/applications", protect , authorizeRoles("admin") , getAllApplications)


module.exports = router;






