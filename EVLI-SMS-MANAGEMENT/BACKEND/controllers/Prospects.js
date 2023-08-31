import Prospect from "../models/ProspectModels.js"
import Users from "../models/UsersModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import About from "../models/AboutModels.js";
import Log from "../models/LogModels.js";

export const getProspects = async (req,res) => {
    try {
        const response = await Prospect.findAndCountAll({
            attributes: ['prospectid','coursewish','startdate','enddate','id','uuid', 'about_aboutid','passportphotographg','idscang', 'surnameg', 'forenamesg', 'dateofbirthg', 'genderg', 'citizenshipg', 'emailg', 'telhomeg'],
            include: [{
                model: About
            }],
            where: { isstudent: false },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const getProspectByPassportId = async(req,res) => {
    const { passportidg } = await req.body;
    try {
        const response = await Students.findOne({
            attributes: [ 'surnameg', 'forenamesg', 'id', 'prospectid'],
            where: {
                passportidg: passportidg
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getProspectById =async (req,res) => {
    try {
        const response = await Prospect.findOne({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getProspectByProspectId =async (req,res) => {
    let { prospectid } = req.body;

    try {
        const response = await Prospect.findOne({
        where: {
            prospectid: prospectid
        }
    });
    res.status(200).json(response)
    } catch(error) {
        res.status(500).json({msg: error.message});
    }
}
export const createProspect = async(req,res) => {
    const url = req.protocol + '://' + req.get('host')

    const {user, prospectid,surnameg, forenamesg, genderg, dateofbirthg, placeofbirthg, citizenshipg,occupationg, emailg, telhomeg, telghanag,addresshomeg, addressghanag, maritalg, passportidg,academicg, noteg, aboutidg, surnamee, forenamese, gendere, relationshipe,occupatione, emaile, tel1e, tel2e, addresse, surnamep, forenamesp, genderp, relationshipp, occupationp, emailp, tel1p, tel2p, addressp, nameo, addresso, tel1o, emailo, contacto, tel2o, about_aboutid, startdate, enddate } = req.body;
    

    const response = await Prospect.findOne({
        where: {
            prospectid: "EVLI" + prospectid
        }})

        if(!response) {
            try {

      
                    await Prospect.create({
                    prospectid: "EVLI" + prospectid,
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
                    isstudent: false
                },{   
                    headers: { "Content-Type": "multipart/form-data" } 
            });

            ////////////////////////ADDD LOG////////////////////////
                await Log.create({
                    info: `Add Prospect - Surname: ${surnameg} Forenames: ${forenamesg} - Citizenship: ${citizenshipg}`,
                    user_userid: user
                });
            ////////////////////////ADDD LOG////////////////////////

                res.status(201).json({msg: "Prospect well created"})
                console.log("OKAY");
            } catch (error) {
                res.status(400).json({msg: error.message})
            }
        } else {
            res.status(400).json({msg: "Prospect already exist"})
            console.log("OKAY");

        }

 
}


export const createProspectInProspect = async(req,res) => {

    const {user, prospectid,surnameg,coursewish, forenamesg, genderg, dateofbirthg, placeofbirthg, citizenshipg,occupationg, emailg, telhomeg, telghanag,addresshomeg, addressghanag, maritalg, passportidg,academiclevelg, noteg, aboutidg, surnamee, forenamese, gendere, relationshipe,occupatione, emaile, tel1e, tel2e, addresse, surnamep, forenamesp, genderp, relationshipp, occupationp, emailp, tel1p, tel2p, addressp, nameo, addresso, tel1o, emailo, contacto, tel2o, about_aboutid, startdate, enddate } = req.body;
    
    try {
        await Prospect.create({
            surnameg: surnameg,
            forenamesg: forenamesg,
            genderg: genderg,
            citizenshipg: citizenshipg,
            startdate: startdate,
            emailg: emailg,
            telhomeg: telhomeg,
            coursewish: coursewish,
            about_aboutid: about_aboutid,
            isstudent: false
        })

           ////////////////////////ADDD LOG////////////////////////
           await Log.create({
            info: `Add Prospect - Surname: ${surnameg} Forenames: ${forenamesg} - Citizenship: ${citizenshipg}`,
            user_userid: user
        });
            ////////////////////////ADDD LOG////////////////////////

        res.status(200).json({msg: "Prospect well created"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateProspect = (req,res) => {
    
}




export const deleteProspect = async(req,res) => {

    const {user} = req.body;


    const prospect = await Prospect.findOne({
        where: {
            uuid: req.params.id
        }
    });

    const details = prospect
    if(!prospect) return res.status(404).json({msg: "Prospect doesn't not exist" });
    try {
        await Prospect.destroy({
            where: {
                id: prospect.id
            }
        });

  ////////////////////////ADDD LOG////////////////////////

  await Log.create({
    info: `Delete prospect: ${details.surnameg} ${details.forenamesg}`,
    user_userid: user
});
  //////////////////////////////////////////////////////////


        res.status(201).json({msg: "Prospect Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

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

