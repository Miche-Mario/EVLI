import Students from "../models/StudentsModels.js"
import Users from "../models/UsersModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import About from "../models/AboutModels.js";
import Prospect from "../models/ProspectModels.js";
import Payment from "../models/PaymentModels.js";
import Invoice from "../models/InvoiceModels.js";
import Discount from "../models/DiscountModels.js";
import StudentsCourses from "../models/StudentsCoursesModels.js";
import Log from "../models/LogModels.js";


export const getStudents = async (req,res) => {
    try {
        const response = await Students.findAndCountAll({
            attributes: ['studentid','startdate','enddate','id','uuid', 'academicg','about_aboutid','passportphotographg','idscang', 'surnameg', 'forenamesg', 'dateofbirthg', 'genderg', 'citizenshipg', 'emailg', 'telhomeg', 'telghanag'],
            include: [{
                model: About
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getStudentByName = async(req,res) => {
    const { search } = await req.body;
    try {
        const response = await Students.findAndCountAll({
            attributes: ['studentid','startdate','enddate', 'academicg','id','uuid', 'about_aboutid','passportphotographg','idscang', 'surnameg', 'forenamesg', 'dateofbirthg', 'genderg', 'citizenshipg', 'emailg', 'telhomeg'],
            where: {
                forenamesg: {
                    [Op.like]: `%${search}%`
                  }
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getStudentByPassportId = async(req,res) => {
    const { passportidg } = await req.body;
    try {
        const response = await Students.findOne({
            attributes: [ 'surnameg', 'forenamesg', 'id', 'studentid'],
            where: {
                passportidg: passportidg
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getStudentById =async (req,res) => {
    try {
        const response = await Students.findOne({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getStudentByStudentId =async (req,res) => {
    const { studentid } = await req.body
    try {
        const response = await Students.findOne({
            where: {
                studentid: studentid
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const createStudent = async(req,res) => {

    const {user, surnameg, forenamesg, genderg, dateofbirthg, placeofbirthg, citizenshipg,occupationg, emailg, telhomeg, telghanag,addresshomeg, addressghanag, maritalg, passportidg,academicg, noteg, aboutidg, surnamee, forenamese, gendere, relationshipe,occupatione, emaile, tel1e, tel2e, addresse, surnamep, forenamesp, genderp, relationshipp, occupationp, emailp, tel1p, tel2p, addressp, nameo, addresso, tel1o, emailo, contacto, tel2o, about_aboutid, startdate, enddate, passportphotographg, idscang, prospectid, code } = req.body;
    const response = await Prospect.findOne({
        where: {
            prospectid: prospectid,
            isstudent: true
        }})

        if(!response) {
    try {
       const student = await Students.create({
            surnameg: surnameg,
            forenamesg: forenamesg,
            genderg: genderg,
            dateofbirthg: dateofbirthg,
            placeofbirthg: placeofbirthg,
            citizenshipg: citizenshipg,
            occupationg: occupationg,
            emailg: emailg,
            telhomeg: telhomeg,
            telghanag: telghanag,
            addresshomeg: addresshomeg,
            addressghanag: addressghanag,
            maritalg: maritalg,
            passportidg: passportidg,
            academicg: academicg,
            noteg: noteg,
            aboutidg: aboutidg,
            passportphotographg: passportphotographg,
            idscang: idscang ,
            surnamee: surnamee,
            forenamese: forenamese,
            gendere: gendere,
            relationshipe: relationshipe,
            occupatione: occupatione,
            emaile: emaile,
            tel1e: tel1e,
            tel2e: tel2e,
            addresse: addresse,
            surnamep: surnamep,
            forenamesp: forenamesp,
            genderp: genderp,
            relationshipp: relationshipp,
            occupationp: occupationp,
            emailp: emailp,
            tel1p: tel1p,
            tel2p: tel2p,
            addressp: addressp,
            nameo: nameo,
            addresso: addresso,
            tel1o: tel1o,
            emailo: emailo,
            contacto: contacto,
            tel2o: tel2o,
            about_aboutid: about_aboutid,
            startdate: startdate,
            enddate: enddate,

        });
////////////////////////UPDATE PROSPECT AS STUDENT////////////////////////////////////////////////
       
            await Prospect.update({
                isstudent: true
            }, {
                where: {
                    prospectid: prospectid
                }
            });
            
////////////////////////UPDATE DISCOUNT////////////////////////////////////////////////
        const discount = await Discount.findOne({
            where: {
                code: code
            }
        });
        discount  &&
            await Discount.update({
                student_studentid: student.id,
                used: true
            }, {
                where: {
                    id: discount.id
                }
            });
/////////////////////////////////SAVE PAYMENT//////////////////////////////////////////////////////////////////////////
            const {total, first, balance, invoiceid, paymentmethod, timepayment, status} = req.body;

        await Payment.create({
            total: total,
            first: first,
            balance: balance,
            student_studentid: student.id,
            invoice_invoiceid: invoiceid,
            paymth_paymtid: paymentmethod,
            timepayment: timepayment,
            status: status
            
        });
        
        ///////////////////////////////SAVE STUDENT COURSES DATA////////////////////////////
        const {courselist} = req.body;
       if(courselist.length > 0) {
        const courseData = await courselist.map((course, index) => {
        
            let dataa = {
                "courses_coursesid": course.coursesid,
                "students_studentsid": student.id,
                "startdate": course.startdate,
                "enddate": course.finaldate,
                "duration": course.laduration,
                "amount": course.price,
                "details": [{...course}]
            }
            return dataa
        })
        StudentsCourses.bulkCreate(courseData, { validate: true })

       }

        /////////////////////////////////UPDATE INVOICE /////////////
        const invoice = await Invoice.findOne({
            where: {
                id: invoiceid
            }
        });
        invoice  &&
            await Invoice.update({
                student_studentid: student.id,
                payed: true
            }, {
                where: {
                    id: invoice.id
                }
            });


            await Log.create({
                info: `Add Payment - Student: ${surnameg}  ${forenamesg } - Total: ${total} -  Payed: ${first} - Balance: ${balance} `,
                user_userid: user
            });

        res.status(200).json({msg: "Student well created"})
    } catch (error) {
        res.status(400).json({msg: error.message})
        console.log(error);
    }
    } else {
        res.status(400).json({msg: "Student already exist"})
    }

}


export const updateStudent = async(req,res) => {
    const url = req.protocol + '://' + req.get('host')

    const {prospectid,surnameg, forenamesg, genderg, dateofbirthg, placeofbirthg, citizenshipg,occupationg, emailg, telhomeg, telghanag,addresshomeg, addressghanag, maritalg, passportidg,academicg, noteg, aboutidg, surnamee, forenamese, gendere, relationshipe,occupatione, emaile, tel1e, tel2e, addresse, surnamep, forenamesp, genderp, relationshipp, occupationp, emailp, tel1p, tel2p, addressp, nameo, addresso, tel1o, emailo, contacto, tel2o, about_aboutid, startdate, enddate } = req.body;
    

    const stud = await Students.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!stud) return res.status(404).json({msg: "Student doesn't not exist" });
 
    try {
        await Students.update({
            surnameg: surnameg,
            forenamesg: forenamesg,
            genderg: genderg,
            dateofbirthg: dateofbirthg,
            placeofbirthg: placeofbirthg,
            citizenshipg: citizenshipg,
            occupationg: occupationg,
            emailg: emailg,
            telhomeg: telhomeg,
            telghanag: telghanag,
            addresshomeg: addresshomeg,
            addressghanag: addressghanag,
            maritalg: maritalg,
            passportidg: passportidg,
            academicg: academicg,
            noteg: noteg,
            aboutidg: aboutidg,
            passportphotographg: req.files.passportphotographg &&  url + '/Images/' + req.files.passportphotographg[0].filename,
            idscang: req.files.idscang && url + '/Images/' + req.files.idscang[0].filename,
            surnamee: surnamee,
            forenamese: forenamese,
            gendere: gendere,
            relationshipe: relationshipe,
            occupatione: occupatione,
            emaile: emaile,
            tel1e: tel1e,
            tel2e: tel2e,
            addresse: addresse,
            surnamep: surnamep,
            forenamesp: forenamesp,
            genderp: genderp,
            relationshipp: relationshipp,
            occupationp: occupationp,
            emailp: emailp,
            tel1p: tel1p,
            tel2p: tel2p,
            addressp: addressp,
            nameo: nameo,
            addresso: addresso,
            tel1o: tel1o,
            emailo: emailo,
            contacto: contacto,
            tel2o: tel2o,
            about_aboutid: about_aboutid,
            startdate: startdate,
            enddate: enddate,

        },
         {   
            where: {
                id: stud.id
            }
        },{   
            headers: { "Content-Type": "multipart/form-data" } 
        });
        res.status(200).json({msg: "Student well Updated"})
    } catch (error) {
        res.status(400).json({msg: error.message})
        console.log(error)
    }
}
export const deleteStudent = (req,res) => {
    
}





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, '-' + fileName)
    }
});
export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).fields(
    [
        {name:'passportphotographg',maxCount: 1},
        {name:'idscang',maxCount: 1}
    ]
)

