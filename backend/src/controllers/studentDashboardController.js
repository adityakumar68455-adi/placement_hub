const student = require("../models/StudentSchema.js")
const application = require("../models/ApplicationSchema.js")

exports.getStudentDashboard = async (req,res) => {
    try {
        const userId = req.user.id

        const findStudent = await student.findOne({user : userId}) 
        if(!findStudent){
            return res.status(404).json({

                success: false,
                status: 404,
                message: "student profile Not Found"
            })
        }

        const totalApplications = await application.countDocuments({
            student:userId 
        })
        const interviews = await application.countDocuments({
            student: userId,
            status: "interview"
         })

         const selected = await application.countDocuments({
            student:userId,
            status:"selected"
        })

        //  const alreadyApplied = await application.findOne({
        //         user: userId,
        //         job:job.id
        //     })
         const rejected = await application.countDocuments({    
            student:userId,
            status:"rejected"
         })
       
    
        res.json({
            totalApplications,
            interview,
            selected,
            rejected
            
        })
    } catch (error) {
        res.status(400).json({
            message: "not found"
        })
    }
}
// ------------Apply job controller----------------

exports.applyJob = async(req,res) => {
try {
    const userId = req.user.id;
    const {jobId} = req.body;
    
    const alreadyApplied = await application.findOne({
        student: userId,
        job:jobId
    })
    if(alreadyApplied){
        return res.status(400).json({
            success:false,
            message:"you already applied for this job"
        })
        }
    
    const newApplication = await application.create({
        student: userId,
        job:jobId
    })


    res.status(201).json({
        success:true,
        message:"applied successfully",
        data:newApplication

    })


} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
    
  }
}

