import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Payment from "../models/PaymentModels.js";
import Students from "../models/StudentsModels.js";
import Invoice from "../models/InvoiceModels.js";
import PaymentMethods from "../models/PaymentMethodModels.js";
import Discount from "../models/DiscountModels.js";
import StudentsCourses from "../models/StudentsCoursesModels.js";
import Log from "../models/LogModels.js";
import PaymentStatus from "../models/PaymentStatusModels.js";

export const getPayment = async (req,res) => {
    try {
        const response = await Payment.findAndCountAll({
            attributes: ['uuid', 'total','first', 'second','balance','timepayment','status', 'createdAt', 'updatedAt'],
            include: [
                {model: Students},
                {model: Invoice},
                {model: PaymentMethods}            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createPayment = async(req,res) => {  
    let invoice;
    const {user, studentid, code, courselist, examlist, purchaselist, accolist, currency, totall, subtotal,registration, studdiscount,discount, otherlist } = req.body;
    try {
        invoice = await Invoice.create({
            courselist: courselist ,
            examlist: examlist,
            purchaselist: purchaselist,
            accolist: accolist,
            currency: currency,
            total: totall,
            subtotal: subtotal,
            discount: discount,
            otherlist: otherlist,
            payed: true,
            registration: registration,
            student_studentid: studentid
    });


   
////////////////////////UPDATE DISCOUNT////////////////////////////////////////////////
const discountt = await Discount.findOne({
    where: {
        code: code
    }
});
discountt  &&
    await Discount.update({
        student_studentid: studentid,
        used: true
    }, {
        where: {
            id: discountt.id
        }
    });
    ///////////////////////////////SAVE STUDENT COURSES DATA////////////////////////////
    const stud = await Students.findOne({
        where: {
            id: studentid
        }
    });
 if(courselist.lenght > 0) {  const courseData = await courselist.map((course, index) => {
    
        let dataa = {
            "courses_coursesid": course.coursesid,
            "students_studentsid": studentid,
            "startdate": course.startdate,
            "enddate": course.finaldate,
            "duration": course.laduration,
            "amount": course.price,
            "details": course
        }
        return dataa
    })

 
     

        const info = stud
        if(!stud) return res.status(404).json({msg: "Student doesn't not exist" });
    
        
      
            await Students.update({
                enddate: courseData[0].enddate
    
            }, {
                where: {
                    id: stud.id
                }
            });
           

    courseData.forEach( async course => {
        const response = await StudentsCourses.findOne({
            where : {
                courses_coursesid: course.courses_coursesid,
                students_studentsid: course.students_studentsid
            }
        })
        if (!response) {
            await StudentsCourses.create({
                "courses_coursesid": course.courses_coursesid,
                "students_studentsid": course.students_studentsid,
                "startdate": course.startdate,
                "enddate": course.enddate,
                "duration": course.duration,
                "amount": course.amount,
                "details": [{...course.details}]
            })
        } else {
            await StudentsCourses.update({
                enddate: course.enddate,
                amount: parseInt(response.amount) + parseInt(course.amount),
                duration: parseInt(response.duration) + parseInt(course.duration),
                details: [...response.details, course.details]
            }, {
                where : {
                    courses_coursesid: course.courses_coursesid,
                    students_studentsid: course.students_studentsid
                }
            }
               
            );
        }
      })
}

///////////////////////////ADD PAYMENT////////////////////////////////////////////////
    const {total, first, balance, paymentmethod, timepayment} = req.body;
  
        await Payment.create({
            total: total,
            first: first,
            balance: balance,
            student_studentid: studentid,
            invoice_invoiceid: invoice.id,
            paymth_paymtid: paymentmethod,
            timepayment: timepayment,
           
        });



      await Log.create({
            info: `Add Payment (Courses or Purshase or Exam) - Student: ${stud.surnameg}  ${stud.forenamesg } - Total: ${total} -  Payed: ${first} - Balance: ${balance} `,
            user_userid: user
        });

        
        res.status(201).json({msg: "Payment Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
        console.log(error);
    }
}

export const getPaymentById = async(req,res) => {

    try {
        const response = await Payment.findOne({
            attributes: ['uuid', 'total','first', 'second','balance','timepayment', 'createdAt',  'status'],
            include: [
                {model: Students},
                {model: Invoice},
                {model: PaymentMethods},
                {model: PaymentStatus}

            ],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const updatePayment = async(req,res) => {
    const { user} = req.body;

    const pay = await Payment.findOne({
        where: {
            uuid: req.params.id
        }
    });
    const info = pay

    if(!pay) return res.status(404).json({msg: "Payment doesn't not exist" });
    const {paying, timepayment, first, balance} = req.body;
    
    try {
        await Payment.update({
            first: first,
            second: paying,
            balance: balance,
            timepayment: timepayment,
        }, {
            where: {
                id: pay.id
            }
        });
      

        const stud = await Students.findOne({
            where: {
                id: info.student_studentid
            }
        });

        await Log.create({
            info: ` Payment by installments - Student: ${stud.surnameg}  ${stud.forenamesg } - Total: ${info.total} - Balance: ${balance} `,
            user_userid: user
        });

        res.status(200).json({msg: "Payment  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}


export const updatePaymentStatus = async(req,res) => {
    const { user} = req.body;

    const pay = await Payment.findOne({
        where: {
            uuid: req.params.id
        }
    });
    const info = pay

    if(!pay) return res.status(404).json({msg: "Payment doesn't not exist" });
    const {status} = req.body;
    
    try {
        await Payment.update({
            status: status,
        }, {
            where: {
                id: pay.id
            }
        });
      

        const stud = await Students.findOne({
            where: {
                id: info.student_studentid
            }
        });

        await Log.create({
            info: ` Payement confirmed from "Pending - Student: ${stud.surnameg}  ${stud.forenamesg } `,
            user_userid: user
        });

        res.status(200).json({msg: "Payment  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}



export const deleteLastPayment = async(req,res) => {
    const { user} = req.body;
    let balance
    const getPayment = await Payment.findOne({
        where: {
            uuid: req.params.id
        }
    });
    const info = getPayment
    if(!getPayment) return res.status(404).json({msg: "Payment doesn't not exist" });

    const paymentlist = getPayment.timepayment

    const sum = paymentlist.reduce((accumulator, object) => {
        return accumulator + object.amount;
      }, 0);
 
    const length = paymentlist.length
    const newTimePayment = getPayment.timepayment.slice(0,-1)
  

   


    if (length  > 1) {
        balance = parseInt(getPayment.balance) + parseInt(paymentlist[length - 1].amount) ;
        try {
            await Payment.update({
                first: paymentlist[0].amount,
                second: length === 2 ? 0 : newTimePayment[newTimePayment.length - 1].amount,
                balance: parseInt(getPayment.balance) + parseInt(paymentlist[length - 1].amount) ,
                timepayment: newTimePayment,
            }, {
                where: {
                    id: getPayment.id
                }
            });
            res.status(200).json({msg: "Payment  updated"});
        } catch (error) {
            res.status(400).json({msg: error.message})
            console.log(error)
        }
    }


    if (length === 1) {
            balance = getPayment.total;
        try {
            await Payment.update({
                first: 0,
                balance: getPayment.total,
                second : 0,
                timepayment: [],
            }, {
                where: {
                    id: getPayment.id
                }
            });

            const stud = await Students.findOne({
                where: {
                    id: info.student_studentid
                }
            });

            await Log.create({
                info: `Delete Payment - Student: ${stud.surnameg}  ${stud.forenamesg } - Total: ${getPayment.total} - Balance: ${balance} `,
                user_userid: user
            });
          
            res.status(200).json({msg: "Payment  updated"});
        } catch (error) {
            res.status(400).json({msg: error.message})
            console.log(error);
        }
    }
    
   
}
